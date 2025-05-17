const { verifyAccessToken } = require("../utils/helpers");
const Doctor = require("../models/doctor");

const doctorMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(403).json({ error: "Doctor not found" });
    }

    const doctorDetails = await verifyAccessToken(accessToken);
    if (doctorDetails?.error) {
      return res.status(402).json({ error: doctorDetails.error });
    }

    if (doctorDetails.data._id != doctorId) {
      return res.status(400).json({ error: "Unauthorized access" });
    }

    next();
  } catch (err) {
    res.status(499).json({ error: err });
  }
};

module.exports = doctorMiddleware;
