"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaStar } from "react-icons/fa"; // For stars
import Image from "next/image";
import { useRouter } from "next/navigation";
import FreeTrialModal from "./Book"


const NurseListings = ({ nurses = [], page = 1, pages = 1, onPageChange, total, onFilterChange }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNurseId, setSelectedNurseId] = useState(null);
  console.log(">", nurses)
  // State for filters (gender, experience, fee range, specializations, rating)
  const [filters, setFilters] = useState({
    gender: [],
    experience: [0, 50], // Min and Max years
    feeRange: [0, 50000], // Min and Max fee
    specializations: [],
    rating: [],
  });


  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      let updatedFilters;
      if (filterType === "gender" || filterType === "specializations" || filterType === "rating") {
        const currentValues = prevFilters[filterType];
        updatedFilters = currentValues.includes(value)
          ? { ...prevFilters, [filterType]: currentValues.filter((item) => item !== value) }
          : { ...prevFilters, [filterType]: [...currentValues, value] };
      } else if (filterType === "experience" || filterType === "feeRange") {
        updatedFilters = { ...prevFilters, [filterType]: value };
      } else {
        updatedFilters = prevFilters;
      }

      // 🔹 Pass updated filters to parent
      if (onFilterChange) onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };




  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col lg:flex-row bg-white-50 p-4 sm:p-8 md:p-12"
    >
      {/* Left Panel: Filters */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-3 mb-8 lg:mb-0 lg:mr-8 lg:sticky lg:top-4 min-h-screen lg:h-screen"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Filters</h3>

        {/* Gender Filter */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Gender</h4>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
              onChange={() => handleFilterChange("gender", "Male")}
              checked={filters.gender.includes("Male")}
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
              onChange={() => handleFilterChange("gender", "Female")}
              checked={filters.gender.includes("Female")}
            />
            <span className="ml-2 text-gray-700">Female</span>
          </label>
        </div>

        {/* Experience Filter */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Experience</h4>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>{filters.experience[0]} years</span>
            <span>{filters.experience[1]} years</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={filters.experience[1]}
            onChange={(e) => handleFilterChange("experience", [0, parseInt(e.target.value)])}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>

        {/* Fee Range Filter */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Fee Range (₹/day)</h4>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>₹{filters.feeRange[0]}</span>
            <span>₹{filters.feeRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={filters.feeRange[1]}
            onChange={(e) => handleFilterChange("feeRange", [0, parseInt(e.target.value)])}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>

        {/* Specializations Filter */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Specializations</h4>
          {["ICU Care", "Elderly Care", "Pediatric", "Post-operative", "COVID Care"].map((spec) => (
            <label key={spec} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
                onChange={() => handleFilterChange("specializations", spec)}
                checked={filters.specializations.includes(spec)}
              />
              <span className="ml-2 text-gray-700">{spec}</span>
            </label>
          ))}
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Rating</h4>
          {
            ["4+ Stars", "3+ Stars"].map((rating) => (
              <label key={rating} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  onChange={() => handleFilterChange("rating", rating)}
                  checked={filters.rating.includes(rating)}
                />
                <span className="ml-2 text-gray-700">{rating}</span>
              </label>
            ))}
        </div>
      </motion.div>

      {/* Right Panel: Nurse Listings */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center mb-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {nurses?.length || 0} nurses available
          </h2>
          <div className="flex bg-white rounded-lg shadow-md p-1 m-2">
            <button
              className={`px-4 py-2 mr-1 rounded-md font-semibold ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
            <button
              className={`px-4 py-2 rounded-md font-semibold ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
          </div>
        </div>

        {/* Nurse Cards (Grid/List View) */}
        <div
          className={`flex-1 overflow-y-auto  gap-6 ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"}`}
        >
          {nurses?.map((nurse) => (

            <motion.div
              key={nurse.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: nurse.id * 0.1 }}
              className={`bg-white border border-gray-200 rounded-2xl shadow p-5 flex flex-col w-full max-w-3xl mb-4 min-h-[300px] max-h-[350px]`}
            >
              {/* Top Row: Avatar, Name, Verified, Location */}
              <div className="flex items-center mb-2">
                {nurse?.profileImage ? (
                  <Image
                    src={`http://localhost:3001/public/${nurse?.profileImage?.replace(/^undefined/, "")
                      }`}
                    alt={nurse?.healthServeId?.name[0]}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover mr-4 border border-gray-200"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {nurse?.healthServeId?.name[0]}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-lg text-gray-900">{nurse?.healthServeId?.name}</span>
                    {nurse.verified && (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Verified</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm">{nurse?.healthServeId?.location}</div>
                </div>
              </div>

              {/* Experience/Languages Row (List view: right aligned) */}
              <div className="flex flex-col gap-2 mb-2">
                {/* Experience */}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-medium">Experience:</span>
                  <span className="text-sm text-gray-900 font-semibold">
                    {nurse.experience} years
                  </span>
                </div>

                {/* Languages */}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-medium">Languages:</span>
                  <span className="text-sm text-gray-900 font-semibold">
                    {Array.isArray(nurse.languages)
                      ? nurse.languages.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(", ")
                      : nurse.languages}
                  </span>
                </div>
              </div>



              {/* Specializations */}
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {nurse.services?.map((spec, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Rating and Fee */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
                <div className="flex items-center gap-2 mb-1 sm:mb-0">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-base ${i < Math.floor(nurse?.testimonials?.length
                          ? (
                            nurse?.testimonials.reduce((sum, r) => sum + r.rating, 0) /
                            nurse?.testimonials.length
                          ).toFixed(1)
                          : "0.0") ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{nurse?.testimonials?.length
                    ? (
                      nurse?.testimonials.reduce((sum, r) => sum + r.rating, 0) /
                      nurse?.testimonials.length
                    ).toFixed(1)
                    : "0.0"}</span>
                  <span className="text-gray-500 text-xs">({nurse?.testimonials?.length} reviews)</span>
                </div>
              </div>
              <div className="text-green-700 text-xl font-bold">₹{nurse?.perVisitCharges}/day</div>


              {/* Actions: Book Now fills row, View Profile right-aligned */}
              <div className="flex w-full gap-2 mt-2">
                <button
                  onClick={() => setSelectedNurseId(nurse?.healthServeId?._id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-base shadow-sm"
                >
                  Book Now
                </button>

                {selectedNurseId && (
                  <FreeTrialModal
                    isOpen={!!selectedNurseId}
                    onClose={() => setSelectedNurseId(null)}
                    healthId={selectedNurseId}
                  />
                )}
                
                <button
                  onClick={() => router.push(`/detail/nursingStaff/${nurse?.healthServeId?._id}`)}
                  className="w-40 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold py-3 rounded-lg transition-colors text-base shadow-sm">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* 🔹 Pagination Controls */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {pages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NurseListings;