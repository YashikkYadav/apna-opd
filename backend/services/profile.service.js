const moment = require("moment");
const healthServeProfile = require("../models/healthServeProfile");
const HealthServeProfile = require("../models/healthServeProfile");
const { default: mongoose } = require("mongoose");
const fs = require("fs");
const path = require("path");
const config = require("../config/config");

const createProfile = async (healthServeId, profileData) => {
  try {
    const healthServeProfileImages = await getImagesById(healthServeId);

    const updateData = {
      about: profileData.about,
      experience: profileData.experience,
      introduction: profileData.introduction,
      images: healthServeProfileImages,
    };

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
      error: error,
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
    const healthServeProfile = await HealthServeProfile.findOne({
      healthServeId,
    }).populate("healthServeId");

    return {
      statusCode: 200,
      healthServeProfile,
    };
  } catch (error) {
    console.log("Error occured in fetching health serve profile :: ", error);
    return {
      statusCode: 500,
      error: error,
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

module.exports = {
  deleteImage,
  createProfile,
  getHealthServeProfile,
  getAppointmentDetails,
};
