const healthServerProfileService = require("../services/profile.service");
const path = require("path");
const multer = require("multer");

const createProfile = async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = "public/health-serve-profile/";
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      const ext = path.extname(file.originalname);
      cb(
        null,
        `${req.params.healthServeId}_${uniqueSuffix}_${file.fieldname}${ext}`
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) cb(null, true);
    else cb(new Error("Invalid file type"), false);
  };

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
  }).fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "galleryImages", maxCount: 6 },
  ]);

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const healthServeProfile = await healthServerProfileService.createProfile(
      req.params.healthServeId,
      req.body
    );

    if (healthServeProfile?.error) {
      return res
        .status(healthServeProfile.statusCode)
        .send(healthServeProfile.error);
    }

    res.status(200).json({ message: "Profile created!" });
  });
};

const getDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctorProfile = await profileServe.getDoctorProfile(doctorId);
    if (doctorProfile?.error) {
      return res.status(doctorProfile.statusCode).send(doctorProfile.error);
    }

    res
      .status(doctorProfile.statusCode)
      .json({ doctorProfile: doctorProfile.doctorProfile });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const getAppointmentDetails = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctorProfile =
      await doctorhealthServerProfileService.getAppointmentDetails(doctorId);
    if (doctorProfile?.error) {
      return res.status(doctorProfile.statusCode).send(doctorProfile.error);
    }

    res
      .status(doctorProfile.statusCode)
      .json({ doctorProfile: doctorProfile.doctorProfile });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

module.exports = {
  createProfile,
  getDoctorProfile,
  getAppointmentDetails,
};
