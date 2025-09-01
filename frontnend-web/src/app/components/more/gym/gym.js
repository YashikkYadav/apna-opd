"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Pagination from '../common/Pagination';
import WhyChooseUs from "./whyChoose";
import PatientTestimonials from "./Testimonial";

const Gym = ({
  serviceData,
  totalItems,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [filteredList, setFilteredList] = useState([]);
  const [gymProfiles, setGymProfiles] = useState({});
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6); // showing 6 gyms per page
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  // fetch profile for given gym id
  const fetchGymProfile = async (id) => {
    try {
      console.log("Fetching profile for gym:", id);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
      );

      const data = res.data;

      setGymProfiles((prev) => ({
        ...prev,
        [id]: data,
      }));
    } catch (err) {
      console.error("Error fetching profile:", id, err?.response?.data || err);
    }
  };

  // Pagination
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("Current Items:", currentItems);

  // Dummy actions for now
  const joinGym = (id) => {
    navigate.push(`/detail/Gym/${id}`);
  };

  const getRating = (gym) => {
    const averageRating = gym?.profiles[0]?.testimonials?.length
      ? gym?.profiles[0]?.testimonials?.reduce((sum, t) => sum + t.rating, 0) /
        gym?.profiles[0]?.testimonials?.length
      : 0;
    return averageRating;
  };

  return (
    <>
      <main>
        <div className="mb-8 text-lg text-gray-600 flex items-center justify-between mt-5">
          <span>{totalItems} Gyms Available</span>
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
              No gyms found for your search.
            </div>
          ) : (
            currentItems?.map((gym) => (
              <div
                key={gym?._id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === "list" ? "w-full" : "w-full max-w-3xl"
                }`}
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  {gym?.profiles?.[0]?.profilePhoto ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${gym?.profiles?.[0]?.profilePhoto}`}
                      alt={gym?.name[0] || "Gym Logo"}
                      width={50}
                      height={50}
                      className="rounded-full object-cover w-[55px] h-[55px]"
                    />
                  ) : (
                    <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                      {gym?.name?.charAt(0) || "G"}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                      {gym?.name || "Unnamed Gym"}

                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Verified
                      </span>
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {gym?.location || gym?.city || "No Location"}
                    </div>
                  </div>
                </div>

                {/* Trainers + Plans */}
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">No. of Trainers:</span>
                    <span className="font-medium">
                      {gym?.profiles?.[0]?.noOfTrainers || "N/A"} + Certified
                      Trainers
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Plans:</span>
                    <span className="font-medium">
                      {gym?.profiles?.[0]?.plans
                        ?.map((p) => p.name)
                        .join(", ") || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-gray-100 p-3 rounded-lg mb-4 border-l-4 border-green-500">
                  <div className="font-semibold text-sm text-gray-700 mb-1">
                    Operating Hours
                  </div>
                  <div className="text-gray-600 text-xs">
                    {`${
                      (parseInt(gym?.profiles?.[0]?.regularOpening) % 13) + 1 ||
                      "N/A"
                    } AM - ${
                      (parseInt(gym?.profiles?.[0]?.regularClosing) % 13) + 1 ||
                      "N/A"
                    } PM`}
                  </div>
                </div>

                {/* Facilities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {gym?.profiles[0]?.worldFacilities?.length > 0 ? (
                    gym?.profiles[0]?.worldFacilities?.map(
                      (facility, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {facility?.name || facility}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No facilities listed
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
                          i < Math.round(getRating(gym))
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {getRating(gym) ? getRating(gym).toFixed(1) : "N/A"} (
                    {parseFloat(gym?.profiles?.[0]?.testimonials?.length) || 0}{" "}
                    reviews)
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    onClick={() => joinGym(gym?._id)}
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
      <PatientTestimonials />
    </>
  );
};

export default Gym;
