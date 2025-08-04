const Physiotherapist = require('../../models/physiotherapist')

const mongoose = require("mongoose");


exports.handlePhysiotherapist = async (req, healthServeId) => {
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
            education = [],
            specialInterests = [],
            certifications = [],
            languages = [],
            conditionsTreated = [],
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

        const existing = await Physiotherapist.findOne({ healthServeId });

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
            website,
            education: parseArray(education),
            specialInterests: parseArray(specialInterests),
            certifications: parseArray(certifications),
            languages: parseArray(languages),
            conditionsTreated: parseArray(conditionsTreated),
            therapyPackages: parseArray(therapyPackages),
            testimonials: parseArray(testimonials),
            faqs: parseArray(faqs),
            tags: parseArray(tags),
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
            result = await Physiotherapist.findOneAndUpdate({ healthServeId }, update, { new: true });
        } else {
            result = await Physiotherapist.create(update);
        }

        return {
            statusCode: 200,
            message: `Physiotherapist profile ${existing ? "updated" : "created"} successfully`,
            data: result,
        };
    } catch (error) {
        console.error("handlePhysiotherapist error:", error);
        return {
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message,
        };
    }
};


exports.gethandlePhysiotherapist = async (healthServeId) => {
    try {
        if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
            return {
                statusCode: 400,
                message: "Invalid or missing healthServeId",
            };
        }

        const doc = await Physiotherapist.findOne({ healthServeId });

        if (!doc) {
            return {
                statusCode: 404,
                message: "No Physiotherapist profile found for this healthServeId",
            };
        }

        return {
            statusCode: 200,
            message: "Physiotherapist data retrieved",
            data: doc,
        };
    } catch (error) {
        console.error("gethandlePhysiotherapist error:", error);
        return {
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message,
        };
    }
};