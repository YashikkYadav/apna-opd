"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "../common/Pagination";
import Testimonials from "../common/Testimonial";
import WhyChooseUs from "../common/WhyChoose";

const testimonials = [
  {
    author: "Vishal Saxena",
    location: "Mansarovar",
    text: "Apna OPD helped me find the perfect lab near my home. Quick results and accurate reports at great prices!",
  },
  {
    author: "Ashish Yadav",
    location: "Jaipur",
    text: "The lab recommended by Apna OPD is exceptional. Professional service and they even provide home sample collection!",
  },
  {
    author: "Amit Pal",
    location: "Rishikesh",
    text: "Excellent service and report accuracy. The pathologists are very knowledgeable and helpful with test interpretation!",
  },
];

import {
  FaCheckCircle,
  FaRupeeSign,
  FaStar,
  FaMapPin,
  FaStethoscope,
} from "react-icons/fa";
import { BsClipboard2DataFill } from "react-icons/bs";
import { GrUserExpert } from "react-icons/gr";

const featuresData = [
  {
    icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
    title: "100% Accredited Labs",
    description:
      "All labs are NABL certified and equipped with state-of-the-art diagnostic technology",
  },
  {
    icon: <GrUserExpert className="text-blue-600 text-4xl" />,
    title: "Expert Pathologists",
    description:
      "Access to India's leading pathologists and lab technicians for accurate test results",
  },
  {
    icon: <FaRupeeSign className="text-blue-600 text-4xl" />,
    title: "Transparent Pricing",
    description:
      "Clear pricing with no hidden costs and comprehensive test packages at competitive rates",
  },
  {
    icon: <BsClipboard2DataFill className="text-blue-600 text-4xl" />,
    title: "Fast Results",
    description:
      "Quick turnaround time with digital reports and home sample collection",
  },
  {
    icon: <FaMapPin className="text-blue-600 text-4xl" />,
    title: "200+ Top Labs",
    description:
      "Extensive network of premium diagnostic labs across all major Indian cities",
  },
  {
    icon: <FaStar className="text-blue-600 text-4xl" />,
    title: "Quality Assured",
    description:
      "Labs with high accuracy ratings and thousands of satisfied patients",
  },
];

const Laboratory = ({
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

  const viewLabDetails = (id) => {
    navigate.push(`/detail/laboratory/${id}`);
  };

  const getRating = (lab) => {
    const averageRating = lab?.profiles?.[0]?.testimonials?.length
      ? lab?.profiles[0]?.testimonials.reduce((sum, t) => sum + t.rating, 0) /
        lab?.profiles[0]?.testimonials.length
      : 0;
    return averageRating;
  };

  // Pagination
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <main>
        <div className="mb-8 text-lg text-gray-600 flex items-center justify-between mt-5">
          <span>{totalItems} Laboratories Available</span>
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
              No laboratories found for your search.
            </div>
          ) : (
            currentItems?.map((lab) => {
              const profile = lab?.profiles?.[0];
              return (
                <div
                  key={lab?._id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                  }`}
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4 mb-4">
                    {profile?.profilePhoto ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile?.profilePhoto}`}
                        alt={lab?.name || "Laboratory"}
                        width={55}
                        height={55}
                        className="rounded-full object-cover w-[55px] h-[55px]"
                      />
                    ) : (
                      <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                        {lab?.name?.charAt(0) || "L"}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">
                        {lab?.name || "Unnamed Laboratory"}
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-5">
                          Verified
                        </span>
                      </h3>
                      <div className="text-gray-600 text-sm">
                        {lab?.location ||
                          lab?.city ||
                          lab?.state ||
                          "No Location"}
                      </div>
                    </div>
                  </div>

                  {/* Experience + Website */}
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">
                        {profile?.experience || "N/A"}+ years of Experience
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Website:</span>
                      <span className="font-medium">
                        {profile?.website || lab?.website || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Tests */}
                  <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                    <div className="font-semibold text-sm text-gray-700 mb-1">
                      Tests
                    </div>
                    <div className="text-gray-600 text-xs line-clamp-3">
                      {profile?.tests?.length > 0
                        ? profile?.tests
                            ?.slice(0, 5)
                            ?.map((test) => test.name)
                            ?.join(", ") // showing first 3 tests
                        : "No tests available"}
                    </div>
                  </div>

                  {/* Tags (limit 4) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile?.tags?.length > 0 ? (
                      profile?.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No tags listed
                      </span>
                    )}
                  </div>

                  {/* Key Features (limit 4)
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile?.keyFeatures?.length > 0 ? (
                    profile?.keyFeatures.slice(0, 4).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No features listed
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
                            i < Math.round(getRating(lab))
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {getRating(lab) ? getRating(lab).toFixed(1) : "N/A"} (
                      {parseFloat(profile?.testimonials?.length) || 0} reviews)
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => viewLabDetails(lab?._id)}
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
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <WhyChooseUs featuresData={featuresData} type={serviceData[0]?.type} />
      <Testimonials testimonials={testimonials} type={serviceData[0]?.type} />
    </>
  );
};

export default Laboratory;
