const Payment = require('../models/payment');

const createPaymentObject = async (data) => {
  try {
    const {
      type,
      amount,
    } = data;

    if (
      !type
      || !amount
    ) {
      return {
        statusCode: 400,
        error: 'Please enter both type as well as amount',
      };
    }

    const newPayment = new Payment({
      type,
      amount,
    });
    newPayment.save();

    return {
      statusCode: 201,
      payment: newPayment,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const registerPatient = async (userData) => {
  try {
    const {
      type,
      userId
    } = userData;

    if (
      !type
      || !userId
    ) {
      return {
        statusCode: 400,
        error: 'Please provide type and id, for which you want the payment link',
      };
    }

    return {
      statusCode: 201,
      patient: newPatient,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

module.exports = {
  createPaymentObject,
  
};
