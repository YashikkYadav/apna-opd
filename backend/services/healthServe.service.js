const HealthServe = require("../models/healthServe");
const HealthServeProfile = require("../models/healthServeProfile");
const {
  getAccessToken,
  getHashedPassword,
  comparePassword,
} = require("../utils/helpers");
const {
  validateHealthServe,
} = require("../validations/healthServe.validation");

const register = async (data) => {
  try {
    const { type, name, phone, email, password, location } = data;

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

    const hashedPassword = await getHashedPassword(password);
    const newHealthServe = new HealthServe({
      type,
      name,
      phone,
      email,
      password: hashedPassword,
      location,
    });
    await newHealthServe.save();

    const newHealthServeProfile = new HealthServeProfile({
      healthServeId: newHealthServe._id,
      type,
      name,
      phone,
      email,
      location,
    });
    await newHealthServeProfile.save();

    return {
      statusCode: 201,
      healthServe: newHealthServe,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const login = async (data) => {
  try {
    const { phone, password } = data;

    if (
      !phone ||
      phone === null ||
      phone === undefined ||
      !password ||
      password === null ||
      password === undefined
    ) {
      return {
        statusCode: 422,
        error: "Missing field: Phone Number and Password",
      };
    }

    const healthServe = await HealthServe.findOne({ phone });
    if (!healthServe) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

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

const getHealthServeList = async (page) => {
  try {
    const limit = 5;
    const skip = (page - 1) * limit;

    const healthServeList = await HealthServe.find().skip(skip).limit(limit);
    const healthServeIds = healthServeList.map(
      (healthServe) => healthServe._id
    );
    const healthServeProfileList = await HealthServeProfile.find({
      healthServeId: { $in: healthServeIds },
    });

    const total = await HealthServe.countDocuments();

    return {
      statusCode: 200,
      healthServeList,
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

module.exports = {
  register,
  login,
  getHealthServeById,
  getAllHealthServes,
  updateHealthServe,
  deleteHealthServe,
  getHealthServeList,
};
