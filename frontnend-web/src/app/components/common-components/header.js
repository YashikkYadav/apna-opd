"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CaretDownOutlined } from "@ant-design/icons";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const handleClickOnFind = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleNavigation = (route) => (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    router.push(route);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    const handleRouteChange = () => {
      setMenuOpen(false);
    };

    window.addEventListener("beforeunload", handleRouteChange);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, []);

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
    { label: "Blood Donor", route: "/more/blood-donor" },
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
          {/* Hamburger Menu */}
          <div className="flex items-center lg:hidden">
            <button
              className="!text-[#3DB8F5] focus:outline-none text-4xl z-[9999999] hover:border-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
          <div
            ref={menuRef}
            className={`${
              menuOpen ? "block" : "hidden"
            } lg:block absolute lg:relative top-[80px] lg:top-auto right-9 lg:right-auto bg-white lg:bg-transparent shadow-md lg:shadow-none rounded-md lg:rounded-none p-4 lg:p-0 w-[200px] lg:w-auto transition-all duration-300 menu-container z-[9999]`}
          >
            <ul className="flex flex-col lg:flex-row gap-[15px] lg:gap-[40px] mb-0">
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold relative">
                <a
                  className="cursor-pointer hover:border-none hover:m-0 text-[#094B89] text-base font-bold bg-transparent flex items-center"
                  onClick={handleClickOnFind}
                >
                  Find <CaretDownOutlined className="pl-1"/>
                </a>
                {menuOpen && (
                  <div 
                    className="cursor-pointer absolute top-[28px] left-[-80px] z-[9999999] h-[300px] w-[200px] rounded-md shadow-md bg-white p-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul className="flex flex-col gap-1">
                      {menuItems?.map((item, index) => (
                        <div key={item.route}>
                          <li className="hover:bg-[#3DB8F5] hover:text-white rounded-md p-1">
                            <span
                              className="w-full block text-left hover:text-white hover:border-none"
                              onClick={handleNavigation(item.route)}
                            >
                              {item.label}
                            </span>
                          </li>
                          {index < menuItems?.length - 1 && <hr />}
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/blog" onClick={() => setMenuOpen(false)}>
                  Blog
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/faq" onClick={() => setMenuOpen(false)}>
                  FAQ
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li className="text-[#094B89] text-base font-bold">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </li>
              <li className="block lg:hidden">
                <button
                  className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Find now
                </button>
              </li>
            </ul>
          </div>

          <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold hidden lg:block">
            Find now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
