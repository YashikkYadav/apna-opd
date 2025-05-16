const doctorProfileService = require("../services/doctorProfile.service");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { validateRating } = require("../validations/doctorProfile.validation");


const createDoctorProfile = async (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const folder = "public/doctor-profile/";
        cb(null, folder);
      },
      filename: (req, file, cb) => {
        const folder = "public/doctor-profile/";
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname);
        const doctorId = req.params.doctorId;
        const newFileName = `${doctorId}_${uniqueSuffix}_${file.fieldname}${ext}`;
        if (file.fieldname === "profilePhoto") {
          fs.readdir(folder, (err, files) => {
            if (err) {
              console.error("Failed to read directory:", err);
              return cb(err);
            }
            const oldFiles = files.filter(
              (f) => f.startsWith(`${doctorId}`) && f.includes("profilePhoto")
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
      const doctorProfile = await doctorProfileService.createDoctorProfile(
        req.params.doctorId,
        req.body
      );

      if (doctorProfile?.error) {
        return res.status(doctorProfile.statusCode).send(doctorProfile.error);
      }

      res
        .status(doctorProfile.statusCode)
        .json({ doctorProfile: doctorProfile.doctorProfile });
    });
  } catch (error) {
    console.log("Error while creating doctor profile : ", error);
    res.status(500).send(`Error: ${error}`);
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctorProfile = await doctorProfileService.getDoctorProfile(doctorId);
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

    const doctorProfile = await doctorProfileService.getAppointmentDetails(
      doctorId
    );
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

const getPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const patientData = await doctorProfileService.getPatients(doctorId);

    if (patientData?.error) {
      return res.status(patientData.statusCode).send(patientData.error);
    }

    res
      .status(patientData.statusCode)
      .json({ patientData: patientData.patientData });
  } catch (error) {
    console.log("Error while fetching patient data from the db :: ", error);
    res.status(500).send(`Error: ${error}`);
  }
};

const delelteDoctorImage = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const image = req.body;
    const deleteResponse = await doctorProfileService.deleteDoctorImage(
      doctorId,
      image
    );
    if (deleteResponse?.error) {
      return res
        .status(deleteResponse.statusCode)
        .json({ error: deleteResponse.images });
    }
    console.log("WOrking til heree fmoasiejalsij");
    return res.status(200).json({
      images: deleteResponse.images,
    });
  } catch (error) {
    console.log("Error while deleting image:: ", error);
    res.status(500).send(`Error: ${error}`);
  }
};

const submitDoctorReviewController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const ratingValidation = validateRating(req.body);

    if (!ratingValidation.success) {
      return res.status(400).json({ errors: ratingValidation.errors });
    }

    const { rating } = ratingValidation.data;

    const result = await doctorProfileService.updateDoctorRating(doctorId, rating);

    if (result.error) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    return res.status(result.statusCode).json({
      message: "Rating updated successfully",
      doctorProfile: result.doctorProfile,
    });
  } catch (error) {
    console.error("Error in submitDoctorReviewController:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createDoctorProfile,
  getDoctorProfile,
  getAppointmentDetails,
  getPatients,
  delelteDoctorImage,
  submitDoctorReviewController,
};
