const Invoice = require('../models/medicalInvoice');
const { generateMedicalInvoiceId } = require('../utils/helpers');
const { generateInvoicePDF } = require('../utils/pdfGenerator');
const { validateInvoice } = require('../validations/medicalInvoice.vallidation');

const createInvoice = async ( medicalId, invoiceData, invoiceId ) => {
  try {
    const {
      patientName,
      patientAddress,
      patientPhone,
      paymentStatus,
      medicines,
      totalAmount,
      paymentMode,
      medicalName,
    } = invoiceData;

    const invoiceValidation = validateInvoice(invoiceData);
    if (!invoiceValidation.success) {
      return {
        statusCode: 400,
        error: invoiceValidation.errors,
      };
    }

    let invoice;
    if (invoiceId) {
      invoice = await Invoice.findByIdAndUpdate(
        invoiceId,
        {
          medicalId,
          patientName,
          patientAddress,
          patientPhone,
          paymentStatus,
          medicines,
          totalAmount,
          paymentMode,
          medicalName,
        },
        { new: true }
      );

      if (!invoice) {
        return {
          statusCode: 404,
          error: 'Invoice not found',
        };
      }
    } else {
      const invoiceId = await generateMedicalInvoiceId();
      invoice = new Invoice({
        invoiceId,
        medicalId,
        patientName,
        patientAddress,
        patientPhone,
        paymentStatus,
        medicines,
        totalAmount,
        paymentMode,
        medicalName,
      });
      await invoice.save();
    }
    await generateInvoicePDF(invoice);

    return {
      statusCode: 201,
      invoice,
      invoiceUrl: `${process.env.SERVER_URL}/public/invoices/invoice_${invoice._id}.pdf`,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const getInvoicesBymedicalId = async (medicalId) => {
  try {
    const invoices = await Invoice.find({
      medicalId,
    });

    return {
      statusCode: 200,
      invoices: invoices,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getInvoiceById = async (invoiceId) => {
  try {
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return {
        statusCode: 404,
        error: `Invoice with Id ${invoiceId} not found`,
      };
    }

    return {
      statusCode: 200,
      invoice: invoice,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const deleteInvoiceById = async (invoiceId) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!invoice) {
      return {
        statusCode: 404,
        error: `Invoice with Id ${invoiceId} not found`,
      };
    }

    return {
      statusCode: 204,
      invoice: invoice,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

module.exports = {
  createInvoice,
  getInvoicesBymedicalId,
  getInvoiceById,
  deleteInvoiceById,
};
