"use client";
import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-[56px]">
      <div className="text-center flex gap-[16px] items-center justify-center">
        {/* Left Arrow */}
        <div
          className={`${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={
            currentPage === 1 ? undefined : () => handlePageChange(currentPage - 1)
          }
        >
          <LeftOutlined
            className={
              currentPage === 1 ? "text-[#b5b2b2]" : "text-[#5151E1]"
            }
          />
        </div>

        {/* Page Buttons */}
        <div className="flex gap-[16px] items-center justify-center">
          {currentPage > 1 && (
            <button
              key={currentPage - 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="w-[32px] h-[32px] rounded-[4px] text-[#808080]"
            >
              {currentPage - 1}
            </button>
          )}
          <button
            key={currentPage}
            className="w-[32px] h-[32px] rounded-[4px] bg-[#5151E1] text-white"
          >
            {currentPage}
          </button>
          {currentPage + 1 <= totalPages && (
            <button
              key={currentPage + 1}
              onClick={() => onPageChange(currentPage + 1)}
              className="w-[32px] h-[32px] rounded-[4px] text-[#808080]"
            >
              {currentPage + 1}
            </button>
          )}
          {currentPage + 2 <= totalPages && (
            <button
              key={currentPage + 2}
              onClick={() => onPageChange(currentPage + 2)}
              className="w-[32px] h-[32px] rounded-[4px] text-[#808080]"
            >
              {currentPage + 2}
            </button>
          )}
        </div>

        {/* Right Arrow */}
        <div
          className={`${
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={
            currentPage === totalPages
              ? undefined
              : () => handlePageChange(currentPage + 1)
          }
        >
          <RightOutlined
            className={
              currentPage === totalPages ? "text-[#b5b2b2]" : "text-[#5151E1]"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
