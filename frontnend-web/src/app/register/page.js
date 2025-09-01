"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback, useMemo } from "react";
import { Select, Spin, message } from "antd";
import axiosInstance from "../config/axios";
import { useRouter } from "next/navigation";
import { searchCities } from "../services/locationService";
import debounce from "lodash/debounce";
import { Flip, toast, ToastContainer } from "react-toastify";
import { specialties } from "./../data/constants";

const Register = () => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    registrationFor: null,
    location: null,
    rmcNumber: "",
    clinicName: "",
    speciality: "",
    subscriptionType: "",
    user: "",
    bloodGroup: "",
    homeService: "",
    address: "",
    pincode: "",
    city: "",
    locality: "",
    state: "",
    isCash: "",
  });

  const [locationOptions, setLocationOptions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [showPaymentTypeModal, setShowPaymentTypeModal] = useState(false);
  const router = useRouter();

  // Registration type options
  const registrationTypes = [
    { value: "doctor", label: "Doctor" },
    { value: "hospital", label: "Hospital" },
    { value: "vatenary", label: "Veterinary" },
    { value: "emergency", label: "Emergency Service" },
    { value: "ambulance", label: "Ambulance" },
    { value: "gym", label: "Gym" },
    { value: "yoga", label: "Yoga" },
    { value: "nasha_mukti_kendra", label: "Nasha Mukti Kendra" },
    { value: "commercial_meditation", label: "Commercial Meditation" },
    { value: "medical_store", label: "Medical Store" },
    { value: "nursing_medical_college", label: "Nursing & Medical College" },
    { value: "blood_bank", label: "Blood Bank" },
    { value: "physiotherapist", label: "Physiotherapist" },
    { value: "blood_donor", label: "Blood Donor" },
    { value: "nursing_staff", label: "Nursing Staff" },
    { value: "radiologist", label: "Radiologist" },
    { value: "laboratory", label: "Laboratory" },
    { value: "ivf_clinic", label: "IVF Clinic" },
  ];

  const subscriptionTypes = [
    { value: "gold", label: "Gold" },
    { value: "platinum", label: "Platinum" },
    { value: "diamond", label: "Diamond" },
  ];

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const homeServiceOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleTypeSelect = useCallback((value) => {
    setFormData((prev) => ({
      ...prev,
      registrationFor: value,
      // Reset conditional fields when registration type changes
      rmcNumber: "",
      clinicName: "",
      speciality: "",
      bloodGroup: "",
      homeService: "",
      subscriptionType: value === "blood_donor" ? "" : prev.subscriptionType,
    }));
  }, []);

  const handleSubscriptionTypeSelect = useCallback((value) => {
    setFormData((prev) => ({ ...prev, subscriptionType: value }));
  }, []);

  const handleUserChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, user: value }));
  }, []);

  const handleBloodGroupChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, bloodGroup: value }));
  }, []);

  const handleHomeServiceChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, homeService: value }));
  }, []);

  const togglePasswordVisibility = useCallback((field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  }, []);

  // Memoized debounced location search
  const debouncedLocationSearch = useMemo(
    () =>
      debounce(async (value) => {
        if (value?.length < 2) {
          setLocationOptions([]);
          return;
        }

        setLocationLoading(true);
        try {
          const locations = await searchCities(value);
          if (Array.isArray(locations)) {
            setLocationOptions(
              locations.map((location) => ({
                value: location.label,
                label: location.label,
              }))
            );
          } else {
            setLocationOptions([]);
          }
        } catch (error) {
          console.error("Failed to fetch locations:", error);
          message.error("Failed to fetch locations");
          setLocationOptions([]);
        } finally {
          setLocationLoading(false);
        }
      }, 300),
    []
  );

  const handleLocationSearch = useCallback(
    (value) => {
      debouncedLocationSearch(value);
    },
    [debouncedLocationSearch]
  );

  const handleLocationChange = useCallback((value) => {
    setFormData((prev) => ({
      ...prev,
      location: value,
    }));
  }, []);

  const validateEmail = useCallback((email) => {
    // Only check for valid email format, not for numbers in email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }, []);

  const validateMobile = useCallback((mobile) => {
    return mobile && mobile.replaceAll(" ", "").length === 10 && /^\d{10}$/.test(mobile.replaceAll(" ", ""));
  }, []);

  const validatepincode = useCallback((pincode) => {
    return pincode && pincode.trim().length === 6 && /^\d{6}$/.test(pincode);
  }, []);

  // Validation function
  const validateForm = useCallback(() => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Name is required");
    if (!validateEmail(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    if (!validateMobile(formData.mobile))
      errors.push("Mobile number must be exactly 10 digits");
    if (!formData.registrationFor)
      errors.push("Please select a registration type");
    if (!formData.location) errors.push("Please select a location");
    if (!formData.address.trim()) errors.push("Address is required");
    if (!validatepincode(formData.pincode))
      errors.push("Pin code must be exactly 6 digits");
    if (!formData.city.trim()) errors.push("City is required");
    if (!formData.state.trim()) errors.push("State is required");

    // Password validation for non-blood donors
    if (formData.registrationFor !== "blood_donor") {
      if (!formData.password) errors.push("Password is required");
      if (formData.password.length < 6)
        errors.push("Password must be at least 6 characters");
      if (!formData.confirmPassword)
        errors.push("Confirm password is required");
      if (formData.password !== formData.confirmPassword)
        errors.push("Passwords do not match");
      if (!formData.subscriptionType)
        errors.push("Please select a subscription type");
    }

    // Doctor specific validations
    if (formData.registrationFor === "doctor") {
      if (!formData.rmcNumber.trim()) errors.push("RMC Number is required");
      if (!formData.clinicName.trim()) errors.push("Clinic Name is required");
    }

    // Blood donor specific validations
    if (formData.registrationFor === "blood_donor") {
      if (!formData.bloodGroup) errors.push("Blood group is required");
    }

    // Home service validations
    const homeServiceTypes = [
      "nursing_staff",
      "vatenary",
      "physiotherapist",
      "laboratory",
    ];
    if (
      homeServiceTypes.includes(formData.registrationFor) &&
      !formData.homeService
    ) {
      errors.push("Please specify if you provide home service");
    }

    return errors;
  }, [formData, validateEmail, validateMobile, validatepincode]);

  const handleDoctorRegistration = async () => {
    const payload = {
      name: formData.name,
      phoneNumber: formData.mobile.replaceAll(" ", ""),
      email: formData.email,
      password: formData.password,
      rmcNumber: formData.rmcNumber,
      clinicName: formData.clinicName,
      location: formData.location,
      address: formData.address,
      pincode: formData.pincode,
      city: formData.city,
      locality: formData.locality,
      state: formData.state,
      speciality: formData.speciality,
      subscriptionType: formData.subscriptionType,
      user:
        formData.user === "Select User" || !formData.user
          ? null
          : formData.user,
      isCash: formData.isCash,
    };
  
    

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post("/doctor", payload);
      if (response.doctor) {
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 1500,
          closeOnClick: false,
          transition: Flip,
        });
        setRegisterSuccess(true);

        if (response.paymentUrl) {
          setTimeout(() => {
            window.location.href = response.paymentUrl.paymentLink;
          }, 2000);
        } else {
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Doctor registration error:", error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (error) => {
    if (typeof error === "string") return error;
    if (error?.response?.data) {
      const data = error.response.data;
      // Handle MongoDB duplicate key error (code 11000)
      if (data?.code === 11000 || data?.errorResponse?.code === 11000) {
        return "This email is already registered. Please use a different email.";
      }
      if (typeof data === "string") return data;
      if (data.error) return data.error;
      if (data.message) return data.message;
      if (Array.isArray(data) && data[0]?.message) return data[0].message;
    }
    if (error?.message) return error.message;
    return "Something went wrong. Please try again.";
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    // Check for Vinod user payment selection
    if (formData.user) {
      const selectedUser = users.find((user) => user.value === formData.user);
      const userName = selectedUser ? selectedUser.label : "";

      if (userName.trim() === "Vinod" && formData.isCash === "") {
        setShowPaymentTypeModal(true);
        return;
      }
    }

    // Handle doctor registration separately
    if (formData.registrationFor === "doctor") {
      await handleDoctorRegistration();
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        type: formData.registrationFor,
        name: formData.name,
        phone: formData.mobile.replaceAll(" ", ""),
        email: formData.email,
        location: formData.location,
        address: formData.address,
        pincode: formData.pincode,
        city: formData.city,
        locality: formData.locality,
        state: formData.state,
        isCash: formData.isCash,
      };

      if (formData.registrationFor !== "blood_donor") {
        payload.password = formData.password;
        payload.subscriptionType = formData.subscriptionType;
      }

      if (formData.registrationFor === "blood_donor") {
        payload.bloodGroup = formData.bloodGroup;
      }

      const homeServiceTypes = [
        "nursing_staff",
        "vatenary",
        "physiotherapist",
        "laboratory",
      ];
      if (homeServiceTypes.includes(formData.registrationFor)) {
        payload.homeService = formData.homeService;
      }

      const response = await axiosInstance.post("/health-serve/", payload);
      if (response) {
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 1500,
          closeOnClick: false,
          transition: Flip,
        });
        setRegisterSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
          if (
            formData.registrationFor !== "blood_donor" &&
            response.paymentUrl
          ) {
            window.location.href = response.paymentUrl;
          } else {
            router.back();
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const convertUsersToSelectOptions = useCallback((users) => {
    return (
      users?.map((user) => ({
        value: user._id,
        label: `${user.firstName} ${user.lastName}`,
      })) || []
    );
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const userData = await axiosInstance.get("/user");
      const options = convertUsersToSelectOptions(userData.user);
      setUsers([{ value: "", label: "Select User" }, ...options]);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, [convertUsersToSelectOptions]);

  const handlePaymentChoice = useCallback((choice) => {
    setFormData((prev) => ({ ...prev, isCash: choice }));
    setShowPaymentTypeModal(false);
  }, []);

  const onClosePaymentModal = useCallback(() => {
    setShowPaymentTypeModal(false);
  }, []);

  // Effects
  useEffect(() => {
    fetchUsers();
    return () => {
      debouncedLocationSearch.cancel();
    };
  }, [fetchUsers, debouncedLocationSearch]);

  useEffect(() => {
    if (formData.isCash !== "" && !showPaymentTypeModal) {
      handleSubmit();
    }
  }, [formData.isCash]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check if home service field should be shown
  const showHomeService = [
    "physiotherapist",
    "vatenary",
    "nursing_staff",
    "laboratory",
  ].includes(formData.registrationFor);

  if (registerSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
            Registration Successful
          </h2>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600">
              Your registration has been completed successfully!
            </p>
            <p className="text-center text-gray-800 font-medium">
              Now you need to complete your profile to continue
            </p>
            <p className="text-blue-600 font-medium">
              Redirecting to Payment Page...
            </p>
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 md:pt-[60px]">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
          Register
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Registration Type */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration For <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.registrationFor}
              onChange={handleTypeSelect}
              placeholder="Select Registration Type"
              options={registrationTypes}
              className="w-full"
              size="large"
              showSearch
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>

          {/* Subscription Type */}
          {formData.registrationFor &&
            formData.registrationFor !== "blood_donor" && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Type <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.subscriptionType}
                  onChange={handleSubscriptionTypeSelect}
                  placeholder="Select Subscription Type"
                  options={subscriptionTypes}
                  className="w-full"
                  size="large"
                />
              </div>
            )}

          {/* User */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <Select
              value={formData.user}
              onChange={handleUserChange}
              placeholder="Select User"
              options={users}
              className="w-full"
              size="large"
              showSearch
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter 10-digit mobile number"
              autoComplete="tel"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <Select
              showSearch
              value={formData.location}
              placeholder="Search for a Location"
              onSearch={handleLocationSearch}
              onChange={handleLocationChange}
              loading={locationLoading}
              filterOption={false}
              options={locationOptions}
              className="w-full"
              size="large"
              notFoundContent={
                locationLoading ? "Loading..." : "No locations found"
              }
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your complete address"
              rows={1}
              autoComplete="street-address"
            />
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pin Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter 6-digit pin code"
              maxLength={6}
              autoComplete="postal-code"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter city"
              autoComplete="address-level2"
            />
          </div>

          {/* Locality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Locality
            </label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter locality"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter state"
              autoComplete="address-level1"
            />
          </div>

          {/* Doctor Specific Fields */}
          {formData.registrationFor === "doctor" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RMC Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rmcNumber"
                  value={formData.rmcNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter RMC Number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter clinic name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speciality
                </label>
                <Select
                  value={formData.speciality}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, speciality: value }))
                  }
                  placeholder="Select Speciality"
                  options={specialties?.map((specialty) => ({
                    value: specialty,
                    label: specialty,
                  }))}
                  className="w-full"
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </div>
            </>
          )}

          {/* Blood Group for Blood Donors */}
          {formData.registrationFor === "blood_donor" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <Select
                showSearch
                value={formData.bloodGroup}
                onChange={handleBloodGroupChange}
                placeholder="Select blood group"
                options={bloodGroupOptions}
                className="w-full"
                size="large"
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().includes(input.toLowerCase())
                }
                allowClear
              />
            </div>
          )}

          {/* Home Service */}
          {showHomeService && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Home Service / Door Service{" "}
                <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.homeService}
                onChange={handleHomeServiceChange}
                placeholder="Do you provide home service?"
                options={homeServiceOptions}
                className="w-full"
                size="large"
              />
            </div>
          )}

          {/* Password Fields for Non-Blood Donors */}
          {formData.registrationFor &&
            formData.registrationFor !== "blood_donor" && (
              <>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter password (min 6 characters)"
                      autoComplete="new-password"
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() => togglePasswordVisibility("password")}
                    >
                      <img
                        src={
                          showPassword
                            ? "/register/eyeClose.svg"
                            : "/register/eye.svg"
                        }
                        alt="toggle password visibility"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      <img
                        src={
                          showConfirmPassword
                            ? "/register/eyeClose.svg"
                            : "/register/eye.svg"
                        }
                        alt="toggle confirm password visibility"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </>
            )}

          {/* Submit Button */}
          <button
            type="submit"
            className="md:col-span-2 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Spin size="small" className="mr-2" />
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {/* Payment Type Modal */}
      {showPaymentTypeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 transform transition-all">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Choose Payment Method
              </h2>
              <p className="text-sm text-gray-600">
                Select your preferred payment option to continue
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => handlePaymentChoice("cash")}
                className="flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-200 font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Pay with Cash
              </button>

              <button
                onClick={() => handlePaymentChoice("razorpay")}
                className="flex items-center justify-center gap-3 bg-blue-50 text-blue-700 border border-blue-200 py-3 px-4 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition duration-200 font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Pay with Razorpay
              </button>
            </div>

            <button
              onClick={onClosePaymentModal}
              className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 hover:underline py-2 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Flip}
        limit={3}
        toastClassName="shadow-lg"
      />
    </div>
  );
};

export default Register;
