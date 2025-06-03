"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CaretDownOutlined } from "@ant-design/icons";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isFindDropdownOpen, setIsFindDropdownOpen] = useState(false);
  const menuRef = useRef(null);
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    const handleRouteChange = () => {
      closeAllMenus();
    };

    window.addEventListener("beforeunload", handleRouteChange);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, [router]);

  const menuItems = [
    { label: "Doctors", route: "/find-doctor" },
    { label: "Ambulance", route: "/more/ambulance" },
    { label: "GYM", route: "/more/gym" },
    { label: "Yoga", route: "/more/yoga" },
    { label: "Commercial Meditation", route: "/more/commercial-meditation" },
    { label: "Nasha Mukti Kendra", route: "/more/nasha-mukti-kendra" },
    { label: "Medical Store", route: "/more/medical-store" },
    { label: "Nursing & Medical College", route: "/more/nursing-college" },
    { label: "Blood Bank", route: "/more/blood-bank" },
    { label: "Physiotherapist", route: "/more/physiotherapist" },
    { label: "Radiologist", route: "/more/radiologist" },
    { label: "Hospital", route: "/more/hospital" },
    { label: "Vatenary", route: "/more/vatenary" },
    { label: "Nurse", route: "/more/nurse" },
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
          <div className="relative flex items-center lg:hidden">
            <button
              className="!text-[#3DB8F5] focus:outline-none text-4xl z-[9999999] hover:border-none"
              onClick={toggleMobileNav}
            >
              {isMobileNavOpen ? "✖" : "☰"}
            </button>
          </div>
          <div
            ref={menuRef}
            className={`${isMobileNavOpen ? "block" : "hidden"
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
                  Find <CaretDownOutlined className={`pl-1 transition-transform duration-200 ${isFindDropdownOpen ? "rotate-180" : ""}`}/>
                </a>
                {isFindDropdownOpen && (
                  <div 
                    className="cursor-pointer absolute top-[38px] left-[-60px] md:left-[-80px] z-[9999999] h-[300px] w-[200px] rounded-md shadow-lg bg-white p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul className="flex flex-col gap-1">
                      {menuItems?.map((item, index) => (
                        <div key={item.route}>
                          <li className="hover:bg-[#3DB8F5] hover:text-white rounded-md p-1 text-sm">
                            <span
                              className="w-full block text-left hover:text-white hover:border-none"
                              onClick={handleNavigation(item.route)}
                            >
                              {item.label}
                            </span>
                          </li>
                          {index < menuItems?.length - 1 && <hr className="my-1"/>}
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
              <li className="block lg:hidden mt-2">
                <Link href="/find-doctor" 
                   onClick={(e) => {
                     e.preventDefault();
                     closeAllMenus(); 
                     router.push("/find-doctor");
                   }}
                   className="block w-full bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold text-center"
                >
                  Find now
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/find-doctor" 
            className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold hidden lg:block"
            onClick={(e) => { 
              if(isFindDropdownOpen) setIsFindDropdownOpen(false);
            }}
          >
            Find now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
