const express = require('express');
const invoice = express.Router({ mergeParams: true });
const invoiceController = require('../controllers/medicalInvoice.controller');

invoice.post('/:invoiceId?', invoiceController.createInvoice);
invoice.get("/", invoiceController.getInvoicesBymedicalId);
invoice.get('/:invoiceId', invoiceController.getInvoiceById);
invoice.delete('/:invoiceId', invoiceController.deleteInvoiceById);

module.exports = invoice;