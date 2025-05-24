const moment = require("moment");
const DoctorProfile = require("../models/doctorProfile");
const validateDoctorProfile = require("../validations/doctorProfile.validation");
const { validateLocationSchedule } = require("../utils/doctorTiming");
const path = require("path");
const fs = require("fs");
const config = require("../config/config");
const DoctorPatient = require("../models/doctorPatient");

const createDoctorProfile = async (doctorId, profileData) => {
  try {
    let {
      introduction,
      happyClients,
      experience,
      appointmentFee,
      about,
      locations,
      unavailabilityDate,
      availabilityAfter,
    } = profileData;

    locations = JSON.parse(locations);
    unavailabilityDate = JSON.parse(unavailabilityDate);

    const doctorProfileImages = await getImagesById(doctorId);

    const profileDataValidation = validateDoctorProfile(profileData);
    if (!profileDataValidation.success) {
      return {
        statusCode: 400,
        error: profileDataValidation.errors,
      };
    }

    if (locations) {
      const validationOfLocation = validateLocationSchedule(locations);
      if (!validationOfLocation.success) {
        return {
          statusCode: 400,
          error: validationOfLocation.message,
        };
      }
    }

    const doctorProfile = await DoctorProfile.findOne({ doctorId });
    if (doctorProfile) {
      const updatedDoctorProfile = await DoctorProfile.findOneAndUpdate(
        { doctorId },
        {
          introduction,
          happyClients,
          experience,
          appointmentFee,
          about,
          locations,
          unavailabilityDate,
          availabilityAfter,
          images: doctorProfileImages,
        }
      );

      return {
        statusCode: 200,
        doctorProfile: updatedDoctorProfile,
      };
    }

    const newDoctorProfile = new DoctorProfile({
      doctorId,
      introduction,
      happyClients,
      experience,
      appointmentFee,
      about,
      locations,
      unavailabilityDate,
      availabilityAfter,
      images: doctorProfileImages,
    });
    await newDoctorProfile.save();

    return {
      statusCode: 201,
      doctorProfile: newDoctorProfile,
    };
  } catch (error) {
    console.log("Error while inserting in databaes", error);
    return {
      statusCode: 500,
      error: error,
    };
  }
};

async function getImagesById(targetId) {
  const IMAGE_DIR = path.join(__dirname, "../public/doctor-profile");
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
          url: `${baseUrl}/public/doctor-profile/${file}`,
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

const getDoctorProfile = async (doctorId) => {
  try {
    const doctorProfile = await DoctorProfile.findOne({ doctorId }).populate(
      "doctorId"
    );

    return {
      statusCode: 200,
      doctorProfile,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getAppointmentDetails = async (doctorId) => {
  try {
    const doctorProfile = await DoctorProfile.findOne({ doctorId }).populate(
      "doctorId"
    );

    if (!doctorProfile) {
      return {
        statusCode: 404,
        message: "Doctor profile not found",
      };
    }

    const now = moment();
    const appointmentStartTime = now.add(
      doctorProfile.delayTimeInHours || 0,
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

    const appointmentDetails = doctorProfile.locations.map((location) => {
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
      doctorProfile: {
        ...doctorProfile.toObject(),
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

const getPatients = async (doctorId) => {
  try {
    const patients = await DoctorPatient.find({ doctorId }).populate(
      "patientId"
    );
    return {
      statusCode: 200,
      patientData: patients,
    };
  } catch (error) {
    console.log("Error while fetching patients from the Db : ", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const deleteDoctorImage = async (doctorId, image) => {
  try {
    deleteImageFile(image.filename);
    const imageUrl = image.url;
    const updatedProfile = await DoctorProfile.findOneAndUpdate(
      { doctorId },
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
    "doctor-profile",
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
  deleteDoctorImage,
  createDoctorProfile,
  getDoctorProfile,
  getAppointmentDetails,
  getPatients,
};
