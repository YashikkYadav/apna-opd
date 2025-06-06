const doctorService = require("../services/doctor.service");

const registerDoctor = async (req, res) => {
  try {
    const doctorData = req.body;

    const doctor = await doctorService.registerDoctor(doctorData);
    if (doctor?.error) {
      return res.status(doctor.statusCode).send(doctor.error);
    }

    res.status(doctor.statusCode).json({
      doctor: doctor.doctor,
      paymentUrl: doctor.paymentLink,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const loginDoctor = async (req, res) => {
  try {
    const doctorData = req.body;

    const doctor = await doctorService.loginDoctor(doctorData);
    if (doctor?.error) {
      return res.status(doctor.statusCode).send(doctor.error);
    }

    res.status(doctor.statusCode).json({ doctor: doctor.doctor });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const getDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorService.getDoctor(doctorId);
    if (doctor?.error) {
      return res.status(doctor.statusCode).send(doctor.error);
    }

    res.status(doctor.statusCode).json({ doctor: doctor.doctor });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorService.deleteDoctor(doctorId);
    if (doctor?.error) {
      return res.status(doctor.statusCode).send(doctor.error);
    }

    res
      .status(doctor.statusCode)
      .json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const getDoctorList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const location = req.query.location || null;
    const speciality = req.query.speciality || null;

    const doctorList = await doctorService.getDoctorList(
      page,
      location,
      speciality
    );

    if (doctorList?.error) {
      return res.status(doctorList.statusCode).send(doctorList.error);
    }

    res.status(doctorList.statusCode).json({ list: doctorList });
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

const ratingDoctor = async (req, res) => {
  try {
    const { doctorId, rating } = req.body;

    const doctor = await doctorService.ratingDoctor(doctorId, rating);
    if (doctor?.error) {
      return res.status(doctor.statusCode).send(doctor.error);
    }

    res
      .status(doctor.statusCode)
      .json({ message: "Rating submitted successfully" });
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
};

const getAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await doctorService.getAppointments(doctorId);

    if (appointments.error) {
      res.status(appointments.statusCode).json({ error: appointments.error });
    }

    res
      .status(appointments.statusCode)
      .json({ appointments: appointments.appointments });
  } catch (error) {
    console.log(`Error in doctor appointment Controller ${error}`);
    return res.status(500).json({ error });
  }
};

module.exports = {
  registerDoctor,
  getAppointments,
  loginDoctor,
  getDoctor,
  deleteDoctor,
  getDoctorList,
  ratingDoctor,
};
