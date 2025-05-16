const adminService = require("../services/admin.service");

const createAdmin = async (req, res) => {
  try {
    const adminData = req.body;

    const newAdmin = await adminService.createAdmin(adminData);

    if (newAdmin?.error) {
      return res.status(newAdmin.statusCode).json({ error: newAdmin.error });
    }

    console.log(newAdmin);

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

module.exports = {
  createAdmin,
  loginAdmin,
  getDoctors,
};
