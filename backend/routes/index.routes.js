const express = require("express");

const doctorRoutes = require("./doctor.routes");
const patientRoutes = require("./patient.routes");
const invoiceRoutes = require("./invoice.routes");
const libraryRoutes = require("./library.routes");
const enquiryRoutes = require("./enquiry.routes");
const paymentRoutes = require("./payment.routes");
const dashboardRoutes = require("./dashboard.routes");
const hospitalRoutes = require("./hospital.routes");
const fileUploader = require("./fileUploader.routes");
const contactLeadRoutes = require("./contactLead.routes");
const healthServeRoutes = require("./healthServe.routes");
const appointmentRoutes = require("./appointment.routes");
const prescriptionRoutes = require("./prescription.routes");
const medicineLibraryRoutes = require("./medicineLibrary.routes");
const templateLibraryRoutes = require("./templateLibrary.routes");
const dropdownLibraryRoutes = require("./dropdownLibrary.routes");
const doctorProfileRoutes = require("./doctorProfile.routes");
const patientAppointmentRoutes = require("../routes/patientAppointment.routes");
const prescriptionSectionRoutes = require("../routes/prescriptionSection.routes");
const doctorMiddleware = require("../middlewares/doctor.middleware");
const healthServeProfileRoutes = require("./profile.routes");
const messageRoutes = require("./messages.routes");
const adminRoutes = require("./admin.routes");
const userRoutes = require("./user.routes");
const HealthServe = require("../models/healthServe");
const careerLeadRoutes = require("./careerLead.routes")
const Doctor = require("../models/doctor");
const importExcelRouter = require("./importExcel.routes")
const nurseRoutes = require("./nurse.routes")
const googleAuthRoutes=require("./googleauth.routes")
const cartRoutes=require("./cart.routes")
const orderRoutes=require("./order.routes")
const medicalInvoiceRoutes = require('./medicalInvoice.routes')
const medicalMiddleware = require("../middlewares/medical.middleware")
const router = express.Router();

router.use("/cart", cartRoutes);

router.use("/:healthServeId/orders", orderRoutes);

router.use("/admin", adminRoutes);

router.use("/hospital", hospitalRoutes);

router.get("/oauth2callback", async (req, res) => {
  res.send({ message: 'ok' })
})
router.get("/hello-server", async (req, res) => {
  res.status(200).send({ message: 'server working fine' })
});


router.use("/google", googleAuthRoutes);

router.use("/user", userRoutes);
// Centralizing all the routes in one file
router.use("/doctor", doctorRoutes);

router.use("/:doctorId/doctor-profile", doctorMiddleware, doctorProfileRoutes);

router.use("/:healthServeId/health-serve-profile", healthServeProfileRoutes);

router.use("/:doctorId/patient", patientAppointmentRoutes);

router.use("/appointment", appointmentRoutes);

router.use("/patient", patientRoutes);

router.use("/:doctorId/report", doctorMiddleware, dashboardRoutes);

router.use("/:doctorId/invoice", doctorMiddleware, invoiceRoutes);

router.use("/:medicalId/MedicalInvoice", medicalMiddleware, medicalInvoiceRoutes);

router.use("/:doctorPatientId", messageRoutes);

router.use(
  "/:doctorId/prescription/:patientId",
  doctorMiddleware,
  prescriptionRoutes
);

router.use("/:healthServeId/enquiry", enquiryRoutes);

router.use("/health-serve", healthServeRoutes);

router.use("/:patientId/file", fileUploader);

router.use("/:patientId", patientRoutes);

router.use("/:doctorId/medicine", doctorMiddleware, medicineLibraryRoutes);

router.use("/:doctorId/template", doctorMiddleware, templateLibraryRoutes);

router.use("/library", libraryRoutes);

router.use("/payment", paymentRoutes);

router.use("/:doctorId/dropdown", doctorMiddleware, dropdownLibraryRoutes);

router.use(
  "/:doctorId/prescription-section",
  doctorMiddleware,
  prescriptionSectionRoutes
);

router.use("/contact-lead", contactLeadRoutes);

router.use("/career-lead", careerLeadRoutes);

router.use("/import-excel", importExcelRouter)

router.use('/nurse-listings', nurseRoutes)


module.exports = router;
