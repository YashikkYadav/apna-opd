const userService = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const newUser = await userService.createUser(userData);

    if (newUser?.error) {
      return res.status(newUser.statusCode).json({ error: newUser.error });
    }

    res.status(newUser.statusCode).json({ User: newUser });
  } catch (error) {
    res.status(500).send(`Error occurred : ${error}`);
  }
};

const loginUser = async (req, res) => {
  try {
    const userData = req.body;

    const User = await userService.loginUser(userData);

    if (User?.error) {
      return res.status(User.statusCode).send(User.error);
    }

    res.status(User.statusCode).json({ User: User.User });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error}`);
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await userService.getDoctors();

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
    const healthServe = await userService.getHealthServe(type);

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
    const user = await userService.getUsers();

    if (user?.error) {
      res.status(user.statusCode).json({ error: user.error });
    }

    res.status(user.statusCode).json({ user: user.user });
  } catch (error) {
    console.log("Error while fetching doctors : ", error);
    res.status(500).send(`An error occurred ${error}`);
  }
};

module.exports = {
  createUser,
  getUsers,
};
