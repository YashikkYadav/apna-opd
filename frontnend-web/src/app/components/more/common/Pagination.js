"use client";
import React from "react";
import Image from "next/image";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-[56px]">
      <div className="text-center flex gap-[16px] items-center justify-center">
        <div className="">
          <Image
            src="/images/gray_left_arrow.svg"
            width={16}
            height={16}
            alt="Previous Page"
            className="cursor-pointer"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          />
        </div>
        <div className="">
          <div className="text-center flex gap-[16px] items-center justify-center">
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
        </div>
        <div className="">
          <Image
            src="/images/purple_right_arrow.svg"
            width={16}
            height={16}
            alt="Next Page"
            className="cursor-pointer"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
