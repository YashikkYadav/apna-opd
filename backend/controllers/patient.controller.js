const patientService = require("../services/patient.service");

const registerPatient = async (req, res) => {
  try {
    const patientData = req.body;
    const { doctorId } = req.params;

    const patient = await patientService.registerPatient(patientData, doctorId);
    if (patient?.error) {
      return res.status(patient.statusCode).send(patient.error);
    }

    res.status(patient.statusCode).json({
      patient: patient.patient,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const generateOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const patient = await patientService.generateOTP(phoneNumber);
    if (patient?.error) {
      return res.status(patient.statusCode).send(patient.error);
    }

    res.status(patient.statusCode).json({
      patient: patient.patient,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const validateOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const patient = await patientService.validateOTP(phoneNumber, otp);
    if (patient?.error) {
      return res.status(patient.statusCode).send(patient.error);
    }

    res.status(patient.statusCode).json({
      patient: patient.patient,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const getPatientById = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await patientService.getPatientById(patientId);
    if (patient?.error) {
      return res.status(patient.statusCode).send(patient.error);
    }

    res.status(patient.statusCode).json({
      patient: patient.patient,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const getAllPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page, limit, searchQuery } = req.query;

    const patients = await patientService.getAllPatients(
      doctorId,
      page,
      limit,
      searchQuery
    );

    res.status(patients.statusCode).json({
      patient: patients.patients,
      pagination: patients.pagination,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patientData = req.body;

    const patient = await patientService.updatePatient(patientId, patientData);
    if (patient?.error) {
      return res.status(patient.statusCode).send(patient.error);
    }

    res.status(patient.statusCode).json({
      patient: patient.patient,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const deletePatient = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const patient = await patientService.deletePatient(doctorId, patientId);
    if (patient?.error) {
      return res.status(patient.statusCode).send(patient.error);
    }

    res.status(204).json({
      message: `Patient deleted successfully`,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const getDoctors = async (req, res) => {
  try {
    const { patientId } = req.params;

    const doctors = await patientService.getDoctors(patientId);
    if (doctors?.error) {
      return res.status(doctors.statusCode).send(doctors.error);
    }

    res.status(doctors.statusCode).send({ doctorData: doctors.doctorData });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const deletePresciption = async (req, res) => {
  try {
    const { patientId, doctorId } = req.params;
    const record = req.body;

    const response = await patientService.deletePresciption(patientId, record);
    if (response?.error) {
      return res.status(response.statusCode).send(response.error);
    }
    res.status(response.statusCode).send({ data: response.data });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

module.exports = {
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
