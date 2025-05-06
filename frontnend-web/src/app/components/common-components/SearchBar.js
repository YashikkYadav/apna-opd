"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { specialties } from "../../data/constants";
import { Form, Input } from "antd";
import Image from "next/image";
import debounce from "lodash/debounce";
import { searchCities } from "../../services/locationService";
import { toast, ToastContainer } from "react-toastify";

const SearchBar = ({ onSearch, location="", specialty="" }) => {
  const [locationQuery, setLocationQuery] = useState(location);
  const [searchQuery, setSearchQuery] = useState(specialty);
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);
  const locationWrapperRef = useRef(null);
  const searchWrapperRef = useRef(null);

  const debouncedLocationSearch = useCallback(
    debounce(async (searchText) => {
      if (searchText?.length < 2) return;
      setIsLoadingLocations(true);
      try {
        const results = await searchCities(searchText);
        setLocationOptions(results || []);
        if (results && results?.length > 0) {
          setShowLocationDropdown(true);
        }
      } catch (error) {
        console.log("Error fetching locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    }, 300),
    []
  );

  // Handle clicks outside the dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
      }
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setShowSpecialtyDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if(locationQuery || searchQuery){
      onSearch(locationQuery, searchQuery);
    }
    else{
      toast.dismiss();
      toast.info("Please enter a location or Specialty");
    }
  };

  const handleLocationSelect = (location) => {
    setLocationQuery(location.label);
    setShowLocationDropdown(false);
  };

  const handleSearchQuery = (value) => {
    setSearchQuery(value);

    // Filter specialties based on search query
    if (value?.length > 0) {
      const filtered = specialties
        .filter((specialty) =>
          specialty.toLowerCase().includes(value.toLowerCase())
        )
        ?.slice(0, 5);

      setFilteredSpecialties(filtered);
      setShowSpecialtyDropdown(filtered?.length > 0);
    } else {
      setFilteredSpecialties([]);
      setShowSpecialtyDropdown(false);
    }
  };

  const handleSpecialtySelect = (specialty) => {
    setSearchQuery(specialty);
    setShowSpecialtyDropdown(false);
  };

  return (
    <div className="mb-[40px]">
      <Form
        name="searchForm"
        className="flex flex-col md:flex-row gap-[17px] w-full"
      >
        <Form.Item name="location" className="mb-0 w-full md:max-w-[317px]">
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
                />
              }
              value={locationQuery}
              onChange={(e) => {
                setLocationQuery(e.target.value);
                debouncedLocationSearch(e.target.value);
              }}
              onFocus={() => {
                if (locationOptions?.length > 0) {
                  setShowLocationDropdown(true);
                }
              }}
            />
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-[#f0f0f0] rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {isLoadingLocations ? (
                  <div className="px-4 py-2 text-gray-500">Loading...</div>
                ) : locationOptions?.length > 0 ? (
                  locationOptions?.map((location) => (
                    <div
                      key={location.value}
                      className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer"
                      onClick={() => handleLocationSelect(location)}
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
          <div className="relative border-none" ref={searchWrapperRef}>
            <Input
              placeholder="Search by name, specialty, etc."
              className="h-[50px] border-[#094B89] hover:border-[#69b6ff] text-base"
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
              onChange={(e) => handleSearchQuery(e.target.value)}
              onFocus={() => {
                if (filteredSpecialties?.length > 0) {
                  setShowSpecialtyDropdown(true);
                }
              }}
            />
            {showSpecialtyDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-[#f0f0f0] rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {filteredSpecialties?.length > 0 ? (
                  filteredSpecialties?.map((specialty) => (
                    <div
                      key={specialty}
                      className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer"
                      onClick={() => handleSpecialtySelect(specialty)}
                    >
                      {specialty}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No specialties found
                  </div>
                )}
              </div>
            )}
          </div>
        </Form.Item>
        <button
          className="bg-[#3DB8F5] px-[51px] py-[10px] rounded-[8px] text-lg text-white font-bold hover:text-white hover:bg-[#69b6ff]"
          onClick={handleSearch}
        >
          Search
        </button>
      </Form>
      <ToastContainer position="bottom-center" autoClose={1000} progressStyle={{ backgroundColor: "#3DB8F5" }} hideProgressBar ={true}/>
    </div>
  );
};

export default SearchBar;
