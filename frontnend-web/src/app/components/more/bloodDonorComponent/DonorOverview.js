"use client";

import { motion } from "framer-motion";
import {
  User,
  HeartPulse,
  GraduationCap,
  Languages,
  CheckCircle,
} from "lucide-react";

const OverviewSection = ({ healthProfile }) => {
  console.log("healthProfile:", healthProfile);
  const getEligibility = (lastDonationDate) => {
    const today = new Date();
    const lastDonation = new Date(lastDonationDate);
    const diffTime = Math.abs(today - lastDonation);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 90;
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="mb-8 flex items-center gap-3">
        <User className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Overview
        </h2>
      </div>
      {/* About Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 transition-all shadow-md mb-5"
      >
        <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
          <HeartPulse className="w-6 h-6" /> About
        </h3>
        <p className="text-gray-700 text-base leading-relaxed">
          {healthProfile?.about}
        </p>
      </motion.div>
      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Details */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 transition-all shadow-md"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" /> Varification Details
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
            <li>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-semibold">
                  Verified Donor
                </span>
              </div>
            </li>
            <li>
              <strong>ID Type:</strong> {healthProfile?.idProofType}
            </li>
            <li>
              <strong>ID Number:</strong> XXXX-XXXX-
              {healthProfile?.idProofNumber.slice(9, 13)}
            </li>
          </ul>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 transition-all shadow-md"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" /> MedicaL Information
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
            <li>
              <strong>Total Donations:</strong>{" "}
              {healthProfile?.numberOfDonations || "N/A"}
            </li>
            <li>
              <strong>Last Donation Date:</strong>{" "}
              {healthProfile?.lastDonationDate || "N/A"}
            </li>
            <li>
              <strong>Current Status:</strong>{" "}
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {healthProfile?.eligibilityStatus
                  ? "Eligible to Donate"
                  : "Not Eligible"}
              </span>
            </li>
          </ul>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 transition-all shadow-md"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" /> Personal Information
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
            <li>
              <strong>DOB:</strong> {healthProfile?.dob || "N/A"}
            </li>
            <li>
              <strong>Weight:</strong> {healthProfile?.weight || "N/A"} Kgs
            </li>
            <li>
              <strong>Emergency:</strong>{" "}
              {healthProfile?.emergencyAvailability ? "Available" : "N/A"}
            </li>
          </ul>
        </motion.div>

        {/* Languages */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 transition-all shadow-md"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
            <Languages className="w-6 h-6" /> Languages
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
            {healthProfile?.languagesSpoken?.map((lang, idx) => (
              <li key={idx}>{lang}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OverviewSection;
