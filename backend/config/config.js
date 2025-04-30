const config = {
  development: {
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    DOUBLE_TICK_API: process.env.DOUBLE_TICK_API,
    API_KEY: process.env.API_KEY,
    BASE_URL: process.env.BASE_URL,
  },
  production: {
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    DOUBLE_TICK_API: process.env.DOUBLE_TICK_API,
    API_KEY: process.env.API_KEY,
  },
};

module.exports = config[process.env.NODE_ENV];
