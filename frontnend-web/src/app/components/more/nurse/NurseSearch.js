"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRef, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { searchCities } from "../../../services/locationService";

const NurseSearch = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationWrapperRef = useRef(null);
  const [gender, setGender] = useState("Gender");

  const debouncedLocationSearch = useCallback(
    debounce(async (searchText) => {
      if (searchText?.length < 2) return;
      setIsLoadingLocations(true);
      try {
        const results = await searchCities(searchText);
        setLocationOptions(results || []);
        setShowLocationDropdown(results && results?.length > 0);
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

  const handleLocationSelect = (locationObj) => {
    setLocation(locationObj.label);
    setShowLocationDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, gender });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative bg-[#0C65A0] text-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col items-center gap-10"
    >
      {/* Background Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

      {/* Heading */}
      <div className="z-10 text-center space-y-4 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow">
          Hire Verified Nursing Staff in Just a Few Clicks
        </h1>
        <p className="text-white/90 text-lg sm:text-xl opacity-90">
          Qualified, background-checked nurses for home care, hospital duty, and
          post-operative support.
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
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {/* Location Input + Suggestions Dropdown */}
          <div className="relative w-full" ref={locationWrapperRef}>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                debouncedLocationSearch(e.target.value);
              }}
              placeholder="Enter location"
              className="w-full flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 
                    focus:ring-2 focus:ring-[#0C65A0] focus:outline-none"
              onFocus={() => {
                if (locationOptions?.length > 0) {
                  setShowLocationDropdown(true);
                }
              }}
            />
            {showLocationDropdown && (
              <div className="absolute text-black top-full left-0 right-0 bg-white border border-[#f0f0f0] rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {isLoadingLocations ? (
                  <div className="px-4 py-2 text-gray-500">Loading...</div>
                ) : locationOptions?.length > 0 ? (
                  locationOptions?.map((loc) => (
                    <div
                      key={loc.value}
                      className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer"
                      onClick={() => handleLocationSelect(loc)}
                    >
                      {loc.label}
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

          {/* Gender Dropdown */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 
                  focus:ring-2 focus:ring-[#0C65A0] focus:outline-none"
          >
            <option value="">Select Gender</option>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="bg-[#0C65A0] hover:bg-[#09507C] text-white text-lg font-bold 
                  px-8 py-3 rounded-lg shadow-md transition hover:scale-105"
          >
            Search
          </button>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default NurseSearch;
