const bloodBankProfileModel = require('../../models/bloodBankProfile');
const physiotherapistsProfileModel = require('../../models/physiotherapistsProfile');
const pharmacyProfileModel = require('../../models/pharmacyProfile');
const healthServeModel = require('../../models/healthServe');
const healthlabProfileModel = require('../../models/healthlabProfile');
const ivfClinicModel = require('../../models/ivfClinic');
const gymProfileModel = require('../../models/gym')

const appendImages = (existing = [], fresh = []) => {
    return Array.isArray(existing) ? [...existing, ...fresh] : fresh;
};

const UpdateHealthServeData = async (req, healthServeId) => {
    const { address, locality, city, pincode, state } = req.body;
    return await healthServeModel.updateOne(
        { _id: healthServeId },
        { address, locality, city, pincode, state },
        { upsert: true }
    );
};

exports.handleIvfClinic = async (req, healthServeId) => {
    try {
        const files = req.files || [];
        const existing = await ivfClinicModel.findOne({ healthServeId });

        const profileImage = files.find(f => f.fieldname === 'profilePhoto_image');
        const profilePhoto = profileImage
            ? `${profileImage.destination.split('public/')[1]}/${profileImage.filename}`
            : existing?.profilePhoto;

        const newGalleryImages = files
            .filter(f => f.fieldname === 'galleryImages_image')
            .map(f => `${f.destination.split('public/')[1]}/${f.filename}`);

        const finalData = {
            healthServeId,
            about: req.body.about,
            experience: req.body.experience,
            introduction: req.body.introduction,
            licensedBy: req.body.licensedBy,
            successRate: req.body.successRate,
            specialization: req.body.specialization,
            couplesTreated: req.body.couplesTreated,
            website: req.body.website,
            faqs: JSON.parse(req.body.faqs),
            whyChoose: JSON.parse(req.body.whyChoose),
            degrees: JSON.parse(req.body.degrees),
            services: JSON.parse(req.body.services).map(item => item.name),
            tags: JSON.parse(req.body.tags),
            testimonials: JSON.parse(req.body.testimonials).map(t => t),
            profilePhoto,
            galleryImages: appendImages(existing?.galleryImages, newGalleryImages),
        };

        const storeData = await ivfClinicModel.updateOne(
            { healthServeId },
            { $set: finalData },
            { upsert: true }
        );

        await UpdateHealthServeData(req, healthServeId);
        return storeData;
    } catch (error) {
        console.error('IvfClinic Error:', error);
        throw error;
    }
};

exports.handleLaboratory = async (req, healthServeId) => {
    try {
        const files = req.files || [];
        const existing = await healthlabProfileModel.findOne({ healthServeId });

        const profileImage = files.find(f => f.fieldname === 'profilePhoto_image');
        const profilePhoto = profileImage
            ? `${profileImage.destination.split('public/')[1]}/${profileImage.filename}`
            : existing?.profilePhoto;

        const newGalleryImages = files
            .filter(f => f.fieldname === 'galleryImages_image')
            .map(f => `${f.destination.split('public/')[1]}/${f.filename}`);

        const finalData = {
            healthServeId,
            about: req.body.about,
            experience: req.body.experience,
            introduction: req.body.introduction,
            website: req.body.website,
            faqs: JSON.parse(req.body.faqs),
            tests: JSON.parse(req.body.tests),
            packages: JSON.parse(req.body.packages),
            certifications: JSON.parse(req.body.certifications),
            keyFeatures: JSON.parse(req.body.keyFeatures),
            tags: JSON.parse(req.body.tags),
            testimonials: JSON.parse(req.body.testimonials).map(t => t),
            profilePhoto,
            galleryImages: appendImages(existing?.galleryImages, newGalleryImages),
        };

        const storeData = await healthlabProfileModel.updateOne(
            { healthServeId },
            { $set: finalData },
            { upsert: true }
        );

        await UpdateHealthServeData(req, healthServeId);
        return storeData;
    } catch (error) {
        console.error('Laboratory Error:', error);
        throw error;
    }
};

exports.handleMedicalStore = async (req, healthServeId) => {
    try {
        const files = req.files || [];
        const existing = await pharmacyProfileModel.findOne({ healthServeId });

        const profileImage = files.find(f => f.fieldname === 'profilePhoto_image');
        const profilePhoto = profileImage
            ? `${profileImage.destination.split('public/')[1]}/${profileImage.filename}`
            : existing?.profilePhoto;

        const newGalleryImages = files
            .filter(f => f.fieldname === 'galleryImages_image')
            .map(f => `${f.destination.split('public/')[1]}/${f.filename}`);

        const finalData = {
            healthServeId,
            about: req.body.about,
            experience: req.body.experience,
            introduction: req.body.introduction,
            website: req.body.website,
            openTime: req.body.openTime,
            closeTime: req.body.closeTime,
            servicesOffered: JSON.parse(req.body.servicesOffered),
            medicines: JSON.parse(req.body.medicines),
            partnerships: JSON.parse(req.body.partnerships),
            features: JSON.parse(req.body.features),
            faqs: JSON.parse(req.body.faqs),
            tags: JSON.parse(req.body.tags),
            testimonials: JSON.parse(req.body.testimonials).map(t => t),
            profilePhoto,
            galleryImages: appendImages(existing?.galleryImages, newGalleryImages),
        };

        const storeData = await pharmacyProfileModel.updateOne(
            { healthServeId },
            { $set: finalData },
            { upsert: true }
        );

        await UpdateHealthServeData(req, healthServeId);
        return storeData;
    } catch (error) {
        console.error('MedicalStore Error:', error);
        throw error;
    }
};

exports.handlePhysiotherapist = async (req, healthServeId) => {
    try {
        const files = req.files || [];
        const existing = await physiotherapistsProfileModel.findOne({ healthServeId });

        const profileImage = files.find(f => f.fieldname === 'profilePhoto_image');
        const profilePhoto = profileImage
            ? `${profileImage.destination.split('public/')[1]}/${profileImage.filename}`
            : existing?.profilePhoto;

        const newGalleryImages = files
            .filter(f => f.fieldname === 'galleryImages_image')
            .map(f => `${f.destination.split('public/')[1]}/${f.filename}`);

        const finalData = {
            healthServeId,
            about: req.body.about,
            experience: req.body.experience,
            introduction: req.body.introduction,
            establishedYear: req.body.establishedYear,
            education: JSON.parse(req.body.education),
            specialInterests: JSON.parse(req.body.specialInterests),
            languages: JSON.parse(req.body.languages),
            therapyPackages: JSON.parse(req.body.therapyPackages),
            conditionsTreated: JSON.parse(req.body.conditionsTreated),
            certifications: JSON.parse(req.body.certifications),
            tags: JSON.parse(req.body.tags),
            testimonials: JSON.parse(req.body.testimonials).map(t => t),
            profilePhoto,
            galleryImages: appendImages(existing?.galleryImages, newGalleryImages),
        };

        const storeData = await physiotherapistsProfileModel.updateOne(
            { healthServeId },
            { $set: finalData },
            { upsert: true }
        );

        await UpdateHealthServeData(req, healthServeId);
        return storeData._id;
    } catch (error) {
        console.error('Physiotherapist Error:', error);
        throw error;
    }
};

exports.handleBloodBank = async (req, healthServeId) => {
    try {
        const files = req.files || [];
        const existing = await bloodBankProfileModel.findOne({ healthServeId });

        // Clean public path
        const getRelativePath = (filePath) => filePath.split('public/')[1];

        const profileImage = files.find(f => f.fieldname === 'profilePhoto_image');
        const profilePhoto = profileImage
            ? getRelativePath(`${profileImage.destination}/${profileImage.filename}`)
            : existing?.profilePhoto;

        const newGalleryImages = files
            .filter(f => f.fieldname === 'galleryImages_image')
            .map(f => getRelativePath(`${f.destination}/${f.filename}`));

        const finalData = {
            healthServeId,
            about: req.body.about,
            experience: req.body.experience,
            introduction: req.body.introduction,
            license: req.body.license,
            establishedYear: req.body.establishedYear,
            bloodTypes: JSON.parse(req.body.bloodTypes).map(i => i.type),
            nearbyBloodBanks: JSON.parse(req.body.nearbyBloodBanks).map(i => i.name),
            facilities: JSON.parse(req.body.facilities).map(i => i.name),
            certifications: JSON.parse(req.body.certifications).map(i => i.name),
            tags: JSON.parse(req.body.tags),
            testimonials: JSON.parse(req.body.testimonials).map(t => t),
            profilePhoto,
            galleryImages: appendImages(existing?.galleryImages, newGalleryImages),
        };

        const storeData = await bloodBankProfileModel.updateOne(
            { healthServeId },
            {
                $set: finalData,
                $unset: { profileImage: "" } // Remove ghost field if it exists
            },
            { upsert: true }
        );

        await UpdateHealthServeData(req, healthServeId);
        return storeData._id;
    } catch (error) {
        console.error('BloodBank Error:', error);
        throw error;
    }
};

exports.handleGym = async (req, healthServeId) => {
    try {
        const files = req.files || [];
        const existing = await gymProfileModel.findOne({ healthServeId });

        const profileImage = files.find(f => f.fieldname === 'profilePhoto_image');
        const profilePhoto = profileImage
            ? `${profileImage.destination.split('public/')[1]}/${profileImage.filename}`
            : existing?.profilePhoto;

        const newGalleryImages = files
            .filter(f => f.fieldname === 'galleryImages_image')
            .map(f => `${f.destination.split('public/')[1]}/${f.filename}`);

        const finalData = {
            healthServeId,
            about: req.body.about,
            experience: req.body.experience,
            introduction: req.body.introduction,
            address: req.body.address,
            locality: req.body.locality,
            city: req.body.city,
            pincode: req.body.pincode,
            state: req.body.state,
            worldFacilities: JSON.parse(req.body.worldFacilities),
            established: req.body.established,
            totalMembers: req.body.totalMembers,
            operatingHours: req.body.operatingHours,
            noOfTrainers: req.body.noOfTrainers,
            trainers: typeof req.body.trainers === 'string' ? JSON.parse(req.body.trainers) : req.body.trainers,
            hours: req.body.hours,
            programs: JSON.parse(req.body.programs),
            regularOpening: req.body.regularOpening,
            regularClosing: req.body.regularClosing,
            sundayOpening: req.body.sundayOpening,
            sundayClosing: req.body.sundayClosing,
            website: req.body.website,
            faqs: JSON.parse(req.body.faqs),
            tags: JSON.parse(req.body.tags),
            plans: JSON.parse(req.body.plans),
            relatedGyms: JSON.parse(req.body.relatedGyms),
            testimonials: JSON.parse(req.body.testimonials),
            profilePhoto,
            galleryImages: appendImages(existing?.galleryImages, newGalleryImages),
        };

        const storeData = await gymProfileModel.updateOne(
            { healthServeId },
            { $set: finalData },
            { upsert: true }
        );

        await UpdateHealthServeData(req, healthServeId);
        return storeData._id;
    } catch (error) {
        console.error('Gym Error:', error);
        throw error;
    }
};

exports.getHandleGym = async (healthServeId) => {
    const doc = await gymProfileModel.findOne({ healthServeId }).populate('healthServeId');
    return doc;
};




exports.gethandleBloodBank = async (healthServeId) => {
    const doc = await bloodBankProfileModel.findOne({ healthServeId }).populate('healthServeId')
    return doc

}

exports.gethandlePhysiotherapist = async (healthServeId) => {
    const doc = await physiotherapistsProfileModel.findOne({ healthServeId }).populate('healthServeId')
    console.log('daasaa', doc)
    return doc

}

exports.gethandleMedicalStore = async (healthServeId) => {
    const doc = await pharmacyProfileModel.findOne({ healthServeId }).populate('healthServeId')
    return doc

}

exports.gethandleLaboratory = async (healthServeId) => {
    const doc = await healthlabProfileModel.findOne({ healthServeId }).populate('healthServeId')
    return doc
}

exports.gethandleIvf = async (healthServeId) => {
    const doc = await ivfClinicModel.findOne({ healthServeId }).populate('healthServeId')
    return doc
}