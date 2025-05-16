const express = require("express");
const adminController = require("../controllers/admin.controller");
const adminMiddleware = require("../middlewares/admin.middleware");

const admin = express.Router();

admin.post("/create", adminController.createAdmin);

admin.post("/login", adminController.loginAdmin);

admin.get("/:adminId/doctor", adminMiddleware, adminController.getDoctors);

module.exports = admin;
