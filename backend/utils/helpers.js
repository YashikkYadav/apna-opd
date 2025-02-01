const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  SALT_ROUNDS,
  JWT_SECRET,
} = require('../config/config');

const getHashedPassword = async (password) => {
  return bcrypt.hash(password, parseInt(SALT_ROUNDS));
}

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
}

const getAccessToken = (userData) => {
  return jwt.sign(
    { userData },
    JWT_SECRET,
    // { expiresIn: '72h' },
  );
}

const verifyAccessToken = async (accessToken) => {
  try {
    return jwt.verify(accessToken, JWT_SECRET);
  } catch (error) {
    return {
      error: error,
    };
  }
}

module.exports = {
  getHashedPassword,
  comparePassword,
  getAccessToken,
  verifyAccessToken,
};
