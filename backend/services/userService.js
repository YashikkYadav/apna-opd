const User = require('../models/user');

const { validateUser } = require('../validations/userValidation');

const {
  getHashedPassword,
  comparePassword,
  getAccessToken,
} = require('../utils/helpers');
const mailFunction = require('../utils/mail');

const registerUser = async (userData) => {
  try {
    const {
      sop,
      format,
      reference,
      conciseness,
      firstName,
      lastName,
      email,
      password,
    } = userData;

    const userDataValidation = validateUser(userData);
    if (userDataValidation?.error) {
      return {
        error: `Error: ${userDataValidation.error}`,
      };
    }

    const user = await User.findOne({ email });
    if (user) {
      return {
        error: 'User already exist, Please use different email address or login',
      };
    }

    const hashedPassword = await getHashedPassword(password);
    const newUser = new User({
      sop,
      format,
      reference,
      conciseness,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      numberOfTokensLeft: 50,
    });
    await newUser.save();

    // await mailFunction(
    //   'Confirmation: Registration Mail',
    //   `<body>
    //     <p>Dear ${firstName},</p>
    //     <p>Thank you for registering with Sleuther AI.</p>
    //     <p><strong>Good to have you onboard.</strong></p>
    //     <p>We will keep you posted with further details through mail.</p>
    //     <p>Regards,<br/>Team Sleuther AI</p>
    //   </body>`,
    //   email,
    //   firstName,
    // );

    const accessToken = getAccessToken(newUser);
    return {
      id: newUser._id,
      accessToken,
      sop: newUser.sop,
      format: newUser.format,
      reference: newUser.reference,
      conciseness: newUser.conciseness,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      numberOfTokensLeft: newUser.numberOfTokensLeft,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

const loginUser = async (userData) => {
  try {
    const {
      email,
      password
    } = userData;

    if (
      !email
      || !password
    ) {
      return {
        error: 'Please fill all the required fields',
      };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return {
        error: 'User not found',
      };
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        error: 'Wrong Password',
      };
    }

    const accessToken = getAccessToken(user);
    return {
      id: user._id,
      accessToken,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      id: userId,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      numberOfTokensLeft: user.numberOfTokensLeft,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    return {
      error: error,
    };
  }
}

const sendForgetPasswordMail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        error: `User doesn't exist, Please use different email address`,
      };
    }

    // await mailFunction(
    //   'Sleuther AI: Reset Password',
    //   `Please click on the link below to reset your password`,
    //   user.email,
    //   user.firstName,
    // );

    return {
      message: 'Reset password mail sent successfully'
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

const resetPassword = async (userId, userData) => {
  try {
    const { password, confirmPassword } = userData;

    if (password.length < 8) {
      return {
        error: 'Password is not valid, it must have a length of 8 characters or more',
      };
    }

    if (password !== confirmPassword) {
      return {
        error: 'Confirm Password and Password does not match',
      };
    }

    const hashedPassword = await getHashedPassword(password);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );

    return {
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  sendForgetPasswordMail,
  resetPassword,
};
