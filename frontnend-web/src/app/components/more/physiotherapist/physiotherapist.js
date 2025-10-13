"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "../common/Pagination";
import Testimonials from "../common/Testimonial";
import WhyChooseUs from "../common/WhyChoose";


import {
  FaCheckCircle,
  FaStar,
  FaHome,
  FaTools,
  FaStethoscope,
  FaHandsHelping
} from "react-icons/fa";


  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Verified Physiotherapists",
      description:
        "All physiotherapists are licensed professionals with BPT/MPT degrees and years of clinical experience",
    },
    {
      icon: <FaHome className="text-blue-600 text-4xl" />,
      title: "Home Visit Services",
      description:
        "Convenient physiotherapy sessions at your home with portable equipment and personalized care",
    },
    {
      icon: <FaTools className="text-blue-600 text-4xl" />,
      title: "Advanced Equipment",
      description:
        "State-of-the-art rehabilitation equipment including electrotherapy, ultrasound, and exercise machines",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-4xl" />,
      title: "Specialized Treatments",
      description:
        "Expert care for sports injuries, neurological conditions, orthopedic problems, and post-operative rehabilitation",
    },
    {
      icon: <FaHandsHelping className="text-blue-600 text-4xl" />,
      title: "Holistic Approach",
      description:
        "Comprehensive treatment combining manual therapy, exercise prescription, and lifestyle modifications",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "Proven Recovery",
      description:
        "High success rates with 90%+ patients reporting significant improvement within 4-6 weeks",
    },
  ];


const testimonials = [
  {
    author: "Jatin Saini",
    location: "Delhi",
    text: "I was bedridden after my knee surgery. The physiotherapist from Apna OPD helped me walk again within 3 months. Professional and caring treatment!",
  },
  {
    author: "Sanjana Agrawal",
    location: "Uttar Pradesh",
    text: "My chronic back pain disappeared after 8 weeks of physiotherapy. The exercises and manual therapy worked wonders. Highly recommend!",
  },
  {
    author: "Sanjay Dixit",
    location: "Dehradun",
    text: "After my stroke, I thought I'd never regain movement. The neuro-physiotherapy team helped me recover 80% of my function. Grateful beyond words!",
  },
];

const Physiotherapist = ({
  serviceData,
  totalItems,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [filteredList, setFilteredList] = useState([]);
  const [physioProfiles, setPhysioProfiles] = useState({});
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  const viewPhysioDetails = (id) => {
    navigate.push(`/detail/physiotherapist/${id}`);
  };

  const getRating = (physio) => {
    const averageRating = physio?.profiles[0]?.testimonials?.length
      ? physio?.profiles[0]?.testimonials?.reduce(
          (sum, t) => sum + t.rating,
          0
        ) / physio?.profiles[0]?.testimonials?.length
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
          <span>{totalItems} Physiotherapists Available</span>
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
              No physiotherapists found for your search.
            </div>
          ) : (
            currentItems?.map((physio) => (
              <div
                key={physio?._id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                }`}
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
                    <h3 className="text-xl font-semibold mb-1">
                      {physio?.name || "Unnamed Physiotherapist"}
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-5">
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
                      {physio?.profiles[0]?.experience || "N/A"}+ years of
                      Experience
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Educational Background:
                    </span>
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
                  <div className="flex text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(getRating(physio))
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {getRating(physio) ? getRating(physio).toFixed(1) : "N/A"} (
                    {parseFloat(physio?.profiles[0]?.testimonials?.length) || 0}{" "}
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
      <WhyChooseUs featuresData={featuresData} type={serviceData[0]?.type} />
      <Testimonials testimonials={testimonials} type={serviceData[0]?.type} />
    </>
  );
};

export default Physiotherapist;
