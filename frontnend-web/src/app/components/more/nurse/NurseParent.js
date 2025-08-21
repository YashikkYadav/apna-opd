"use client";
import { useState, useEffect } from "react";
import NurseSearch from "./NurseSearch";
import NurseListings from "./NurseListings";

const NursePage = ({ nurses = [], page = 1, pages = 1, onPageChange, total,searchData }) => {
  const [filteredNurses, setFilteredNurses] = useState([]);
  

  useEffect(() => {
    // On first load (or whenever nurses prop changes), show all nurses
    if (nurses?.length) {
      setFilteredNurses(nurses);
    }
  }, [nurses]);

  const handleSearch = (filters) => {
    const results = nurses.filter((nurse) => {
      return (
        (filters.location
          ? nurse?.healthServeId?.location
            ?.toLowerCase()
            .includes(filters.location.toLowerCase())
          : true)
        // && (filters.nurseType ? nurse.type?.toLowerCase() === filters.nurseType : true)
        // && (filters.availability ? nurse.availability?.toLowerCase() === filters.availability : true)
        // && (filters.gender ? nurse.gender?.toLowerCase() === filters.gender : true)
      );
    });

    setFilteredNurses(results);
  };

  return (
    <div className="flex flex-col gap-10">
      <NurseSearch  onSearch={handleSearch} searchData={searchData} />
      <NurseListings nurses={filteredNurses} page={page} pages={pages} onPageChange={onPageChange} total={total}/>
    </div>
  );
};

export default NursePage;
