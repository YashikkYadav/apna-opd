"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

const Veterinary = ({ serviceData, totalItems }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  const viewVetDetails = (id) => {
    navigate.push(`/detail/vatenary/${id}`);
  };

  const getRating = (vet) => {
    const testimonials = vet?.profiles?.[0]?.testimonials || [];
    if (testimonials.length === 0) return 0;
    return (
      testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) /
      testimonials.length
    );
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  return (
    <main>
      {/* Header */}
      <div className="mb-8 text-lg text-gray-600 flex items-center justify-between">
        <span>{totalItems} Veterinary Clinics Available</span>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg border ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 18 18">
              <rect x="2" y="2" width="6" height="6" rx="1.5" />
              <rect x="10" y="2" width="6" height="6" rx="1.5" />
              <rect x="2" y="10" width="6" height="6" rx="1.5" />
              <rect x="10" y="10" width="6" height="6" rx="1.5" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg border ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 18 18">
              <rect x="2" y="4" width="14" height="2" rx="1" />
              <rect x="2" y="8" width="14" height="2" rx="1" />
              <rect x="2" y="12" width="14" height="2" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {currentItems?.length === 0 ? (
          <div
            className={`w-full ${
              viewMode === "grid" ? "lg:ml-96" : ""
            } text-center py-16 text-xl text-gray-500 font-semibold`}
          >
            No veterinary clinics found for your search.
          </div>
        ) : (
          currentItems?.map((vet) => (
            <div
              key={vet?._id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                viewMode === "list" ? "w-full" : "w-full max-w-3xl"
              }`}
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                {vet?.profiles?.[0]?.profileImage ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${vet?.profiles[0]?.profileImage}`}
                    alt={vet?.name || "Veterinary Clinic"}
                    width={50}
                    height={50}
                    className="rounded-full object-cover w-[55px] h-[55px]"
                  />
                ) : (
                  <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                    {vet?.name?.charAt(0) || "V"}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                    {vet?.name || "Unnamed Veterinary"}
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Verified
                    </span>
                  </h3>
                  <div className="text-gray-600 text-sm">
                    {vet?.profiles?.[0]?.city}, {vet?.profiles?.[0]?.state}
                  </div>
                </div>
              </div>

              {/* Experience + Specialization */}
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">
                    {vet?.profiles?.[0]?.experience || "N/A"}+ years of
                    Experience
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialization:</span>
                  <span className="font-medium">
                    {vet?.profiles?.[0]?.specialization || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="font-medium">
                    ₹{vet?.profiles?.[0]?.consultationFee || "N/A"}
                  </span>
                </div>
              </div>

              {/* About */}
              <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                <div className="font-semibold text-sm text-gray-700 mb-1">
                  Languages Spoken
                </div>
                <div className="text-gray-600 text-xs">
                  {vet?.profiles?.[0]?.languages?.join(", ") || "N/A"}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {vet?.profiles?.[0]?.tags?.length > 0 ? (
                  vet?.profiles[0]?.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No tags listed</span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(getRating(vet))
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {getRating(vet) ? getRating(vet).toFixed(1) : "N/A"} (
                  {vet?.profiles?.[0]?.testimonials?.length || 0} reviews)
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                  onClick={() => viewVetDetails(vet?._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div> */}
    </main>
  );
};

export default Veterinary;
