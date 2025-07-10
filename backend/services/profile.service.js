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
const physiotherapistsProfile = require("../models/physiotherapistsProfile");
const healthlabProfile = require("../models/healthlabProfile");
const pharmacyProfile = require("../models/pharmacyProfile");

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
  try {
    deleteImageFile(image.filename);
    const imageUrl = image.url;
    const updatedProfile = await HealthServeProfile.findOneAndUpdate(
      { healthServeId },
      { $pull: { images: { url: imageUrl } } },
      { new: true }
    );
    return {
      statusCode: 200,
      images: updatedProfile.images,
    };
  } catch (error) {
    console.log("Error while deleting image from Db : ", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

function deleteImageFile(filename) {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "health-serve-profile",
    filename
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err.message);
    } else {
      console.log("File deleted successfully:", filename);
    }
  });
}

const addHealthServeProfileData = async (data) => {
  try {

    let healthServeProfile = await HealthServe.findById(data.healthServeId);

    let Model;

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
      default:
        throw new Error(`Unsupported healthServeProfile type: ${healthServeProfile.type}`);
    }

    const filter = { healthServeId: data.healthServeId };
    const update = { $set: data };
    const options = { new: true, upsert: true };

    const doc = await Model.findOneAndUpdate(filter, update, options);
    return {
      statusCode: 201,
      ok:true,
      healthServeProfile: doc, // return saved document
    };

  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
      ok:false
    };
  }
}

const getHealthServeProfileData = async (healthServeId) => {
  try {


 let healthServeProfile = await HealthServe.findById(healthServeId);

    let Model;

    console.log('healthServeProfile.type',healthServeProfile.type)
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
      default:
        throw new Error(`Unsupported healthServeProfile type: ${healthServeProfile.type}`);
    }

    const doc = await Model.findOne({ healthServeId });
    
    return {
      statusCode: 201,
      healthServeProfile: doc, // return saved document,
      healthServeUser:healthServeProfile,
      ok:true
    };

  } catch (error) {
    return {
      statusCode: 500,
      ok:true,
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
