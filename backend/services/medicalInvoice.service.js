const Invoice = require("../models/medicalInvoice");
const { generateMedicalInvoiceId } = require("../utils/helpers");
const { generateInvoicePDF } = require("../utils/pdfGenerator");
const PharmacyProfile = require("../models/pharmacyProfile");
const {
  validateInvoice,
} = require("../validations/medicalInvoice.vallidation");

const createInvoice = async (medicalId, invoiceData, invoiceId) => {
  try {
    const invoiceValidation = validateInvoice(invoiceData);
    if (!invoiceValidation.success) {
      return {
        statusCode: 400,
        error: invoiceValidation.errors,
      };
    }

    let invoice;
    const invoiceType = invoiceData.invoiceType;

    if (invoiceId) {
      // ✅ Update existing invoice
      const updateData = {
        medicalId,
        invoiceType,
        patientName: invoiceData.patientName,
        patientPhone: invoiceData.patientPhone,
        patientAddress: invoiceData.patientAddress,
        paymentStatus: invoiceData.paymentStatus || "Unbilled",
        paymentMode: invoiceData.paymentMode || "Cash",
        totalAmount: invoiceData.totalAmount || 0,
      };

      if (invoiceType === "Medical") {
        updateData.medicalName = invoiceData.medicalName;
        updateData.medicines = invoiceData.medicines || [];
      } else if (invoiceType === "Hospital") {
        updateData.patientAge = invoiceData.patientAge;
        updateData.patientGender = invoiceData.patientGender;
        updateData.hospitalName = invoiceData.hospitalName;
        updateData.hospitalPhone = invoiceData.hospitalPhone;
        updateData.hospitalAddress = invoiceData.hospitalAddress;
        updateData.regNo = invoiceData.regNo;
        updateData.billNo = invoiceData.billNo;
        updateData.doctorName = invoiceData.doctorName;
        updateData.department = invoiceData.department;
        updateData.admissionDate = invoiceData.admissionDate;
        updateData.dischargeDate = invoiceData.dischargeDate;
        updateData.roomType = invoiceData.roomType;
        updateData.roomNumber = invoiceData.roomNumber;
        updateData.services = invoiceData.services || [];
        updateData.overallDiscount = invoiceData.discount || 0;
        updateData.grandTotal = invoiceData.grandTotal || 0;
      }

      invoice = await Invoice.findByIdAndUpdate(invoiceId, updateData, {
        new: true,
      });

      if (!invoice) {
        return {
          statusCode: 404,
          error: "Invoice not found",
        };
      }
    } else {
      // ✅ Create new invoice
      const generatedInvoiceId = await generateMedicalInvoiceId();

      const invoiceDoc = {
        medicalId,
        invoiceId: generatedInvoiceId,
        invoiceType,
        patientName: invoiceData.patientName,
        patientPhone: invoiceData.patientPhone,
        patientAddress: invoiceData.patientAddress,
        paymentStatus: invoiceData.paymentStatus || "Unbilled",
        paymentMode: invoiceData.paymentMode || "Cash",
        totalAmount: invoiceData.totalAmount || 0,
      };

      if (invoiceType === "Medical") {
        invoiceDoc.medicalName = invoiceData.medicalName;
        invoiceDoc.medicines = invoiceData.medicines || [];
      } else if (invoiceType === "Hospital") {
        invoiceDoc.patientAge = invoiceData.patientAge;
        invoiceDoc.patientGender = invoiceData.patientGender;
        invoiceDoc.hospitalName = invoiceData.hospitalName;
        invoiceDoc.hospitalPhone = invoiceData.hospitalPhone;
        invoiceDoc.hospitalAddress = invoiceData.hospitalAddress;
        invoiceDoc.regNo = invoiceData.regNo;
        invoiceDoc.billNo = invoiceData.billNo;
        invoiceDoc.doctorName = invoiceData.doctorName;
        invoiceDoc.department = invoiceData.department;
        invoiceDoc.admissionDate = invoiceData.admissionDate;
        invoiceDoc.dischargeDate = invoiceData.dischargeDate;
        invoiceDoc.roomType = invoiceData.roomType;
        invoiceDoc.roomNumber = invoiceData.roomNumber;
        invoiceDoc.services = invoiceData.services || [];
        invoiceDoc.overallDiscount = invoiceData.discount || 0;
        invoiceDoc.grandTotal = invoiceData.grandTotal || 0;
      }

      invoice = new Invoice(invoiceDoc);
      await invoice.save();

      // ✅ Update stock only
      if (invoiceData.medicines?.length > 0 || invoiceData.services?.length > 0) {
        for (const med of invoiceData.medicines || invoiceData.services) {
          try {
            const pharmacy = await PharmacyProfile.findOne({
              healthServeId: medicalId,
            });

            if (!pharmacy) {
                return { statusCode: 404, error: "Pharmacy profile not found" };
            }

            const medicine = pharmacy.medicines.id(med.medicineId);
            if (medicine) {
              medicine.stock = medicine.stock - med.quantity;
            }
            await pharmacy.save();
            console.log(`✅ Updated stock for ${med.medicineName}`);
          } catch (err) {
            console.error(
              `❌ Error updating ${med.medicineName}:`,
              err.message
            );
          }
        }

        console.log("✅ Medicine stock update completed");
      }
    }

    // ✅ Generate PDF after invoice creation
    await generateInvoicePDF(invoice);

    return {
      statusCode: invoiceId ? 200 : 201,
      invoice,
      invoiceUrl: `${process.env.SERVER_URL}/public/invoices/invoice_${invoice._id}.pdf`,
    };
  } catch (error) {
    console.error("Error creating/updating invoice:", error);
    return {
      statusCode: 500,
      error: error.message || "Internal server error",
    };
  }
};

const getInvoicesByMedicalId = async (medicalId) => {
  try {
    if (!medicalId) {
      return {
        statusCode: 400,
        message: "medicalId is required",
      };
    }

    const invoices = await Invoice.find({ medicalId });

    return {
      statusCode: 200,
      invoices: invoices || [],
    };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return {
      statusCode: 500,
      error: error.message || "Internal server error",
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
};

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
};

module.exports = {
  createInvoice,
  getInvoicesByMedicalId,
  getInvoiceById,
  deleteInvoiceById,
};
