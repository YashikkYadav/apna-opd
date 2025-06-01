const healthServeProfileService = require('../services/healthServeProfile.service');

const createHealthServeProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const profileData = req.body;

    const healthServeProfile = await healthServeProfileService.createhealthServeProfile(doctorId, profileData);
    if (healthServeProfile?.error) {
      return res
        .status(healthServeProfile.statusCode)
        .send(healthServeProfile.error);
    }

    res
      .status(healthServeProfile.statusCode)
      .json({ healthServeProfile: healthServeProfile.healthServeProfile });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getHealthServeProfile = async (req, res) => {
  try {
    const { healthServeId } = req.params;

    const healthServeProfile = await healthServeProfileService.getHealthServeProfile(healthServeId);
    if (healthServeProfile?.error) {
      return res
        .status(healthServeProfile.statusCode)
        .send(healthServeProfile.error);
    }

    res
      .status(healthServeProfile.statusCode)
      .json({ healthServeProfile: healthServeProfile.healthServeProfile });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getAppointmentDetails = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const healthServeProfile = await healthServeProfileService.getAppointmentDetails(doctorId);
    if (healthServeProfile?.error) {
      return res
        .status(healthServeProfile.statusCode)
        .send(healthServeProfile.error);
    }

    res
      .status(healthServeProfile.statusCode)
      .json({ healthServeProfile: healthServeProfile.healthServeProfile });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  getHealthServeProfile,
  getAppointmentDetails,
};
