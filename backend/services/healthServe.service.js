const HealthServe = require("../models/healthServe");
const HealthServeProfile = require("../models/healthServeProfile");
const HospitalDoctor = require("../models/hospitalDoctor");
const DoctorProfile = require("../models/doctorProfile");

const Veterinary = require("../models/veterinary");
const Laboratory = require("../models/healthlabProfile");
const NursingStaff = require("../models/nursingStaff");
const PhysioTherapist = require("../models/physiotherapist");
const Yoga = require("../models/yoga");
const MedicalStore = require("../models/pharmacyProfile");
const Hospital = require("../models/hospital");
const IVF = require("../models/ivfClinic");
const BloodBank = require("../models/bloodBankProfile");
const Gym = require("../models/gym");
const MedicalCollege = require("../models/medicalCollege");
const Radiologist = require("../models/radiologist");
const BloodDonor = require("../models/bloodDonor");
const Ambulance = require("../models/ambulance");

const {
  getAccessToken,
  getHashedPassword,
  comparePassword,
} = require("../utils/helpers");
const {
  validateHealthServe,
} = require("../validations/healthServe.validation");
const { createPaymentLinkForEntity } = require("./payment.service");

const register = async (data) => {
  try {
    let {
      type,
      name,
      phone,
      email,
      password,
      location,
      address,
      pincode,
      city,
      locality,
      state,
      subscriptionType,
      bloodGroup,
      homeService,
      isCash,
    } = data;
    const healthServeValidation = validateHealthServe(data);
    if (!healthServeValidation.success) {
      return {
        statusCode: 400,
        error: healthServeValidation.errors,
      };
    }

    const isHealthServeExist = await HealthServe.findOne({ phone });
    if (isHealthServeExist) {
      return {
        statusCode: 409,
        error: "Health Serve with same number already exist",
      };
    }
    type = type.replace("-", "_");

    let paymentUrl;
    if (type !== "blood_donor" || isCash === "cash") {
      paymentUrl = await createPaymentLinkForEntity(
        type,
        { name, phone, email },
        subscriptionType
      );
    } else {
      paymentUrl = null;
    }

    let hashedPassword = null;
    if (type !== "blood_donor") {
      hashedPassword = await getHashedPassword(password);
    }

    const healthServeData = {
      type,
      name,
      phone,
      email,
      password: hashedPassword,
      location,
      address,
      pincode,
      city,
      locality,
      state,
      subscriptionType,
    };

    if (isCash === "cash") {
      healthServeData.paymentStatus = true;
      healthServeData.paymentObject = { type: "cash" };
    }

    if (type === "blood_donor" && bloodGroup) {
      healthServeData.bloodGroup = bloodGroup;
    }

    if (
      (type === "nursing_staff" ||
        type === "vatenary" ||
        type === "physiotherapist" ||
        type === "laboratory") &&
      homeService
    ) {
      healthServeData.homeService = homeService;
    }

    const newHealthServe = new HealthServe(healthServeData);

    await newHealthServe.save();

    const newHealthServeProfile = new HealthServeProfile({
      healthServeId: newHealthServe._id,
      type,
      name,
      phone,
      email,
      location,
    });
    await newHealthServeProfile.save();

    if (isCash === "cash") {
      paymentUrl = null;
    }

    return {
      statusCode: 201,
      healthServe: newHealthServe,
      paymentLink: paymentUrl?.paymentLink,
    };
  } catch (error) {
    console.log("Error while creating healthServe in DB : ", error);
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const login = async (data) => {
  try {
    const { phone, email, password, type } = data;

    // Validate presence of either phone or email, plus password and type
    if ((!phone && !email) || !password || !type) {
      return {
        statusCode: 422,
        error: "Missing field: Phone/Email, Password, or Type",
      };
    }

    // Build query dynamically based on input
    const query = { type };
    if (phone) query.phone = phone;
    else query.email = email;

    const healthServe = await HealthServe.findOne(query);
    if (!healthServe) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

    // Uncomment this block if payment check is required
    /*
    if (!healthServe.paymentStatus) {
      const paymentUrl = await createPaymentLinkForEntity(
        healthServe.type,
        {
          name: healthServe.name,
          phone: healthServe.phoneNumber,
          email: healthServe.email
        },
        healthServe.subscriptionType
      );

      return {
        statusCode: 400,
        error: `Please complete your payment. Login is restricted. Payment Link: ${paymentUrl?.paymentData?.short_url}`,
      };
    }
    */

    const passwordCheck = await comparePassword(password, healthServe.password);
    if (!passwordCheck) {
      return {
        statusCode: 401,
        error: "Wrong Password",
      };
    }

    const accessToken = getAccessToken(healthServe);

    return {
      statusCode: 200,
      healthServe: {
        id: healthServe._id,
        phone: healthServe.phone,
        email: healthServe.email,
        accessToken,
        type: healthServe.type,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message || error,
    };
  }
};

const getHealthServeById = async (healthServeId) => {
  try {
    const healthServe = await HealthServe.findById(healthServeId);

    if (!healthServe) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

    return {
      statusCode: 200,
      healthServe,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getAllHealthServes = async (
  type,
  page = 1,
  limit = 10,
  searchQuery = ""
) => {
  try {
    const pageNumber = Math.max(parseInt(page, 10), 1);
    const limitNumber = Math.max(parseInt(limit, 10), 1);
    const skip = (pageNumber - 1) * limitNumber;

    let searchFilter = { type };

    if (searchQuery) {
      searchFilter = {
        location: { $regex: searchQuery, $options: "i" },
      };
    }

    const totalCount = await HealthServe.countDocuments(searchFilter);
    const healthServes = await HealthServe.find(searchFilter)
      .select("_id name phone email location")
      .skip(skip)
      .limit(limitNumber);

    return {
      statusCode: 200,
      healthServes,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
        totalRecords: totalCount,
        pageSize: limitNumber,
        hasNextPage: pageNumber * limitNumber < totalCount,
        hasPrevPage: pageNumber > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const updateHealthServe = async (healthServeId, data) => {
  console.log("update health serve called");
  try {
    const { type, name, phone, email, location } = data;

    const isHealthServeExist = await HealthServe.findByid(healthServeId);
    if (!isHealthServeExist) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

    const updatedHealthServe = await HealthServe.findByIdAndUpdate(
      healthServeId,
      {
        type,
        name,
        phone: phone ?? isHealthServeExist.phone,
        email,
        location,
      },
      { new: true }
    );

    return {
      statusCode: 200,
      healthServe: updatedHealthServe,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const deleteHealthServe = async (healthServeId) => {
  try {
    if (!healthServeId) {
      return {
        statusCode: 403,
        error: "HealthServe Id is required",
      };
    }

    const healthServe = await HealthServe.findByIdAndDelete(healthServeId);
    if (!healthServe) {
      return {
        statusCode: 404,
        error: "Health Serve not found",
      };
    }

    return {};
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getHealthServeList = async (page = 1, location, type, name) => {
  try {
    const limit = 6;
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * limit;

    // Build filter
    const filter = {};

    // Location filter
    const extractCity = (rawLocation) => {
      if (!rawLocation) return "";
      return rawLocation
        .toLowerCase()
        .replace(/^the\s+/i, "")
        .split(",")[0]
        .trim();
    };
    const city = extractCity(location);
    if (city) {
      filter.location = { $regex: new RegExp(city, "i") };
    }

    // Name filter
    if (name) {
      filter.name = { $regex: new RegExp(name, "i") };
    }

    if (type) {
      filter.type = type;
    }

    // ✅ Always use aggregation for profile lookup
    let lookup;
    switch (type) {
      case "hospital":
        lookup = "hospitals";
        break;
      case "gym":
        lookup = "gyms";
        break;
      case "ivf_clinic":
        lookup = "ivfclinics";
        break;
      case "nursing_staff":
        lookup = "nursingstaffs";
        break;
      case "physiotherapist":
        lookup = "physiotherapists";
        break;
      case "laboratory":
        lookup = "healthlabprofiles";
        break;
      case "vatenary":
        lookup = "veterinaries";
        break;
      case "blood_bank":
        lookup = "bloodbanks";
        break;
      case "nursing_medical_college":
        lookup = "medicalcolleges";
        break;
      case "medical_store":
        lookup = "pharmacyprofiles";
        break;
      case "yoga":
        lookup = "yogas";
        break;
      case "radiologist":
        lookup = "radiologistprofiles";
        break;
      case "ambulance":
        lookup = "ambulances";
        break;
      case "blood_donor":
        lookup = "blooddonors"; // ✅ now joins blood donor profile
        break;
      default:
        lookup = "healthserveprofiles";
    }

    let healthServeProfileList = [];
    let total = 0;

    if (lookup) {
      const aggregationPipeline = [
        { $match: filter },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: lookup,
            localField: "_id",
            foreignField: "healthServeId",
            as: "profiles",
          },
        },
      ];

      const totalCountPipeline = [{ $match: filter }, { $count: "count" }];

      const [data, countResult] = await Promise.all([
        HealthServe.aggregate(aggregationPipeline),
        HealthServe.aggregate(totalCountPipeline),
      ]);

      healthServeProfileList = data;
      total = countResult[0]?.count || 0;
    } else {
      // fallback (rare case, if no lookup is needed)
      const [data, count] = await Promise.all([
        HealthServe.find(filter).skip(skip).limit(limit),
        HealthServe.countDocuments(filter),
      ]);

      healthServeProfileList = data;
      total = count;
    }

    return {
      statusCode: 200,
      healthServeProfileList,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message || error,
    };
  }
};

const getDoctors = async (hospitalId) => {
  try {
    const doctors = await HospitalDoctor.find({
      healthServeId: hospitalId.hospitalId,
    }).populate("doctorId");

    const doctorsWithProfile = await Promise.all(
      doctors.map(async (item) => {
        const data_item = await DoctorProfile.findOne({
          doctorId: item.doctorId._id,
        });
        return {
          ...item.toObject(), // Use .toObject() to make the Mongoose document a plain JavaScript object
          doctorProfile: data_item,
        };
      })
    );

    // doctorsWithProfile now contains the final, correctly structured data
    console.log(doctorsWithProfile);
    if (!doctorsWithProfile) {
      return { statusCode: 404, error: "No doctors for this hospital" };
    }

    return { statusCode: 200, doctors: doctorsWithProfile };
  } catch (error) {
    return { statusCode: 500, error: error };
  }
};

const ratingHealthServe = async (healthServeId, ratingData, type) => {
  try {
    const healthServeProfile = await HealthServe.findById(healthServeId);
    if (!healthServeProfile) {
      return { statusCode: 404, error: "Health Serve profile not found" };
    }

    // ✅ Select model dynamically
    let model;
    switch (type) {
      case "hospital":
        model = Hospital;
        break;
      case "gym":
        model = Gym;
        break;
      case "ivf_clinic":
        model = IVF;
        break;
      case "nursing_staff":
        model = NursingStaff;
        break;
      case "physiotherapist":
        model = PhysioTherapist;
        break;
      case "laboratory":
        model = Laboratory;
        break;
      case "vatenary":
        model = Veterinary;
        break;
      case "blood_bank":
        model = BloodBank;
        break;
      case "nursing_medical_college":
        model = MedicalCollege;
        break;
      case "medical_store":
        model = MedicalStore;
        break;
      case "yoga":
        model = Yoga;
        break;
      case "radiologist":
        model = Radiologist;
        break;
      case "ambulance":
        model = Ambulance;
        break;
      case "blood_donor":
        model = BloodDonor;
        break;
      default:
        return { statusCode: 400, error: "Invalid type provided" };
    }

    // ✅ Use Mongoose `$push` to add testimonial directly
    const updatedDoc = await model.findOneAndUpdate(
      { healthServeId }, // find by healthServeId
      { $push: { testimonials: ratingData } }, // push new testimonial
      { new: true } // return updated document
    );

    if (!updatedDoc) {
      return { statusCode: 404, error: `${type} not found` };
    }

    return {
      statusCode: 200,
      message: "Testimonial added successfully",
      data: updatedDoc,
    };
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return { statusCode: 500, error: error.message };
  }
};

module.exports = {
  register,
  login,
  getHealthServeById,
  getAllHealthServes,
  updateHealthServe,
  deleteHealthServe,
  getHealthServeList,
  getDoctors,
  ratingHealthServe,
};
