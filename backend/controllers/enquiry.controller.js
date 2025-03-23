const enquiryService = require('../services/enquiry.service');

const createEnquiry = async (req, res) => {
  try {
    const { healthServeId } = req.params;
    const data = req.body;

    const enquiry = await enquiryService.createEnquiry(healthServeId, data);
    if (enquiry?.error) {
      return res
        .status(enquiry.statusCode)
        .send(enquiry.error);
    }

    res
      .status(enquiry.statusCode)
      .json({
        enquiry: enquiry.enquiry,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getEnquiryById = async (req, res) => {
  try {
    const { enquiryId } = req.params;

    const enquiry = await enquiryService.getEnquiryById(enquiryId);
    if (enquiry?.error) {
      return res
        .status(enquiry.statusCode)
        .send(enquiry.error);
    }

    res
      .status(enquiry.statusCode)
      .json({
        enquiry: enquiry.enquiry,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getAllEnquiries = async (req, res) => {
  try {
    const { healthServeId } = req.params;
    const { page, limit, searchQuery } = req.query;

    const enquiries = await enquiryService.getAllEnquiries(healthServeId, page, limit, searchQuery);

    res
      .status(enquiries.statusCode)
      .json({
        enquiries: enquiries.enquiries,
        pagination: enquiries.pagination,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const deleteEnquiry = async (req, res) => {
  try {
    const { enquiryId } = req.params;

    const enquiry = await enquiryService.deleteEnquiry(enquiryId);
    if (enquiry?.error) {
      return res
        .status(enquiry.statusCode)
        .send(enquiry.error);
    }

    res.status(204).json({
      message: `Enquiry deleted successfully`,
    });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  createEnquiry,
  getEnquiryById,
  getAllEnquiries,
  deleteEnquiry,
};
