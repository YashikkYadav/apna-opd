const bloodBankProfileModel = require('../../models/bloodBankProfile')
const physiotherapistsProfileModel = require('../../models/physiotherapistsProfile')
const pharmacyProfileModel = require('../../models/pharmacyProfile')
const healthServeModel = require('../../models/healthServe')
const healthlabProfileModel = require('../../models/healthlabProfile')
const ivfClinicModel = require('../../models/ivfClinic')
const UpdateHealthServeData = async (req, healthServeId) => {
    const {
        address,
        locality,
        city,
        pincode,
        state,

    } = req.body

    console.log('req.body', {
        address,
        locality,
        city,
        pincode,
        state,

    })
    const update_health_serve_data = await healthServeModel.updateOne({ _id: healthServeId }, {
        address,
        locality,
        city,
        pincode,
        state,

    }, { upsert: true })
    return update_health_serve_data
}



exports.handleIvfClinic = async (req, healthServeId) => {
    try {

        const files = req.files;
        const {
            about,
            experience,
            introduction,
            licensedBy,
            successRate,
            specialization,
            couplesTreated,
            website
        } = req.body
        const profileImage = files.find(file => file.fieldname === 'profilePhoto_image');
        const profilePhoto =
            `${profileImage?.destination?.split('public/')[1]}/${profileImage?.filename}`


        const galleryImages = files
            .filter(file => file.fieldname === 'galleryImages_image')
            .map(file => `${file?.destination?.split('public/')[1]}/${file?.filename}`);

        let parsedTestimonials = JSON.parse(req.body.testimonials).map(t => ({
            rating: t.rating,
            title: t.title,
            text: t.text,
            author: t.author,
            context: t.context
        }));

        let whyChoose = JSON.parse(req.body.whyChoose)
        let degrees = JSON.parse(req.body.degrees);
        let faqs = JSON.parse(req.body.faqs);
        let services = JSON.parse(req.body.services).map(item => item.name);
        let tags = JSON.parse(req.body.tags)

        const finalData = {
            healthServeId: healthServeId,
            about,
            experience,
            introduction,
            licensedBy,
            successRate,
            specialization,
            couplesTreated,
            faqs,
            website,
            whyChoose,
            testimonials: parsedTestimonials,
            tags,
            degrees,
            services,
            profilePhoto,
            galleryImages,
        }

        console.log('asdaasadad', finalData)
        const storeData = await ivfClinicModel.updateOne(
            { healthServeId: finalData.healthServeId }, // query condition
            { $set: finalData },                        // fields to update
            { upsert: true }                            // insert if not exists
        );

        await UpdateHealthServeData(req, healthServeId)
        return storeData
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

exports.handleLaboratory = async (req, healthServeId) => {
    try {

        const files = req.files;
        const {
            about,
            experience,
            introduction,
            website
          
        } = req.body
        const profileImage = files.find(file => file.fieldname === 'profilePhoto_image');
        const profilePhoto =
            `${profileImage?.destination?.split('public/')[1]}/${profileImage?.filename}`


        const galleryImages = files
            .filter(file => file.fieldname === 'galleryImages_image')
            .map(file => `${file?.destination?.split('public/')[1]}/${file?.filename}`);

        let parsedTestimonials = JSON.parse(req.body.testimonials).map(t => ({
            rating: t.rating,
            title: t.title,
            text: t.text,
            author: t.author,
            context: t.context
        }));

        let tests = JSON.parse(req.body.tests)
        let packages = JSON.parse(req.body.packages);
        let certifications = JSON.parse(req.body.certifications);
        let keyFeatures = JSON.parse(req.body.keyFeatures)
        let faqs = JSON.parse(req.body.faqs);
        let tags = JSON.parse(req.body.tags)

        const finalData = {
            healthServeId: healthServeId,
            about,
            experience,
            introduction,
            keyFeatures,
            certifications,
            packages,
            faqs,
            testimonials: parsedTestimonials,
            tags,
            tests,
            website,

            profilePhoto,
            galleryImages,
        }

        console.log("assdsad",finalData)

        const storeData = await healthlabProfileModel.updateOne(
            { healthServeId: finalData.healthServeId }, // query condition
            { $set: finalData },                        // fields to update
            { upsert: true }                            // insert if not exists
        );

        await UpdateHealthServeData(req, healthServeId)
        return storeData
    } catch (error) {
        console.log('error', error)
        throw error
    }
    return
}
exports.handleMedicalStore = async (req, healthServeId) => {
    try {

        const files = req.files;
        const {
            about,
            experience,
            introduction,
            openTime,
            closeTime,
            website
        } = req.body
        const profileImage = files.find(file => file.fieldname === 'profilePhoto_image');
        const profilePhoto =
            `${profileImage?.destination?.split('public/')[1]}/${profileImage?.filename}`


        const galleryImages = files
            .filter(file => file.fieldname === 'galleryImages_image')
            .map(file => `${file?.destination?.split('public/')[1]}/${file?.filename}`);

        let parsedTestimonials = JSON.parse(req.body.testimonials).map(t => ({
            rating: t.rating,
            title: t.title,
            text: t.text,
            author: t.author,
            context: t.context
        }));

        let servicesOffered = JSON.parse(req.body.servicesOffered)
        let medicines = JSON.parse(req.body.medicines);
        let partnerships = JSON.parse(req.body.partnerships);
        let features = JSON.parse(req.body.features);
        let faqs = JSON.parse(req.body.faqs);
        let tags = JSON.parse(req.body.tags)

        const finalData = {
            healthServeId: healthServeId,
            about,
            experience,
            introduction,
            openTime,
            closeTime,
            servicesOffered,
            medicines,
            partnerships,
            features,
            faqs,
            website,
            testimonials: parsedTestimonials,
            tags,

            profilePhoto,
            galleryImages,
        }

        const storeData = await pharmacyProfileModel.updateOne(
            { healthServeId: finalData.healthServeId }, // query condition
            { $set: finalData },                        // fields to update
            { upsert: true }                            // insert if not exists
        );

        await UpdateHealthServeData(req, healthServeId)
        return storeData
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

exports.handlePhysiotherapist = async (req, healthServeId) => {

    try {

        const files = req.files;
        const {
            about,
            experience,
            introduction,
            establishedYear
        } = req.body
        const profileImage = files.find(file => file.fieldname === 'profilePhoto_image');
        const profilePhoto =
            `${profileImage?.destination?.split('public/')[1]}/${profileImage?.filename}`


        const galleryImages = files
            .filter(file => file.fieldname === 'galleryImages_image')
            .map(file => `${file?.destination?.split('public/')[1]}/${file?.filename}`);

        let parsedTestimonials = JSON.parse(req.body.testimonials).map(t => ({
            rating: t.rating,
            title: t.title,
            text: t.text,
            author: t.author,
            context: t.context
        }));

        let education = JSON.parse(req.body.education);
        let specialInterests = JSON.parse(req.body.specialInterests);
        let languages = JSON.parse(req.body.languages);
        let certifications = JSON.parse(req.body.certifications);
        let conditionsTreated = JSON.parse(req.body.conditionsTreated);
        let therapyPackages = JSON.parse(req.body.therapyPackages)
        let tags = JSON.parse(req.body.tags)

        const finalData = {
            healthServeId: healthServeId,
            about,
            experience,
            introduction,
            education,
            specialInterests,
            languages,
            conditionsTreated,
            therapyPackages,
            testimonials: parsedTestimonials,
            tags,
            certifications,
            profilePhoto,
            galleryImages,
        }

        const storeData = await physiotherapistsProfileModel.updateOne(
            { healthServeId: finalData.healthServeId }, // query condition
            { $set: finalData },                        // fields to update
            { upsert: true }                            // insert if not exists
        );

        await UpdateHealthServeData(req, healthServeId)
        return storeData._id
    } catch (error) {
        console.log('error', error)
        throw error
    }
}



exports.handleBloodBank = async (req, healthServeId) => {

    try {

        const files = req.files;
        const {
            about,
            experience,
            introduction,
            license,
            establishedYear
        } = req.body
        const profileImage = files.find(file => file.fieldname === 'profilePhoto_image');
        const profilePhoto =
            `${profileImage?.destination?.split('public/')[1]}/${profileImage?.filename}`


        const galleryImages = files
            .filter(file => file.fieldname === 'galleryImages_image')
            .map(file => `${file?.destination?.split('public/')[1]}/${file?.filename}`);

        let parsedTestimonials = JSON.parse(req.body.testimonials).map(t => ({
            rating: t.rating,
            title: t.title,
            text: t.text,
            author: t.author
        }));

        let bloodTypes = JSON.parse(req.body.bloodTypes).map(item => item.type);
        let nearbyBloodBanks = JSON.parse(req.body.nearbyBloodBanks).map(item => item.name);
        let facilities = JSON.parse(req.body.facilities).map(item => item.name);
        let certifications = JSON.parse(req.body.certifications).map(item => item.name);
        let tags = JSON.parse(req.body.tags)


        const finalData = {
            healthServeId: healthServeId,
            about,
            experience,
            introduction,
            bloodTypes,
            nearbyBloodBanks,
            facilities, 
            license:license,
            certifications,
            establishedYear,
            testimonials: parsedTestimonials,
            tags,
            profilePhoto,
            galleryImages,
        }

        const storeData = await bloodBankProfileModel.updateOne(
            { healthServeId: finalData.healthServeId }, // query condition
            { $set: finalData },                        // fields to update
            { upsert: true }                            // insert if not exists
        );
        await UpdateHealthServeData(req, healthServeId)

        return storeData._id
    } catch (error) {
        console.log('error', error)
        throw error
    }
}


exports.gethandleBloodBank = async (healthServeId) => {
    const doc = await bloodBankProfileModel.findOne({ healthServeId }).populate('healthServeId')
    return doc

}

exports.gethandlePhysiotherapist = async (healthServeId) => {
    const doc = await physiotherapistsProfileModel.findOne({ healthServeId }).populate('healthServeId')
    console.log('daasaa',doc)
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