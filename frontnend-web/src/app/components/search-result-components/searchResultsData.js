"use client";
import { Form, Input, Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getLocations, getSpecialties } from "../../data/constants";
import SearchBar from "../more/common/SearchBar";

const SearchResultsData = () => {
  const router = useRouter();
  const locations = getLocations();
  const specialties = getSpecialties();

  const data = [
    {
      id: 1,
      title: "Maria Antonie, MD",
    },
    {
      id: 2,
      title: "Mark David, MD",
    },
    {
      id: 3,
      title: "Angela Nielson, MD",
    },
    {
      id: 4,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 5,
      title: "Maria Antonie, MD",
    },
    {
      id: 6,
      title: "Mark David, MD",
    },
    {
      id: 7,
      title: "Angela Nielson, MD",
    },
    {
      id: 8,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 9,
      title: "Maria Antonie, MD",
    },
    {
      id: 10,
      title: "Mark David, MD",
    },
    {
      id: 11,
      title: "Angela Nielson, MD",
    },
    {
      id: 12,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 13,
      title: "Angela Nielson, MD",
    },
    {
      id: 14,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 15,
      title: "Maria Antonie, MD",
    },
    {
      id: 16,
      title: "Mark David, MD",
    },
    {
      id: 17,
      title: "Angela Nielson, MD",
    },
    {
      id: 18,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 19,
      title: "Mark David, MD",
    },
    {
      id: 20,
      title: "Angela Nielson, MD",
    },
    {
      id: 21,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 22,
      title: "Angela Nielson, MD",
    },
    {
      id: 23,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 24,
      title: "Maria Antonie, MD",
    },
    {
      id: 25,
      title: "Mark David, MD",
    },
    {
      id: 26,
      title: "Angela Nielson, MD",
    },
    {
      id: 27,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 28,
      title: "Mark David, MD",
    },
    {
      id: 29,
      title: "Angela Nielson, MD",
    },
    {
      id: 30,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 31,
      title: "Angela Nielson, MD",
    },
    {
      id: 32,
      title: "Rudolf Andrew, MD",
    },
    {
      id: 33,
      title: "Maria Antonie, MD",
    },
    {
      id: 34,
      title: "Mark David, MD",
    },
    {
      id: 35,
      title: "Angela Nielson, MD",
    },
    {
      id: 36,
      title: "Rudolf Andrew, MD",
    },
  ];

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState("");

  const searchParams = useSearchParams();
  useEffect(() => {
    const locationQuery = searchParams.get("location");
    const specialityQuery = searchParams.get("speciality");
    setLocation(locationQuery);
    setSpeciality(specialityQuery);
  }, [searchParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const SearchResults = () => {
    router.push(`/more/${speciality}`);
  };

  const handleDoctorDetails = (doctorId) => {
    router.push(`${doctorId}/profile`);
  };

  return (
    <>
      <div className="bg-[#0D7EB7] banner-with-search">
        <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right ">
          <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative md:h-[700px] pb-[60px]">
            <div className="flex justify-between items-end pt-[60px] md:pt-[129px]">
              <div className="max-w-[700px] mx-auto">
                <h1 className="title-64 mb-[32px] text-center max-w-[530px] mx-auto">
                  Find Our Specialist Doctors
                </h1>
                <p className="text-base text-white mb-[88px] text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
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
                value={location}
              >
                {locations.map((eachLocation) => (
                  <Select.Option key={eachLocation} value={eachLocation}>
                    {eachLocation}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <h2 className="title-48 mb-[24px]">Specialist</h2>
              <Select
                className="!h-[50px] w-full max-w-[296px]"
                placeholder="Specialist"
                size="large"
                prefix={
                  <Image
                    className="mr-3"
                    src="/images/stethoscope.svg"
                    width={24}
                    height={24}
                    alt="Location Icon"
                  />
                }
                value={speciality}
              >
                {specialties.map((eachSpecialty) => (
                  <Select.Option key={eachSpecialty} value={eachSpecialty}>
                    {eachSpecialty}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="lg:w-[66%]">
            <h2 className="title-48 mb-[24px]">Result for Pediatrics</h2>
            <p className="title-24 text-[#808080] !font-normal mb-[56px]">
              Showing {currentItems.length} of {data.length} results
            </p>
            <div className="flex flex-col gap-[32px]">
              {currentItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between mb-[32px]"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:mr-[32px]">
                      <Image
                        src="/images/image_placeholder.svg"
                        width={180}
                        height={180}
                        alt="Working Men"
                        className="w-full sm:w-fit object-cover rounded-[8px] max-h-[300px] sm:max-h-[200px]"
                      />
                    </div>
                    <div className="py-[18px] sm:py-0 md:py-[18px]">
                      <p className="text-base text-[#5151E1] mb-[8px]">
                        Pedriatics Specialist
                      </p>
                      <h3 className="title-32 mb-[8px]">{item.title}</h3>
                      <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                        10 Years of Experience
                      </p>
                      <h4 className="title-24 text-[#808080] !font-medium">
                        California Medical Center
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-between">
                    <h2 className="title-48 !text-[#5151E1] md:mt-[19px] text-end">
                      $25
                    </h2>
                    <button
                      onClick={() => handleDoctorDetails(item.id)}
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
                <div className="">
                  <Image
                    src="/images/gray_left_arrow.svg"
                    width={16}
                    height={16}
                    alt="Working Men"
                    className="cursor-pointer"
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                </div>
                <div className="">
                  <div className="text-center flex gap-[16px] items-center justify-center">
                    {currentPage > 1 && (
                      <button
                        key={currentPage - 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`w-[32px] h-[32px] rounded-[4px] ${
                          currentPage === currentPage - 1
                            ? "bg-[#5151E1] text-white"
                            : "text-808080"
                        }`}
                      >
                        {currentPage - 1}
                      </button>
                    )}
                    <button
                      key={currentPage}
                      className={`w-[32px] h-[32px] rounded-[4px] ${
                        currentPage === currentPage
                          ? "bg-[#5151E1] text-white"
                          : "text-808080"
                      }`}
                    >
                      {currentPage}
                    </button>
                    {currentPage + 1 <= totalPages && (
                      <button
                        key={currentPage + 1}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`w-[32px] h-[32px] rounded-[4px] ${
                          currentPage === currentPage + 1
                            ? "bg-[#5151E1] text-white"
                            : "text-808080"
                        }`}
                      >
                        {currentPage + 1}
                      </button>
                    )}
                    {currentPage + 2 <= totalPages && (
                      <button
                        key={currentPage + 2}
                        onClick={() => handlePageChange(currentPage + 2)}
                        className={`w-[32px] h-[32px] rounded-[4px] ${
                          currentPage === currentPage + 2
                            ? "bg-[#5151E1] text-white"
                            : "text-808080"
                        }`}
                      >
                        {currentPage + 2}
                      </button>
                    )}
                  </div>
                </div>
                <div className="mr-[32px]">
                  <Image
                    src="/images/purple_right_arrow.svg"
                    width={16}
                    height={16}
                    alt="Working Men"
                    className="cursor-pointer"
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultsData;
