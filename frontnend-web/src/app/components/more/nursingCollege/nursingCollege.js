"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

const MedicalCollege = ({ serviceData, totalItems }) => {
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

  const viewCollegeDetails = (id) => {
    navigate.push(`/detail/nursing_medical_college/${id}`);
  };

  const getRating = (college) => {
    const profile = college?.profiles?.[0];
    const averageRating = profile?.testimonials?.length
      ? profile?.testimonials.reduce((sum, t) => sum + t.rating, 0) /
        profile?.testimonials.length
      : 0;
    return averageRating;
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main>
      <div className="mb-8 text-lg text-gray-600 flex items-center justify-between">
        <span>{totalItems} Medical Colleges Available</span>
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
            No medical colleges found for your search.
          </div>
        ) : (
          currentItems?.map((college) => {
            const profile = college?.profiles?.[0];

            return (
              <div
                key={college?._id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                }`}
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  {profile?.profileImage ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile?.profileImage}`}
                      alt={college?.name || "Medical College"}
                      width={55}
                      height={55}
                      className="rounded-full object-cover w-[55px] h-[55px]"
                    />
                  ) : (
                    <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                      {college?.name?.charAt(0) || "M"}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                      {college?.name || "Unnamed College"}
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Verified
                      </span>
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {profile?.city}, {profile?.state}
                    </div>
                  </div>
                </div>

                {/* Established + Affiliation */}
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Established:</span>
                    <span className="font-medium">
                      {profile?.established || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Affiliated To:</span>
                    <span className="font-medium">
                      {profile?.affiliatedTo || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Approved By:</span>
                    <span className="font-medium">
                      {profile?.approvedBy || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Website */}
                <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-blue-500">
                  <div className="font-semibold text-sm text-gray-700 mb-1">
                    Website
                  </div>
                  <div className="text-gray-600 text-xs">
                    {profile?.website || "N/A"}
                  </div>
                </div>

                {/* Hospital Tie-Ups */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile?.hospitalTieUps?.length > 0 ? (
                    profile?.hospitalTieUps.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No hospital tie-ups
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(getRating(college))
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {getRating(college) ? getRating(college).toFixed(1) : "N/A"}{" "}
                    ({parseFloat(profile?.testimonials?.length) || 0} reviews)
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    onClick={() => viewCollegeDetails(college?._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default MedicalCollege;
