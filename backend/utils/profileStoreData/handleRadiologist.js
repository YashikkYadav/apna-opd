const RadioLogist = require("../../models/radiologist");
const healthServeModel = require("../../models/healthServe");
const mongoose = require("mongoose");

const UpdateHealthServeData = async (req, healthServeId) => {
  const { address, locality, city, pincode, state } = req.body;
  return await healthServeModel.updateOne(
    { _id: healthServeId },
    { address, locality, city, pincode, state },
    { upsert: true }
  );
};

exports.handleRadiologist = async (req, healthServeId) => {
  try {
    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      return {
        statusCode: 400,
        message: "Invalid or missing healthServeId",
      };
    }

    const {
      introduction,
      happyClients,
      experience,
      appointmentFee,
      about,
      locations = [],
      address,
      locality,
      city,
      state,
      pincode,
      unavailabilityDate,
      availabilityAfter,
      conditionsTreated = [],
      proceduresOffered = [],
      membershipAwards = [],
      faqs = [],
      testimonials = [],
      languages = [],
    } = req.body;

    const parseArray = (val) => {
      try {
        return typeof val === "string" ? JSON.parse(val) : val;
      } catch {
        return [];
      }
    };

    const files = req.files || [];
    const existing = await RadioLogist.findOne({ healthServeId });

    const profileImage = files.find(
      (file) => file.fieldname === "profilePhoto_image"
    );
    const profilePhoto = profileImage
      ? `${profileImage.savedPath}`
      : existing?.profileImage;
    

    const newGalleryImages = files
      .filter((f) => f.fieldname === "galleryImages_image")
      .map((f) => {
        if (!f.savedPath) throw new Error("File not saved yet");
        return f.savedPath; // path after compression
      });

    const update = {
      healthServeId,
      introduction,
      happyClients,
      experience,
      appointmentFee,
      about,
      locations: parseArray(locations),
      address,
      locality,
      city,
      state,
      pincode,
      unavailabilityDate,
      availabilityAfter,
      conditionsTreated: parseArray(conditionsTreated),
      proceduresOffered: parseArray(proceduresOffered),
      membershipAwards: parseArray(membershipAwards),
      faqs: parseArray(faqs),
      testimonials: parseArray(testimonials),
      languages: parseArray(languages),
    };

    if (profilePhoto) update.profileImage = profilePhoto;

    let result;
    

    if (existing) {
      // Merge old + new gallery images
      if (newGalleryImages.length > 0) {
        update.galleryImages = [...(existing.galleryImages || []), ...newGalleryImages];
      } else {
        update.galleryImages = existing.galleryImages || [];
      }

      result = await RadioLogist.findOneAndUpdate({ healthServeId }, update, { new: true });
      await UpdateHealthServeData(req, healthServeId);
    } else {
      update.galleryImages = newGalleryImages;
      result = await RadioLogist.create(update);
    }

    return {
      statusCode: 200,
      message: `Radiologist profile ${existing ? "updated" : "created"} successfully`,
      data: result,
    };
  } catch (error) {
    console.error("handlePhysio error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};


exports.getHandleRadiologist = async (healthServeId) => {
  try {
    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      return {
        statusCode: 400,
        message: "Invalid or missing healthServeId",
      };
    }

    console.log(">>", healthServeId);

    const doc = await RadioLogist.findOne({ healthServeId });

    if (!doc) {
      return {
        statusCode: 404,
        message: "No RadioLogist profile found for this healthServeId",
      };
    }

    return {
      statusCode: 200,
      message: "RadioLogist data retrieved",
      data: doc,
    };
  } catch (error) {
    console.error("getHandleRadiologist error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
