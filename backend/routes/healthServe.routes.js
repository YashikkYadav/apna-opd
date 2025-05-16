const express = require("express");
const healthServeController = require("../controllers/healthServe.controller");
const healthServe = express.Router({ mergeParams: true });

healthServe.post("/", healthServeController.registerHealthServe);

healthServe.post("/access-token", healthServeController.loginHealthServe);

healthServe.get("/", healthServeController.getAllHealthServes);

healthServe.get("/list", healthServeController.getHealthServeList);

healthServe.get("/:healthServeId", healthServeController.getHealthServeById);

healthServe.put("/:healthServeId", healthServeController.updateHealthServe);

healthServe.delete("/:healthServeId", healthServeController.deleteHealthServe);


module.exports = healthServe;
