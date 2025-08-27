"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsGridFill, BsList } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FreeTrialModal from "./Book";

const NurseListings = ({
  nurses = [],
  page = 1,
  pages = 1,
  onPageChange,
  total,
}) => {
  const router = useRouter();
  const [selectedNurseId, setSelectedNurseId] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 🔹 grid | list

  console.log(nurses);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col bg-white-50 p-4 sm:p-8 md:p-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {total || 0} Nurses Available
        </h2>
        {/* Toggle View Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg border ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <BsGridFill size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg border ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
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
        {nurses?.length === 0 ? (
          <div
            className={`w-full ${
              viewMode === "grid" ? "lg:ml-96" : ""
            } text-center py-16 text-xl text-gray-500 font-semibold`}
          >
            No nurses found for your search.
          </div>
        ) : (
          nurses?.map((nurse) => (
            <motion.div
              key={nurse._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: nurse.id * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                viewMode === "list" ? "w-full" : "w-full max-w-3xl"
              }`}
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                {nurse?.profileImage ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${nurse?.profileImage}`}
                    alt={nurse?.healthServeId?.name || "Nurse Profile Image"}
                    width={55}
                    height={55}
                    className="rounded-full object-cover w-[55px] h-[55px]"
                  />
                ) : (
                  <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                    {nurse?.healthServeId?.name?.charAt(0) || "N"}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                    {nurse?.healthServeId?.name || "Unnamed Nurse"}
                    {nurse.verified && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Verified
                      </span>
                    )}
                  </h3>
                  <div className="text-gray-600 text-sm">
                    {nurse?.healthServeId?.location || "No Location"}
                  </div>
                </div>
              </div>

              {/* Experience + Languages */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">
                    {nurse.experience || "N/A"}+ years of Experience
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Languages:</span>
                  <span className="font-medium">
                    {Array.isArray(nurse.languages)
                      ? nurse.languages
                          .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
                          .join(", ")
                      : nurse.languages || "N/A"}
                  </span>
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-2 mb-4">
                {nurse.services?.length > 0 ? (
                  nurse.services.slice(0, 5).map((spec, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {spec}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No Specializations
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      color={
                        i <
                        Math.round(
                          nurse?.testimonials?.length
                            ? nurse?.testimonials.reduce(
                                (sum, r) => sum + r.rating,
                                0
                              ) / nurse?.testimonials.length
                            : 0
                        )
                          ? "#facc15"
                          : "#d1d5db"
                      }
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {nurse?.testimonials?.length
                    ? (
                        nurse?.testimonials.reduce(
                          (sum, r) => sum + r.rating,
                          0
                        ) / nurse?.testimonials.length
                      ).toFixed(1)
                    : "N/A"}{" "}
                  ({parseFloat(nurse?.testimonials?.length) || 0} reviews)
                </span>
              </div>

              {/* Fee */}
              <div className="text-green-700 text-xl font-bold mb-4">
                ₹{nurse?.perVisitCharges || "N/A"}/day
              </div>

              {/* Actions */}
              {selectedNurseId && (
                <FreeTrialModal
                  isOpen={!!selectedNurseId}
                  onClose={() => setSelectedNurseId(null)}
                  healthId={selectedNurseId}
                />
              )}
              <button
                onClick={() =>
                  router.push(
                    `/detail/nursingStaff/${nurse?.healthServeId?._id}`
                  )
                }
                className="flex-1 w-full bg-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm text-white"
              >
                View Profile
              </button>
            </motion.div>
          ))
        )}
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
