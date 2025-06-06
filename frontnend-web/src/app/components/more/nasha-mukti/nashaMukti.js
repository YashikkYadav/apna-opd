"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NashaMukti = ({ serviceData }) => {
  const [nashaMuktiList, setNashaMuktiList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setNashaMuktiList(serviceData || []);
      setFilteredList(serviceData || []);
      setLoading(false);
    }
  }, [serviceData]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h2 className="title-48 mb-[24px]">Nasha Mukti Kendras Near You</h2>
      <p className="title-24 text-[#808080] !font-normal mb-[56px]">
        Showing {currentItems?.length} of {nashaMuktiList?.length} results
      </p>
      <div className="flex flex-col gap-[32px]">
        {currentItems?.map((kendra) => (
          <div
            key={kendra._id}
            className="flex flex-col sm:flex-row justify-between mb-[32px]"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:mr-[32px]">
                <Image
                  src={
                    kendra.profiles &&
                    kendra.profiles.length > 0 &&
                    kendra.profiles[0].images.length > 0
                      ? kendra.profiles[0].images[0].url
                      : "/images/image_placeholder.svg"
                  }
                  width={180}
                  height={180}
                  alt="Nasha Mukti Kendra"
                  className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                />
              </div>
              <div className="py-[18px] sm:py-0 md:py-[18px]">
                <p className="text-base text-[#D9534F] mb-[8px]">
                  Nasha Mukti Kendra
                </p>
                <h3 className="title-32 mb-[8px]">{kendra.name}</h3>
                <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                  Rating: {kendra.rating?.toFixed(1) || "N/A"} / 5
                </p>
                <h4 className="title-24 text-[#808080] !font-medium">
                  {kendra.location}
                </h4>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col justify-between">
              <h2 className="title-48 !text-[#D9534F] md:mt-[19px] text-end">
                Availability: {kendra.price ? `${kendra.price} Units` : "N/A"}
              </h2>
              <button
                onClick={() =>
                  navigate.push(`/more/nashaMukti/${kendra._id}/details`)
                }
                className="bg-[#D9534F] px-[35px] py-[10px] rounded-[8px] text-lg text-white font-bold"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NashaMukti;
