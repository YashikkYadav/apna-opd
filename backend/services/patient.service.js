const Patient = require("../models/patient");
const DoctorPatient = require("../models/doctorPatient");
const { generatePatientUid, getAccessToken } = require("../utils/helpers");
const { validatePatient } = require("../validations/patient.validation");
const { sendTemplateMessage } = require("../utils/whatsapp");
const FileUploader = require("../models/fileUploader");
const Appointment = require("../models/appointment");

const registerPatient = async (patientData, doctorId) => {
  try {
    const {
      fullName,
      phoneNumber,
      alternatePhoneNumber,
      dateOfBirth,
      age,
      gender,
      email,
      address,
      bloodGroup,
      allergies,
      tags,
      referredBy,
    } = patientData;
    const otp = 1234;

    const patientValidation = validatePatient(patientData);
    if (!patientValidation.success) {
      return {
        statusCode: 400,
        error: patientValidation.errors,
      };
    }

    const patient = await Patient.findOne({ phoneNumber });
    if (patient) {
      const doctorPatient = await DoctorPatient.findOne({ patientId: patient._id, doctorId });

      if (!doctorPatient) {
        const doctorPatient = new DoctorPatient({
          doctorId,
          patientId: patient._id,
        });
        await doctorPatient.save();
        return {
          statusCode: 201,
          patient: patient,
        };
      }

      return {
        statusCode: 409,
        error: `Patient with ${phoneNumber} already exist`,
      };
    }

    const uid = await generatePatientUid();
    const newPatient = new Patient({
      uid,
      fullName,
      phoneNumber,
      alternatePhoneNumber,
      dateOfBirth,
      age,
      gender,
      email,
      address,
      bloodGroup,
      allergies,
      tags,
      referredBy,
      otp,
    });
    await newPatient.save();

    if (doctorId !== "register") {
      const doctorPatient = new DoctorPatient({
        doctorId,
        patientId: newPatient._id,
      });
      await doctorPatient.save();
    }

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
};

const generateOTP = async (phoneNumber) => {
  try {
    const patient = await Patient.findOne({ phoneNumber });

    if (!patient) {
      return {
        statusCode: 404,
        error: "Patient not found",
      };
    }

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // await sendTemplateMessage(
    //   `+91${phoneNumber}`,
    //   'otp_validation',
    //   'en_US',
    //   [randomNumber.toString()],
    // );

    await Patient.findOneAndUpdate(
      { phoneNumber },
      { otp: 1234 },
      { new: true }
    );

    return {
      statusCode: 200,
      patient,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const validateOTP = async (phoneNumber, otp) => {
  try {
    if (!otp || otp === null || otp === undefined) {
      return {
        statusCode: 422,
        error: "Missing field: OTP",
      };
    }
    const patient = await Patient.findOne({ phoneNumber });

    if (!patient) {
      return {
        statusCode: 404,
        error: "Patient not found",
      };
    }

    if (patient.otp !== otp) {
      return {
        statusCode: 401,
        error: "Wrong OTP",
      };
    }

    const accessToken = getAccessToken(patient.phoneNumber, patient.fullName);

    return {
      statusCode: 200,
      patient: {
        accessToken,
        phoneNumber,
        id: patient._id,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getPatientById = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return {
        statusCode: 404,
        error: "Patient not found",
      };
    }

    return {
      statusCode: 200,
      patient,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getAllPatients = async (
  doctorId,
  page = 1,
  limit = 25,
  searchQuery = ""
) => {
  try {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 25;
    const skip = (pageNumber - 1) * limitNumber;

    let searchFilter = {};
    if (searchQuery) {
      const numericSearch = !isNaN(searchQuery) ? Number(searchQuery) : null;

      searchFilter = {
        $or: [
          { fullName: { $regex: searchQuery, $options: "i" } },
          { uid: { $regex: searchQuery, $options: "i" } },
          ...(numericSearch !== null ? [{ phoneNumber: numericSearch }] : []),
        ],
      };
    }

    const matchingPatients = await Patient.find(searchFilter).select("_id");
    const matchingPatientIds = matchingPatients.map((patient) => patient._id);

    const totalPatients = await DoctorPatient.countDocuments({
      doctorId,
      patientId: { $in: matchingPatientIds },
    });

    const patients = await DoctorPatient.find({
      doctorId,
      patientId: { $in: matchingPatientIds },
    })
      .populate("patientId")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    return {
      statusCode: 200,
      patients,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPatients / limitNumber),
        totalPatients,
        pageSize: limitNumber,
        hasNextPage: pageNumber * limitNumber < totalPatients,
        hasPrevPage: pageNumber > 1,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const updatePatient = async (patientId, patientData) => {
  try {
    const {
      fullName,
      phoneNumber,
      alternatePhoneNumber,
      dateOfBirth,
      age,
      gender,
      email,
      address,
      bloodGroup,
      allergies,
      tags,
      referredBy,
    } = patientData;

    const patientValidation = validatePatient(patientData);
    if (!patientValidation.success) {
      return {
        statusCode: 400,
        error: patientValidation.errors,
      };
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return {
        statusCode: 404,
        error: "Patient not found",
      };
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      {
        fullName,
        phoneNumber,
        alternatePhoneNumber,
        dateOfBirth,
        age,
        gender,
        email,
        address,
        bloodGroup,
        allergies,
        tags,
        referredBy,
      },
      { new: true }
    );

    return {
      statusCode: 200,
      patient: updatedPatient,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const deletePatient = async (doctorId, patientId) => {
  try {
    if (!doctorId || !patientId) {
      return {
        statusCode: 403,
        error: "DoctorId & PatientId is required",
      };
    }

    const patient = await DoctorPatient.findOneAndDelete({
      doctorId,
      patientId,
    });

    if (!patient) {
      return {
        statusCode: 404,
        error: "Patient not found",
      };
    }

    return {};
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getDoctors = async (patientId) => {
  try {
    const doctors = await DoctorPatient.find({ patientId }).populate(
      "doctorId"
    );

    return { statusCode: 200, doctorData: doctors };
  } catch (error) {
    console.log("Error while fetching doctors from the DB : ", error);
    return { statusCode: 500, error: error };
  }
};

const deletePresciption = async (patientId, record) => {
  try {
    const url = record.fileUrl;
    const response = await FileUploader.deleteOne({
      patientId,
      fileUrl: url,
    });
    return {
      statusCode: 200,
      data: response.deletedCount,
    };
  } catch (error) {
    console.log("Error while deleting the prescription form DB : ", error);
    return { statusCode: 500, error: error };
  }
};

const getAppointments = async (patientId) => {
  try {
    const appointments = await Appointment.find({ patientId }).populate(
      "doctorId"
    );

    if (!appointments) {
      return { statusCode: 203, error: "No appointments available" };
    }

    return { statusCode: 200, appointments: appointments };
  } catch (error) {
    console.log(`Error in doctor appointment service ${error}`);
    return { statusCode: 500, error: `Internal server error : ${error}` };
  }
};

const deleteAppointment = async (appointmentId) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      return { statusCode: 404, error: "Appointment not found" };
    }
    return { statusCode: 200, message: "Appointment deleted successfully" };
  } catch (error) {
    console.log(`Error in deleting appointment service ${error}`);
    return { statusCode: 500, error: `Internal server error : ${error}` };
  }
};

module.exports = {
  deleteAppointment,
  getAppointments,
  deletePresciption,
  getDoctors,
  registerPatient,
  generateOTP,
  validateOTP,
  getPatientById,
  getAllPatients,
  updatePatient,
  deletePatient,
};
