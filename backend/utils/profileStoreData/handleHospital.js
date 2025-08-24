
const Hospital = require('../../models/hospital')

const mongoose = require("mongoose");

const MedicalCollege = require("../../models/medicalCollege");

const UpdateHealthServeData = async (req, healthServeId) => {
    const { address, locality, city, pincode, state } = req.body;
    return await healthServeModel.updateOne(
        { _id: healthServeId },
        { address, locality, city, pincode, state },
        { upsert: true }
    );
};

exports.handleHospital = async (req, healthServeId) => {
    try {
        const {
            about,
            experience,
            introduction,
            address,
            locality,
            city,
            pincode,
            state,
            keyStats = [],
            accreditations = [],
            awards = [],
            departments = [],
            facilities = [],
            insurance = [],
            payments = [],
            healthPackages = [],
            specialServices = [],
            testimonials = [],
            establishedYear,
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
            keyStats: parseArray(keyStats),
            accreditations: parseArray(accreditations),
            awards: parseArray(awards),
            departments: parseArray(departments),
            facilities: parseArray(facilities),
            insurance: parseArray(insurance),
            payments: parseArray(payments),
            healthPackages: parseArray(healthPackages),
            specialServices: parseArray(specialServices),
            testimonials: parseArray(testimonials),
            establishedYear,
        };

        if (profilePhoto) update.profileImage = profilePhoto;

        const existing = await Hospital.findOne({ healthServeId });

        if (existing) {
            update.galleryImages = [
                ...(existing.galleryImages || []),
                ...newGalleryImages
            ];
        } else {
            update.galleryImages = newGalleryImages;
        }

        const doc = await Hospital.findOneAndUpdate(
            { healthServeId },
            update,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        await UpdateHealthServeData(req, healthServeId);

        return {
            statusCode: 200,
            message: "Hospital saved successfully",
            data: doc,
        };
    } catch (error) {
        console.error("handleHospital error:", error);
        return {
            statusCode: 500,
            message: "Internal Server Error",
            error: `${error.message}`,
        };
    }
};


exports.gethandleHospital = async (healthServeId) => {

    try {
        if (!healthServeId || !mongoose.Types.ObjectId.isValid(healthServeId)) {
            return {
                statusCode: 400,
                message: "Invalid or missing healthServeId",
            };
        }

        const doc = await Hospital.findOne({ healthServeId });

        if (!doc) {
            return {
                statusCode: 404,
                message: "No Hospital found for this healthServeId",
            };
        }

        return {
            statusCode: 200,
            message: "Hospital data retrieved",
            data: doc,
        };
    } catch (error) {
        console.error("gethandleHospital error:", error);
        return {
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message,
        };
    }
};