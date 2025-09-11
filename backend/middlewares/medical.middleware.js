const { verifyAccessToken } = require("../utils/helpers");
const Medical = require("../models/healthServe");

const medicalMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const { medicalId } = req.params;

    const doctor = await Medical.findById(medicalId);

    if (!doctor) {
      return res.status(403).json({ error: "Medical not found" });
    }

    const doctorDetails = await verifyAccessToken(accessToken);
    if (doctorDetails?.error) {
      return res.status(402).json({ error: doctorDetails.error });
    }

    if (doctorDetails.data._id != medicalId) {
      return res.status(400).json({ error: "Unauthorized access" });
    }

    next();
  } catch (err) {
    res.status(499).json({ error: err });
  }
};

module.exports = medicalMiddleware;
