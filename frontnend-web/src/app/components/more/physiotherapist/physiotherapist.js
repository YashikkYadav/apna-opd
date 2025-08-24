"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const Physiotherapist = ({ serviceData, totalItems }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [physioProfiles, setPhysioProfiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  const viewPhysioDetails = (id) => {
    navigate.push(`/detail/physiotherapist/${id}`);
  };

  const getRating = (gym) => {
      const averageRating = gym?.profiles[0]?.testimonials?.length
        ? gym?.profiles[0]?.testimonials?.reduce(
            (sum, t) => sum + t.rating,
            0
          ) / gym?.profiles[0]?.testimonials?.length
        : 0;
      return averageRating;
    }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main>
      <div className="mb-8 text-lg text-gray-600">
        {totalItems} Physiotherapists Available
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems?.map((physio) => (
          <div
            key={physio?._id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-4">
              {physio?.profiles[0]?.profileImage ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${physio?.profiles[0]?.profileImage}`}
                  alt={physio?.name || "Physiotherapist"}
                  width={50}
                  height={50}
                  className="rounded-full object-cover w-[55px] h-[55px]"
                />
              ) : (
                <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                  {physio?.name?.charAt(0) || "P"}
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                  {physio?.name || "Unnamed Physiotherapist"}
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </h3>
                <div className="text-gray-600 text-sm">
                  {physio?.location || physio?.city || "No Location"}
                </div>
              </div>
            </div>

            {/* Experience + Specialization */}
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">
                  {physio?.profiles[0]?.experience || "N/A"} years
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Educational Background:</span>
                <span className="font-medium">
                  {physio?.profiles[0]?.education
                    ?.map((item) => item?.degree)
                    ?.slice(0, 3)
                    ?.join(", ") || "N/A"}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
              <div className="font-semibold text-sm text-gray-700 mb-1">
                Website
              </div>
              <div className="text-gray-600 text-xs">
                {physio?.profiles[0]?.website || "N/A"}
              </div>
            </div>

            {/* Treatments Offered */}
            <div className="flex flex-wrap gap-2 mb-4">
              {physio?.profiles[0]?.conditionsTreated?.length > 0 ? (
                physio?.profiles[0]?.conditionsTreated
                  ?.slice(0, 5)
                  ?.map((treat, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {treat}
                    </span>
                  ))
              ) : (
                <span className="text-gray-500 text-sm">
                  No treatments listed
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="text-yellow-500 text-sm">★★★★★</div>
              <span className="text-gray-600 text-sm">
                {getRating(physio) || "N/A"} ({physio?.reviews?.length || 0}{" "}
                reviews)
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                onClick={() => viewPhysioDetails(physio?._id)}
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

export default Physiotherapist;
