const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  SALT_ROUNDS,
  JWT_SECRET,
} = require('../config/config');

const Patient = require('../models/patient');
const Invoice = require('../models/invoice');

const getHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
  return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
}

const getAccessToken = (data) => {
  const accessToken = jwt.sign(
    { data },
    JWT_SECRET,
    // { expiresIn: '48h' },
  );
  return accessToken;
}

const verifyAccessToken = async (accessToken) => {
  try {
    const data = jwt.verify(accessToken, JWT_SECRET);
    return data;
  } catch (error) {
    return {
      error: error,
    };
  }
}

const generatePatientUid = async () => {
  try {
    // atomically find the patient with the highest UID number
    // const lastPatient = await Patient.findOne()
    //   .sort({ uid: -1 })
    //   .select("uid -_id");


    // let lastNumber = 0;
    // if (lastPatient && lastPatient.uid) {
    //   lastNumber = parseInt(lastPatient.uid.replace("UID", ""), 10) || 0;
    // }

    // const newNumber = lastNumber + 1;
    // const uid = `UID${newNumber}`;
    const lastPatient = await Patient.aggregate([
      {
        $addFields: {
          uidNumber: {
            $toInt: {
              $substrCP: ["$uid", 3, { $strLenCP: "$uid" }] // extract number after 'UID'
            }
          }
        }
      },
      { $sort: { uidNumber: -1 } },
      { $limit: 1 }
    ]);

    let lastNumber = 0;
    if (lastPatient.length > 0) {
      lastNumber = lastPatient[0].uidNumber;
    }
    

    const newNumber = lastNumber + 1;
    const uid = `UID${newNumber}`;
    console.log(uid);

    return uid;
  } catch (error) {
    return {
      error: "Error generating UID",
    };
  }
};


const generateInvoiceId = async () => {
  try {
    let invoiceId;

    const existingInvoices = await Invoice.find();
    const existingInvoiceIds = existingInvoices.map((invoice) => invoice.invoiceId);

    for (let i = 1; i < 100001; i++) {
      if (i < 10) {
        invoiceId = `UID00000${i}`;
      } else if (i < 100) {
        invoiceId = `UID0000${i}`;
      } else if (i < 1000) {
        invoiceId = `UID000${i}`;
      } else if (i < 10000) {
        invoiceId = `UID00${i}`;
      } else {
        invoiceId = `UID0${i}`;
      }

      if (!existingInvoiceIds.includes(invoiceId)) {
        break;
      }
    }

    return invoiceId;
  } catch (error) {
    return {
      error: "Error generating UID",
    };
  }
};

module.exports = {
  getHashedPassword,
  comparePassword,
  getAccessToken,
  verifyAccessToken,
  generatePatientUid,
  generateInvoiceId,
};
