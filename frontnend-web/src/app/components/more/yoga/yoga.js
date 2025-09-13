"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar, FaMapMarkerAlt, FaGlobe, FaUsers } from "react-icons/fa";
import Pagination from "../common/Pagination";
import WhyChooseUs from "./whyChoose";
import Testimonials from "./testimonial";

const Yoga = ({
  serviceData,
  totalItems,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  const viewYogaDetails = (id) => {
    navigate.push(`/detail/yoga/${id}`);
  };

  const getRating = (instructor) => {
    const testimonials = instructor?.profiles?.[0]?.testimonials || [];
    if (testimonials.length === 0) return 0;
    return (
      testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) /
      testimonials.length
    );
  };

  // Pagination
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);
  const totalNoPages = Math.ceil(filteredList.length / itemsPerPage);

  return (
    <>
      <main>
        {/* Header */}
        <div className="mb-8 text-lg text-gray-600 flex items-center justify-between mt-5">
          <span>{totalItems} Yoga Instructors Available</span>

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
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
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
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
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
              No yoga instructors found for your search.
            </div>
          ) : (
            currentItems?.map((instructor) => (
              <div
                key={instructor?._id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                }`}
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  {instructor?.profiles?.[0]?.profileImage ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${instructor?.profiles[0]?.profileImage}`}
                      alt={instructor?.name || "Yoga Instructor"}
                      width={55}
                      height={55}
                      className="rounded-full object-cover w-[55px] h-[55px]"
                    />
                  ) : (
                    <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                      {instructor?.name?.charAt(0) || "Y"}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                      {instructor?.name || "Yoga Instructor"}
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Verified
                      </span>
                    </h3>
                    <div className="text-gray-600 text-sm flex items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-500" />
                      {instructor?.city}, {instructor?.state}
                    </div>
                  </div>
                </div>

                {/* Experience + Total Customers */}
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">
                      {instructor?.profiles?.[0]?.experience || "N/A"} + years
                      of Experience
                    </span>
                  </div>
                  {instructor?.profiles?.[0]?.totalCustomers && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Happy Members:</span>
                      <span className="font-medium flex items-center gap-1">
                        <FaUsers className="text-blue-500" />
                        {instructor?.profiles?.[0]?.totalCustomers}+ Happy
                        Members
                      </span>
                    </div>
                  )}
                </div>

                {/* Introduction/About */}
                <div className="bg-gray-50 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                  <div className="font-semibold text-sm text-gray-700 mb-1">
                    World Class Facilities
                  </div>
                  <div className="text-gray-600 text-xs">
                    {instructor?.profiles?.[0]?.worldClassFacilities?.join(
                      ", "
                    ) || "N/A"}
                  </div>
                </div>

                {/* Services */}
                {instructor?.profiles?.[0]?.services?.length > 0 ? (
                  <div className="mb-4">
                    
                    <div className="flex flex-wrap gap-1">
                      {instructor?.profiles?.[0]?.services
                        ?.slice(0, 2)
                        .map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                            title={service.description}
                          >
                            {service.name}
                          </span>
                        ))}

                      {instructor?.profiles?.[0]?.services?.length > 2 && (
                        <span className="text-gray-500 text-xs">
                          +{instructor?.profiles?.[0]?.services?.length - 2}{" "}
                          more
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm mb-3 block">
                    No specializations listed
                  </span>
                )}

                {/* Tags
                <div className="flex flex-wrap gap-2 mb-4">
                  {instructor?.profiles?.[0]?.tags?.length > 0 ? (
                    instructor?.profiles[0]?.tags
                      ?.slice(0, 3)
                      .map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No specializations listed
                    </span>
                  )}
                  {instructor?.profiles?.[0]?.tags?.length > 3 && (
                    <span className="text-gray-500 text-xs">
                      +{instructor?.profiles?.[0]?.tags?.length - 3} more
                    </span>
                  )}
                </div> */}

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(getRating(instructor))
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {getRating(instructor)
                      ? getRating(instructor).toFixed(1)
                      : "N/A"}{" "}
                    ({instructor?.profiles?.[0]?.testimonials?.length || 0}{" "}
                    reviews)
                  </span>
                </div>

                {/* Website Link */}
                {instructor?.profiles?.[0]?.website && (
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <FaGlobe className="text-blue-500" />
                    <a
                      href={instructor?.profiles?.[0]?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    onClick={() => viewYogaDetails(instructor?._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <WhyChooseUs />
      <Testimonials />
    </>
  );
};

export default Yoga;
