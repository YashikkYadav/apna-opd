"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsGridFill, BsList } from "react-icons/bs";
import Testimonials from "../common/Testimonial";
import WhyChooseUs from "../common/WhyChoose";
import Pagination from "../common/Pagination";

import { FaRegClock, FaMapMarkerAlt, FaUserMd, FaXRay } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { GiMicroscope } from "react-icons/gi";

const featuresData = [
  {
    icon: <FaXRay className="text-blue-600 text-4xl" />,
    title: "Accurate Imaging",
    description:
      "High-quality X-rays, CT scans, and MRIs with advanced digital imaging systems.",
  },
  {
    icon: <GiMicroscope className="text-blue-600 text-4xl" />,
    title: "Advanced Diagnostics",
    description:
      "State-of-the-art machines and technology for precise radiological examinations.",
  },
  {
    icon: <FaUserMd className="text-blue-600 text-4xl" />,
    title: "Expert Radiologists",
    description:
      "Experienced specialists ensuring accurate interpretations and timely reports.",
  },
  {
    icon: <MdMedicalServices className="text-blue-600 text-4xl" />,
    title: "Comprehensive Services",
    description:
      "Wide range of diagnostic imaging from ultrasound to advanced CT and MRI scans.",
  },
  {
    icon: <FaMapMarkerAlt className="text-blue-600 text-4xl" />,
    title: "Multiple Centers",
    description:
      "Extensive network of radiology centers across major cities for easy access.",
  },
  {
    icon: <FaRegClock className="text-blue-600 text-4xl" />,
    title: "24/7 Availability",
    description:
      "Round-the-clock radiology support for emergencies and urgent medical cases.",
  },
];

const testimonials = [
  {
    author: "Rajash Gangwar",
    location: "Delhi",
    text: "I’ve been visiting this radiology center for years. The doctors are professional, the equipment is modern, and the reports are always accurate and on time.",
  },
  {
    author: "Meera Deshmukh",
    location: "Assam",
    text: "During my treatment, I needed urgent MRI scans. The radiology team arranged everything quickly and guided me throughout the process. Their care truly made a difference!",
  },
  {
    author: "Ayush Tomar",
    location: "Bhopal",
    text: "As a doctor, I trust this radiology center completely. Their imaging quality is excellent, and they maintain the highest safety and diagnostic standards.",
  },
];

const Radiologist = ({
  serviceData,
  totalItems,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [filteredList, setFilteredList] = useState([]);
  const [radiologistProfiles, setRadiologistProfiles] = useState({});
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
    navigate.push(`/detail/radiologist/${id}`);
  };

  // Pagination
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentItems", currentItems);

  return (
    <>
      <main className="mt-5">
        {/* Count and View Mode Toggle */}
        <div className="mb-8 text-lg text-gray-600 flex items-center justify-between">
          <span>{totalItems} Radiologists Available</span>
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

        {/* Doctor Grid/List */}
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
              No Radiologist found for your search.
            </div>
          ) : (
            currentItems?.map((item) => {
              const avgRating =
                item?.profiles[0]?.testimonials?.length > 0
                  ? item?.profiles[0]?.testimonials.reduce(
                      (sum, r) => sum + r.rating,
                      0
                    ) / item?.profiles[0]?.testimonials.length
                  : 0;

              return (
                <div
                  key={item._id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ${
                    viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                  }`}
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4 mb-4">
                    {item?.profiles[0]?.profileImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item?.profiles[0]?.profileImage}`}
                        alt={item?.name || "Doctor"}
                        width={55}
                        height={55}
                        className="rounded-full object-cover w-[55px] h-[55px]"
                      />
                    ) : (
                      <div className="w-[55px] h-[55px] rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xl font-bold">
                        {item?.name?.charAt(0) || "D"}
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-lg font-bold">
                        {item?.name || "Unnamed Doctor"}
                      </h3>
                      <p className="text-gray-600 text-sm capitalize">
                        {item?.type || "MBBS, MD - General Medicine"}
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-5">
                          Verified
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm mb-4">
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Experience:
                      </span>
                      <span className="text-gray-600">
                        {item?.profiles[0]?.experience
                          ? `${item.profiles[0].experience}+ years experience`
                          : "N/A"}
                      </span>
                    </p>
                    {/* <p className="flex justify-between">
                      <span className="font-medium text-gray-700 w-32">
                        Happy Patients:
                      </span>
                      <span className="text-gray-600">
                        {item?.profiles[0]?.happyClients || "Not Provided"}
                      </span>
                    </p> */}
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Consultation Fee:
                      </span>
                      <span className="text-gray-600">
                        ₹{item?.profiles[0]?.appointmentFee || "N/A"}
                      </span>
                    </p>
                  </div>

                  <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                    <div className="font-semibold text-sm text-gray-700 mb-2">
                      Availability
                    </div>

                    {item?.profiles[0]?.locations?.length > 0 ? (
                      item.profiles[0].locations.map((loc, idx) => (
                        <div
                          key={idx}
                          className="text-gray-600 text-xs mb-2 border-b pb-2 last:border-0"
                        >
                          <div>
                            <span className="font-medium">Days:</span>{" "}
                            {loc.days.join(", ")}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span>{" "}
                            {loc.from} - {loc.to}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-600 text-xs">N/A</div>
                    )}
                  </div>

                  {/* Tags (Specialties / Skills) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item?.profiles[0]?.conditionsTreated?.length > 0 ? (
                      item?.profiles[0]?.conditionsTreated
                        ?.slice(0, 4)
                        ?.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No conditions listed
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    {avgRating > 0 ? (
                      <>
                        <div className="text-yellow-500 text-sm">
                          {Array.from({ length: Math.round(avgRating) }).map(
                            (_, i) => (
                              <span key={i}>★</span>
                            )
                          )}
                        </div>
                        <span className="text-gray-600 text-sm">
                          {avgRating.toFixed(1)} ({item?.testimonials?.length}{" "}
                          reviews)
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No reviews yet
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {/* <button
                      onClick={() => {
                        setSelectedDoctor(item);
                        setOpenModal(true);
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      Book Appointment
                    </button> */}
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => viewPhysioDetails(item?._id)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* {selectedDoctor && (
          <BookAppointment
            isOpen={!!selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
            doctorcurrentItems={selectedDoctor}
          />
        )} */}
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <WhyChooseUs featuresData={featuresData} type='Radiologists' />
        <Testimonials testimonials={testimonials} type='Radiologists' />
      </main>
    </>
  );
};

export default Radiologist;
