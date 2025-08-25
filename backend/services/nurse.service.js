const NurseListing = require("../models/nursingStaff");
const HealthServe = require("../models/healthServe");

const getNurseList = async (req, res) => {
    try {
        let { location, page = 1, limit = 10, gender } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        console.log("Filters received:", { location, gender, page, limit });

        let filter = {};

        // 🔹 Location filter
        if (location?.trim()) {
            const matchingHealthIds = await HealthServe.find({
                location: { $regex: location, $options: "i" }
            }).distinct("_id");

            if (matchingHealthIds.length > 0) {
                filter.healthServeId = { $in: matchingHealthIds };
            } else {
                return res.status(200).json({
                    success: true,
                    total: 0,
                    page,
                    pages: 0,
                    count: 0,
                    data: []
                });
            }
        }

        // 🔹 Base query (with population)
        let query = NurseListing.find(filter).populate("healthServeId");

        let nurses = await query.exec();

        console.log("Total nurses before filters:", nurses.length);

        // 🔹 Gender filter
        if (gender && gender.toLowerCase() !== "any") {
            const genderArray = Array.isArray(gender) ? gender : [gender];
            nurses = nurses.filter((nurse) =>
                genderArray.some(
                    (g) => nurse.gender?.toLowerCase() === g.toLowerCase()
                )
            );
        }

        const total = nurses.length;

        // 🔹 Pagination (slice on array result)
        const startIndex = (page - 1) * limit;
        const paginatedNurses = nurses.slice(startIndex, startIndex + limit);

        return res.status(200).json({
            success: true,
            total,
            page,
            pages: Math.ceil(total / limit),
            count: paginatedNurses.length,
            data: paginatedNurses
        });
    } catch (error) {
        console.error("getNurseList error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = { getNurseList };
