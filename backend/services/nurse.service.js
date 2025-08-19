const NurseListing = require("../models/nursingStaff");

const getNurseList = async (req, res) => {
    try {
        let { location, page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const filter = {};
        if (location?.trim()) {
            filter.location = { $regex: location, $options: "i" };
        }

        const total = await NurseListing.countDocuments(filter);

        let query = NurseListing.find(filter).populate("healthServeId");

        // Apply pagination only if results exceed limit
        if (total > limit) {
            query = query.skip((page - 1) * limit).limit(limit);
        }

        const nurseList = await query;

        return res.status(200).json({
            success: true,
            total,
            page,
            pages: total > limit ? Math.ceil(total / limit) : 1,
            count: nurseList.length,
            data: nurseList,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getNurseList };
