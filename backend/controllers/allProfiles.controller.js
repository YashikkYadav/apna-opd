const HealthServe = require("../models/healthServe");
const Doctor = require("../models/doctor");
const DoctorProfile = require("../models/doctorProfile");
const Veterinary = require("../models/veterinary");
const Laboratory = require("../models/healthlabProfile");
const NursingStaff = require("../models/nursingStaff");
const PhysioTherapist = require("../models/physiotherapist");
const Yoga = require("../models/yoga");
const MedicalStore = require("../models/pharmacyProfile");
const Hospital = require("../models/hospital");
const IVF = require("../models/ivfClinic");
const BloodBank = require("../models/bloodBankProfile");
const Gym = require("../models/gym");
const MedicalCollege = require("../models/medicalCollege");

exports.getAllProfiles = async (req, res) => {
  try {
    const { name } = req.query;

    // ----------------- HealthServe Query -----------------
    let query = {};
    if (name) query.name = { $regex: name, $options: "i" };

    const healthServes = await HealthServe.find(query);

    const hsResults = await Promise.all(
      healthServes.map(async (hs) => {
        let profileData = null;

        switch (hs.type) {
          case "veterinary":
            profileData = await Veterinary.findOne({ healthServeId: hs._id });
            break;
          case "laboratory":
            profileData = await Laboratory.findOne({ healthServeId: hs._id });
            break;
          case "nursing_staff":
            profileData = await NursingStaff.findOne({ healthServeId: hs._id });
            break;
          case "physiotherapist":
            profileData = await PhysioTherapist.findOne({
              healthServeId: hs._id,
            });
            break;
          case "yoga":
            profileData = await Yoga.findOne({ healthServeId: hs._id });
            break;
          case "pharmacy":
            profileData = await MedicalStore.findOne({ healthServeId: hs._id });
            break;
          case "hospital":
            profileData = await Hospital.findOne({ healthServeId: hs._id });
            break;
          case "ivf":
            profileData = await IVF.findOne({ healthServeId: hs._id });
            break;
          case "blood_bank":
            profileData = await BloodBank.findOne({ healthServeId: hs._id });
            break;
          case "gym":
            profileData = await Gym.findOne({ healthServeId: hs._id });
            break;
          case "medical_college":
            profileData = await MedicalCollege.findOne({
              healthServeId: hs._id,
            });
            break;
          default:
            profileData = {};
        }

        return {
          type: hs.type,
          ...hs.toObject(),
          profile: profileData || {},
        };
      })
    );

    // ----------------- Doctor Query -----------------
    const doctorQuery = {};
    if (name) doctorQuery.name = { $regex: name, $options: "i" };

    const doctors = await Doctor.find(doctorQuery);

    const doctorResults = await Promise.all(
      doctors.map(async (doc) => {
        const profile = await DoctorProfile.findOne({ doctorId: doc._id });
        return {
          type: "doctor",
          ...doc.toObject(),
          profile: profile || {},
        };
      })
    );

    // ----------------- Merge Results -----------------
    const results = [...hsResults, ...doctorResults];

    if (results.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
