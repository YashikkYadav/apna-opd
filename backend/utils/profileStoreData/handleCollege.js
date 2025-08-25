const mongoose = require("mongoose");
const healthServeModel = require("../../models/healthServe");
const MedicalCollege = require("../../models/medicalCollege");

const UpdateHealthServeData = async (req, healthServeId) => {
    const { address, locality, city, pincode, state } = req.body;
    return await healthServeModel.updateOne(
        { _id: healthServeId },
        { address, locality, city, pincode, state },
        { upsert: true }
    );
};

exports.handleMedicalCollege = async (req, healthServeId) => {
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
            website,
            established,
            affiliatedTo,
            approvedBy,
            recognition,
            courses = [],
            eligibilityCriteria = [],
            importantDates = [],
            scholarships = [],
            testimonials = [],
            whyChoose = [],
            facilities = [],
            hospitalTieUps = [],
            careerServices = [],
            tags = [],
        } = req.body;

        console.log("Received body:", req.body);

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
            about,
            experience,
            introduction,
            address,
            locality,
            city,
            pincode,
            state,
            website,
            established,
            affiliatedTo,
            approvedBy,
            recognition,
            courses: parseArray(courses),
            eligibilityCriteria: parseArray(eligibilityCriteria),
            importantDates: parseArray(importantDates),
            scholarships: parseArray(scholarships),
            testimonials: parseArray(testimonials),
            whyChoose: parseArray(whyChoose),
            facilities: parseArray(facilities),
            hospitalTieUps: parseArray(hospitalTieUps),
            careerServices: parseArray(careerServices),
            tags: parseArray(tags),
        };

        if (profilePhoto) update.profileImage = profilePhoto;

        const existing = await MedicalCollege.findOne({ healthServeId });

        let result;
        if (existing) {
            // Merge old and new galleryImages
            if (newGalleryImages.length > 0) {
                update.galleryImages = [...(existing.galleryImages || []), ...newGalleryImages];
            } else {
                update.galleryImages = existing.galleryImages || [];
            }

            result = await MedicalCollege.findOneAndUpdate(
                { healthServeId },
                update,
                { new: true }
            );
            await UpdateHealthServeData(req, healthServeId);
        } else {
            update.healthServeId = healthServeId;
            update.galleryImages = newGalleryImages;
            result = await MedicalCollege.create(update);
        }

        return {
            statusCode: 200,
            message: `MedicalCollege profile ${existing ? "updated" : "created"} successfully`,
            data: result,
        };
    } catch (error) {
        console.error("handleMedicalCollege error:", error);
        return {
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message,
        };
    }
};


exports.gethandleMedicalCollege = async (healthServeId) => {

    const doc = await MedicalCollege
        .findOne({ healthServeId })
        .populate("healthServeId");
    return doc;


};
