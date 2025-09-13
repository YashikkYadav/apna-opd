"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CaretDownOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isFindDropdownOpen, setIsFindDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  let [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const router = useRouter();

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
    if (!isMobileNavOpen) {
      setIsFindDropdownOpen(false);
    }
  };

  const toggleFindDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFindDropdownOpen((prev) => !prev);
  };

  const closeAllMenus = () => {
    setIsMobileNavOpen(false);
    setIsFindDropdownOpen(false);
  };

  const handleNavigation = (route) => (e) => {
    e.stopPropagation();
    closeAllMenus();
    router.push(route);
  };

  const menuItems = [
    { label: "Doctors", route: "/find-doctor" },
    { label: "Ambulance", route: "/more/ambulance" },
    { label: "GYM", route: "/more/gym" },
    { label: "Yoga", route: "/more/yoga" },
    { label: "Commercial Meditation", route: "/more/commercial-meditation" },
    { label: "Nasha Mukti Kendra", route: "/more/nasha-mukti-kendra" },
    { label: "Medical Store", route: "/more/medical-store" },
    {
      label: "Nursing & Medical College",
      route: "/more/nursing-medical-college",
    },
    { label: "Blood Bank", route: "/more/blood-bank" },
    { label: "Physiotherapist", route: "/more/physiotherapist" },
    { label: "Radiologist", route: "/more/radiologist" },
    { label: "Hospital", route: "/more/hospital" },
    { label: "Veterinary", route: "/more/vatenary" },
    { label: "Nursing Staff", route: "/nurse-listings" },
    { label: "Laboratory", route: "/more/laboratory" },
    { label: "IVF Clinic", route: "/more/ivf-clinic" },
  ];

  // Filter search items based on input
  useEffect(() => {
    if (searchValue.trim()) {
      const filtered = menuItems.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(menuItems);
    }
  }, [searchValue]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle search focus
  const handleSearchFocus = () => {
    if (!searchValue.trim()) {
      setFilteredItems(menuItems);
    }
  };


  // Handle manual search (Enter key or direct navigation)
  const handleManualSearch = () => {
    if (searchValue.trim()) {
      // Try to find exact match first
      const exactMatch = menuItems.find(
        (item) => item.label.toLowerCase() === searchValue.toLowerCase()
      );

      if (exactMatch) {
        router.push(exactMatch.route);
        setSearchValue("");
      } else {
        // Try to find partial match
        const partialMatch = menuItems.find((item) =>
          item.label.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (partialMatch) {
          router.push(partialMatch.route);
          setSearchValue("");
        } else {
          searchValue = searchValue.trim().replace(/\s+/g, "-").toLowerCase();
          router.push(`/more/${searchValue}`);
          setSearchValue('');
        } 
      }

      
    }
  };

  // Handle Enter key press
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleManualSearch();
      setSearchValue("");
    } else if (e.key === "Escape") {
      setSearchValue("");
    }
  };

  const findMenuItems = [
    { label: "divider", type: "divider" },
    { label: "Doctors", route: "/find-doctor" },
    { label: "divider", type: "divider" },
    { label: "Ambulance", route: "/more/ambulance" },
    { label: "divider", type: "divider" },
    { label: "GYM", route: "/more/gym" },
    { label: "divider", type: "divider" },
    { label: "Yoga", route: "/more/yoga" },
    { label: "divider", type: "divider" },
    // { label: "Commercial Meditation", route: "/more/commercial-meditation" },
    // { label: "Nasha Mukti Kendra", route: "/more/nasha-mukti-kendra" },
    { label: "Medical Store", route: "/more/medical-store" },
    { label: "divider", type: "divider" },
    {
      label: "Nursing & Medical College",
      route: "/more/nursing-medical-college",
    },
    { label: "divider", type: "divider" },
    { label: "Blood Bank", route: "/more/blood-bank" },
    { label: "divider", type: "divider" },
    { label: "Physiotherapist", route: "/more/physiotherapist" },
    { label: "divider", type: "divider" },
    { label: "Radiologist", route: "/more/radiologist" },
    { label: "divider", type: "divider" },
    { label: "Hospital", route: "/more/hospital" },
    { label: "divider", type: "divider" },
    { label: "Home Service", type: "heading" },
    { label: "divider", type: "divider" },
    { label: "Veterinary", route: "/more/vatenary" },
    { label: "divider", type: "divider" },
    { label: "Nursing Staff", route: "/nurse-listings" },
    { label: "divider", type: "divider" },
    { label: "Laboratory", route: "/more/laboratory" },
    { label: "divider", type: "divider" },
    { label: "IVF Clinic", route: "/more/ivf-clinic" },
    { label: "divider", type: "divider" },
  ];

  return (
    <div>
      <div className="bg-white rounded-b-[8px] shadow-md fixed w-full z-[999]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center py-[13px] px-[15px] sm:px-[30px]">
          <Link href="/">
            <Image
              src="/images/apna_opd_logo.svg"
              width={192}
              height={54}
              alt="Apna opd logo"
            />
          </Link>

          {/* Navigation Menu */}
          <div
            ref={menuRef}
            className={`${
              isMobileNavOpen ? "block" : "hidden"
            } lg:block absolute lg:relative top-[80px] lg:top-auto right-4 lg:right-auto bg-white lg:bg-transparent shadow-md lg:shadow-none rounded-md lg:rounded-none p-4 lg:p-0 w-[250px] lg:w-auto transition-all duration-300 menu-container z-[9999]`}
          >
            <ul className="flex flex-col lg:flex-row gap-[15px] lg:gap-[40px] mb-0">
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/" onClick={closeAllMenus}>
                  Home
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold relative">
                <a
                  className="cursor-pointer hover:border-none hover:m-0 text-[#094B89] text-base font-bold bg-transparent flex items-center"
                  onClick={toggleFindDropdown}
                >
                  Find{" "}
                  <CaretDownOutlined
                    className={`pl-1 transition-transform duration-200 ${
                      isFindDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </a>
                {isFindDropdownOpen && (
                  <div
                    className="cursor-pointer absolute top-[38px] left-[-60px] md:left-[-80px] z-[9999999] h-[300px] w-[200px] rounded-md shadow-lg bg-white p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul className="flex flex-col gap-1">
                      {findMenuItems?.map((item, index) => (
                        <div key={index}>
                          {item.type === "divider" ? (
                            <hr className="my-1 border-t border-gray-200" />
                          ) : item.type === "heading" ? (
                            <li className="py-1 px-1 text-sm font-semibold text-gray-700">
                              {item.label}
                            </li>
                          ) : (
                            <li
                              className="hover:bg-[#3DB8F5] hover:text-white rounded-md p-1 text-sm"
                              onClick={handleNavigation(item.route)}
                            >
                              {item.label}
                            </li>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/more/blood-donor" onClick={closeAllMenus}>
                  Blood Donor
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/more/emergency" onClick={closeAllMenus}>
                  Emergency
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/faq" onClick={closeAllMenus}>
                  FAQ
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/about" onClick={closeAllMenus}>
                  About
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/contact" onClick={closeAllMenus}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block relative group" ref={searchRef}>
            <div className="relative">
              <input
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => handleSearchFocus(isSearchDropdownOpen)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search services..."
                className="w-[250px] border-2 placeholder-[#094B89] placeholder:font-bold border-[#094B89] rounded-md py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DB8F5] focus:border-transparent"
              />
              <SearchOutlined
                onClick={handleManualSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
              text-[#094B89] cursor-pointer text-xl"
              />
            </div>

            {/* Desktop Search Dropdown */}
            <div
              ref={searchDropdownRef}
              className="absolute hidden group-hover:block group-focus-within:block left-0 w-full bg-white rounded-md shadow-lg max-h-[300px] overflow-y-auto z-[9999999] border border-gray-200"
            >
              <ul className="py-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-[#3DB8F5] hover:text-white cursor-pointer text-sm"
                      onClick={() => { router.push(item.route); setSearchValue(''); }}
                    >
                      {item.label}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    No results found
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center lg:hidden gap-3">
            {/* Mobile Search Icon */}
            <button
              className="!text-[#3DB8F5] focus:outline-none text-3xl z-[9999999] hover:border-none"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              {isSearchOpen ? <CloseOutlined /> : <SearchOutlined />}
            </button>

            {/* Mobile Menu Icon */}
            <button
              className="!text-[#3DB8F5] focus:outline-none text-4xl z-[9999999] hover:border-none"
              onClick={toggleMobileNav}
            >
              {isMobileNavOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="bg-white shadow-md px-4 py-2 relative lg:hidden group">
            <div className="relative" ref={searchRef}>
              <input
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search services..."
                className="w-full border placeholder-[#3DB8F5] border-gray-300 rounded-md py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DB8F5] focus:border-transparent"
                autoFocus
              />
              <SearchOutlined
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleManualSearch}
              />
            </div>

            {/* Mobile Search Dropdown */}

            <div
              ref={searchDropdownRef}
              className="group-hover:block group-focus-within:block hidden absolute left-4 right-4 bg-white rounded-md shadow-lg max-h-[250px] overflow-y-auto z-[999999] border border-gray-200"
            >
              <ul className="py-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-[#3DB8F5] hover:text-white cursor-pointer text-sm"
                      onClick={() => {
                        router.push(item.route);
                        setIsSearchOpen(false);
                        setSearchValue("");
                      }}
                    >
                      {item.label}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    No results found
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
