"use client";
import { useState, useEffect } from "react";
import { Select, Spin, message } from "antd";
import axiosInstance from "../config/axios";
import { useRouter } from "next/navigation";
import { searchCities } from "../services/locationService";
import debounce from "lodash/debounce";
import { Flip, toast, ToastContainer } from "react-toastify";
import { specialties } from "./../data/constants";

const Register = () => {
  const router = useRouter();
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
  });
  const [locationOptions, setLocationOptions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [users, setUsers] = useState([]);

  // Registration type options
  const registrationTypes = [
    { value: "doctor", label: "Doctor" },
    { value: "hospital", label: "Hospital" },
    { value: "vatenary", label: "Vatenary" },
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
  ];

  const subscriptionTypes = [
    { value: "gold", label: "Gold" },
    { value: "platinum", label: "Platinum" },
    { value: "diamond", label: "Diamond" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (value) => {
    setFormData((prev) => ({ ...prev, registrationFor: value }));
  };

  const handleSubscriptionTypeSelect = (value) => {
    setFormData((prev) => ({ ...prev, subscriptionType: value }));
  };

  const handleUserChange = (value) => {
    setFormData((prev) => ({ ...prev, user: value }));
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const debouncedLocationSearch = debounce(async (value) => {
    if (value?.length < 2) {
      setLocationOptions([]);
      return;
    }

    setLocationLoading(true);
    try {
      const locations = await searchCities(value);
      if (Array.isArray(locations)) {
        setLocationOptions(
          locations?.map((location) => ({
            value: location.label,
            label: location.label,
          }))
        );
      } else {
        setLocationOptions([]);
      }
    } catch (error) {
      console.log("Failed to fetch locations:", error);
      message.error("Failed to fetch locations");
      setLocationOptions([]);
    } finally {
      setLocationLoading(false);
    }
  }, 300);

  const handleLocationSearch = (value) => {
    debouncedLocationSearch(value);
  };

  const handleLocationChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      location: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleDoctorRegistration = async () => {
    const payload = {
      name: formData.name,
      phoneNumber: formData.mobile,
      email: formData.email,
      password: formData.password,
      rmcNumber: formData.rmcNumber,
      clinicName: formData.clinicName,
      address: formData.location,
      speciality: formData.speciality,
      subscriptionType: formData.subscriptionType,
      user: formData.user === "Select User" ? null : formData.user,
    };
    try {
      const response = await axiosInstance.post("/doctor", payload);
      if (response.doctor) {
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 1500,
          closeOnClick: false,
          transition: Flip,
        });
        setRegisterSuccess(true);
        setTimeout(() => {
          window.location.href = response.paymentUrl;
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error[0].message ||
            error?.response?.data?.error ||
            error?.response?.data[0]?.message ||
            "Something went wrong. Please try again.";

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (formData.mobile?.length < 10) {
      toast.error("Mobile number must be at least 10 digits!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.registrationFor) {
      toast.error("Please select a registration type!");
      return;
    }
    if (formData.registrationFor === "doctor" && !formData.rmcNumber) {
      toast.error("Please enter RMC Number!");
      return;
    }
    if (formData.registrationFor === "doctor" && !formData.clinicName) {
      toast.error("Please enter Clinic Name!");
      return;
    }
    if (!formData.location) {
      toast.error("Please select a location!");
      return;
    }
    if (formData.registrationFor === "doctor") {
      handleDoctorRegistration();
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        type: formData.registrationFor,
        name: formData.name,
        phone: formData.mobile,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        subscriptionType: formData.subscriptionType,
      };
      const response = await axiosInstance.post("/health-serve/", payload);
      if (response) {
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 1500,
          closeOnClick: false,
          transition: Flip,
        });
        setRegisterSuccess(true);
        setTimeout(() => {
          window.location.href = response.paymentUrl;
        }, 2000);
      }
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        const errorMessage =
          typeof error?.response?.data === "string"
            ? error.response.data
            : error?.response?.data?.error ||
              error?.response?.data[0]?.message ||
              "Something went wrong. Please try again.";

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up debounce on unmount
  useEffect(() => {
    fetchUsers();
    return () => {
      debouncedLocationSearch.cancel();
    };
  }, []);

  function convertUsersToSelectOptions(users) {
    return users?.map((user) => ({
      value: user._id,
      label: user.firstName + " " + user.lastName,
    }));
  }

  useEffect(() => {
    console.log(users);
  }, [users]);

  const fetchUsers = async () => {
    const userData = await axiosInstance.get("/user");
    const temp = convertUsersToSelectOptions(userData.user);
    setUsers([{ value: "", label: "Select User" }, ...temp]);
  };

  return registerSuccess ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Register Success
        </h2>
        <p className="text-center text-sm mt-4">
          Your registration has been successful!
        </p>
        <div className="flex flex-col items-center justify-center">
          <p>Now you need to complete your profile to continue</p>
          <a href="/#" className="text-blue-600 hover:underline">
            Redirecting to Payment Page...
          </a>
          <Spin size="large" />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:pt-[80px]">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Registration Type */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration For
            </label>
            <Select
              value={formData.registrationFor}
              onChange={handleTypeSelect}
              placeholder="Select Registration Type"
              options={registrationTypes}
              className="w-full"
              required
            />
          </div>
          {/* Subscription Type */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subscription Type
            </label>
            <Select
              value={formData.subscriptionType}
              onChange={handleSubscriptionTypeSelect}
              placeholder="Select Subscription Type"
              options={subscriptionTypes}
              className="w-full"
              required
            />
          </div>
          {/* User*/}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User <span className="text-gray-400">(Optional)</span>
            </label>
            <Select
              value={formData.user}
              onChange={handleUserChange}
              placeholder="Select Subscription Type"
              options={users}
              className="w-full"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              minLength={10}
              maxLength={10}
              pattern="\d{10,12}"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <Select
              showSearch
              value={formData.location}
              placeholder="Search for a city"
              onSearch={handleLocationSearch}
              onChange={handleLocationChange}
              loading={locationLoading}
              filterOption={false}
              options={locationOptions}
              className="w-full text-black"
              style={{ color: "black" }}
              required
              notFoundContent={
                locationLoading ? "Loading..." : "No locations found"
              }
            />
          </div>

          {/* Doctor Specific Fields */}
          {formData.registrationFor === "doctor" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RMC Number
                </label>
                <input
                  type="text"
                  name="rmcNumber"
                  value={formData.rmcNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic Name
                </label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
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
                  required
                />
              </div>
            </>
          )}

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md pr-10"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
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
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-md pr-10"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => togglePasswordVisibility("confirmPassword")}
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
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="md:col-span-2 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
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
      />
    </div>
  );
};

export default Register;
