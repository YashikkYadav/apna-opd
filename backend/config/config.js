const config = {
  development: {
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    BASE_URL: process.env.BASE_URL,
    PHONE_NUMBER_ID: process.env.PHONE_NUMBER_ID,
    WABA_ID: process.env.WABA_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
  production: {
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    BASE_URL: process.env.BASE_URL,
    PHONE_NUMBER_ID: process.env.PHONE_NUMBER_ID,
    WABA_ID: process.env.WABA_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
};

module.exports = config[process.env.NODE_ENV];
