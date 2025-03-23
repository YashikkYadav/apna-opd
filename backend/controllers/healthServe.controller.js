const healthServeService = require('../services/healthServe.service');

const registerHealthServe = async (req, res) => {
  try {
    const data = req.body;

    const healthServe = await healthServeService.register(data);
    if (healthServe?.error) {
      return res
        .status(healthServe.statusCode)
        .send(healthServe.error);
    }

    res
      .status(healthServe.statusCode)
      .json({
        healthServe: healthServe.healthServe,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const loginHealthServe = async (req, res) => {
  try {
    const data = req.body;

    const healthServe = await healthServeService.login(data);
    if (healthServe?.error) {
      return res
        .status(healthServe.statusCode)
        .send(healthServe.error);
    }

    res
      .status(healthServe.statusCode)
      .json({
        healthServe: healthServe.healthServe,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getPatientById = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await patientService.getPatientById(patientId);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({
        patient: patient.patient,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getAllPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page, limit, searchQuery } = req.query;

    const patients = await patientService.getAllPatients(doctorId, page, limit, searchQuery);

    res
      .status(patients.statusCode)
      .json({
        patient: patients.patients,
        pagination: patients.pagination,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patientData = req.body;

    const patient = await patientService.updatePatient(patientId, patientData);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({
        patient: patient.patient,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const deletePatient = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const patient = await patientService.deletePatient(doctorId, patientId);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res.status(204).json({
      message: `Patient deleted successfully`,
    });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  registerHealthServe,
  loginHealthServe,
  getPatientById,
  getAllPatients,
  updatePatient,
  deletePatient,
};
