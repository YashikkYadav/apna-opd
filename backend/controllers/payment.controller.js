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

const createPaymentLinkForEntity = async (req, res) => {
  try {
    const data= req.body;
    const { entity } = req.params;

    const payment = await paymentService.createPaymentLinkForEntity(entity, data);
    if (payment?.error) {
      return res
        .status(payment.statusCode)
        .send(payment.error);
    }

    res
      .status(payment.statusCode)
      .json({
        payment: payment.paymentData,
      });
  } catch (error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
};

const createPaymentLinkForAmount = async (req, res) => {
  try {
    const data = req.body;
    const { amount } = req.params;

    const payment = await paymentService.createPaymentLinkForAmount(amount, data);
    if (payment?.error) {
      return res
        .status(payment.statusCode)
        .send(payment.error);
    }

    res
      .status(payment.statusCode)
      .json({
        payment: payment.paymentData,
      });
  } catch (error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
};

const webhook = async (req, res) => {
  try {
    const data = req.body;

    const payment = await paymentService.webhook(data);
    if (payment?.error) {
      return res
        .status(payment.statusCode)
        .send(payment.error);
    }

    res
      .status(200)
      .send('ok');
  } catch (error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  createPaymentObject,
  createPaymentLinkForEntity,
  createPaymentLinkForAmount,
  webhook,
};
