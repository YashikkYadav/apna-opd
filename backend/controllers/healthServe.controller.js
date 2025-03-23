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

const getHealthServeById = async (req, res) => {
  try {
    const { healthServeId } = req.params;

    const healthServe = await healthServeService.getHealthServeById(healthServeId);
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

const getAllHealthServes = async (req, res) => {
  try {
    const { type, page, limit, location } = req.query;

    const healthServes = await healthServeService.getAllHealthServes(type, page, limit, location);
    res
      .status(healthServes.statusCode)
      .json({
        healthServes: healthServes.healthServes,
        pagination: healthServes.pagination,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const updateHealthServe = async (req, res) => {
  try {
    const { healthServeId } = req.params;
    const data = req.body;

    const healthServe = await healthServeService.updateHealthServe(healthServeId, data);
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

const deleteHealthServe = async (req, res) => {
  try {
    const { healthServeId } = req.params;

    const healthServe = await healthServeService.deleteHealthServe(healthServeId);
    if (healthServe?.error) {
      return res
        .status(healthServe.statusCode)
        .send(healthServe.error);
    }

    res.status(204).json({
      message: `Health Serve deleted successfully`,
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
  getHealthServeById,
  getAllHealthServes,
  updateHealthServe,
  deleteHealthServe,
};
