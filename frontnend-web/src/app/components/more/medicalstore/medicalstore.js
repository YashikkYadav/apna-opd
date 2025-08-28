"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const MedicalStore = ({ serviceData, totalItems }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [storeProfiles, setStoreProfiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  // function to fetch profile data for given medical store id
  const fetchStoreProfile = async (id) => {
    try {
      console.log("Fetching profile for store:", id);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
      );

      const data = res.data;

      setStoreProfiles((prev) => ({
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
      <h2 className="title-48 mb-[24px]">Medical Stores Near You</h2>
      <p className="title-24 text-[#808080] !font-normal mb-[56px]">
        Showing {currentItems?.length} of {totalItems} results
      </p>
      <div className="flex flex-col gap-[32px]">
        {currentItems?.map((store) => {
          // call fetch function when profile not yet loaded
          if (!storeProfiles[store._id]) {
            fetchStoreProfile(store._id);
          }

          const profileData =
            storeProfiles[store._id]?.healthServeProfileData?.healthServeProfile;

          const imageUrl =
            profileData?.profilePhoto ||
            (store.profiles &&
              store.profiles.length > 0 &&
              store.profiles[0].images?.length > 0
              ? store.profiles[0].images[0].url
              : "/images/image_placeholder.svg");

          const rating = profileData?.testimonials?.length
            ? (
              profileData?.testimonials.reduce(
                (sum, r) => sum + r.rating,
                0
              ) / profileData?.testimonials.length
            ).toFixed(1)
            : store.rating?.toFixed(1) || "0.0";

          return (
            <div
              key={store._id}
              className="flex flex-col sm:flex-row justify-between mb-[32px]"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:mr-[32px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${imageUrl}`}
                    width={180}
                    height={180}
                    alt="Medical Store"
                    className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                  />
                </div>
                <div className="py-[18px] sm:py-0 md:py-[18px]">
                  <p className="text-base text-[#5151E1] mb-[8px]">
                    Medical Store
                  </p>
                  <h3 className="title-24 mb-[8px]">{store.title}</h3>
                  <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                    Rating: {rating} / 5
                  </p>
                  <h4 className="title-24 text-[#808080] !font-medium">
                    {store.name}
                  </h4>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col justify-end">
                <button
                  onClick={() =>
                    navigate.push(`/detail/medical_store/${store._id}`)
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

export default MedicalStore;
