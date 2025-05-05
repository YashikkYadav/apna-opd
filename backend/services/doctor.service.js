const Doctor = require("../models/doctor");
const validateDoctor = require("../validations/doctor.validation");
const {
  getHashedPassword,
  comparePassword,
  getAccessToken,
} = require("../utils/helpers");
const DoctorProfile = require("../models/doctorProfile");

const registerDoctor = async (doctorData) => {
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
    } = doctorData;
    console.log(doctorData);

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

    const hashedPassword = await getHashedPassword(password);
    const newDoctor = new Doctor({
      name,
      rmcNumber,
      phoneNumber,
      email,
      address,
      clinicName,
      speciality,
      password: hashedPassword,
    });
    await newDoctor.save();

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
      },
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

const getDoctorList = async (page, location, speciality) => {
  try {
    const limit = 5;
    const skip = (page - 1) * limit;

    const pipeline = [];

    if (location) {
      pipeline.push({
        $match: {
          locations: {
            $elemMatch: {
              address: { $regex: location, $options: "i" },
            },
          },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: "doctors", // collection name (plural, lowercase model name)
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
};
