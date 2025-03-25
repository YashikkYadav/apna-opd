"use client";
import React from "react";
import { Form, Select, Input, Image } from "antd";

const SearchBar = ({ onSearch, locations = [] }) => {
  return (
    <div className="mb-[40px]">
      <Form
        name="searchForm"
        className="flex flex-col md:flex-row gap-[17px] w-full"
      >
        <Form.Item name="location" className="mb-0 w-full md:max-w-[317px]">
          <Select
            className="!h-[50px]"
            placeholder="Location"
            size="large"
            prefix={
              <Image
                className="mr-3"
                src="/images/blue_location.svg"
                width={24}
                height={24}
                alt="Location Icon"
              />
            }
          >
            {locations.map((eachLocation) => (
              <Select.Option key={eachLocation} value={eachLocation}>
                {eachLocation}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="search" className="mb-0 w-full">
          <Input
            placeholder="Search by name, specialty, etc."
            className="h-[50px] border-transparent text-base hover:border-transparent"
            prefix={
              <Image
                className="mr-3"
                src="/images/search.svg"
                width={24}
                height={24}
                alt="Search Icon"
              />
            }
          />
        </Form.Item>
        <button
          className="bg-[#3DB8F5] px-[51px] py-[10px] rounded-[8px] text-lg text-white font-bold hover:text-white hover:border-white"
          onClick={onSearch}
        >
          Search
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
