const BloodBank = require("../../models/bloodbank");

const mongoose = require("mongoose");

exports.handleBloodBankData = async (req, healthServeId) => {
    try {
        const {
            doctorInfo,
            tags = [],
            facilities = [],
            certifications = [],
            bloodTypes = [],
            reviews = [],
            nearbyBloodBanks = [],
            establishedYear,
            license,
            website,
            testimonials = [],
        } = req.body;

        if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
            return {
                statusCode: 400,
                message: "Invalid or missing healthServeId",
            };
        }

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

        const galleryImages = files
            .filter(file => file.fieldname === 'galleryImages_image')
            .map(file => {
                const relativePath = file?.destination?.split('public/')[1] || '';
                return `${relativePath.replace(/^\/+/, '')}/${file?.filename}`;
            });

        const update = {
            doctorInfo,
            tags: parseArray(tags),
            facilities: parseArray(facilities),
            certifications: parseArray(certifications),
            bloodTypes: parseArray(bloodTypes),
            reviews: parseArray(reviews),
            nearbyBloodBanks: parseArray(nearbyBloodBanks),
            establishedYear,
            license,
            website,
            testimonials: parseArray(testimonials),
        };
         if (profilePhoto) update.profileImage = profilePhoto;
        if (galleryImages.length > 0) update.galleryImages = galleryImages;

        const doc = await BloodBank.findOneAndUpdate(
            { healthServeId },
            update,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return {
            statusCode: 200,
            message: "BloodBank saved successfully",
            data: doc,
        };
    } catch (error) {
        console.error("handleBloodBank error:", error);
        return {
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message,
        };
    }
};

exports.gethandleBloodBankData = async (healthServeId) => {
    try {
        if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
            return {
                statusCode: 400,
                message: "Invalid or missing healthServeId",
            };
        }

        const doc = await BloodBank.findOne({ healthServeId });

        if (!doc) {
            return {
                statusCode: 404,
                message: "No BloodBank found for this healthServeId",
            };
        }

        return {
            statusCode: 200,
            message: "BloodBank data retrieved",
            data: doc,
        };
    } catch (error) {
        console.error("gethandleBloodBank error:", error);
        return {
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message,
        };
    }
};





