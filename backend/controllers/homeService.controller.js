const HealthServe = require("../models/healthServe");
const Veterinary = require("../models/veterinary");
const Laboratory = require("../models/healthlabProfile");
const NursingStaff = require("../models/nursingStaff");
const PhysioTherapist = require("../models/physiotherapist");

exports.getAllHomeServicesWithProfiles = async (req, res) => {
  try {
    const { location, name } = req.query;

    // Base filter
    const query = { homeService: "yes" };

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // Fetch all matching HealthServe documents
    const healthServes = await HealthServe.find(query);

    if (!healthServes || healthServes.length === 0) {
      return res.status(404).json({ message: "No home services found" });
    }

    // Use aggregation pipelines for each type in parallel
    const [vets, labs, nurses, physios] = await Promise.all([
      Veterinary.aggregate([
        {
          $lookup: {
            from: "healthserves", // must match actual collection name
            localField: "healthServeId",
            foreignField: "_id",
            as: "healthServe",
          },
        },
        { $unwind: "$healthServe" },
        { $match: { "healthServe.homeService": "yes" } },
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
        { $match: { "healthServe.homeService": "yes" } },
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
        { $match: { "healthServe.homeService": "yes" } },
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
        { $match: { "healthServe.homeService": "yes" } },
      ]),
    ]);

    // Combine all results
    const results = [
      ...vets.map((item) => ({
        type: "vatenary",
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

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching home services with profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


