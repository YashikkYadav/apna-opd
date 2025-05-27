const Doctor = require("../models/doctor.js");
const HealthServe = require("../models/healthServe.js");
const HospitalDoctor = require("../models/hospitalDoctor.js");
const doctorService = require("../services/doctor.service.js");
const { z } = require("zod");

const createHospital = async (healthServeData) => {
  try {
    healthServeSchema.parse(healthServeData);

    const existing = await Admin.findOne();
    if (existing) {
      return res.status(400).json({ message: "Admin account already exists." });
    }

    const hashedPassword = await bcrypt.hash(healthServeData.password, 10);
    const healthServe = new Admin({
      username: healthServeData.username,
      password: hashedPassword,
    });

    await healthServe.save();

    return { statusCode: 200, healthServe: healthServe };
  } catch (error) {
    console.log(`Error occurred while creating healthServe ::: ${error}`);
    if (error.name === "ZodError") {
      return { statusCode: 400, error: error.errors[0].message };
    }
    return { statusCode: 500, error: "Internal server error." };
  }
};

const registerDoctor = async (doctorData, hospitalId) => {
  try {
    console.log(doctorData);

    let doctor = await Doctor.findOne({ phoneNumber: doctorData.phoneNumber });

    try {
      if (!doctor) {
        doctor = await doctorService.registerDoctor({
          ...doctorData,
          password: "12345678",
        });
      }
      if (doctor.error) {
        console.log(doctor.error);
      }
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        message: "Error creating the doctor",
      };
    }
    console.log("Doctor Id : ", doctor);

    const hospitalDoctor = await HospitalDoctor.create({
      healthServeId: hospitalId,
      doctorId: doctor._id,
    });

    if (!createdDoctor || !hospitalDoctor) {
      return {
        statusCode: 404,
        success: false,
        message: "Doctor not registered",
      };
    }

    return { statusCode: 200, success: true };
  } catch (error) {
    console.log("error in doctor register db: ", error);
    return { statusCode: 500, success: false, message: error.message };
  }
};

module.exports = {
  createHospital,
  registerDoctor,
};
