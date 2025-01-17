const config = {
  development: {
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_USER: process.env.MAIL_USER,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    BREVO_USER_NAME: process.env.BREVO_USER_NAME,
    BREVO_EMAIL: process.env.BREVO_EMAIL,
    BREVO_API: process.env.BREVO_API,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
  },
  production: {
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_USER: process.env.MAIL_USER,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    BREVO_API: process.env.BREVO_API,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
  },
};

module.exports = config[process.env.NODE_ENV];
