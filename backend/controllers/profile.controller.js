const profileService = require('../services/profile.service');

const createProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const profileData = req.body;

    const userProfile = await profileService.createProfile(profileId, profileData);
    if (doctorProfile?.error) {
      return res
        .status(doctorProfile.statusCode)
        .send(doctorProfile.error);
    }

    res
      .status(doctorProfile.statusCode)
      .json({ doctorProfile: doctorProfile.doctorProfile });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctorProfile = await doctorProfileService.getDoctorProfile(doctorId);
    if (doctorProfile?.error) {
      return res
        .status(doctorProfile.statusCode)
        .send(doctorProfile.error);
    }

    res
      .status(doctorProfile.statusCode)
      .json({ doctorProfile: doctorProfile.doctorProfile });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getAppointmentDetails = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctorProfile = await doctorProfileService.getAppointmentDetails(doctorId);
    if (doctorProfile?.error) {
      return res
        .status(doctorProfile.statusCode)
        .send(doctorProfile.error);
    }

    res
      .status(doctorProfile.statusCode)
      .json({ doctorProfile: doctorProfile.doctorProfile });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  createProfile,
  getDoctorProfile,
  getAppointmentDetails,
};
