"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hospital = ({ serviceData, totalItems }) => {
  const [hospitalList, setHospitalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
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
      <div className="mb-8 text-lg text-gray-600">
        {totalItems} Hospitals Available
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems?.map((hospital) => (
          <div
            key={hospital?._id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
                    ? hospital.profiles[0].accreditations.slice(0, 3).join(", ")
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
              <div className="text-yellow-500 text-sm">
                {Array.from({ length: Math.round(getRating(hospital)) }).map(
                  (_, i) => (
                    <span key={i}>★</span>
                  )
                )}
              </div>
              <span className="text-gray-600 text-sm">
                {getRating(hospital) || "N/A"} (
                {hospital?.profiles?.[0]?.testimonials?.length || 0} reviews)
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
        ))}
      </div>
    </main>
  );
};

export default Hospital;
