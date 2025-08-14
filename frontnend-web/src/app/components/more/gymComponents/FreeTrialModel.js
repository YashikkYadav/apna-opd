"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function FreeTrialModal({ isOpen, onClose, healthServeId }) {
  const [errors, setErrors] = useState({});
  const params = useParams();
  const id = params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Monthly Plan");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPhone("");

      setOtpSent(false);
      setOtp("");
      setGeneratedOtp("");
      setVerified(false);
      setSubmitted(false);
      setMsg("");
    }
  }, [isOpen]);

  const sendOtp = () => {
    if (!phone || !/^\d{10}$/.test(phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid 10-digit phone number.",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    alert("Simulated OTP to +91" + phone + ": " + newOtp);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setVerified(true);
      alert("Phone Verified!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!phone || !/^\d{10}$/.test(phone))
      newErrors.phone = "Valid 10-digit phone is required.";
    if (!selectedPlan) newErrors.plan = "Please select a plan.";
    if (!verified) newErrors.otp = "Please verify your phone number.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitted(true);

    const payload = {
      name,
      phone,
      date: new Date().toISOString(),
      enquiry: "991",
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/enquiry/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Submitted:", res.data);
      // Optional: router.push(res.data.redirectUrl)
    } catch (err) {
      console.error("Submission error:", err?.response?.data || err.message);
      alert("Something went wrong. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-200">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Book a Free Trial
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                errors.name
                  ? "border-red-400 ring-red-300"
                  : "border-blue-300 focus:ring-blue-500"
              }`}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="text-red-600 text-xs mb-2">{errors.name}</div>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              className={`w-full mb-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                errors.email
                  ? "border-red-400 ring-red-300"
                  : "border-blue-300 focus:ring-blue-500"
              }`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="text-red-600 text-xs mb-2">{errors.email}</div>
            )}

            <div className="flex gap-2 mb-1">
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                  errors.phone
                    ? "border-red-400 ring-red-300"
                    : "border-blue-300 focus:ring-blue-500"
                }`}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                onClick={sendOtp}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send OTP
              </button>
            </div>
            {errors.phone && (
              <div className="text-red-600 text-xs mb-2">{errors.phone}</div>
            )}

            {otpSent && (
              <div className="mb-3">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                      errors.otp
                        ? "border-red-400 ring-red-300"
                        : "border-blue-300 focus:ring-blue-500"
                    }`}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    onClick={verifyOtp}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Verify
                  </button>
                </div>
                {msg && (
                  <p
                    className={`text-sm font-medium ${
                      msg === "Phone Verified!"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {msg}
                  </p>
                )}
                {errors.otp && (
                  <div className="text-red-600 text-xs mt-1">{errors.otp}</div>
                )}
              </div>
            )}

            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className={`w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                errors.plan
                  ? "border-red-400 ring-red-300"
                  : "border-blue-300 focus:ring-blue-500"
              }`}
            >
              <option value="Monthly Plan">Monthly Plan</option>
              <option value="Quarterly Plan">Quarterly Plan</option>
              <option value="Half-Yearly Plan">Half-Yearly Plan</option>
              <option value="Yearly Plan">Yearly Plan</option>
            </select>
            {errors.plan && (
              <div className="text-red-600 text-xs mb-2">{errors.plan}</div>
            )}

            <button
              disabled={!verified}
              onClick={handleSubmit}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                verified
                  ? "bg-blue-600 hover:bg-blue-700 transition"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              Submit
            </button>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-blue-600 underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-blue-700">Thank you!</h2>
            <p className="text-gray-600">
              Thanks for selecting the{" "}
              <span className="font-semibold text-blue-600">
                {selectedPlan}
              </span>
              . We’ll update you further.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
