"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BloodBank = ({ serviceData }) => {
  const [bloodBankList, setBloodBankList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setBloodBankList(serviceData || []);
      setFilteredList(serviceData || []);
    }
  }, [serviceData]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h2 className="title-48 mb-[24px]">Blood Banks Near You</h2>
      <p className="title-24 text-[#808080] !font-normal mb-[56px]">
        Showing {currentItems?.length} of {totalItems} results
      </p>
      <div className="flex flex-col gap-[32px]">
        {currentItems?.map((bloodBank) => (
          <div
            key={bloodBank._id}
            className="flex flex-col sm:flex-row justify-between mb-[32px]"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:mr-[32px]">
                <Image
                  src={
                    bloodBank.profiles &&
                    bloodBank.profiles.length > 0 &&
                    bloodBank.profiles[0].images.length > 0
                      ? bloodBank.profiles[0].images[0].url
                      : "/images/image_placeholder.svg"
                  }
                  width={180}
                  height={180}
                  alt="Blood Bank"
                  className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                />
              </div>
              <div className="py-[18px] sm:py-0 md:py-[18px]">
                <p className="text-base text-[#5151E1] mb-[8px]">
                  Blood Bank
                </p>
                <h3 className="title-24 mb-[8px]">{bloodBank.title}</h3>
                <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                  Rating: {bloodBank.rating?.toFixed(1) || "N/A"} / 5
                </p>
                <h4 className="title-24 text-[#808080] !font-medium">
                  {bloodBank.name}
                </h4>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col justify-end">
              {/* Optional price display */}
              {/* <h2 className="title-24 !text-[#5151E1] md:mt-[19px] text-end">
                ₹{bloodBank.price || "N/A"}
              </h2> */}
              <button
                onClick={() =>
                  navigate.push(`/detail/blood_bank/${bloodBank._id}`)
                }
                className="bg-[#3DB8F5] px-[35px] py-[10px] rounded-[8px] text-lg text-white font-bold"
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

export default BloodBank;
