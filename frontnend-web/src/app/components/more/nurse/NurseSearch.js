"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const NurseSearch = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("Gender");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, gender });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col items-center gap-10"
    >
      {/* Background Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

      {/* Heading */}
      <div className="z-10 text-center space-y-4 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow">
          Hire Verified Nursing Staff in Just a Few Clicks
        </h1>
        <p className="text-white/90 text-lg sm:text-xl opacity-90">
          Qualified, background-checked nurses for home care, hospital duty, and post-operative support.
        </p>
      </div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        className="z-10 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          {/* Location Input */}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 
                 focus:ring-2 focus:ring-[#0C65A0] focus:outline-none"
          />

          {/* Gender Dropdown */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 
                 focus:ring-2 focus:ring-[#0C65A0] focus:outline-none"
          >
            <option value="">Select Gender</option>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="bg-[#0C65A0] hover:bg-[#09507C] text-white text-lg font-bold 
                 px-8 py-3 rounded-lg shadow-md transition hover:scale-105"
          >
            Search
          </button>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default NurseSearch;
