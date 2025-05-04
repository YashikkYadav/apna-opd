const healthServerProfileService = require("../services/profile.service");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const createProfile = async (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const folder = "public/health-serve-profile/";
        cb(null, folder);
      },
      filename: (req, file, cb) => {
        const folder = "public/health-serve-profile/";
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname);
        const healthServeId = req.params.healthServeId;
        const newFileName = `${healthServeId}_${uniqueSuffix}_${file.fieldname}${ext}`;
        if (file.fieldname === "profilePhoto") {
          fs.readdir(folder, (err, files) => {
            if (err) {
              console.error("Failed to read directory:", err);
              return cb(err);
            }
            const oldFiles = files.filter(
              (f) =>
                f.startsWith(`${healthServeId}`) && f.includes("profilePhoto")
            );
            oldFiles.forEach((f) => {
              fs.unlink(path.join(folder, f), (err) => {
                if (err) console.error("Failed to delete old file:", f, err);
              });
            });
            cb(null, newFileName);
          });
        } else {
          cb(null, newFileName);
        }
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
      console.log("Check");
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
  } catch (error) {
    console.log("Error while creating profile : ", error);
    res.status(500).send(`Error: ${error}`);
  }
};

const getHealthServeProfile = async (req, res) => {
  try {
    const { healthServeId } = req.params;

    const healthServeProfile =
      await healthServerProfileService.getHealthServeProfile(healthServeId);

    if (healthServeProfile?.error) {
      return res
        .status(healthServeProfile.statusCode)
        .send(healthServeProfile.error);
    }

    res
      .status(healthServeProfile.statusCode)
      .json({ healthServeProfile: healthServeProfile.healthServeProfile });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const getAppointmentDetails = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const healthServeProfile =
      await healthServerProfileService.getAppointmentDetails(doctorId);
    if (healthServeProfile?.error) {
      return res
        .status(healthServeProfile.statusCode)
        .send(healthServeProfile.error);
    }

    res
      .status(healthServeProfile.statusCode)
      .json({ healthServeProfile: healthServeProfile.healthServeProfile });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const deleteImage = async (req, res) => {
  try {
    const { healthServeId } = req.params;
    const image = req.body;
    const deleteResponse = await healthServerProfileService.deleteImage(
      healthServeId,
      image
    );
    if (deleteResponse?.error) {
      return res.status(deleteResponse.statusCode).send(deleteResponse.error);
    }
    return res
      .status(deleteResponse.statusCode)
      .json({ images: deleteResponse.images });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

module.exports = {
  deleteImage,
  createProfile,
  getHealthServeProfile,
  getAppointmentDetails,
};
