const HealthServe = require("../models/healthServe.js");

const createHospital = async (healthServeData) => {
  try {
    healthServeSchema.parse(healthServeData);

    const existing = await Admin.findOne();
    if (existing) {
      return res.status(400).json({ message: "Admin account already exists." });
    }

    const hashedPassword = await bcrypt.hash(healthServeData.password, 10);
    const healthServe = new Admin({
      username: healthServeData.username,
      password: hashedPassword,
    });

    await healthServe.save();

    return { statusCode: 200, healthServe: healthServe };
  } catch (error) {
    console.log(`Error occurred while creating healthServe ::: ${error}`);
    if (error.name === "ZodError") {
      return { statusCode: 400, error: error.errors[0].message };
    }
    return { statusCode: 500, error: "Internal server error." };
  }
};

module.exports = {
  createHospital,
};
