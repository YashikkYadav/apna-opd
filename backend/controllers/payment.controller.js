const paymentService = require('../services/payment.service');

const createPaymentObject = async (req, res) => {
  try {
    const data = req.body;

    const payment = await paymentService.createPaymentObject(data);
    if (payment?.error) {
      return res
        .status(payment.statusCode)
        .send(payment.error);
    }

    res
      .status(payment.statusCode)
      .json({
        payment: payment.payment,
      });
  } catch (error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
};

module.exports = {
  createPaymentObject,
};
