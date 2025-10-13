const HealthServe = require("../models/healthServe");

exports.getEmergencyProfiles = async (req, res) => {
  try {
    const { name, location } = req.query;

    // Build dynamic match filter
    const matchStage = {};
    if (name) matchStage.name = { $regex: name, $options: "i" };
    if (location) matchStage.location = { $regex: location, $options: "i" };

    const pipeline = [];

    // Add match stage only if filters exist
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Lookups for related profiles
    pipeline.push(
      {
        $lookup: {
          from: "ambulances",
          localField: "_id",
          foreignField: "healthServeId",
          as: "ambulanceProfile",
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
          from: "pharmacyprofiles",
          localField: "_id",
          foreignField: "healthServeId",
          as: "medicalProfile",
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
          from: "blooddonors",
          localField: "_id",
          foreignField: "healthServeId",
          as: "donorsProfile",
        },
      },
      {
        // ✅ Filter out documents that have NO related profiles
        $match: {
          $or: [
            { ambulanceProfile: { $ne: [] } },
            { donorsProfile: { $ne: [] } },
            { bloodBankProfile: { $ne: [] } },
            { medicalProfile: { $ne: [] } },
            { hospitalProfile: { $ne: [] } },
          ],
        },
      },
      {
        $project: {
          type: 1,
          name: 1,
          location: 1,
          profile: {
            $mergeObjects: [
              { $arrayElemAt: ["$ambulanceProfile", 0] },
              { $arrayElemAt: ["$donorsProfile", 0] },
              { $arrayElemAt: ["$bloodBankProfile", 0] },
              { $arrayElemAt: ["$medicalProfile", 0] },
              { $arrayElemAt: ["$hospitalProfile", 0] },
            ],
          },
        },
      }
    );

    const healthServeProfile = await HealthServe.aggregate(pipeline);

    if (healthServeProfile.length === 0) {
      return res
        .status(404)
        .json({ message: "No matching emergency profiles found" });
    }

    return res.json({
      count: healthServeProfile.length,
      results: healthServeProfile,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
