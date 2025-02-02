const mongoose = require('mongoose');

const Patient = require('../models/patient');
const { getAccessToken } = require('../utils/helpers');
const validatePatient = require('../validations/patient.validation');

const createPatient = async (patientData) => {
  try {
    const {
      name,
      phoneNumber,
      email,
      fatherName,
      address,
      medicalProblem,
    } = patientData;

    const patientValidation = validatePatient(patientData);
    if (!patientValidation.success) {
      return {
        statusCode: 403,
        error: patientValidation.errors,
      };
    }

    const patient = await Patient.findOne({
      $or: [
        { email },
        { phoneNumber },
      ]
    });
    if (patient) {
      return {
        statusCode: 409,
        error: 'Patient already exist, Please try login',
      };
    }

    const newPatient = new Patient({
      name,
      email,
      phoneNumber,
      fatherName,
      address,
      medicalProblem,
    });
    await newPatient.save();

    return {
      statusCode: 201,
      patient: newPatient,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const generateOTP = async (patientData) => {
  try {
    const {
      email,
      phoneNumber,
    } = patientData;

    if (
      !email
      && !phoneNumber
    ) {
      return {
        statusCode: 400,
        error: `Please enter patient's email or phone number`,
      }
    }

    let patient = await Patient.findOne({
      $or: [
        { email },
        { phoneNumber },
      ],
    });
    if (!patient) {
      return {
        statusCode: 404,
        error: 'Patient not found',
      };
    }

    // const otp = Math.floor(Math.random() * 9000 + 1000);
    const otp = 1234;
    patient = await Patient.findByIdAndUpdate(
      patient._id,
      { otp },
      { new: true },
    );

    return {
      statusCode: 200,
      patient: 'OTP sent successfully',
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const loginPatient = async (patientData) => {
  try {
    const {
      email,
      phoneNumber,
      otp,
    } = patientData;

    if (
      (!email
      || !phoneNumber)
      && !otp
    ) {
      return {
        statusCode: 400,
        error: `Please enter patient's email or phone number and OTP`,
      };
    }

    const patient = await Patient.findOne({
      $or: [
        { email },
        { phoneNumber },
      ],
    });

    if (!patient) {
      return {
        statusCode: 404,
        error: 'Patient not found',
      };
    }

    if (otp !== patient.otp) {
      return {
        statusCode: '401',
        error: 'Wrong OTP, Please enter correct OTP',
      };
    }

    const accessToken = getAccessToken(patient);
    return {
      statusCode: 200,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        accessToken: accessToken,
      },
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

const getPatient = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    return {
      statusCode: 200,
      patient: {
        id: patientId,
        name: patient.name,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        fatherName: patient.fatherName,
        address: patient.address,
        medicalProblem: patient.medicalProblem,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const deletePatient = async (patientId) => {
  try {
    const patient = await Patient.findByIdAndDelete(patientId);
    return {
      statusCode: 204,
      patient: patient,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

module.exports = {
  createPatient,
  generateOTP,
  loginPatient,
  getPatient,
  deletePatient,
};
