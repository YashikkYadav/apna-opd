const express = require("express");
const userController = require("../controllers/user.controller");

const user = express.Router();

user.post("/create", userController.createUser);

user.get("/", userController.getUsers);
module.exports = user;
