const HealthServe = require("../models/healthServe");
const HealthServeProfile = require("../models/healthServeProfile");
const HospitalDoctor = require("../models/hospitalDoctor");
const {
  getAccessToken,
  getHashedPassword,
  comparePassword,
} = require("../utils/helpers");
const {
  validateHealthServe,
} = require("../validations/healthServe.validation");
const { createPaymentLinkForEntity } = require("./payment.service");

const register = async (data) => {
  try {
    let { type, name, phone, email, password, location, subscriptionType, bloodGroup, homeService } = data;

    const healthServeValidation = validateHealthServe(data);
    if (!healthServeValidation.success) {
      return {
        statusCode: 400,
        error: healthServeValidation.errors,
      };
    }

    const isHealthServeExist = await HealthServe.findOne({ phone });
    if (isHealthServeExist) {
      return {
        statusCode: 409,
        error: "Health Serve with same number already exist",
      };
    }
    type = type.replace("-", "_");

    let paymentUrl;
    if(type !== "blood_donor"){
      paymentUrl = await createPaymentLinkForEntity(type, {name, phone, email}, subscriptionType);
    }else{
      paymentUrl = null;
    }

    let hashedPassword = null;
    if (type !== "blood_donor") {
      hashedPassword = await getHashedPassword(password);
    }

    const healthServeData = {
      type,
      name,
      phone,
      email,
      password: hashedPassword,
      location,
      subscriptionType,
    };

    if (type === "blood_donor" && bloodGroup) {
      healthServeData.bloodGroup = bloodGroup;
    }
    
    if (type === "nursing_staff" && homeService) {
      healthServeData.homeService = homeService;
    }

    const newHealthServe = new HealthServe(healthServeData);
    await newHealthServe.save();

    // const newHealthServeProfile = new HealthServeProfile({
    //   healthServeId: newHealthServe._id,
    //   type,
    //   name,
    //   phone,
    //   email,
    //   location,
    // });
    // await newHealthServeProfile.save();

    return {
      statusCode: 201,
      healthServe: newHealthServe,
      paymentLink: paymentUrl?.paymentLink,
    };
  } catch (error) {
    console.log("Error while creating healthServe in DB : ", error);
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const login = async (data) => {
  try {
    const { phone, password, type } = data;

    if (
      !phone ||
      phone === null ||
      phone === undefined ||
      !password ||
      password === null ||
      password === undefined ||
      !type ||
      type === null ||
      type === undefined
    ) {
      return {
        statusCode: 422,
        error: "Missing field: Phone Number and Password or Type",
      };
    }

    const healthServe = await HealthServe.findOne({ phone, type });
    if (!healthServe) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

    // if (!healthServe.paymentStatus) {
    //     const paymentUrl = await createPaymentLinkForEntity(healthServe.type, {name: healthServe.name, phone: healthServe.phoneNumber, email: healthServe.email}, healthServe.subscriptionType);

    //     return {
    //       statusCode: 400,
    //       error: `Please complete your payment, You won't be able to login before completing payment. Link ${paymentUrl?.paymentData?.short_url}`,
    //     };
    // }

    const passwordCheck = await comparePassword(password, healthServe.password);
    if (!passwordCheck) {
      return {
        statusCode: 401,
        error: "Wrong Password",
      };
    }

    const accessToken = getAccessToken(healthServe);
    return {
      statusCode: 200,
      healthServe: {
        id: healthServe._id,
        phone,
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

const getHealthServeById = async (healthServeId) => {
  try {
    const healthServe = await HealthServe.findById(healthServeId);

    if (!healthServe) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

    return {
      statusCode: 200,
      healthServe,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getAllHealthServes = async (
  type,
  page = 1,
  limit = 10,
  searchQuery = ""
) => {
  try {
    const pageNumber = Math.max(parseInt(page, 10), 1);
    const limitNumber = Math.max(parseInt(limit, 10), 1);
    const skip = (pageNumber - 1) * limitNumber;

    let searchFilter = { type };

    if (searchQuery) {
      searchFilter = {
        location: { $regex: searchQuery, $options: "i" },
      };
    }

    const totalCount = await HealthServe.countDocuments(searchFilter);
    const healthServes = await HealthServe.find(searchFilter)
      .select("_id name phone email location")
      .skip(skip)
      .limit(limitNumber);

    return {
      statusCode: 200,
      healthServes,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
        totalRecords: totalCount,
        pageSize: limitNumber,
        hasNextPage: pageNumber * limitNumber < totalCount,
        hasPrevPage: pageNumber > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const updateHealthServe = async (healthServeId, data) => {
  try {
    const { type, name, phone, email, location } = data;

    const isHealthServeExist = await HealthServe.findByid(healthServeId);
    if (!isHealthServeExist) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

    const updatedHealthServe = await HealthServe.findByIdAndUpdate(
      healthServeId,
      {
        type,
        name,
        phone,
        email,
        location,
      },
      { new: true }
    );

    return {
      statusCode: 200,
      healthServe: updatedHealthServe,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const deleteHealthServe = async (healthServeId) => {
  try {
    if (!healthServeId) {
      return {
        statusCode: 403,
        error: "HealthServe Id is required",
      };
    }

    const healthServe = await HealthServe.findByIdAndDelete(healthServeId);
    if (!healthServe) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

    return {};
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getHealthServeList = async (page, location, type) => {
  try {
    const limit = 5;
    const skip = (page - 1) * limit;

    const filter = {};

    const extractCity = (rawLocation) => {
      if (!rawLocation) return "";

      return rawLocation
        .toLowerCase()
        .replace(/^the\s+/i, "")
        .split(",")[0]
        .trim();
    };

    location = extractCity(location);
    if (location) {
      filter.location = { $regex: new RegExp(location, "i") };
    }

    if (type) {
      filter.type = type;
    }
    let healthServeProfileList;
    let total;
    if (type === "hospital" || type === "blood_donor") {
      healthServeProfileList = await HealthServe.find(filter)
        .skip(skip)
        .limit(limit);
      total = await HealthServe.countDocuments(filter);
    } else {
      healthServeProfileList = await HealthServeProfile.find(filter)
         .skip(skip)
         .limit(limit);
      total = await HealthServeProfile.countDocuments(filter);
    }

    return {
      statusCode: 200,
      healthServeProfileList,
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

const getDoctors = async (hospitalId) => {
  try {
    const doctors = await HospitalDoctor.find({
      healthServeId: hospitalId.hospitalId,
    }).populate("doctorId");

    if (!doctors) {
      return { statusCode: 404, error: "No doctors for this hospital" };
    }

    return { statusCode: 200, doctors: doctors };
  } catch (error) {
    return { statusCode: 500, error: error };
  }
};

const ratingHealthServe = async (healthServeId, rating) => {
  try {

    rating = typeof rating === "string" ? parseInt(rating) : rating;

    if (rating < 1 || rating > 5) {
      return {
        statusCode: 400,
        error: "Rating must be between 1 and 5",
      };
    }

    const healthServeProfile = await HealthServeProfile.findById(healthServeId);
    if (!healthServeProfile) {
      return {
        statusCode: 404,
        error: "Health Serve profile not found",
      };
    }

    const newRating =
      (healthServeProfile.rating * healthServeProfile.ratingCount + rating) /
      (healthServeProfile.ratingCount + 1);
    const newRatingCount = healthServeProfile.ratingCount + 1;

    await HealthServeProfile.findByIdAndUpdate(
      healthServeProfile._id,
      {
        rating: newRating,
        ratingCount: newRatingCount,
      },
      { runValidators: false }
    );

    return {
      statusCode: 200,
      message: "Health Serve rating updated successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

module.exports = {
  register,
  login,
  getHealthServeById,
  getAllHealthServes,
  updateHealthServe,
  deleteHealthServe,
  getHealthServeList,
  getDoctors,
  ratingHealthServe,
};
