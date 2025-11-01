const express = require("express");
const router = express.Router({ mergeParams: true });
const { sendPdf } = require("../controllers/sendPdf.controller");

router.post("/", sendPdf);

module.exports = router;
