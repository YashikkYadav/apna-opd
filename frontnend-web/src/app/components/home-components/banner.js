"use client";
import { Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./banner.module.css";
import { getLocations, getSpecialties } from "../../data/constants";
import { searchCities } from "../../services/locationService";
import debounce from "lodash/debounce";

const Banner = () => {
  const router = useRouter();
  const [locationQuery, setLocationQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const locationWrapperRef = useRef(null);
  const searchWrapperRef = useRef(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  // Get data from centralized location
  const specialties = getSpecialties();

  const filteredSpecialties = specialties
    .filter((specialty) =>
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const debouncedLocationSearch = useCallback(
    debounce(async (searchText) => {
      if (searchText.length < 2) return;
      setIsLoadingLocations(true);
      try {
        const results = await searchCities(searchText);
        setLocationOptions(results || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(event.target)
      ) {
        setShowLocationSuggestions(false);
      }
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setShowSearchSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const SearchResults = () => {
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
                <Form
                  name="searchForm"
                  className="flex flex-col md:flex-row gap-[17px] w-full"
                >
                  <Form.Item
                    name="location"
                    className="mb-0 w-full md:max-w-[317px]"
                  >
                    <div className="relative" ref={locationWrapperRef}>
                      <Input
                        placeholder="Location"
                        className="h-[50px] border-[#094B89] text-base"
                        prefix={
                          <Image
                            className="mr-3"
                            src="/images/blue_location.svg"
                            width={24}
                            height={24}
                            alt="Location Icon"
                            style={{ width: "auto", height: "auto" }}
                          />
                        }
                        value={locationQuery}
                        onChange={(e) => {
                          setLocationQuery(e.target.value);
                          debouncedLocationSearch(e.target.value);
                          setShowLocationSuggestions(true);
                        }}
                        onFocus={() => setShowLocationSuggestions(true)}
                      />
                      {showLocationSuggestions && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-[#f0f0f0] rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                          {isLoadingLocations ? (
                            <div className="px-4 py-2 text-gray-500">
                              Loading...
                            </div>
                          ) : locationOptions.length > 0 ? (
                            locationOptions.map((location) => (
                              <div
                                key={`${location.value}-${location.label}`}
                                className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-base"
                                onClick={() => {
                                  setLocationQuery(location.label);
                                  setShowLocationSuggestions(false);
                                }}
                              >
                                {location.label}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500">
                              No locations found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Form.Item>
                  <Form.Item name="search" className="mb-0 w-full">
                    <div className="relative" ref={searchWrapperRef}>
                      <Input
                        placeholder="Search Doctor, Nurse, Ambulance etc."
                        className="h-[50px] border-[#094B89] text-base"
                        prefix={
                          <Image
                            className="mr-3"
                            src="/images/search.svg"
                            width={24}
                            height={24}
                            alt="Search Icon"
                          />
                        }
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSearchSuggestions(e.target.value.length > 0);
                        }}
                        onFocus={() => setShowSearchSuggestions(true)}
                      />
                      {showSearchSuggestions && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-[#f0f0f0] rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                          {filteredSpecialties.map((specialty) => (
                            <div
                              className={styles.suggestionItem}
                              key={specialty}
                              onClick={() => {
                                setSearchQuery(specialty);
                                setShowSearchSuggestions(false);
                              }}
                            >
                              {specialty}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Form.Item>
                  <button
                    className={styles.searchButton}
                    onClick={() => SearchResults()}
                  >
                    Search
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
