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
const Radiologist = require("../models/radiologist");
const BloodDonor = require("../models/bloodDonor");
const Ambulance = require("../models/ambulance");

exports.getAllProfiles = async (req, res) => {
  try {
    const { name } = req.query;

    // Build search filter
    const matchQuery = {};
    if (name) {
      matchQuery.name = { $regex: name, $options: "i" };
    }

    // 1️⃣ Fetch all HealthServe with related profiles using $lookup
    const healthServeResults = await HealthServe.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: "veterinaries", // MongoDB collection name (lowercase plural)
          localField: "_id",
          foreignField: "healthServeId",
          as: "veterinaryProfile",
        },
      },
      {
        $lookup: {
          from: "laboratories",
          localField: "_id",
          foreignField: "healthServeId",
          as: "laboratoryProfile",
        },
      },
      {
        $lookup: {
          from: "nursingstaffs",
          localField: "_id",
          foreignField: "healthServeId",
          as: "nursingProfile",
        },
      },
      {
        $lookup: {
          from: "physiotherapists",
          localField: "_id",
          foreignField: "healthServeId",
          as: "physiotherapistProfile",
        },
      },
      {
        $lookup: {
          from: "yogas",
          localField: "_id",
          foreignField: "healthServeId",
          as: "yogaProfile",
        },
      },
      {
        $lookup: {
          from: "medicalstores",
          localField: "_id",
          foreignField: "healthServeId",
          as: "pharmacyProfile",
        },
      },
      {
        $lookup: {
          from: "hospitals",
          localField: "_id",
          foreignField: "healthServeId",
          as: "hospitalProfile",
        },
      },
      {
        $lookup: {
          from: "ivfs",
          localField: "_id",
          foreignField: "healthServeId",
          as: "ivfProfile",
        },
      },
      {
        $lookup: {
          from: "bloodbanks",
          localField: "_id",
          foreignField: "healthServeId",
          as: "bloodBankProfile",
        },
      },
      {
        $lookup: {
          from: "gyms",
          localField: "_id",
          foreignField: "healthServeId",
          as: "gymProfile",
        },
      },
      {
        $lookup: {
          from: "medicalcolleges",
          localField: "_id",
          foreignField: "healthServeId",
          as: "medicalCollegeProfile",
        },
      },
      {
        $lookup: {
          from: "blooddonors",
          localField: "_id",
          foreignField: "healthServeId",
          as: "bloodDonorProfile",
        },
      },
      {
        $lookup: {
          from: "radiologists",
          localField: "_id",
          foreignField: "healthServeId",
          as: "radiologistProfile",
        },
      },
      {
        $lookup: {
          from: "ambulances",
          localField: "_id",
          foreignField: "healthServeId",
          as: "ambulanceProfile",
        },
      },
      {
        $project: {
          type: 1,
          name: 1,
          location: 1,
          profiles: {
            $mergeObjects: [
              { $arrayElemAt: ["$veterinaryProfile", 0] },
              { $arrayElemAt: ["$laboratoryProfile", 0] },
              { $arrayElemAt: ["$nursingProfile", 0] },
              { $arrayElemAt: ["$physiotherapistProfile", 0] },
              { $arrayElemAt: ["$yogaProfile", 0] },
              { $arrayElemAt: ["$pharmacyProfile", 0] },
              { $arrayElemAt: ["$hospitalProfile", 0] },
              { $arrayElemAt: ["$ivfProfile", 0] },
              { $arrayElemAt: ["$bloodBankProfile", 0] },
              { $arrayElemAt: ["$gymProfile", 0] },
              { $arrayElemAt: ["$medicalCollegeProfile", 0] },
              { $arrayElemAt: ["$bloodDonorProfile", 0] },
              { $arrayElemAt: ["$radiologistProfile", 0] },
              { $arrayElemAt: ["$ambulanceProfile", 0] },
            ],
          },
        },
      },
    ]);

    // 2️⃣ Fetch Doctors and their Profiles
    const doctorMatch = {};
    if (name) doctorMatch.name = { $regex: name, $options: "i" };

    const doctorResults = await Doctor.aggregate([
      { $match: doctorMatch },
      {
        $lookup: {
          from: "doctorprofiles",
          localField: "_id",
          foreignField: "doctorId",
          as: "profile",
        },
      },
      {
        $project: {
          type: { $literal: "doctor" },
          name: 1,
          location: 1,
          profile: { $arrayElemAt: ["$profile", 0] },
        },
      },
    ]);

    // 3️⃣ Merge all results
    const results = [...healthServeResults, ...doctorResults];

    if (results.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

