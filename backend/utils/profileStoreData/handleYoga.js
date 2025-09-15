const Yoga = require("../../models/yoga");
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

exports.handleYoga = async (req, healthServeId) => {
  try {
    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      return {
        statusCode: 400,
        message: "Invalid or missing healthServeId",
      };
    }

    const {
      about,
      experience,
      introduction,
      address,
      locality,
      city,
      pincode,
      state,
      totalCustomers,
      instructors = [],
      services = [],
      worldClassFacilities = [],
      therapyPackages = [],
      testimonials = [],
      tags = [],
      faqs = [],
    } = req.body;

    const parseArray = (val) => {
      try {
        return typeof val === "string" ? JSON.parse(val) : val;
      } catch {
        return [];
      }
    };

    const files = req.files || [];
    const existing = await Yoga.findOne({ healthServeId });

    const profileImage = files.find((file) => file.fieldname === "profilePhoto_image");
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
      about,
      experience,
      introduction,
      address,
      locality,
      city,
      pincode,
      state,
      totalCustomers,
      instructors: parseArray(instructors),
      services: parseArray(services),
      worldClassFacilities: parseArray(worldClassFacilities),
      therapyPackages: parseArray(therapyPackages),
      testimonials: parseArray(testimonials),
      tags: parseArray(tags),
      faqs: parseArray(faqs),
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

      result = await Yoga.findOneAndUpdate({ healthServeId }, update, { new: true });
      await UpdateHealthServeData(req, healthServeId);
    } else {
      update.galleryImages = newGalleryImages;
      result = await Yoga.create(update);
    }

    return {
      statusCode: 200,
      message: `Yoga profile ${existing ? "updated" : "created"} successfully`,
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


exports.gethandleYoga = async (healthServeId) => {
  try {
    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      return {
        statusCode: 400,
        message: "Invalid or missing healthServeId",
      };
    }

    console.log(">>", healthServeId)

    const doc = await Yoga.findOne({ healthServeId });

    if (!doc) {
      return {
        statusCode: 404,
        message: "No Yoga profile found for this healthServeId",
      };
    }

    return {
      statusCode: 200,
      message: "Yoga data retrieved",
      data: doc,
    };
  } catch (error) {
    console.error("gethandleYoga error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
