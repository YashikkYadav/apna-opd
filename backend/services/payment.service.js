const axios = require('axios');
const Payment = require('../models/payment');
const { v4: uuidv4 } = require('uuid');

const createPaymentObject = async (data) => {
  try {
    const {
      type,
      amount,
      subscriptionType,
    } = data;

    if (
      !type
      || !amount
      || !subscriptionType
    ) {
      return {
        statusCode: 400,
        error: 'Please Fill Type, Amount and Subscription Type',
      };
    }

    const newPayment = new Payment({
      type,
      amount,
      subscriptionType,
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

const createPaymentLinkForEntity = async (entityType, entityData, subscriptionType) => {
  try {
    if (
      !entityType
      || !entityData
      || !subscriptionType
    ) {
      return {
        statusCode: 400,
        error: 'Please provide entity type, entity data and subscription type',
      };
    }

    const entity = await Payment.findOne({ type: entityType, subscriptionType });

    let data = {
      "amount": entity.amount * 100,
      "currency": "INR",
      "accept_partial": false,
      "reference_id": uuidv4(),
      "description": `Payment for registration fee of ${entityType}`,
      "customer": {
        "name": entityData.name,
        "contact": entityData.phone,
        "email": entityData.email,
      },
      "notify": {
        "sms": false,
        "email": false,
      },
      "reminder_enable": true,
      "notes": {
        "entity": entityType,
        "policy_name": "Registration Fees"
      },
      "callback_url": "https://apnaopd.com/",
      "callback_method": "get"
    };

    const response = await axios.post(
      'https://api.razorpay.com/v1/payment_links/',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        auth: {
          username: process.env.RAZORPAY_KEY_ID,
          password: process.env.RAZORPAY_KEY_SECRET,
        }
      }
    );

    return {
      statusCode: 201,
      paymentData: response.data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const createPaymentLinkForAmount = async (amount, entityData) => {
  try {
    if (
      !amount
      || !entityData
    ) {
      return {
        statusCode: 400,
        error: 'Please provide Amount and entityData',
      };
    }

    let data = {
      "amount": amount,
      "currency": "INR",
      "accept_partial": false,
      "reference_id": "TS1995",
      "description": `Appointment Booking Payment of Amount ${amount}`,
      "customer": {
        "name": entityData.name,
        "contact": entityData.phone,
        "email": entityData.email,
      },
      "notify": {
        "sms": false,
        "email": false,
      },
      "reminder_enable": true,
      "notes": {
        "policy_name": "Appointment Fees"
      },
      "callback_url": "https://www.google.com/",
      "callback_method": "get"
    };

    const response = await axios.post(
      'https://api.razorpay.com/v1/payment_links/',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Response: ', response);

    return {
      statusCode: 201,
      paymentData: response,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

const webhook = async (requestData) => {
  try {
    console.log('Request data: ', requestData);
    console.log('Payload: ', requestData.payload);
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

module.exports = {
  createPaymentObject,
  createPaymentLinkForEntity,
  createPaymentLinkForAmount,
  webhook,
};
