"use client";
import { useState, useEffect } from "react";
import { Select, message } from "antd";
import axiosInstance from "../config/axios";
import { useRouter } from "next/navigation";
import { searchCities } from "../services/locationService";
import debounce from "lodash/debounce";
import Loader from "../components/common-components/Loader";

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
  });
  const [locationOptions, setLocationOptions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Registration type options
  const registrationTypes = [
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (value) => {
    setFormData((prev) => ({ ...prev, registrationFor: value }));
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  // Create a debounced search function
  const debouncedLocationSearch = debounce(async (value) => {
    if (value.length < 2) {
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
  }, 300);

  // Use the debounced function in the handler
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!validateEmail(formData.email)) {
      message.error("Please enter a valid email address!");
      return;
    }

    if (formData.mobile.length < 10) {
      message.error("Mobile number must be at least 10 digits!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    if (!formData.registrationFor) {
      message.error("Please select a registration type!");
      return;
    }

    if (!formData.location) {
      message.error("Please select a location!");
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
      };
      console.log("payload", payload);
      const response = await axiosInstance.post("/health-serve/", payload);
      console.log("response", response);
      
      // Show success message
      message.success({
        content: "Registration successful! Redirecting ...",
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
      
      // Redirect after a delay
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);
      message.error({
        content: typeof error === 'string' ? error : "Registration failed. Please try again.",
        duration: 5,
        style: {
          marginTop: '20vh',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedLocationSearch.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {isSubmitting && <Loader />}
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Registration Type */}
          <div className="md:col-span-2">
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
              maxLength={12}
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
              notFoundContent={locationLoading ? "Loading..." : "No locations found"}
            />
          </div>

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
    </div>
  );
};

export default Register;
