"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const Vatenary = ({ serviceData, totalItems }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [vatenaryProfiles, setVatenaryProfiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  // Fetch profile for a vatenary
  const fetchProfile = async (id) => {
    try {
      if (vatenaryProfiles[id]) return; // avoid re-fetch
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
      );
      const data = res.data;
      console.log("Fetched vatenary profile data:", res);
      setVatenaryProfiles((prev) => ({
        ...prev,
        [id]: data,
      }));
    } catch (err) {
      console.error("Error fetching vatenary profile:", err);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h2 className="title-48 mb-[24px]">Results for Veterinary Services</h2>
      <p className="title-24 text-[#808080] !font-normal mb-[56px]">
        Showing {currentItems?.length} of {totalItems} results
      </p>

      <div className="flex flex-col gap-[32px]">
        {currentItems?.map((vet) => {
          if (!vatenaryProfiles[vet._id]) fetchProfile(vet._id);

          const profile =
            vatenaryProfiles[vet._id]?.healthServeProfileData
              ?.healthServeProfile.data;

          const imageUrl =
            profile?.profileImage  || "/images/image_placeholder.svg";

          const rating = profile?.testimonials?.length
            ? (
              profile.testimonials.reduce((sum, r) => sum + r.rating, 0) /
              profile.testimonials.length
            ).toFixed(1)
            : vet.rating || "N/A";

          return (
            <div
              key={vet._id}
              className="flex flex-col sm:flex-row justify-between mb-[32px]"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:mr-[32px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${imageUrl}`}
                    width={180}
                    height={180}
                    alt="Veterinary Service"
                    className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                  />
                </div>
                <div className="py-[18px] sm:py-0 md:py-[18px]">
                  <p className="text-base text-[#5151E1] mb-[8px]">
                    Veterinary Service
                  </p>
                  <h3 className="title-32 mb-[8px]">{vet.title}</h3>
                  <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                    Rating: {rating}
                  </p>
                  <h4 className="title-24 text-[#808080] !font-medium">
                    {vet.name}
                  </h4>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col justify-between">
                <h2 className="title-48 !text-[#5151E1] md:mt-[19px] text-end">
                  ₹{vet.price || ""}
                </h2>
                <button
                  onClick={() => navigate.push(`/detail/vatenary/${vet._id}`)}
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

export default Vatenary;
