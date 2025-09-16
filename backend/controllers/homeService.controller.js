const HealthServe = require("../models/healthServe");
const Veterinary = require("../models/veterinary");
const Laboratory = require("../models/healthlabProfile");
const NursingStaff = require("../models/nursingStaff");
const PhysioTherapist = require("../models/physiotherapist");

exports.getAllHomeServicesWithProfiles = async (req, res) => {
  try {
    const { location, name } = req.query;

    // Base query: only homeService = "yes"
    let query = { homeService: "yes" };

    if (location) {
      query.location = { $regex: location, $options: "i" }; // case-insensitive
    }

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // Fetch all matching HealthServe docs
    const healthServes = await HealthServe.find(query);

    if (!healthServes || healthServes.length === 0) {
      return res.status(404).json({ message: "No home services found" });
    }

    // Attach the related profile depending on type
    const results = await Promise.all(
      healthServes.map(async (hs) => {
        let profileData = null;

        switch (hs.type) {
          case "vatenary":
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
        }

        return {
          ...hs.toObject(),
          profile: profileData || {},
        };
      })
    );

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching home services with profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

