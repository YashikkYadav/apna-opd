"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

const Hospital = ({ serviceData, totalItems }) => {
  const [hospitalList, setHospitalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setHospitalList(serviceData || []);
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  // Helper to calculate average rating if testimonials exist
  const getRating = (hospital) => {
    const averageRating = hospital?.profiles[0]?.testimonials?.length
      ? hospital?.profiles[0]?.testimonials?.reduce(
          (sum, t) => sum + t.rating,
          0
        ) / hospital?.profiles[0]?.testimonials?.length
      : 0;
    return averageRating;
  };

  return (
    <main>
      <div className="mb-8 text-lg text-gray-600 flex items-center justify-between">
        <span>{totalItems} Hospitals Available</span>
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
            No hospitals found for your search.
          </div>
        ) : (
          currentItems?.map((hospital) => (
            <div
              key={hospital?._id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                viewMode === "list" ? "w-full" : "w-full max-w-3xl"
              }`}
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                {hospital?.profiles?.[0]?.profileImage ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${hospital?.profiles?.[0]?.profileImage}`}
                    alt={hospital?.name || "Hospital Logo"}
                    width={55}
                    height={55}
                    className="rounded-full object-cover w-[55px] h-[55px]"
                  />
                ) : (
                  <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                    {hospital?.name?.charAt(0) || "H"}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                    {hospital?.name || "Unnamed Hospital"}
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Verified
                    </span>
                  </h3>
                  <div className="text-gray-600 text-sm">
                    {hospital?.location || hospital?.city || "No Location"}
                  </div>
                </div>
              </div>

              {/* Experience + Accreditations */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">
                    {hospital?.profiles?.[0]?.experience || "N/A"}+ Years
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Accreditations:</span>
                  <span className="font-medium">
                    {hospital?.profiles?.[0]?.accreditations?.length > 0
                      ? hospital.profiles[0].accreditations
                          .slice(0, 3)
                          .join(", ")
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* Departments */}
              <div className="flex flex-wrap gap-2 mb-4">
                {hospital?.profiles?.[0]?.departments?.length > 0 ? (
                  hospital.profiles[0].departments
                    .slice(0, 5)
                    .map((dept, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {dept}
                      </span>
                    ))
                ) : (
                  <span className="text-gray-500 text-sm">No Departments</span>
                )}
              </div>

              {/* Facilities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {hospital?.profiles?.[0]?.facilities?.length > 0 ? (
                  hospital.profiles[0].facilities
                    .slice(0, 5)
                    .map((facility, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {facility}
                      </span>
                    ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No Facilities Listed
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
                        i < Math.round(getRating(hospital))
                          ? "#facc15"
                          : "#d1d5db"
                      }
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {getRating(hospital) ? getRating(hospital).toFixed(1) : "N/A"}{" "}
                  (
                  {parseFloat(hospital?.profiles?.[0]?.testimonials?.length) ||
                    0}{" "}
                  reviews)
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                  onClick={() =>
                    navigate.push(`/more/hospital/${hospital?._id}/details`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Hospital;
