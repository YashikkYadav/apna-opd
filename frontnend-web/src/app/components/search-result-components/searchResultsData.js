"use client";
import { Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "../common-components/SearchBar";
import StarRating from "../common-components/StarRating";
import Pagination from "./../more/common/Pagination";
import axiosInstance from "@/app/config/axios";
import BookAppointment from "../profile-com/Appointment";

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
      `/search-results?location=${location}&speciality=${speciality}`
    );
  };

  const handleDoctorDetails = (doctorId) => {
    router.push(`${doctorId}/profile`);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  console.log("data", data);

  return (
    <>
      <div className="bg-[#0D7EB7] banner-with-search">
        <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right ">
          <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative md:h-[700px] pb-[60px]">
            <div className="flex justify-between items-end pt-[60px] md:pt-[129px]">
              <div className="max-w-[700px] mx-auto">
                <h1 className="title-64 mb-[32px] text-center max-w-[530px] mx-auto">
                  Find Our Specialist Doctors
                </h1>
                <p className="text-base text-white mb-[88px] text-center">
                  Apna OPD is your all-in-one India healthcare platform to find
                  doctors by specialty, location, or hospital. Whether you're
                  looking for online doctor consultation, in-clinic visits, or
                  the best OPD booking app — we make it easy to compare, choose,
                  and book appointments with trusted doctors across India in
                  minutes.
                </p>
              </div>
            </div>

            <div>
              <SearchBar
                onSearch={handleSearch}
                location={location}
                specialty={speciality}
              />
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto my-[50px]">
        {/* Count */}
        <div className="mb-8 text-lg text-gray-600">
          {pagination.totalItems} Doctors Available
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item) => {
            const avgRating =
              item?.testimonials?.length > 0
                ? item.testimonials.reduce((sum, r) => sum + r.rating, 0) /
                item.testimonials.length
                : 0;

            return (
              <div
                key={item?.doctor?._id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
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
                      {item?.doctor?.speciality || "MBBS, MD - General Medicine"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm mb-4">
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700">Specialization:</span>
                    <span className="text-gray-600">{item?.doctor?.speciality || "General Practitioner"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700">Experience:</span>
                    <span className="text-gray-600">{item?.experience ? `${item.experience}+ years experience` : "N/A"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="text-gray-600">{item?.doctor?.clinicName || "Not Provided"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-700">Consultation Fee:</span>
                    <span className="text-gray-600">₹{item?.appointmentFee || "N/A"}</span>
                  </p>
                </div>


                {/* Tags (Specialties / Skills) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(item?.conditionsTreated?.length > 0
                    ? item?.conditionsTreated
                    : ["General Care"]
                  ).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {avgRating > 0 ? (
                    <>
                      <div className="text-yellow-500 text-sm">
                        {Array.from({ length: Math.round(avgRating) }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {avgRating.toFixed(1)} ({item?.testimonials?.length} reviews)
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-500 text-sm">No reviews yet</span>
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
          })}
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
      </main>

    </>
  )
};

export default SearchResultsData;
