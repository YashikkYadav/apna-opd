const Prescription = require('../models/prescription');
const Patient = require('../models/patient');
const DoctorPatient = require('../models/doctorPatient');
const { generatePrescriptionPDF } = require('../utils/pdfGenerator');

const createPrescription = async ( doctorId, patientId, prescriptionData ) => {
  try {
    const prescriptionExist = await Prescription.findOne({
      doctorId,
      patientId,
      status: 'draft',
    });

    await Patient.findByIdAndUpdate(patientId, {
      updatedAt: new Date(),
    }, { new: true});

    const doc = await DoctorPatient.findOne({ doctorId, patientId });
    if (doc) {
      doc.updatedAt = new Date();
      await doc.save();
    }

    let prescription;
    if (prescriptionExist) {
      prescription = await Prescription.findOneAndUpdate(
        prescriptionExist._id,
        { ...prescriptionData },
        { new: true },
      );
    } else {
      prescription = new Prescription({
        doctorId,
        patientId,
        status: 'draft',
        ...prescriptionData,
      });
      await prescription.save();
    }

    return {
      statusCode: 201,
      prescription: prescription,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const endConsultationOfPrescription = async (doctorId, patientId, prescriptionData) => {
  try {
    let prescription = await Prescription.findOneAndUpdate({
      doctorId,
      patientId,
      status: 'draft',
    }, {
      ...prescriptionData,
    }, {
      new: true,
    });

    if (!prescription) {
      prescription = new Prescription({
        doctorId,
        patientId,
        ...prescriptionData,
      });
      prescription.save();
    }

    const patient = await Patient.findByIdAndUpdate(patientId, {
      updatedAt: new Date(),
    }, { new: true });

    const doc = await DoctorPatient.findOne({ doctorId, patientId });
    if (doc) {
      doc.updatedAt = new Date();
      await doc.save();
    }
    await generatePrescriptionPDF(prescription, patient);

    return {
      statusCode: 201,
      prescription,
      pdfPath: `${process.env.SERVER_URL}/public/prescriptions/prescription_${prescription._id}.pdf`,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const getPrescriptionsByPatientId = async ( doctorId, patientId ) => {
  try {
    const prescriptions = await Prescription.find({
      doctorId,
      patientId,
      status: 'complete'
    }).sort({ updatedAt: -1 });

    return {
      statusCode: 200,
      prescriptions: prescriptions,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const getDraftPrescriptionOfPatient = async ( doctorId, patientId ) => {
  try {
    const prescription = await Prescription.findOne({
      doctorId,
      patientId,
      status: 'draft',
    });

    if (!prescription) {
      return {
        statusCode: 404,
        prescription: 'Prescription is not drafted yet.',
      };
    }

    return {
      statusCode: 200,
      prescription: prescription,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

module.exports = {
  createPrescription,
  endConsultationOfPrescription,
  getPrescriptionsByPatientId,
  getDraftPrescriptionOfPatient,
};
