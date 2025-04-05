const HealthServeProfile = require("../models/healthServeProfile");
const getDoctorProfile = async (healthServeId) => {
  try {
    const doctorProfile = await HealthServeProfile.findOne({ healthServeId })
      .populate('healthServeId');

    return {
      statusCode: 200,
      doctorProfile,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

module.exports = {
    getDoctorProfile,
};