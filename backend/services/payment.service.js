const axios = require("axios");
const Payment = require("../models/payment");
const Doctor = require("../models/doctor");
const HealthServe = require("../models/healthServe");
const { v4: uuidv4 } = require("uuid");
const googleService = require("./google.service");

const createPaymentObject = async (data) => {
  try {
    const { type, amount, subscriptionType } = data;

    if (!type || !amount || !subscriptionType) {
      return {
        statusCode: 400,
        error: "Please Fill Type, Amount and Subscription Type",
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
};

const createPaymentLinkForEntity = async (
  entityType,
  entityData,
  subscriptionType,
  paymentType = "registration",
  emails = []
) => {
  try {
    console.log("Check 1");
    if (!entityType || !entityData || !subscriptionType) {
      return {
        statusCode: 400,
        error: "Please provide entity type, entity data and subscription type",
      };
    }

    const entity = await Payment.findOne({
      type: entityType,
      subscriptionType,
    });
    let meetLink = "";
    console.log(typeof paymentType);
    console.log(paymentType);
    if (paymentType == "appointment") {
      meetLink = await googleService.getMeetLink(emails);
    }

    let data = {};

    if (paymentType === "registration") {
      data = {
        amount: entity.amount * 100,
        currency: "INR",
        accept_partial: false,
        reference_id: uuidv4(),
        description: `Payment for ${paymentType} fee of ${entityType}`,
        customer: {
          name: entityData.name,
          contact: entityData.phone,
          email: entityData.email,
        },
        notify: {
          sms: false,
          email: false,
        },
        reminder_enable: true,
        notes: {
          entity: entityType,
          policy_name: "Registration Fees",
        },
        callback_url: `${process.env.FRONTEND_URL}/success-registration?`,
        callback_method: "get",
      };
    } else {
      data = {
        amount: 100,
        currency: "INR",
        accept_partial: false,
        reference_id: uuidv4(),
        description: `Payment for ${paymentType} fee of ${entityType}`,
        customer: {
          name: entityData.name,
          contact: entityData.phone,
          email: entityData.email,
        },
        notify: {
          sms: false,
          email: false,
        },
        reminder_enable: true,
        notes: {
          entity: entityType,
          policy_name: "Registration Fees",
        },
        callback_url: `${process.env.FRONTEND_URL}/success-registration?meetLink=${meetLink}`,
        callback_method: "get",
      };
    }
    console.log("Check 2");
    console.log("Check 3");

    const response = await axios.post(
      "https://api.razorpay.com/v1/payment_links/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: process.env.RAZORPAY_KEY_ID,
          password: process.env.RAZORPAY_KEY_SECRET,
        },
      }
    );

    console.log("Payment Link : ", response.data);
    return;

    return {
      statusCode: 201,
      paymentData: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const createPaymentLinkForAmount = async (amount, entityData) => {
  try {
    if (!amount || !entityData) {
      return {
        statusCode: 400,
        error: "Please provide Amount and entityData",
      };
    }

    const queryParams = new URLSearchParams({
      doctorName: entityData.doctorName,
      appointmentDate: entityData.appointmentDate,
      appointmentTime: entityData.appointmentTime,
      appointmentMode: entityData.appointmentMode,
      meetLink: entityData.meetLink,
      location: entityData.location,
    }).toString();

    let data = {
      amount: amount * 100,
      currency: "INR",
      accept_partial: false,
      reference_id: "TS1995",
      description: `Appointment Booking Payment of Amount ${amount}`,
      customer: {
        name: entityData.name,
        contact: entityData.phone,
        email: entityData.email,
      },
      notify: {
        sms: false,
        email: false,
      },
      reminder_enable: true,
      notes: {
        policy_name: "Appointment Fees",
      },
      callback_url: `${process.env.FRONTEND_URL}/success?${queryParams}`,
      callback_method: "get",
    };

    const response = await axios.post(
      "https://api.razorpay.com/v1/payment_links/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response: ", response);

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
};

const webhook = async (requestData) => {
  try {
    if (requestData?.event === "payment_link.paid") {
      if (requestData?.payload?.payment?.entity?.notes?.entity === "doctor") {
        const rawPhoneNumber = requestData?.payload?.payment?.entity?.contact;
        const sanitizedPhoneNumber = rawPhoneNumber.replace(/^\+91/, "");

        const response = await Doctor.findOneAndUpdate(
          {
            phoneNumber: sanitizedPhoneNumber.toString(),
          },
          {
            paymentStatus: true,
            paymentObject: requestData.payload,
          },
          {
            new: true,
          }
        );

        console.log("Response here in webhook: ", response);
      } else {
        const rawPhoneNumber = requestData?.payload?.payment?.entity?.contact;
        const sanitizedPhoneNumber = rawPhoneNumber.replace(/^\+91/, "");

        const response = await HealthServe.findOneAndUpdate(
          {
            phone: sanitizedPhoneNumber.toString(),
          },
          {
            paymentStatus: true,
            paymentObject: requestData.payload,
          },
          {
            new: true,
          }
        );

        console.log("Response here in webhook: ", response);
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

module.exports = {
  createPaymentObject,
  createPaymentLinkForEntity,
  createPaymentLinkForAmount,
  webhook,
};
