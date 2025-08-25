"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsGridFill, BsList } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FreeTrialModal from "./Book";

const NurseListings = ({ nurses = [], page = 1, pages = 1, onPageChange, total }) => {
  const router = useRouter();
  const [selectedNurseId, setSelectedNurseId] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 🔹 grid | list

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col bg-white-50 p-4 sm:p-8 md:p-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {total || 0} nurses available
        </h2>
        {/* Toggle View Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg border ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
          >
            <BsGridFill size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg border ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
          >
            <BsList size={18} />
          </button>
        </div>
      </div>

      {/* Nurse Cards */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {nurses?.map((nurse) => (
          <motion.div
            key={nurse.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: nurse.id * 0.1 }}
            className={`bg-white border border-gray-200 rounded-2xl shadow p-5 flex flex-col mb-4 min-h-[300px] max-h-[350px] 
    ${viewMode === "list" ? "w-full" : "w-full max-w-3xl"}
  `}
          >
            {/* Top Row: Avatar, Name, Verified, Location */}
            <div className="flex items-center mb-2">
              {nurse?.profileImage ? (
                <Image
                  src={`http://localhost:3001/public/${nurse?.profileImage?.replace(/^undefined/, "")}`}
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
                  <span className="font-bold text-lg text-gray-900">
                    {nurse?.healthServeId?.name}
                  </span>
                  {nurse.verified && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="text-gray-500 text-sm">{nurse?.healthServeId?.location}</div>
              </div>
            </div>

            {/* Experience/Languages Row */}
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
                    ? nurse.languages
                      .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
                      .join(", ")
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
                      className={`text-base ${i <
                        Math.floor(
                          nurse?.testimonials?.length
                            ? nurse?.testimonials.reduce((sum, r) => sum + r.rating, 0) /
                            nurse?.testimonials.length
                            : 0
                        )
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {nurse?.testimonials?.length
                    ? (
                      nurse?.testimonials.reduce((sum, r) => sum + r.rating, 0) /
                      nurse?.testimonials.length
                    ).toFixed(1)
                    : "0.0"}
                </span>
                <span className="text-gray-500 text-xs">
                  ({nurse?.testimonials?.length} reviews)
                </span>
              </div>
            </div>

            <div className="text-green-700 text-xl font-bold">
              ₹{nurse?.perVisitCharges}/day
            </div>

            {/* Actions */}
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
                onClick={() =>
                  router.push(`/detail/nursingStaff/${nurse?.healthServeId?._id}`)
                }
                className="w-40 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold py-3 rounded-lg transition-colors text-base shadow-sm"
              >
                View Profile
              </button>
            </div>
          </motion.div>

        ))}
      </div>

      {/* Pagination */}
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
    </motion.div>
  );
};

export default NurseListings;
