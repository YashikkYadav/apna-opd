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

const registerDoctor = async (req, res) => {
  try {
    const doctorData = req.body;
    const hospitalId = req.params;

    const result = await hospitalService.registerDoctor(doctorData, hospitalId);

    if (result.error) {
      return res.status(result.statusCode).json(result);
    }

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log("error in doctor register request : ", error);
    return res
      .status(500)
      .json({ statusCode: 500, success: false, message: error.message });
  }
};

module.exports = {
  getDoctors,
  registerDoctor,
};
