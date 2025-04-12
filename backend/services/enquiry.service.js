const { Mongoose, default: mongoose } = require("mongoose");
const Enquiry = require("../models/enquiry");
const { validateEnquiry } = require("../validations/enquiry.validation");

const createEnquiry = async (healthServeId, data) => {
  try {
    const { name, phone, enquiry } = data;

    const enquiryValidation = validateEnquiry(data);
    if (!enquiryValidation.success) {
      return {
        statusCode: 400,
        error: enquiryValidation.errors,
      };
    }

    const newEnquiry = new Enquiry({
      name,
      phone,
      enquiry,
      healthServeId,
    });
    await newEnquiry.save();

    return {
      statusCode: 201,
      enquiry: newEnquiry,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getEnquiryById = async (enquiryId) => {
  try {
    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      return {
        statusCode: 404,
        error: "Enquiry not found",
      };
    }

    return {
      statusCode: 200,
      enquiry,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getAllEnquiries = async (
  healthServeId,
  page = 1,
  limit = 10,
  searchQuery = ""
) => {
  try {
    const pageNumber = Math.max(parseInt(page, 10), 1);
    const limitNumber = Math.max(parseInt(limit, 10), 1);
    const skip = (pageNumber - 1) * limitNumber;

    if (!healthServeId) {
      return {
        statusCode: 400,
        error: "HealthServeId is required",
      };
    }

    let searchFilter = { healthServeId };

    if (searchQuery) {
      searchFilter.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { phone: { $regex: searchQuery, $options: "i" } },
        { enquiry: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const totalCount = await Enquiry.countDocuments(searchFilter);
    // const enquiries = await Enquiry.find(searchFilter)
    //   .select("_id name phone enquiry")
    //   .skip(skip)
    //   .limit(limitNumber);

    const enquiries = await Enquiry.find(searchFilter);

    return {
      statusCode: 200,
      enquiries,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
        totalRecords: totalCount,
        pageSize: limitNumber,
        hasNextPage: pageNumber * limitNumber < totalCount,
        hasPrevPage: pageNumber > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const updateIsContacted = async (enquiryId) => {
  try {
    if (!enquiryId) {
      return {
        statusCode: 403,
        error: "EnquiryId are required",
      };
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      { isContacted: true },
      { new: true }
    );
    if (!enquiry) {
      return {
        statusCode: 404,
        error: "Enquiry not found",
      };
    }

    return {
      statusCode: 200,
      enquiry,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const deleteEnquiry = async (enquiryId) => {
  try {
    if (!enquiryId) {
      return {
        statusCode: 403,
        error: "EnquiryId are required",
      };
    }

    const enquiry = await Enquiry.findByIdAndDelete(enquiryId);
    if (!enquiry) {
      return {
        statusCode: 404,
        error: "Enquiry not found",
      };
    }

    return {};
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getLast24HoursDataCount = async (healthServeId) => {
  try {
    if (!healthServeId) {
      return {
        statusCode: 400,
        error: "HealthServeId is required",
      };
    }

    const now = new Date();
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    let healthServeIdFilter = healthServeId;
    if (typeof healthServeId === "string") {
      healthServeIdFilter = new mongoose.Types.ObjectId(healthServeId);
    }

    const hourlyEnquiryCounts = await Enquiry.aggregate([
      {
        $match: {
          healthServeId: healthServeIdFilter,
          createdAt: { $gte: last24Hours },
        },
      },
      {
        $project: {
          dateHour: {
            $dateToString: {
              format: "%Y-%m-%d %H",
              date: "$createdAt",
              timezone: "Asia/Kolkata",
            },
          },
        },
      },
      {
        $group: {
          _id: "$dateHour",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const past24HoursTimestamps = [];

    for (let i = 0; i < 24; i++) {
      const hourAgo = new Date(now.getTime() - i * 60 * 60 * 1000); // Subtract i hours from the current time

      const year = hourAgo.getFullYear();
      const month = (hourAgo.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
      const day = hourAgo.getDate().toString().padStart(2, "0");
      const hour = hourAgo.getHours().toString().padStart(2, "0");

      const formattedTimestamp = `${year}-${month}-${day} ${hour}`;
      past24HoursTimestamps.unshift(formattedTimestamp);
    }

    const past24HoursEnquiry = past24HoursTimestamps.map((timestamp) => {
      const match = hourlyEnquiryCounts.find((item) => item._id === timestamp);
      return match ? match.count : 0;
    });

    return {
      statusCode: 200,
      enquiry: past24HoursEnquiry,
    };
  } catch (error) {
    console.error("Error fetching last 24 hours data count:", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const getLast30DaysDataCount = async (healthServeId) => {
  try {
    if (!healthServeId) {
      return {
        statusCode: 400,
        error: "HealthServeId is required",
      };
    }

    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailyData = await Enquiry.aggregate([
      {
        $match: {
          healthServeId,
          createdAt: { $gte: last30Days },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return {
      statusCode: 200,
      data: dailyData,
    };
  } catch (error) {
    console.error("Error fetching last 30 days data count:", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

module.exports = {
  createEnquiry,
  getEnquiryById,
  getAllEnquiries,
  updateIsContacted,
  deleteEnquiry,
  getLast24HoursDataCount,
  getLast30DaysDataCount,
};
