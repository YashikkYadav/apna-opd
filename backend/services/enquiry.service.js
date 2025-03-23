const Enquiry = require('../models/enquiry');
const { validateEnquiry } = require('../validations/enquiry.validation');

const createEnquiry = async ( healthServeId, data ) => {
  try {
    const {
      name,
      phone,
      enquiry,
    } = data;

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
}

const getEnquiryById = async ( enquiryId ) => {
  try {
    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      return {
        statusCode: 404,
        error: 'Enquiry not found',
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
}

const getAllEnquiries = async (healthServeId, page = 1, limit = 10, searchQuery = "") => {
  try {
    const pageNumber = Math.max(parseInt(page, 10), 1);
    const limitNumber = Math.max(parseInt(limit, 10), 1);
    const skip = (pageNumber - 1) * limitNumber;

    if (!healthServeId) {
      return {
        statusCode: 400,
        error: 'HealthServeId is required',
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

    console.log('Search query: ', searchFilter, searchQuery);

    const totalCount = await Enquiry.countDocuments(searchFilter);
    const enquiries = await Enquiry.find(searchFilter)
      .select("_id name phone enquiry")
      .skip(skip)
      .limit(limitNumber);

    console.log('Enquiries: ', enquiries);

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

const deleteEnquiry = async ( enquiryId ) => {
  try {
    if (!enquiryId) {
      return {
        statusCode: 403,
        error: 'EnquiryId are required',
      };
    }

    const enquiry = await Enquiry.findByIdAndDelete(enquiryId);
    if (!enquiry) {
      return {
        statusCode: 404,
        error: 'Enquiry not found',
      };
    }

    return {};
  } catch (error) {
    return {
      statusCode: 500, 
      error: error,
    };
  }
}

module.exports = {
  createEnquiry,
  getEnquiryById,
  getAllEnquiries,
  deleteEnquiry,
};
