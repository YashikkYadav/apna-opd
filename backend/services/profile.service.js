const moment = require("moment");
const HealthServe = require("../models/healthServe");
const HealthServeProfile = require("../models/healthServeProfile");
const { default: mongoose } = require("mongoose");
const fs = require("fs");
const path = require("path");
const config = require("../config/config");
const HospitalDoctor = require("../models/hospitalDoctor");
const DoctorProfile = require("../models/doctorProfile");
const Doctor = require("../models/doctor");
const Veterinary = require('../models/veterinary')
const physiotherapistsProfile = require("../models/physiotherapistsProfile");
const healthlabProfile = require("../models/healthlabProfile");
const pharmacyProfile = require("../models/pharmacyProfile");
const { handleBloodBank, gethandleBloodBank, handleIvf, gethandleMedicalStore, handleMedicalStore, handleLaboratory, gethandleLaboratory, handleIvfClinic, gethandleIvf } = require("../utils/profileStoreData/handleBloodBank");
const { handlePhysiotherapist, gethandlePhysiotherapist } = require('../utils/profileStoreData/handlePhysio')
const { handleHospital, gethandleHospital } = require('../utils/profileStoreData/handleHospital')
const { handleVeterinary, gethandleVeterinary } = require('../utils/profileStoreData/handleVeterinary')
const { handleMedicalCollege, gethandleMedicalCollege } = require('../utils/profileStoreData/handleCollege')
const { handleGym, getHandleGym } = require('../utils/profileStoreData/handleBloodBank')
const { handleNursingStaff, getNursingStaff } = require('../utils/profileStoreData/handleNursingstaff')
const {handleYoga, gethandleYoga} = require('../utils/profileStoreData/handleYoga')


const createProfile = async (healthServeId, profileData) => {
  try {
    const healthServeProfileImages = await getImagesById(healthServeId);

    const parseIfString = (field) => {
      try {
        return typeof field === "string" ? JSON.parse(field) : field;
      } catch {
        return [];
      }
    };

    const updateData = {
      about: profileData.about,
      experience: profileData.experience,
      introduction: profileData.introduction,
      images: healthServeProfileImages,
      keyStats: parseIfString(profileData.keyStats),
      accreditations: parseIfString(profileData.accreditations),
      awards: parseIfString(profileData.awards),
      departments: parseIfString(profileData.departments),
      facilities: parseIfString(profileData.facilities),
      insurance: parseIfString(profileData.insurance),
      payments: parseIfString(profileData.payments),
      healthPackages: parseIfString(profileData.healthPackages),
      specialServices: parseIfString(profileData.specialServices),
      testimonials: parseIfString(profileData.testimonials),
    };

    const updatedHealthServe = await HealthServe.findOneAndUpdate(
      { _id: healthServeId },
      {
        $set: {
          address: profileData.address,
          pincode: profileData.pincode,
          city: profileData.city,
          locality: profileData.locality,
          state: profileData.state,
        },
      },
      { new: true }
    );

    const healthServeProfile = await HealthServeProfile.findOneAndUpdate(
      { healthServeId },
      updateData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return {
      statusCode: 200,
      healthServeProfile,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      error,
    };
  }
};

async function getImagesById(targetId) {
  const IMAGE_DIR = path.join(__dirname, "../public/health-serve-profile");
  const baseUrl = config.BASE_URL;
  try {
    const files = await fs.promises.readdir(IMAGE_DIR);

    const imageData = files
      .filter((file) => {
        const pattern = new RegExp(`^${targetId}_`);
        return pattern.test(file);
      })
      .map((file) => {
        const [id, timestamp, type] = file.split("_");
        const extension = path.extname(file);

        return {
          url: `${baseUrl}/public/health-serve-profile/${file}`,
          type: type.replace(extension, ""),
          timestamp: parseInt(timestamp),
          filename: file,
        };
      });

    return imageData;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

const getHealthServeProfile = async (healthServeId) => {
  try {
    if (
      !healthServeId ||
      healthServeId === "null" ||
      healthServeId === "undefined"
    ) {
      return {
        statusCode: 400,
        error: {
          message: "Health serve ID is required",
        },
      };
    }

    let healthServeProfile = await HealthServeProfile.findOne({
      healthServeId: healthServeId,
    }).populate("healthServeId");

    if (!healthServeProfile) {
      return {
        statusCode: 404,
        error: {
          message: "Health serve profile not found",
        },
      };
    }

    if (healthServeProfile.healthServeId.type === "hospital") {
      const hospitalDoctors = await HospitalDoctor.find({
        healthServeId,
      }).select("doctorId");

      const doctorIds = hospitalDoctors.map((doc) => doc.doctorId);

      const doctors = await Doctor.find({ _id: { $in: doctorIds } });

      const doctorProfiles = await DoctorProfile.find({
        doctorId: { $in: doctorIds },
      });

      const doctorsWithProfiles = doctors.map((doctor) => {
        const profile = doctorProfiles.find(
          (p) => p.doctorId.toString() === doctor._id.toString()
        );
        return {
          ...doctor.toObject(),
          doctorProfile: profile || null,
        };
      });
      healthServeProfile._doc.doctors = doctorsWithProfiles;
    }

    return {
      statusCode: 200,
      healthServeProfile,
    };
  } catch (error) {
    console.log("Error occurred in fetching health serve profile :: ", error);
    return {
      statusCode: 500,
      error: {
        message: "Internal server error",
        details: error.message,
      },
    };
  }
};

const getAppointmentDetails = async (healthServeId) => {
  try {
    const healthServeProfile = await healthServeProfile
      .find({
        healthServeId,
      })
      .populate("healthServeId");

    if (!healthServeProfile) {
      return {
        statusCode: 404,
        message: "Doctor profile not found",
      };
    }

    const now = moment();
    const appointmentStartTime = now.add(
      healthServeProfile.delayTimeInHours || 0,
      "hours"
    );

    const getNextWeekday = (targetDay, startDate) => {
      let daysToAdd = (targetDay - startDate.day() + 7) % 7;
      if (daysToAdd === 0) daysToAdd = 7;
      return startDate.add(daysToAdd, "days");
    };

    const generateTimeSlots = (from, to, timeslotDuration) => {
      const slots = [];
      const startTime = moment(from, "hh:mm A");
      const endTime = moment(to, "hh:mm A");
      const slotDuration = timeslotDuration;

      while (startTime < endTime) {
        slots.push(startTime.format("h:mm A"));
        startTime.add(slotDuration, "minutes");
      }
      return slots;
    };

    const appointmentDetails = healthServeProfile.locations.map((location) => {
      const availableDays = location.days;
      const slotsPerLocation = [];

      let nextAppointmentDate = appointmentStartTime.clone();
      let appointmentsCount = 0;

      while (appointmentsCount < 7) {
        let targetDay = availableDays[appointmentsCount % availableDays.length];
        const targetDayIndex = moment.weekdays().indexOf(targetDay);
        let nextAvailableDate = getNextWeekday(
          targetDayIndex,
          nextAppointmentDate.clone()
        );
        const timeSlots = generateTimeSlots(
          location.from,
          location.to,
          location.timeslot
        );

        slotsPerLocation.push({
          day: targetDay,
          date: nextAvailableDate.format("YYYY-MM-DD"),
          timeSlots: timeSlots,
        });

        nextAppointmentDate = nextAvailableDate.clone().add(1, "days");
        appointmentsCount++;
      }

      return {
        locationName: location.name,
        appointmentSlots: slotsPerLocation,
      };
    });

    return {
      statusCode: 200,
      healthServeProfile: {
        ...healthServeProfile.toObject(),
        appointmentDetails,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const deleteImage = async (healthServeId, image) => {
  console.log("🔍 Deleting image for:", healthServeId, image);

  try {
    if (!mongoose.Types.ObjectId.isValid(healthServeId)) {
      throw new Error("Invalid healthServeId");
    }
    if (!image) {
      throw new Error("Image URL missing");
    }

    // Resolve healthServeProfile
    const healthServeProfile = await HealthServe.findById(healthServeId);
    if (!healthServeProfile) {
      throw new Error("HealthServe profile not found");
    }

    // Dynamically load model
    let Model;
    switch (healthServeProfile.type) {
      case "vatenary": Model = require("../models/veterinary"); break;
      case "physiotherapist": Model = require("../models/physiotherapistsProfile"); break;
      case "hospital": Model = require("../models/hospital"); break;
      case "nursing_medical_college": Model = require("../models/medicalCollege"); break;
      case "blood_bank": Model = require("../models/bloodBankProfile"); break;
      case "medical_store": Model = require("../models/pharmacyProfile"); break;
      case "laboratory": Model = require("../models/healthlabProfile"); break;
      case "ivf_clinic": Model = require("../models/ivfClinic"); break;
      case "gym": Model = require("../models/gym"); break;
      default: throw new Error("Unsupported healthServeProfile type");
    }

    const filename = path.basename(image.path);
    const imgType = image.type;
    let updatedProfile;

    if (imgType === "profilePhoto_image") {
      updatedProfile = await Model.findOneAndUpdate(
        { healthServeId },
        { $unset: { profilePhoto: "" } },
        { new: true }
      );
    } else {
      updatedProfile = await Model.findOneAndUpdate(
        { healthServeId },
        { $pull: { galleryImages: image.path } },
        { new: true }
      );
    }

    if (!updatedProfile) {
      throw new Error("Profile not found");
    }

    // Delete from disk
    deleteImageFile(filename, imgType);

    // ✅ Return both galleryImages and profilePhoto so frontend stays in sync
    return {
      statusCode: 200,
      galleryImages: updatedProfile.galleryImages || [],
      profilePhoto: updatedProfile.profilePhoto || null
    };
  } catch (error) {
    console.error("🔥 Error deleting image:", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

function deleteImageFile(imagePath, imgType) {
  if (!imagePath) return;

  const filename = path.basename(imagePath);
  console.log("🧭 Deleting file:", filename);
  let filePath;
  if (imgType === "profilePhoto_image") {
    filePath = path.join(__dirname, "..", "public", "profilePhoto", filename);
  }
  else {
    filePath = path.join(__dirname, "..", "public", "galleryImages", filename);
  }


  console.log("🧭 Deleting file:", filePath);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("❌ Failed to delete:", err.message);
    } else {
      console.log("✅ File deleted:", filename);
    }
  });
}
const addHealthServeProfileData = async (req, healthServeId) => {
  try {

    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      console.log("Invalid healthServeId");
    }

    const healthServeProfile = await HealthServe.findById(healthServeId);

    if (!healthServeProfile) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      }
    }
    let result;
    switch (healthServeProfile.type) {
      case "physiotherapist":
        result = await handlePhysiotherapist(req, healthServeId);
        break;
      case "hospital":
        result = await handleHospital(req, healthServeId);
        break;
      case "vatenary":
        console.log("vet");
        result = await handleVeterinary(req, healthServeId);
        break;
      case "nursing_medical_college":
        result = await handleMedicalCollege(req, healthServeId);
        break;
      case "blood_bank":
        result = await handleBloodBank(req, healthServeId);
        break;
      // case 'physiotherapist':
      //   result = await handlePhysiotherapist(req, healthServeId);
      //   break;
      case "medical_store":
        result = await handleMedicalStore(req, healthServeId);
        break;
      case "laboratory":
        result = await handleLaboratory(req, healthServeId);
        break;
      case "ivf_clinic":
        result = await handleIvfClinic(req, healthServeId);
        break;
      case "gym":
        result = await handleGym(req, healthServeId);
        break;
      case "nursing_staff":
        result = await handleNursingStaff(req, healthServeId);
        break;
      case "yoga":
        result = await handleYoga(req, healthServeId);
        break;
    }


    return {
      statusCode: 201,
      ok: true,
      healthServeProfile: result, // return saved document
    };
    // Determine model based on type
    switch (healthServeProfile.type) {
      case 'physiotherapist':
        Model = pharmacyProfile;
        break;
      case 'medical_store':
        Model = pharmacyProfile;
        break;
      case 'laboratory':
        Model = healthlabProfile;
        break;
      case 'vatenary':
        Model = healthlabProfile;
        break
      case 'blood_bank':
        Model = healthlabProfile
        break
      case 'nursing_medical_college':
        Model = healthlabProfile
        break
      case 'gym':
        Model = healthlabProfile
        break
      case 'ivf_clinic':
        Model = healthlabProfile
        break
      default:
        throw new Error(`Unsupported healthServeProfile type: ${healthServeProfile.type}`);
    }

    const filter = { healthServeId: data.healthServeId };
    const update = { $set: data };
    const options = { new: true, upsert: true };

    // const doc = await Model.findOneAndUpdate(filter, update, options);
    return {
      statusCode: 201,
      ok: true,
      healthServeProfile: doc, // return saved document
    };

  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
      ok: false
    };
  }
}

const getHealthServeProfileData = async (healthServeId) => {
  try {


    let healthServeProfile = await HealthServe.findById(healthServeId);


    let result;
    switch (healthServeProfile.type) {
      case "hospital":
        result = await gethandleHospital(healthServeId);
        break;
      case "physiotherapist":
        result = await gethandlePhysiotherapist(healthServeId);
        break;
      case "vatenary":
        result = await gethandleVeterinary(healthServeId);
        break;
      case "nursing_medical_college":
        result = await gethandleMedicalCollege(healthServeId);
        break;
      case "blood_bank":
        result = await gethandleBloodBank(healthServeId);
        break;
      // case 'physiotherapist':
      //   result = await gethandlePhysiotherapist(healthServeId)
      //   break;
      case "medical_store":
        result = await gethandleMedicalStore(healthServeId);
        break;
      case "laboratory":
        result = await gethandleLaboratory(healthServeId);
        break;
      case "ivf_clinic":
        result = await gethandleIvf(healthServeId);
        break;
      case "gym":
        result = await getHandleGym(healthServeId);
        break;
      case "nursing_staff":
        result = await getNursingStaff(healthServeId);
        break;
      case "yoga":
        result = await gethandleYoga(healthServeId);
        break;
    }

    return {
      statusCode: 201,
      healthServeProfile: result, // return saved document,
      healthServeUser: healthServeProfile,
      ok: true
    };
    console.log('healthServeProfile.type', healthServeProfile.type)
    // Determine model based on type
    switch (healthServeProfile.type) {
      case 'physiotherapist':
        Model = pharmacyProfile;
        break;
      case 'medical_store':
        Model = pharmacyProfile;
        break;
      case 'laboratory':
        Model = healthlabProfile;
        break;
      case 'vatenary':
        Model = healthlabProfile;
        break
      case 'blood_bank':
        Model = healthlabProfile
        break
      case 'nursing_medical_college':
        Model = healthlabProfile
        break
      case 'gym':
        Model = healthlabProfile
        break
      case 'ivf_clinic':
        Model = healthlabProfile
        break
      default:
        throw new Error(`Unsupported healthServeProfile type: ${healthServeProfile.type}`);
    }

    // const doc = await Model.findOne({ healthServeId });
    console.log('doc')
    return {
      statusCode: 201,
      healthServeProfile: doc, // return saved document,
      healthServeUser: healthServeProfile,
      ok: true
    };

  } catch (error) {
    return {
      statusCode: 500,
      ok: true,
      error: error.message,
    };
  }
}
module.exports = {
  deleteImage,
  createProfile,
  getHealthServeProfile,
  getAppointmentDetails,
  addHealthServeProfileData,
  getHealthServeProfileData
};
