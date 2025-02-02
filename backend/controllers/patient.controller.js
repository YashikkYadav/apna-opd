const patientService = require('../services/patient.service');

const createPatient = async (req, res) => {
  try {
    const patientData = req.body;

    const patient = await patientService.createPatient(patientData);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({ patient: patient.patient });
  } catch(error) {
    res
      .status(500)
      .json({ error: error });
  }
}

const generateOTP = async (req, res) => {
  try {
    const patientData = req.body;
    const patient = await patientService.generateOTP(patientData);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({ patient: patient.patient });
  } catch(error) {
    res
      .status(500)
      .json({ error: error });
  }
}

const loginPatient = async (req, res) => {
  try {
    const patientData = req.body;
    const patient = await patientService.loginPatient(patientData);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({ patient: patient.patient });
  } catch(error) {
    res
      .status(500)
      .json({ error: error });
  }
}

const getPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await patientService.getPatient(patientId);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({ patient: patient.patient });
  } catch(error) {
    res
      .status(500)
      .json({ error: error });
  }
}

const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await patientService.deletePatient(patientId);
    if (patient?.error) {
      return res
        .status(patient.statusCode)
        .send(patient.error);
    }

    res
      .status(patient.statusCode)
      .json({ patient: patient.patient });
  } catch(error) {
    res
      .status(500)
      .json({ error: error });
  }
}

module.exports = {
  createPatient,
  generateOTP,
  loginPatient,
  getPatient,
  deletePatient,
};
