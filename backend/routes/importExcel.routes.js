const express = require("express");
const multer = require("multer");
const importExcel =  require("../controllers/importExcel.controller.js")

const importExcelRouter = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/import-excel", upload.single("file"), importExcel);

module.exports = importExcelRouter;
