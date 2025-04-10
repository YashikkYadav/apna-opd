"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getServiceData } from "../../../data/constants";
import SearchBar from "../../common-components/SearchBar";
import Pagination from "../common/Pagination";
import { Select } from "antd";
import { useRouter } from "next/navigation";

const CommercialMeditation = ({serviceData}) => {
  const [meditationList, setMeditationList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useRouter();

  useEffect(() => {
    setMeditationList(serviceData);
    setFilteredList(serviceData);
    setLoading(false);
  }, []);

  const handleSearch = () => {
    setFilteredList(meditationList);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <div className="bg-[#0D7EB7] banner-with-search">
        <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right ">
          <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative md:h-[700px] pb-[60px]">
            <div className="flex justify-between items-end pt-[60px] md:pt-[129px]">
              <div className="max-w-[700px] mx-auto">
                <h1 className="title-64 mb-[32px] text-center max-w-[530px] mx-auto">
                  Find Meditation Centers
                </h1>
                <p className="text-base text-white mb-[88px] text-center">
                  Discover peace and mindfulness with expert meditation
                  instructors in serene locations.
                </p>
              </div>
            </div>

            <div>
              <SearchBar locations={locations} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto my-[60px] md:my-[120px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
          <div className="lg:w-[34%] flex lg:flex-col gap-2 md:gap-0">
            <div className="mb-[20px] md:mb-[80px] w-full">
              <h2 className="title-48 mb-[24px]">Location</h2>
              <Select
                className="!h-[50px] w-full max-w-[296px]"
                placeholder="Location"
                size="large"
                prefix={
                  <Image
                    className="mr-3"
                    src="/images/blue_location.svg"
                    width={24}
                    height={24}
                    alt="Location Icon"
                  />
                }
              >
                {locations.map((location) => (
                  <Select.Option key={location} value={location}>
                    {location}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="lg:w-[66%]">
            <h2 className="title-48 mb-[24px]">
              Result for Meditation Centers
            </h2>
            <p className="title-24 text-[#808080] !font-normal mb-[56px]">
              Showing {currentItems.length} of {meditationList.length} results
            </p>
            <div className="flex flex-col gap-[32px]">
              {currentItems.map((meditation, index) => (
                <div
                  key={meditation._id}
                  className="flex flex-col sm:flex-row justify-between mb-[32px]"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:mr-[32px]">
                      <Image
                        src={
                          meditation?.images && Array.isArray(meditation.images) && meditation.images.length > 0
                            ? meditation.images[0]
                            : "/images/image_placeholder.svg"
                        }
                        width={180}
                        height={180}
                        alt="Meditation Center"
                        className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                      />
                    </div>
                    <div className="py-[18px] sm:py-0 md:py-[18px]">
                      <p className="text-base text-[#5151E1] mb-[8px]">
                        Meditation Center
                      </p>
                      <h3 className="title-32 mb-[8px]">{meditation.title}</h3>
                      <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                        Rating: {meditation.rating}
                      </p>
                      <h4 className="title-24 text-[#808080] !font-medium">
                        {meditation.location}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-between">
                    <h2 className="title-48 !text-[#5151E1] md:mt-[19px] text-end">
                      ${meditation.price}
                    </h2>
                    <button
                      onClick={() => navigate.push(`/more/commercialMeditation/${meditation._id}/details`)}
                      className="bg-[#3DB8F5] px-[35px] py-[10px] rounded-[8px] text-lg text-white font-bold"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[56px]">
              <div className="text-center flex gap-[16px] items-center justify-center">
                <div>
                  <Image
                    src="/images/gray_left_arrow.svg"
                    width={16}
                    height={16}
                    alt="Left Arrow"
                    className="cursor-pointer"
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                </div>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommercialMeditation;
