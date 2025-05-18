"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MedicalStore = ({ serviceData }) => {
  const [medicalStoreList, setMedicalStoreList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useRouter();

  useEffect(() => {
    if (serviceData) {
      setMedicalStoreList(serviceData || []);
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
      <h2 className="title-48 mb-[24px]">Medical Stores Near You</h2>
      <p className="title-24 text-[#808080] !font-normal mb-[56px]">
        Showing {currentItems?.length} of {medicalStoreList?.length} results
      </p>
      <div className="flex flex-col gap-[32px]">
        {currentItems?.map((store) => (
          <div
            key={store._id}
            className="flex flex-col sm:flex-row justify-between mb-[32px]"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:mr-[32px]">
                <Image
                  src={
                    store?.images && Array.isArray(store.images) && store.images?.length > 0
                      ? store.images[0]
                      : "/images/image_placeholder.svg"
                  }
                  width={180}
                  height={180}
                  alt="Medical Store"
                  className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                />
              </div>
              <div className="py-[18px] sm:py-0 md:py-[18px]">
                <p className="text-base text-[#D9534F] mb-[8px]">
                  Medical Store
                </p>
                <h3 className="title-32 mb-[8px]">{store.name}</h3>
                <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                  Rating: {store.rating || "N/A"}
                </p>
                <h4 className="title-24 text-[#808080] !font-medium">
                  {store.location}
                </h4>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col justify-between">
              <h2 className="title-48 !text-[#D9534F] md:mt-[19px] text-end">
                Availability: {store.price ? `${store.price} Units` : "N/A"}
              </h2>
              <button
                onClick={() => navigate.push(`/more/medicalStore/${store._id}/details`)}
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

export default MedicalStore;
