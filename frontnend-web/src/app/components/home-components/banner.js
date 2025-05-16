"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "./../common-components/SearchBar";

const Banner = () => {
  const router = useRouter();

  const handleSearch = (locationQuery, searchQuery) => {
    router.push(
      `/search-results?location=${locationQuery}&speciality=${searchQuery}`
    );
  };

  return (
    <div className="bg-[#0D7EB7]">
      <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right bg-cover">
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative xl:h-[740px]">
          <div className="flex flex-col xl:flex-row justify-between xl:items-end pt-[60px] md:pt-[20px]">
            <div className="max-w-[550px]">
              <h1 className="title-64 mb-[3px]">
              Find Doctor in India | Book OPD Online Instantly with Apna OPD
              </h1>
              <p className="text-base text-white mb-[29px]">
                Apna OPD is your all-in-one India healthcare platform to find doctors by specialty, location, or hospital. Whether you're looking for online doctor consultation, in-clinic visits, or the best OPD booking app — we make it easy to compare, choose, and book appointments with trusted doctors across India in minutes.
              </p>
              <Link href="/find-doctor" passHref>
                <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold mb-[30px] md:mb-[67px] hover:text-white hover:border-white">
                  Get Started
                </button>
              </Link>
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
            <div className="rounded-[16px] bg-white w-full pb-[40px] px-[20px] md:px-[40px] pt-[8px] shadow-lg max-w-[1210px]">
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
};

export default Banner;
