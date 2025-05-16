"use client"
import { Form, Input, Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchBar from "./../common-components/SearchBar"

const BannerWithSearch = ({ title, description }) => {
        const router = useRouter()
    
    const handleSearch = (locationQuery, searchQuery) => {
    router.push(
      `/search-results?location=${locationQuery}&speciality=${searchQuery}`
        );
    };
    return (
        <div className="bg-[#0D7EB7]">
      <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right bg-cover">
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative xl:h-[740px]">
          <div className="flex flex-col xl:flex-row justify-between xl:items-end pt-[60px] md:pt-[110px]">
            <div className="max-w-[550px]">
              <h1 className="title-64 mb-[32px]">
                Fully Medicine Solution for You
              </h1>
              <p className="text-base text-white mb-[29px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold mb-[30px] md:mb-[67px] hover:text-white hover:border-white">
                Get Started
              </button>
            </div>
            <div>
              <Image
                src="/images/smiling_indian_doctors.svg"
                width={815}
                height={543}
                alt="Doctor Image"
                className="mx-auto"
                priority={true}
              />
            </div>
          </div>
          <div className="pb-[40px]">
            <div className="rounded-[16px] bg-white w-full pb-[40px] px-[20px] md:px-[40px] pt-[16px] shadow-lg max-w-[1210px]">
              <h3 className="text-4xl font-bold mb-[35px]">Find Doctor</h3>
              <div>
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default BannerWithSearch;