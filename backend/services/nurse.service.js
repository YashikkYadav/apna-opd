const NurseListing = require("../models/nursingStaff");
const HealthServe = require("../models/healthServe");

const getNurseList = async (req, res) => {
    try {
        let { location, page = 1, limit = 10, gender, experience, feeRange, specializations, rating } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        console.log('Filters received:', { gender, specializations, experience, feeRange, rating });
        
        const filter = {};

        // Location filter only
        if (location?.trim()) {
            const matchingHealthIds = await HealthServe.find({
                location: { $regex: location, $options: "i" }
            }).distinct("_id");
            filter.healthServeId = { $in: matchingHealthIds };
        }

        // Get all nurses
        let allNurses = await NurseListing.find(filter).populate("healthServeId");
        console.log('Total nurses before filtering:', allNurses.length);

        // Apply gender filter (client-side)
        if (gender) {
            const genderArray = Array.isArray(gender) ? gender : [gender];
            allNurses = allNurses.filter(nurse => {
                return genderArray.some(g => nurse.gender?.toLowerCase() === g.toLowerCase());
            });
            console.log('After gender filter:', allNurses.length);
        }

        // Apply specializations filter (client-side)
        if (specializations) {
            const specArray = Array.isArray(specializations) ? specializations : [specializations];
            allNurses = allNurses.filter(nurse => {
                return specArray.some(spec => 
                    nurse.specializations?.some(specialization => 
                        specialization.toLowerCase().includes(spec.toLowerCase())
                    )
                );
            });
            console.log('After specializations filter:', allNurses.length);
        }

        // Apply experience filter (client-side since it's string)
        if (experience && Array.isArray(experience) && experience[1] < 50) {
            allNurses = allNurses.filter(nurse => {
                const exp = parseInt(nurse.experience) || 0;
                return exp <= experience[1];
            });
        }

        // Apply fee filter (client-side since it's string)
        if (feeRange && Array.isArray(feeRange) && feeRange[1] < 50000) {
            allNurses = allNurses.filter(nurse => {
                const fee = parseFloat(nurse.perVisitCharges) || 0;
                return fee <= feeRange[1];
            });
        }

        // Apply rating filter (client-side using testimonials)
        if (rating) {
            const ratingArray = Array.isArray(rating) ? rating : [rating];
            allNurses = allNurses.filter(nurse => {
                const calculatedRating = nurse?.testimonials?.length
                    ? (nurse.testimonials.reduce((sum, r) => sum + r.rating, 0) / nurse.testimonials.length)
                    : 0;
                return ratingArray.some(r => {
                    if (r === "4+ Stars") return calculatedRating >= 4;
                    if (r === "3+ Stars") return calculatedRating >= 3;
                    return false;
                });
            });
            console.log('After rating filter:', allNurses.length);
        }

        const total = allNurses.length;
        const nurseList = allNurses.slice((page - 1) * limit, page * limit);

        return res.status(200).json({
            success: true,
            total,
            page,
            pages: Math.ceil(total / limit),
            count: nurseList.length,
            data: nurseList,
        });
    } catch (error) {
        console.error("getNurseList error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { getNurseList };