"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const Nurse = ({ serviceData, totalItems }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [nurseProfiles, setNurseProfiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  // fetch nurse profile data
  const fetchNurseProfile = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
      );

      const data = res.data;
      setNurseProfiles((prev) => ({
        ...prev,
        [id]: data,
      }));
    } catch (err) {
      console.error("Error fetching nurse profile:", id, err?.response?.data || err);
    }
  };

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto my-[50px]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="title-48 mb-[8px]">Nursing Services Near You</h2>
        <p className="text-lg text-gray-600">
          Showing {currentItems?.length} of {totalItems} results
        </p>
      </div>

      {/* Nurse Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems?.map((nurse) => {
          if (!nurseProfiles[nurse._id]) fetchNurseProfile(nurse._id);

          const profileData =
            nurseProfiles[nurse._id]?.healthServeProfileData?.healthServeProfile?.data;
          const imageUrl = profileData?.profileImage || "/images/image_placeholder.svg";
          const rating = profileData?.testimonials?.length
            ? (
              profileData?.testimonials.reduce((sum, r) => sum + r.rating, 0) /
              profileData?.testimonials.length
            ).toFixed(1)
            : "0.0";

          return (
            <div
              key={nurse._id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                {imageUrl ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${imageUrl}`}
                    alt={nurse.name || "Nurse"}
                    width={55}
                    height={55}
                    className="rounded-full object-cover w-[55px] h-[55px]"
                  />
                ) : (
                  <div className="w-[55px] h-[55px] rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold">
                    {nurse.name?.charAt(0) || "N"}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{nurse.title || "Nursing Service"}</h3>
                  <p className="text-gray-600 text-sm">{nurse.name}</p>
                </div>
              </div>

              {/* Details */}
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialization:</span>
                  <span className="font-medium">{nurse.title || "Nursing Services"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{rating} / 5</span>
                </div>
              </div>

              {/* Tags / Services */}
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData?.services?.length > 0 ? (
                  profileData.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No services listed</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                  onClick={() => navigate.push(`/detail/nursingStaff/${nurse._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Nurse;
