const invoiceService = require('../services/medicalInvoice.service');

const createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
    const { medicalId, invoiceId } = req.params;

    const invoice = await invoiceService.createInvoice(
      medicalId,
      invoiceData,
      invoiceId
    );
    if (invoice?.error) {
      return res
        .status(invoice.statusCode)
        .send(invoice.error);
    }

    res
      .status(invoice.statusCode)
      .json({
        invoice: invoice.invoice,
        invoiceUrl: invoice.invoiceUrl,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getInvoicesByMedicalId = async (req, res) => {
  try {
    const { medicalId } = req.params;

    const invoice = await invoiceService.getInvoicesByMedicalId(medicalId);
    if (invoice?.error) {
      return res.status(invoice.statusCode).send(invoice.error);
    }

    res.status(invoice.statusCode).json({
      invoices: invoice.invoices,
    });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    const invoice = await invoiceService.getInvoiceById(invoiceId);
    if (invoice?.error) {
      return res
        .status(invoice.statusCode)
        .send(invoice.error);
    }

    res
      .status(invoice.statusCode)
      .json({
        invoice: invoice.invoice,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const deleteInvoiceById = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    const invoice = await invoiceService.deleteInvoiceById(invoiceId);
    if (invoice?.error) {
      return res
        .status(invoice.statusCode)
        .send(invoice.error);
    }

    res
      .status(invoice.statusCode)
      .json({
        invoice: invoice.invoice,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  createInvoice,
  getInvoicesByMedicalId,
  getInvoiceById,
  deleteInvoiceById,
};
