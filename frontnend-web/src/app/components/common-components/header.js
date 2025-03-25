"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="bg-white rounded-b-[8px] shadow-md fixed w-full z-[9999999]">
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
            <ul className="flex flex-col lg:flex-row gap-[15px] lg:gap-[40px]">
              <li
                className="text-[#094B89] text-base font-bold"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/">Home</Link>
              </li>
              <li
                className="text-[#094B89] text-base font-bold"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/find-doctor">Find Doctor</Link>
              </li>
              <li
                className="text-[#094B89] text-base font-bold"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/blog">Blog</Link>
              </li>
              <li
                className="text-[#094B89] text-base font-bold"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/faq">FAQ</Link>
              </li>
              <li
                className="text-[#094B89] text-base font-bold"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/about">About</Link>
              </li>
              <li
                className="text-[#094B89] text-base font-bold"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="/contact">Contact</Link>
              </li>
              <li
                className="text-[#094B89] text-base font-bold"
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => setMenuOpen(!menuOpen)}
              >
                <a className="hover:border-none">
                  More <span className="text-[#3DB8F5]">+</span>
                </a>
                {menuOpen && (
                  <div
                    onMouseEnter={() => setMenuOpen(true)}
                    className="absolute top-[22px] left-[400px] z-[9999999] h-[300px] w-[200px] rounded-md shadow-md bg-white p-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent"
                  >
                    <ul className="flex flex-col gap-1">
                      <li className="hover:bg-[#3DB8F5] hover:text-white rounded-md p-1">
                        <Link
                          className="w-full block"
                          href="/more/ambulance"
                          onClick={() => setMenuOpen(false)}
                        >
                          Ambulance
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white rounded-md p-1">
                        <Link
                          className="w-full block"
                          href="/more/gym"
                          onClick={() => setMenuOpen(false)}
                        >
                          GYM
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white rounded-md p-1">
                        <Link
                          className="w-full block"
                          href="/more/yoga"
                          onClick={() => setMenuOpen(false)}
                        >
                          Yoga
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white rounded-md p-1">
                        <Link
                          className="w-full block"
                          href="/more/commercial-meditation"
                          onClick={() => setMenuOpen(false)}
                        >
                          Commercial Meditation
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white rounded-md p-1">
                        <Link
                          className="w-full block"
                          href="/more/nasha-mukti-kendra"
                          onClick={() => setMenuOpen(false)}
                        >
                          Nasha Mukti Kendra
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white p-1 rounded-md">
                        <Link
                          className="w-full block"
                          href="/more/medical-store"
                          onClick={() => setMenuOpen(false)}
                        >
                          Medical Store
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white p-1 rounded-md">
                        <Link
                          className="w-full block"
                          href="/more/nursing-college"
                          onClick={() => setMenuOpen(false)}
                        >
                          Nursing & Medical College
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white p-1 rounded-md">
                        <Link
                          className="w-full block"
                          href="/more/blood-bank"
                          onClick={() => setMenuOpen(false)}
                        >
                          Blood Bank
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white p-1 rounded-md">
                        <Link
                          className="w-full block"
                          href="/more/physiotherapist"
                          onClick={() => setMenuOpen(false)}
                        >
                          Physiotherapist
                        </Link>
                      </li>
                      <hr />
                      <li className="hover:bg-[#3DB8F5] hover:text-white p-1 rounded-md">
                        <Link
                          className="w-full block"
                          href="/more/blood-donor"
                          onClick={() => setMenuOpen(false)}
                        >
                          Blood Donor
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li
                className="block lg:hidden"
                onClick={() => setMenuOpen(false)}
              >
                {" "}
                <button className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold w-full">
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
