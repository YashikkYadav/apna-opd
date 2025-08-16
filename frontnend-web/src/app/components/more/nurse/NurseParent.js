"use client";
import { useState } from "react";
import NurseSearch from "./NurseSearch";
import NurseListings from "./NurseListings";

const NursePage = ({ nurses, searchData }) => {
  const [filteredNurses, setFilteredNurses] = useState(nurses);

  const handleSearch = (filters) => {
    const results = nurses.filter((nurse) => {
      return (
        (filters.location ? nurse.location.toLowerCase() === filters.location : true) &&
        (filters.nurseType ? nurse.type.toLowerCase() === filters.nurseType : true) &&
        (filters.availability ? nurse.availability.toLowerCase() === filters.availability : true) &&
        (filters.gender ? nurse.gender.toLowerCase() === filters.gender : true)
      );
    });
    setFilteredNurses(results);
  };

  return (
    <div className="flex flex-col gap-10">
      <NurseSearch searchData={searchData} onSearch={handleSearch} />
      <NurseListings nurses={filteredNurses} />
    </div>
  );
};

export default NursePage;
