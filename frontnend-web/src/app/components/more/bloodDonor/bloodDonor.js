"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BloodDonar = ({ serviceData }) => {
  const [bloodBankList, setBloodBankList] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setBloodBankList(serviceData || []);
    }
  }, [serviceData]);

  return (
    <>
      <h2 className="title-48 mb-[24px]">Blood Donors Near You</h2>
      <p className="title-24 text-[#808080] !font-normal mb-[56px]">
        Showing {bloodBankList?.length} results
      </p>
      <div className="flex flex-col gap-[32px]">
        {bloodBankList?.map((bank) => (
          <div
            key={bank._id}
            className="flex flex-col sm:flex-row justify-between mb-[32px]"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:mr-[32px]">
                <Image
                  src={
                    bank?.images && Array.isArray(bank.images) && bank.images?.length > 0
                      ? bank.images[0]
                      : "/images/image_placeholder.svg"
                  }
                  width={180}
                  height={180}
                  alt="Blood Donor"
                  className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                />
              </div>
              <div className="py-[18px] sm:py-0 md:py-[18px]">
                <p className="text-base text-[#D9534F] mb-[8px]">
                  Blood Donation & Storage
                </p>
                <h3 className="title-24 mb-[8px]">{bank.name}</h3>
                <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                  Blood Group: {bank.bloodGroup || "N/A"}
                </p>
                <h4 className="title-24 text-[#808080] !font-medium">
                  {bank.location}
                </h4>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col justify-between">
              {/* <h4 className="title-24 !text-[#D9534F] md:mt-[19px] text-end">
                Availability: {bank.price ? `${bank.price} Units` : "N/A"}
              </h4> */}
              {/* <button
                onClick={() => navigate.push(`/more/bloodDonor/${bank._id}/details`)}
                className="bg-[#D9534F] px-[35px] py-[10px] rounded-[8px] text-lg text-white font-bold"
              >
                Details
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BloodDonar;
