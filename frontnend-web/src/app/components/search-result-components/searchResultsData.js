"use client";
import { Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import SearchBar from "../common-components/SearchBar";
import Pagination from "./../more/common/Pagination";
import axiosInstance from "@/app/config/axios";
// Add these imports for icons
import { BsGridFill, BsList } from "react-icons/bs";
import Testimonials from "../more/common/Testimonial";
import WhyChooseUs from "../more/common/WhyChoose";

import {
  FaCheckCircle,
  FaStar,
  FaMoneyBillWave,
  FaStethoscope,
  FaHandsHelping,
  FaMedkit,
} from "react-icons/fa";


  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Verified Doctors",
      description:
        "All doctors are thoroughly verified and registered with medical councils for your safety",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-4xl" />,
      title: "Expert Specialists",
      description:
        "Access to India's leading doctors and specialists across all medical fields",
    },
    {
      icon: <FaMoneyBillWave className="text-blue-600 text-4xl" />,
      title: "Transparent Pricing",
      description:
        "Clear consultation fees with no hidden costs and instant booking confirmation",
    },
    {
      icon: <FaMedkit className="text-blue-600 text-4xl" />,
      title: "500+ Top Doctors",
      description:
        "Extensive network of premium doctors from India's best hospitals and clinics",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "Highly Rated",
      description:
        "Doctors with excellent ratings and thousands of successful consultations",
    },
    {
      icon: <FaHandsHelping className="text-blue-600 text-4xl" />,
      title: "Easy Booking",
      description:
        "Book appointments instantly online or via phone with flexible scheduling",
    },
  ];

  const testimonials = [
    {
      author: "Ansh Rajawat",
      location: "Jaipur",
      text: "Dr. Sharma was incredibly knowledgeable and caring. The consultation was thorough and the treatment plan worked perfectly!",
    },
    {
      author: "Sakshi Verma",
      location: "Uttar Pradesh",
      text: "Found an excellent cardiologist through Apna OPD. Easy booking and the doctor was very professional and experienced!",
    },
    {
      author: "Abhishek Adhikari",
      location: "Dehradun",
      text: "Amazing platform! The pediatrician we consulted was excellent with our child. Highly recommend Apna OPD!",
    },
  ];

const SearchResultsData = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Add viewMode state
  const [viewMode, setViewMode] = useState("grid");

  const fetchData = async (page = 1, loc = location, spec = speciality) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/doctor/list?page=${page}&location=${loc}&speciality=${spec}`
      );

      if (response.list?.doctorList) {
        setData(response.list.doctorList);
        setPagination({
          currentPage: response.list.currentPage,
          totalPages: response.list.totalPages,
          totalItems: response.list.totalItems,
        });
        console.log(response.list.doctorList);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState("");

  useEffect(() => {
    const loc = searchParams.get("location") || "";
    const spec = searchParams.get("speciality") || "";

    setLocation(loc);
    setSpeciality(spec);

    fetchData(1, loc, spec);
  }, [searchParams]);

  const handlePageChange = (page) => {
    if (page > pagination.totalPages || page < 1) return;
    fetchData(page);
  };

  const handleSearch = (location, speciality) => {
    router.push(
      `/find-doctor?location=${location}&speciality=${speciality}`
    );
  };

  const handleDoctorDetails = (doctorId) => {
    router.push(`${doctorId}/profile`);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  console.log("data", data);

  return (
    <>
      {/* Search Bar Section */}
      {
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative bg-[#0C65A0] text-white rounded-2xl shadow-lg p-5 md:p-10 lg:p-16 flex flex-col items-center gap-10 mx-3 md:mx-8 my-10"
        >
          {/* Background Circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
          <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

          {/* Heading */}
          <div className="z-10 text-center space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow">
              Find Our Specialist Doctors
            </h1>
            <p className="text-white/90 text-lg sm:text-xl opacity-90 max-w-4xl">
              Apna OPD is your all-in-one India healthcare platform to find
              doctors by specialty, location, or hospital. Whether you're
              looking for online doctor consultation, in-clinic visits, or the
              best OPD booking app — we make it easy to compare, choose, and
              book appointments with trusted doctors across India in minutes.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="z-10 bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-5xl"
          >
            <SearchBar
              onSearch={handleSearch}
              location={location}
              specialty={speciality}
            />
          </motion.div>
        </motion.section>
      }
      <main className="px-[16px] md:px-[30px] mx-auto my-[30px]">
        {/* Count and View Mode Toggle */}
        <div className="mb-8 text-lg text-gray-600 flex items-center justify-between">
          <span>{pagination.totalItems} Doctors Available</span>
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
          {data?.length === 0 ? (
            <div
              className={`w-full ${
                viewMode === "grid" ? "lg:ml-96" : ""
              } text-center py-16 text-xl text-gray-500 font-semibold`}
            >
              No doctors found for your search.
            </div>
          ) : (
            data?.map((item) => {
              const avgRating =
                item?.testimonials?.length > 0
                  ? item.testimonials.reduce((sum, r) => sum + r.rating, 0) /
                    item.testimonials.length
                  : 0;

              return (
                <div
                  key={item?.doctor?._id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ${
                    viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                  }`}
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4 mb-4">
                    {item?.images?.[0]?.filename ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/doctor-profile/${item?.images[0]?.filename}`}
                        alt={item?.doctor?.name || "Doctor"}
                        width={55}
                        height={55}
                        className="rounded-full object-cover w-[55px] h-[55px]"
                      />
                    ) : (
                      <div className="w-[55px] h-[55px] rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xl font-bold">
                        {item?.doctor?.name?.charAt(0) || "D"}
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-lg font-bold">
                        {item?.doctor?.name || "Unnamed Doctor"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item?.doctor?.speciality ||
                          "MBBS, MD - General Medicine"}
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
                        {item?.experience
                          ? `${item.experience}+ years experience`
                          : "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700 w-32">
                        Hospital Name:
                      </span>
                      <span className="text-gray-600">
                        {item?.doctor?.clinicName || "Not Provided"}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Consultation Fee:
                      </span>
                      <span className="text-gray-600">
                        ₹{item?.appointmentFee || "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* Tags (Specialties / Skills) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item?.conditionsTreated?.length > 0 ? (
                      item?.conditionsTreated?.slice(0, 4)?.map((tag, i) => (
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

                  {/* Availability */}
                  <div className="bg-green-100 text-green-700 text-center py-2 rounded-lg mb-4 text-sm font-medium">
                    {item?.doctor?.availability || "Available Today"}
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
                      onClick={() => handleDoctorDetails(item?.doctor?._id)}
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
            doctorData={selectedDoctor}
          />
        )} */}
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <WhyChooseUs featuresData={featuresData} type="Doctors" />
        <Testimonials testimonials={testimonials} type="Doctors" />
      </main>
    </>
  );
};

export default SearchResultsData;
