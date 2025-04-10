"use client";
import { Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "../common-components/SearchBar";
import Pagination from "./../more/common/Pagination";
import axiosInstance from "@/app/config/axios";

const SearchResultsData = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/doctor/list?page=${page}&location=${location}&speciality=${speciality}`
      );
      if (response.list?.doctorList) {
        setData(response.list.doctorList);
        setPagination({
          currentPage: response.list.currentPage,
          totalPages: response.list.totalPages,
          totalItems: response.list.totalItems,
        });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState("");

  useEffect(() => {
    const locationQuery = searchParams.get("location");
    const specialityQuery = searchParams.get("speciality");
    setLocation(locationQuery);
    setSpeciality(specialityQuery);
  }, [searchParams]);

  const handlePageChange = (page) => {
    if (page > pagination.totalPages || page < 1) return;
    fetchData(page);
  };

  const handleSearch = (location, speciality) => {
    router.push(
      `/search-results?location=${location}&speciality=${speciality}`
    );
  };

  const handleDoctorDetails = (doctorId) => {
    router.push(`${doctorId}/profile`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

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
              <SearchBar onSearch={handleSearch} />
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
                <Select.Option
                  key={location}
                  value={location}
                  placeholder={location}
                >
                  {location || "location"}
                </Select.Option>
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
                <Select.Option key={speciality} value={speciality}>
                  {speciality || "Specialist"}
                </Select.Option>
              </Select>
            </div>
          </div>
          <div className="lg:w-[66%]">
            <h2 className="title-48 mb-[24px]">Result for {speciality || "Paediatrics"}</h2>
            {data?.length > 0 ? (<p className="title-24 text-[#808080] !font-normal mb-[56px]">
              Showing {data?.length} of {pagination.totalItems} results
            </p>):(<p className="title-24 text-[#808080] !font-normal mb-[56px]">
              No doctors Registered as of now.
            </p>)}
            <div className="flex flex-col gap-[32px]">
              {data?.map((item) => (
                <div
                  key={item.doctor._id}
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
                        {item.doctor.speciality || "Pedriatics Specialist"}
                      </p>
                      <h3 className="title-32 mb-[8px]">{item.doctor.name}</h3>
                      <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                        {`${item.experience} Years of Experience` || "10 Years of Experience"}
                      </p>
                      <h4 className="title-24 text-[#808080] !font-medium">
                        {item.doctor.clinicName || "California Medical Center"}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-between">
                    <h2 className="title-48 !text-[#5151E1] md:mt-[19px] text-end">
                      $25
                    </h2>
                    <button
                      onClick={() => handleDoctorDetails(item._id)}
                      className="bg-[#3DB8F5] px-[35px] py-[10px] rounded-[8px] text-lg text-white font-bold"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {pagination.totalPages > 1 && <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultsData;
