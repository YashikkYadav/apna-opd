"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "../common/Pagination";
import Testimonials from "../common/Testimonial";
import WhyChooseUs from "../common/WhyChoose";

import {
  FaCheckCircle,
  FaRupeeSign,
  FaStar,
  FaMapPin,
  FaStethoscope,
} from "react-icons/fa";

import { GiMicroscope } from "react-icons/gi";


  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Verified IVF Clinics",
      description:
        "All IVF clinics are thoroughly verified and accredited by medical authorities for your safety",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-4xl" />,
      title: "Expert Specialists",
      description:
        "Access to India's leading fertility experts and reproductive endocrinologists",
    },
    {
      icon: <FaRupeeSign className="text-blue-600 text-4xl" />,
      title: "Transparent Process",
      description:
        "Clear treatment plans with no hidden costs and upfront consultation booking",
    },
    {
      icon: <GiMicroscope className="text-blue-600 text-4xl" />,
      title: "Latest Technology",
      description:
        "State-of-the-art fertility labs with advanced reproductive technologies",
    },
    {
      icon: <FaMapPin className="text-blue-600 text-4xl" />,
      title: "200+ Top Clinics",
      description:
        "Extensive network of premium IVF centers across all major Indian cities",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "Proven Success",
      description:
        "Clinics with high success rates and thousands of successful pregnancies",
    },
  ];
  
  const testimonials = [
    {
      author: "Rajesh & Priya",
      location: "Delhi",
      text: "After years of trying, we found our miracle through Apna OPD's recommended clinic. The doctors were amazing and now we have our beautiful baby!",
    },
    {
      author: "Suresh & Meera",
      location: "Mumbai",
      text: "The clinic recommended by Apna OPD was exceptional. Professional care, advanced technology, and most importantly - our dream came true!",
    },
    {
      author: "Amit & Sneha",
      location: "Bangalore",
      text: "Excellent guidance in choosing the right fertility center. The success rate was exactly as promised. We're now proud parents of twins!",
    },
  ]

const IvfClinic = ({
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

  const viewClinicDetails = (id) => {
    navigate.push(`/detail/ivf_clinic/${id}`);
  };

  const getRating = (clinic) => {
    const profile = clinic?.profiles?.[0];
    const averageRating = profile?.testimonials?.length
      ? profile?.testimonials.reduce((sum, t) => sum + t.rating, 0) /
        profile?.testimonials.length
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
          <span>{totalItems} IVF Clinics Available</span>
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
              No IVF clinics found for your search.
            </div>
          ) : (
            currentItems?.map((clinic) => {
              const profile = clinic?.profiles?.[0];
              return (
                <div
                  key={clinic?._id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                  }`}
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4 mb-4">
                    {profile?.profilePhoto ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile?.profilePhoto}`}
                        alt={clinic?.name || "IVF Clinic"}
                        width={55}
                        height={55}
                        className="rounded-full object-cover w-[55px] h-[55px]"
                      />
                    ) : (
                      <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                        {clinic?.name?.charAt(0) || "I"}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">
                        {clinic?.name || "Unnamed Clinic"}
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-5">
                          Verified
                        </span>
                      </h3>
                      <div className="text-gray-600 text-sm">
                        {clinic?.location || clinic?.city || clinic?.state}
                      </div>
                    </div>
                  </div>

                  {/* Experience + Success Rate */}
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">
                        {profile?.experience || "N/A"}+ years of Experience
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Couples Treated:</span>
                      <span className="font-medium">
                        {profile?.couplesTreated || "N/A"}+ Couples Treated
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium">
                        {profile?.successRate || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Degrees */}
                  <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                    <div className="font-semibold text-sm text-gray-700 mb-1">
                      Educational Background
                    </div>
                    {profile?.degrees?.length > 0 ? (
                      <ul className="text-gray-600 text-xs space-y-1">
                        {profile.degrees.map((degree, index) => (
                          <li
                            key={degree?._id || index}
                            className="flex flex-col"
                          >
                            <span className="font-medium">{degree?.title}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500 text-xs">
                        No degrees available
                      </div>
                    )}
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile?.services?.length > 0 ? (
                      profile?.services.slice(0, 4).map((service, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {service}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No services listed
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
                            i < Math.round(getRating(clinic))
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {getRating(clinic) ? getRating(clinic).toFixed(1) : "N/A"}{" "}
                      ({parseFloat(profile?.testimonials?.length) || 0} reviews)
                    </span>
                  </div>

                  {/* Website */}
                  <div className="text-sm text-gray-600 mb-4">
                    🌐 {profile?.website || clinic?.website || "No website"}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => viewClinicDetails(clinic?._id)}
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

export default IvfClinic;
