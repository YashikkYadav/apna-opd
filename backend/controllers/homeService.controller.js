const HealthServe = require("../models/healthServe");
const Veterinary = require("../models/veterinary");
const Laboratory = require("../models/healthlabProfile");
const NursingStaff = require("../models/nursingStaff");
const PhysioTherapist = require("../models/physiotherapist");

exports.getAllHomeServicesWithProfiles = async (req, res) => {
  try {
    const { location, name } = req.query;

    // Base query for home services
    const matchQuery = { "healthServe.homeService": "yes" };

    if (location) {
      matchQuery["healthServe.location"] = { $regex: location, $options: "i" };
    }

    if (name) {
      matchQuery["healthServe.name"] = { $regex: name, $options: "i" };
    }

    // Parallel aggregation for all services
    const [vets, labs, nurses, physios] = await Promise.all([
      Veterinary.aggregate([
        {
          $lookup: {
            from: "healthserves",
            localField: "healthServeId",
            foreignField: "_id",
            as: "healthServe",
          },
        },
        { $unwind: "$healthServe" },
        { $match: matchQuery },
      ]),

      Laboratory.aggregate([
        {
          $lookup: {
            from: "healthserves",
            localField: "healthServeId",
            foreignField: "_id",
            as: "healthServe",
          },
        },
        { $unwind: "$healthServe" },
        { $match: matchQuery },
      ]),

      NursingStaff.aggregate([
        {
          $lookup: {
            from: "healthserves",
            localField: "healthServeId",
            foreignField: "_id",
            as: "healthServe",
          },
        },
        { $unwind: "$healthServe" },
        { $match: matchQuery },
      ]),

      PhysioTherapist.aggregate([
        {
          $lookup: {
            from: "healthserves",
            localField: "healthServeId",
            foreignField: "_id",
            as: "healthServe",
          },
        },
        { $unwind: "$healthServe" },
        { $match: matchQuery },
      ]),
    ]);

    // Combine all results
    const results = [
      ...vets.map((item) => ({
        type: "veterinary",
        ...item.healthServe,
        profile: item,
      })),
      ...labs.map((item) => ({
        type: "laboratory",
        ...item.healthServe,
        profile: item,
      })),
      ...nurses.map((item) => ({
        type: "nursing_staff",
        ...item.healthServe,
        profile: item,
      })),
      ...physios.map((item) => ({
        type: "physiotherapist",
        ...item.healthServe,
        profile: item,
      })),
    ];

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No matching home services found" });
    }

    res.status(200).json({ count: results.length, results });
  } catch (error) {
    console.error("Error fetching home services with profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
