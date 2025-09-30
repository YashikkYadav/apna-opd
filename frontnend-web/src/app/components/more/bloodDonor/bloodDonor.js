"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar, FaTint, FaUser, FaPhoneAlt } from "react-icons/fa";
import WhyChooseUs from "./whyChoose";
import Pagination from "../common/Pagination";
import PatientTestimonials from "./Testimonial";

const BloodDonor = ({
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

  const viewDonorDetails = (id) => {
    navigate.push(`/detail/blood_donor/${id}`);
  };

  // Pagination
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <main>
        <div className="mb-8 text-lg text-gray-600 flex items-center justify-between mt-5">
          <span>{totalItems} Blood Donors Available</span>

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
              {/* Grid icon */}
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
              {/* List icon */}
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

        {/* Donors */}
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
              No blood donors found for your search.
            </div>
          ) : (
            currentItems?.map((donor) => {
              const profile = donor?.profiles?.[0]; // donor profile
              const donorName = donor?.name || "Unnamed Donor";
              const donorBloodGroup =
                profile?.bloodGroup || donor?.bloodGroup || "N/A";

              return (
                <div
                  key={donor?._id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                  }`}
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4 mb-4">
                    {profile?.profilePhoto ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile?.profilePhoto}`}
                        alt={donorName}
                        width={55}
                        height={55}
                        className="rounded-full object-cover w-[55px] h-[55px]"
                      />
                    ) : (
                      <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                        {donorName?.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">
                        {donorName}
                        {profile?.verifiedDonor && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-5">
                            Verified
                          </span>
                        )}
                      </h3>
                      <div className="text-gray-600 text-sm capitalize">
                        {profile?.city || donor?.city || "No Location"},{" "}
                        {profile?.state || donor?.state || ""}
                      </div>
                    </div>
                  </div>

                  {/* Blood Group + Gender + Age */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-700">
                    <span className="flex items-center gap-1 font-medium">
                      <FaTint className="text-red-500" /> {donorBloodGroup}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUser className="text-blue-500" />{" "}
                      {profile?.gender || "N/A"}
                    </span>
                    {profile?.dob && (
                      <span className="flex items-center gap-1">
                        🎂{" "}
                        {new Date().getFullYear() -
                          new Date(profile?.dob).getFullYear()}{" "}
                        yrs
                      </span>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                    <div className="font-semibold text-sm text-gray-700 mb-1">
                      Availability
                    </div>
                    <div className="text-gray-600 text-xs">
                      {profile?.willingToDonate
                        ? "Willing to Donate"
                        : "Not Available"}
                      {" • "}
                      {profile?.emergencyAvailability
                        ? "Emergency Available"
                        : "Emergency Not Available"}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 text-sm mb-4 text-gray-700">
                    <FaPhoneAlt className="text-green-600" />
                    {donor?.phone || "No phone"}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => viewDonorDetails(donor?._id)}
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

      <WhyChooseUs />
      <PatientTestimonials />
    </>
  );
};

export default BloodDonor;
