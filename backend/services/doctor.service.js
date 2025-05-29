const Doctor = require("../models/doctor");
const validateDoctor = require("../validations/doctor.validation");
const {
  getHashedPassword,
  comparePassword,
  getAccessToken,
} = require("../utils/helpers");
const DoctorProfile = require("../models/doctorProfile");
const { createPaymentLinkForEntity } = require("./payment.service");

const registerDoctor = async (doctorData) => {
  console.log(doctorData);
  try {
    const {
      name,
      rmcNumber,
      phoneNumber,
      email,
      address,
      clinicName,
      speciality,
      password,
      subscriptionType,
      user,
    } = doctorData;

    const doctorDataValidation = validateDoctor(doctorData);
    if (!doctorDataValidation.success) {
      return {
        statusCode: 400,
        error: doctorDataValidation.errors,
      };
    }

    let doctor =
      (await Doctor.findOne({ phoneNumber })) ||
      (await Doctor.findOne({ email }));

    if (doctor) {
      return {
        statusCode: 409,
        error:
          "Doctor already exist, Please use different email/phone number or login",
      };
    }

    const paymentUrl = await createPaymentLinkForEntity(
      "doctor",
      { name, phone: phoneNumber, email },
      subscriptionType
    );
    const hashedPassword = await getHashedPassword(password);
    let data = {
      name,
      rmcNumber,
      phoneNumber,
      email,
      address,
      clinicName,
      speciality,
      password: hashedPassword,
      subscriptionType,
    };
    if (user) {
      data = {
        name,
        rmcNumber,
        phoneNumber,
        email,
        address,
        clinicName,
        speciality,
        password: hashedPassword,
        subscriptionType,
        userId: user,
      };
    }
    const newDoctor = new Doctor(data);
    await newDoctor.save();
    console.log("payment instide the service ", paymentUrl);
    return {
      statusCode: 201,
      doctor: {
        id: newDoctor._id,
        name: newDoctor.name,
        rmcNumber: newDoctor.rmcNumber,
        phoneNumber: newDoctor.phoneNumber,
        email: newDoctor.email,
        address: newDoctor.address,
        clinicName: newDoctor.clinicName,
        speciality: newDoctor.speciality,
        subscriptionType: newDoctor.subscriptionType,
      },
      paymentLink: paymentUrl,
    };
  } catch (error) {
    console.log("Error creating/updating doctor in DB : ", error);
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const loginDoctor = async (doctorData) => {
  try {
    const { email, phoneNumber, password } = doctorData;

    if (!(email || phoneNumber) && password) {
      return {
        statusCode: 400,
        error: "Please fill all the fields",
      };
    }

    const doctor =
      (await Doctor.findOne({ email })) ||
      (await Doctor.findOne({ phoneNumber }));

    if (!doctor) {
      return {
        statusCode: 404,
        error: "Doctor not found",
      };
    }

    // if (!doctor.paymentStatus) {
    //   const paymentUrl = await createPaymentLinkForEntity('doctor', {name: doctor.name, phone: doctor.phoneNumber, email: doctor.email}, subscriptionType);

    //   return {
    //     statusCode: 400,
    //     error: `Please complete your payment, You won't be able to login before completing payment. Link ${paymentUrl?.paymentData?.short_url}`,
    //   };
    // }

    const isPasswordValid = await comparePassword(password, doctor.password);
    if (!isPasswordValid) {
      return {
        statusCode: 401,
        error: "Wrong Password",
      };
    }

    const accessToken = getAccessToken(doctor);
    return {
      statusCode: 200,
      doctor: {
        id: doctor._id,
        accessToken,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getDoctor = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    return {
      statusCode: 200,
      doctor: {
        id: doctorId,
        name: doctor.name,
        rmcNumber: doctor.rmcNumber,
        phoneNumber: doctor.phoneNumber,
        email: doctor.email,
        address: doctor.address,
        clinicName: doctor.clinicName,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const deleteDoctor = async (doctorId) => {
  try {
    await Doctor.findByIdAndDelete(doctorId);
    return {
      statusCode: 204,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

function cleanedLocations(location) {
  if (typeof location !== "string") {
    return "";
  }

  const words = location.match(/[a-zA-Z]+/g);

  if (words) {
    return words.join(" ").toLowerCase();
  } else {
    return "";
  }
}

const getDoctorList = async (page, location, speciality) => {
  try {
    const cleanLocation = cleanedLocations(location).split(" ");
    const limit = 5;
    const skip = (page - 1) * limit;

    const pipeline = [];
    if (location) {
      pipeline.push({
        $match: {
          locations: {
            $elemMatch: {
              address: {
                $in: cleanLocation.map((word) => new RegExp(word, "i")),
              },
            },
          },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctor",
      },
    });

    pipeline.push({
      $unwind: "$doctor",
    });

    if (speciality) {
      pipeline.push({
        $match: {
          "doctor.speciality": speciality,
        },
      });
    }

    pipeline.push({
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    });

    const result = await DoctorProfile.aggregate(pipeline);
    const doctorList = result[0]?.data || [];
    const total = result[0]?.totalCount?.[0]?.count || 0;

    return {
      statusCode: 200,
      doctorList,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const ratingDoctor = async (doctorId, rating) => {
  try {
    rating = typeof rating === "string" ? parseInt(rating) : rating;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return {
        statusCode: 404,
        error: "Doctor not found",
      };
    }
    const doctorProfile = await DoctorProfile.findOne({ doctorId: doctorId });
    if (!doctorProfile) {
      return {
        statusCode: 404,
        error: "Doctor profile not found",
      };
    }

    const newRating =
      (doctorProfile.rating * doctorProfile.ratingCount + rating) /
      (doctorProfile.ratingCount + 1);
    const newRatingCount = doctorProfile.ratingCount + 1;

    await DoctorProfile.findByIdAndUpdate(
      doctorProfile._id,
      {
        rating: newRating,
        ratingCount: newRatingCount,
      },
      { runValidators: false }
    );

    return {
      statusCode: 200,
      message: "Doctor rating updated successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

module.exports = {
  registerDoctor,
  loginDoctor,
  getDoctor,
  deleteDoctor,
  getDoctorList,
  ratingDoctor,
};
