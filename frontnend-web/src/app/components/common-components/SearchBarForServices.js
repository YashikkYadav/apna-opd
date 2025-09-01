"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { specialties } from "../../data/constants";
import { Form, Input } from "antd";
import Image from "next/image";
import debounce from "lodash/debounce";
import { searchCities } from "../../services/locationService";
import { toast, ToastContainer } from "react-toastify";

const SearchBarForServices = ({ onSearch, location = "", name = "" }) => {
  const [locationQuery, setLocationQuery] = useState(location);
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationWrapperRef = useRef(null);
  const [nameQuery, setNameQuery] = useState(name);
//  const [nameSuggestions, setNameSuggestions] = useState(nameSuggestion);
  const [isLoadingNames, setIsLoadingNames] = useState(false);

  useEffect(() => {
    setLocationQuery(location);
    setNameQuery(name);
  }, [location, name]);

  const debouncedLocationSearch = useCallback(
    debounce(async (searchText) => {
      if (searchText?.length < 2) return;
      setIsLoadingLocations(true);
      try {
        const results = await searchCities(searchText);
        setLocationOptions(results || []);
        setShowLocationDropdown(true);
      } catch (error) {
        setLocationOptions([]);
        setShowLocationDropdown(false);
        console.log("Error fetching locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    }, 600),
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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch(locationQuery, nameQuery);
  };

  const handleLocationSelect = (loc) => {
    console.log("Selected location:", loc);
    setLocationQuery(loc.label);
    setShowLocationDropdown(false);
  };

  // const handleNameSelect = (nam) => {
  //   console.log("Selected name:", nam);
  //   setNameQuery(nam);
    
  // };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative bg-[#0C65A0] text-white rounded-2xl shadow-lg p-5 md:p-10 lg:p-16 flex flex-col items-center gap-10"
    >
      {/* Background Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

      {/* Heading */}
      <div className="z-10 text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow">
          Hire Verified Services in Just a Few Clicks
        </h1>
        <p className="text-white/90 text-lg sm:text-xl opacity-90">
          Find qualified, background-checked professionals for your needs.
        </p>
      </div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        className="z-10 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex relative flex-col sm:flex-row items-center gap-3"
        >
          {/* Location Input */}
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => {
              setLocationQuery(e.target.value);
              debouncedLocationSearch(e.target.value);
            }}
            placeholder="Enter location"
            className="lg:w-[450px] w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-[#0C65A0] focus:outline-none"
            onFocus={() => {
              if (locationOptions?.length > 0) {
                setShowLocationDropdown(true);
              }
            }}
            ref={locationWrapperRef}
          />
          {/* Location Suggestions Dropdown */}
          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-[620px] text-black bg-white border border-[#f0f0f0] rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {isLoadingLocations ? (
                <div className="px-4 py-2 text-gray-500">Loading...</div>
              ) : locationOptions?.length > 0 ? (
                locationOptions?.map((location) => (
                  <div
                    key={location?.value}
                    className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer"
                    onMouseDown={() => handleLocationSelect(location)}
                  >
                    {location?.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  No locations found
                </div>
              )}
            </div>
          )}
          {/* Name Input */}
          <div className="relative w-full lg:w-2/3">
            <input
              type="text"
              value={nameQuery}
              onChange={(e) => {
                setNameQuery(e.target.value);
              }}
              placeholder="Enter name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-[#0C65A0] focus:outline-none"
            />
            {/* {nameSuggestions?.length > 0 && (
              <div className="absolute bottom-full text-black bg-white border border-[#f0f0f0] rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {isLoadingNames ? (
                  <div className="px-4 py-2 text-gray-500">Loading...</div>
                ) : nameSuggestions?.length > 0 ? (
                  nameSuggestions?.map((suggestion, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-gray-700"
                      onMouseDown={() => handleNameSelect(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No names found</div>
                )}
              </div>
            )} */}
          </div>
          {/* Button */}
          <button
            type="submit"
            className="bg-[#0C65A0] hover:bg-[#09507C] text-white text-lg font-bold px-8 py-3 rounded-lg shadow-md transition hover:scale-105"
          >
            Search
          </button>
        </form>
        {/* Location Dropdown */}
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          progressStyle={{ backgroundColor: "#0C65A0" }}
          hideProgressBar={true}
        />
      </motion.div>
    </motion.section>
  );
};

export default SearchBarForServices;
