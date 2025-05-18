const adminService = require("../services/admin.service");

const createAdmin = async (req, res) => {
  try {
    const adminData = req.body;

    const newAdmin = await adminService.createAdmin(adminData);

    if (newAdmin?.error) {
      return res.status(newAdmin.statusCode).json({ error: newAdmin.error });
    }

    res.status(newAdmin.statusCode).json({ admin: newAdmin });
  } catch (error) {
    res.status(500).send(`Error occurred : ${error}`);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const adminData = req.body;

    const admin = await adminService.loginAdmin(adminData);

    if (admin?.error) {
      return res.status(admin.statusCode).send(admin.error);
    }

    res.status(admin.statusCode).json({ admin: admin.admin });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error}`);
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await adminService.getDoctors();

    if (doctors?.error) {
      res.status(doctors.statusCode).json({ error: doctors.error });
    }

    res.status(doctors.statusCode).json({ doctors: doctors.doctors });
  } catch (error) {
    console.log("Error while fetching doctors : ", error);
    res.status(500).send(`An error occurred ${error}`);
  }
};

const getHealthServe = async (req, res) => {
  const { type } = req.params;
  try {
    const healthServe = await adminService.getHealthServe(type);

    if (healthServe?.error) {
      res.status(healthServe.statusCode).json({ error: healthServe.error });
    }

    res
      .status(healthServe.statusCode)
      .json({ healthServe: healthServe.healthServe });
  } catch (error) {
    console.log("Error while fetching doctors : ", error);
    res.status(500).send(`An error occurred ${error}`);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await adminService.getUsers();

    if (user?.error) {
      res.status(user.statusCode).json({ error: user.error });
    }

    res.status(user.statusCode).json({ user: user.user });
  } catch (error) {
    console.log("Error while fetching doctors : ", error);
    res.status(500).send(`An error occurred ${error}`);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const details = await adminService.getUserDetails(userId);

    if (details?.error) {
      res.status(details.statusCode).json({ error: details.error });
    }

    res.status(details.statusCode).json({ user: details.details });
  } catch (error) {
    console.log("Error while fetching doctors : ", error);
    res.status(500).send(`An error occurred ${error}`);
  }
};

module.exports = {
  createAdmin,
  getUserDetails,
  loginAdmin,
  getDoctors,
  getUsers,
  getHealthServe,
};
