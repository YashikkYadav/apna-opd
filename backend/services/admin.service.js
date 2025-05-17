const adminSchema = require("../validations/admin.validation");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { getAccessToken, comparePassword } = require("../utils/helpers");
const Doctor = require("../models/doctor");
const HealthServe = require("../models/healthServe");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const createAdmin = async (adminData) => {
  try {
    adminSchema.parse(adminData);

    const existing = await Admin.findOne();
    if (existing) {
      return res.status(400).json({ message: "Admin account already exists." });
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const admin = new Admin({
      username: adminData.username,
      password: hashedPassword,
    });

    await admin.save();

    return { statusCode: 200, admin: admin };
  } catch (error) {
    console.log(`Error occurred while creating admin ::: ${error}`);
    if (error.name === "ZodError") {
      return { statusCode: 400, error: error.errors[0].message };
    }
    return { statusCode: 500, error: "Internal server error." };
  }
};

const loginAdmin = async (adminData) => {
  try {
    const { userName, password } = adminData;

    if (!userName && password) {
      return {
        statusCode: 400,
        error: "Please fill all the fields",
      };
    }

    const admin = await Admin.findOne({ username: userName });

    if (!admin) {
      return {
        statusCode: 404,
        error: "admin not found",
      };
    }

    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return {
        statusCode: 401,
        error: "Wrong Password",
      };
    }

    const accessToken = getAccessToken(admin);

    return {
      statusCode: 200,
      admin: {
        id: admin._id,
        accessToken,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getDoctors = async () => {
  try {
    const doctors = await Doctor.find({});
    return { statusCode: 200, doctors: doctors };
  } catch (error) {
    console.log("Error while fetching doctors from the DB : ", error);
    return { statusCode: 500, error: error };
  }
};

const getUsers = async () => {
  try {
    const user = await User.find({});
    return { statusCode: 200, user: user };
  } catch (error) {
    console.log("Error while fetching healthServe from the DB : ", error);
    return { statusCode: 500, error: error };
  }
};

const getUserDetails = async (userId) => {
  try {
    const doctor = await Doctor.countDocuments({ userId: userId });
    const userObj = new mongoose.Types.ObjectId(userId);
    const healthServe = await HealthServe.aggregate([
      { $match: { userId: userObj } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $project: { _id: 0, type: "$_id", count: 1 } },
    ]);

    let userDetails = [];

    if (doctor || healthServe.length) {
      userDetails = {
        details: [{ type: "Doctor", count: doctor }, ...healthServe],
      };
    }

    return { statusCode: 200, details: userDetails };
  } catch (error) {
    console.log("Error while fetching healthServe from the DB : ", error);
    return { statusCode: 500, error: error };
  }
};

const getHealthServe = async (type) => {
  try {
    const healthServe = await HealthServe.find({ type: type });
    return { statusCode: 200, healthServe: healthServe };
  } catch (error) {
    console.log("Error while fetching healthServe from the DB : ", error);
    return { statusCode: 500, error: error };
  }
};

module.exports = {
  getUserDetails,
  getHealthServe,
  createAdmin,
  loginAdmin,
  getUsers,
  getDoctors,
};
