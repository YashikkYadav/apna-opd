const UserSchema = require("../validations/user.validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { getAccessToken, comparePassword } = require("../utils/helpers");
const Doctor = require("../models/doctor");
const HealthServe = require("../models/healthServe");

const createUser = async (userData) => {
  try {
    UserSchema.parse(userData);

    console.log(userData);

    const existingUserWithEmail = await User.findOne({ email: userData.email });
    if (existingUserWithEmail) {
      return { statusCode: 400, error: "Email already exists." };
    }

    const existingUserWithPhone = await User.findOne({ phone: userData.phone });
    if (existingUserWithPhone) {
      return { statusCode: 400, error: "Phone number already exists." };
    }

    const user = new User({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    });

    await user.save();

    console.log(user);

    return { statusCode: 200, User: user };
  } catch (error) {
    console.log(`Error occurred while creating User ::: ${error}`);
    if (error.name === "ZodError") {
      return { statusCode: 400, error: error.errors[0].message };
    }
    return { statusCode: 500, error: "Internal server error." };
  }
};

const loginUser = async (UserData) => {
  try {
    const { userName, password } = UserData;

    if (!userName && password) {
      return {
        statusCode: 400,
        error: "Please fill all the fields",
      };
    }

    const User = await User.findOne({ username: userName });

    if (!User) {
      return {
        statusCode: 404,
        error: "User not found",
      };
    }

    const isPasswordValid = await comparePassword(password, User.password);
    if (!isPasswordValid) {
      return {
        statusCode: 401,
        error: "Wrong Password",
      };
    }

    const accessToken = getAccessToken(User);

    return {
      statusCode: 200,
      User: {
        id: User._id,
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
  getHealthServe,
  createUser,
  loginUser,
  getUsers,
  getDoctors,
};
