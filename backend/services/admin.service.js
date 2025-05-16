const adminSchema = require("../validations/admin.validation");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { getAccessToken, comparePassword } = require("../utils/helpers");
const Doctor = require("../models/doctor");

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

module.exports = {
  createAdmin,
  loginAdmin,
  getDoctors,
};
