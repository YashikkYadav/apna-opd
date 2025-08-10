const NursingStaff = require("../../models/nursingStaff");
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

exports.handleNursingStaff = async (req, healthServeId) => {
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
      nurseType,
      rating,
      address,
      locality,
      city,
      pincode,
      state,
      workingAt,
      clients,
      perVisitCharges,
      areaCovered,
      shiftFlexibility,
      bookingType,
      workingHours,
      workingDays = [],
      education = [],
      services = [],
      certifications = [],
      languages = [],
      testimonials = [],
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

    const profileImage = files.find(
      (file) => file.fieldname === "profilePhoto_image"
    );
    const profilePhoto = profileImage
      ? `${profileImage.destination.split("public/")[1]}/${
          profileImage.filename
        }`.replace(/^\/+/, "")
      : undefined;

    const galleryImages = files
      .filter((file) => file.fieldname === "galleryImages_image")
      .map((file) => {
        const relativePath = file?.destination?.split("public/")[1] || "";
        return `${relativePath.replace(/^\/+/, "")}/${file?.filename}`;
      });

    const existing = await NursingStaff.findOne({ healthServeId });

    const update = {
      healthServeId,
      about,
      experience,
      nurseType,
      rating,
      address,
      locality,
      city,
      pincode,
      state,
      workingAt,
      clients,
      perVisitCharges,
      areaCovered,
      shiftFlexibility,
      bookingType,
      workingHours,
      workingDays: parseArray(workingDays),
      education: parseArray(education),
      services: parseArray(services),
      certifications: parseArray(certifications),
      languages: parseArray(languages),
      testimonials: parseArray(testimonials),
      faqs: parseArray(faqs),
    };

    if (profilePhoto) update.profileImage = profilePhoto;

    if (galleryImages.length > 0) {
      update.galleryImages = [
        ...(existing?.galleryImages || []),
        ...galleryImages,
      ];
    }

    let result;
    if (existing) {
      result = await NursingStaff.findOneAndUpdate(
        { healthServeId },
        update,
        { new: true }
      );
    } else {
      result = await NursingStaff.create(update);
    }

    return {
      statusCode: 200,
      message: `NursingStaff profile ${
        existing ? "updated" : "created"
      } successfully`,
      data: result,
    };
  } catch (error) {
    console.error("handleNursingStaff error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};

exports.getNursingStaff = async (healthServeId) => {
  try {
    if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
      return {
        statusCode: 400,
        message: "Invalid or missing healthServeId",
      };
    }

    const doc = await NursingStaff.findOne({ healthServeId });

    if (!doc) {
      return {
        statusCode: 404,
        message: "No Nursing Staff profile found for this healthServeId",
      };
    }

    return {
      statusCode: 200,
      message: "Nursing data retrieved",
      data: doc,
    };
  } catch (error) {
    console.error("gethandleNursingStaff error:", error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
