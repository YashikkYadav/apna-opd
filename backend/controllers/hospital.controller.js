const hospitalService = require("../services/hospital.service.js");
const healthServeService = require("../services/healthServe.service");

const getDoctors = async (req, res) => {
  try {
    const hospitalId = req.params;

    const doctors = await healthServeService.getDoctors();

    if (doctors?.error) {
      return res.status(doctors.statusCode).send(doctors.error);
    }

  res.status(doctors.statusCode).json({ doctors: doctors.doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error}`);
  }
};

module.exports = {
  getDoctors,
};
