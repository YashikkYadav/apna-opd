"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const NurseSearch = ({ searchData = {} }) => {
  const [location, setLocation] = useState("");
  const [nurseType, setNurseType] = useState("");
  const [availability, setAvailability] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      location,
      nurseType,
      availability,
      gender,
    });
    // Implement search logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-blue-600 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-4 leading-tight"
      >
        Hire Verified Nursing Staff in Just a Few Clicks
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg sm:text-xl text-center max-w-2xl mb-12 opacity-80"
      >
        Qualified, background-checked nurses for home care, hospital duty, and
        post-operative support.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
        className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-4xl w-full"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="location" className="sr-only">Select Location</label>
              <select
                id="location"
                name="location"
                className="mt-1 block w-full pl-3 pr-10 py-3 text-gray-400 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                {searchData.locations && searchData.locations.map((loc) => (
                  <option key={loc} value={loc.toLowerCase()}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nurseType" className="sr-only">Nurse Type</label>
              <select
                id="nurseType"
                name="nurseType"
                className="mt-1 block w-full pl-3 pr-10 py-3 text-gray-400 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                value={nurseType}
                onChange={(e) => setNurseType(e.target.value)}
              >
                <option value="">Nurse Type</option>
                {searchData.nurseTypes && searchData.nurseTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="availability" className="sr-only">Availability</label>
              <select
                id="availability"
                name="availability"
                className="mt-1 block w-full pl-3 pr-10 py-3 text-gray-400 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="">Availability</option>
                {searchData.availabilities && searchData.availabilities.map((avail) => (
                  <option key={avail} value={avail.toLowerCase()}>{avail}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="gender" className="sr-only">Gender</label>
              <select
                id="gender"
                name="gender"
                className="mt-1 block w-full pl-3 pr-10 py-3 text-gray-400 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                {searchData.genders && searchData.genders.map((gen) => (
                  <option key={gen} value={gen.toLowerCase()}>{gen}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Search Nurses
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NurseSearch; 