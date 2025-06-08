const careerLeadService = require('../services/careerLead.service');

const createCareerLead = async (req, res) => {
  try {
    const careerLeadData = req.body;

    const careerLead = await careerLeadService.createCareerLead(careerLeadData);
    if (careerLead?.error) {
      return res
        .status(careerLead.statusCode)
        .send(careerLead.error);
    }

    res
      .status(careerLead.statusCode)
      .json({
        careerLead: careerLead.careerLead,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  createCareerLead,
};
