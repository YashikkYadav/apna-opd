"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const Hospital = ({ serviceData, totalItems }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [hospitalProfiles, setHospitalProfiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  // fetch profile data for given hospital id
  const fetchHospitalProfile = async (id) => {
    try {
      console.log("Fetching profile for hospital:", id);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
      );
      const data = res.data;
      console.log("Fetched profile data:", data);
      setHospitalProfiles((prev) => ({
        ...prev,
        [id]: data,
      }));
    } catch (err) {
      console.error("Error fetching profile:", id, err?.response?.data || err);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h2 className="title-48 mb-[24px]">Hospitals Near You</h2>
      <p className="title-24 text-[#808080] !font-normal mb-[56px]">
        Showing {currentItems?.length} of {totalItems} results
      </p>

      <div className="flex flex-col gap-[32px]">
        {currentItems?.map((hospital) => {
          // trigger fetch if profile not available yet
          if (!hospitalProfiles[hospital._id]) {
            fetchHospitalProfile(hospital._id);
          }

          const profileData =
            hospitalProfiles[hospital._id]?.healthServeProfileData
              ?.healthServeProfile?.data;

          const imageUrl =
            profileData?.profileImage || "/images/image_placeholder.svg";

          const rating = profileData?.testimonials?.length
            ? (
              profileData?.testimonials.reduce(
                (sum, r) => sum + r.rating,
                0
              ) / profileData?.testimonials.length
            ).toFixed(1)
            : "0.0";

          return (
            <div
              key={hospital._id}
              className="flex flex-col sm:flex-row justify-between mb-[32px]"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:mr-[32px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${imageUrl}`}
                    width={180}
                    height={180}
                    alt="Hospital"
                    className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                  />
                </div>

                <div className="py-[18px] sm:py-0 md:py-[18px]">
                  <p className="text-base text-[#5151E1] mb-[8px]">Hospital</p>
                  <h3 className="title-24 mb-[8px]">{hospital.title}</h3>
                  <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                    Rating: {rating || "N/A"} / 5
                  </p>
                  <h4 className="title-24 text-[#808080] !font-medium">
                    {hospital.name}
                  </h4>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col justify-end">
                <button
                  onClick={() =>
                    navigate.push(`/more/hospital/${hospital._id}/details`)
                  }
                  className="bg-[#3DB8F5] px-[35px] py-[10px] rounded-[8px] text-lg text-white font-bold"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Hospital;
