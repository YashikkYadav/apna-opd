const Ambulance = require("../../models/ambulance");
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

exports.handleAmbulance = async (req, healthServeId) => {
  try {
    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      return {
        statusCode: 400,
        message: "Invalid or missing healthServeId",
      };
    }

    const {
      about,
      introduction,
      address,
      locality,
      city,
      pincode,
      state,
      coverageArea,
      ambulances = [],
      drivers = [],
      testimonials = [],
      faqs = [],
    } = req.body;

    const parseArray = (val) => {
      try {
        return typeof val === "string" ? JSON.parse(val) : val || [];
      } catch {
        return [];
      }
    };

    const files = req.files || [];
    const existing = await Ambulance.findOne({ healthServeId });

    // Profile Image
    const profileImage = files.find(
      (file) => file.fieldname === "profilePhoto_image"
    );
    const profilePhoto = profileImage
      ? `${profileImage.savedPath}`
      : existing?.profileImage;

    // Gallery Images
    const newGalleryImages = files
      .filter((f) => f.fieldname === "galleryImages_image")
      .map((f) => {
        if (!f.savedPath) throw new Error("File not saved yet");
        return f.savedPath; // path after compression
      });

    // Build update object
    const update = {
      healthServeId,
      about,
      introduction,
      address,
      locality,
      city,
      pincode,
      state,
      coverageArea,
      ambulances: parseArray(ambulances),
      drivers: parseArray(drivers),
      testimonials: parseArray(testimonials),
      faqs: parseArray(faqs),
    };

    if (profilePhoto) update.profileImage = profilePhoto;

    let result;

    if (existing) {
      // Merge old + new gallery images
      update.galleryImages =
        newGalleryImages.length > 0
          ? [...(existing.galleryImages || []), ...newGalleryImages]
          : existing.galleryImages || [];

      result = await Ambulance.findOneAndUpdate({ healthServeId }, update, {
        new: true,
      });
      await UpdateHealthServeData(req, healthServeId);
    } else {
      update.galleryImages = newGalleryImages;
      result = await Ambulance.create(update);
    }

    return {
      statusCode: 200,
      message: `Ambulance profile ${
        existing ? "updated" : "created"
      } successfully`,
      data: result,
    };
  } catch (error) {
    console.error("handleAmbulance error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};

exports.getHandleAmbulance = async (healthServeId) => {
  try {
    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      return {
        statusCode: 400,
        message: "Invalid or missing healthServeId",
      };
    }

    const doc = await Ambulance.findOne({ healthServeId });

    if (!doc) {
      return {
        statusCode: 404,
        message: "No Ambulance profile found for this healthServeId",
      };
    }

    return {
      statusCode: 200,
      message: "Ambulance data retrieved",
      data: doc,
    };
  } catch (error) {
    console.error("getHandleAmbulance error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
