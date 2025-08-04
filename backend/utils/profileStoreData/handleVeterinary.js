const Veterinary = require("../../models/veterinary");
const mongoose = require("mongoose");


exports.handleVeterinary = async (req, healthServeId) => {
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
      specialization,
      consultationFee,
      website,
      languages = [],
      availableServices = [],
      facilities = [],
      faqs = [],
      testimonials = [],
      tags = [],
    } = req.body;

    const parseArray = (val) => {
      try {
        return typeof val === "string" ? JSON.parse(val) : val;
      } catch {
        return [];
      }
    };

    const files = req.files || [];

    const profileImage = files.find(file => file.fieldname === 'profilePhoto_image');
    const profilePhoto = profileImage
      ? `${profileImage.destination.split('public/')[1]}/${profileImage.filename}`.replace(/^\/+/, '')
      : undefined;

    const newGalleryImages = files
      .filter(file => file.fieldname === 'galleryImages_image')
      .map(file => {
        const relativePath = file?.destination?.split('public/')[1] || '';
        return `${relativePath.replace(/^\/+/, '')}/${file?.filename}`;
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
      specialization,
      consultationFee,
      website,
      languages: parseArray(languages),
      availableServices: parseArray(availableServices),
      facilities: parseArray(facilities),
      faqs: parseArray(faqs),
      testimonials: parseArray(testimonials),
      tags: parseArray(tags),
    };

    if (profilePhoto) update.profileImage = profilePhoto;

    let result;
    const existing = await Veterinary.findOne({ healthServeId });

    if (existing) {
      // Merge existing + new images
      if (newGalleryImages.length > 0) {
        update.galleryImages = [...(existing.galleryImages || []), ...newGalleryImages];
      } else {
        update.galleryImages = existing.galleryImages || [];
      }

      result = await Veterinary.findOneAndUpdate({ healthServeId }, update, { new: true });
    } else {
      update.galleryImages = newGalleryImages; // create new with initial images
      result = await Veterinary.create(update);
    }

    return {
      statusCode: 200,
      message: `Veterinary profile ${existing ? "updated" : "created"} successfully`,
      data: result,
    };
  } catch (error) {
    console.error("handleVeterinary error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};


exports.gethandleVeterinary = async (healthServeId) => {
  try {
    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      return {
        statusCode: 400,
        message: "Invalid or missing healthServeId",
      };
    }

    const doc = await Veterinary.findOne({ healthServeId });

    if (!doc) {
      return {
        statusCode: 404,
        message: "No Veterinary profile found for this healthServeId",
      };
    }

    return {
      statusCode: 200,
      message: "Veterinary profile retrieved",
      data: doc,
    };
  } catch (error) {
    console.error("gethandleVeterinary error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
