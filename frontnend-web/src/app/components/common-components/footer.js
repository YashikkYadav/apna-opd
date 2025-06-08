"use client";
import { Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="max-w-[1270px] mx-auto py-[63px] px-[15px] sm:px-[30px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7">
          <div className="max-w-[240px] auto-cols-[minmax(0,2fr)]]">
            <div className="mb-[20px]">
              <Image
                src="/images/apna_opd_logo.svg"
                width={192}
                height={54}
                alt="Apna opd logo"
              />
            </div>
            <p className="text-base text-[#808080]">
              Your trusted partner for online doctor consultation in India. From finding top doctors near you to scheduling OPD appointments online, we make quality healthcare accessible for everyone.
            </p>
          </div>
          <div className="mt-[9px] col-span-1">
            <h6 className="text-base text-[#094B89] font-bold mb-[15px] sm:mb-[24px]">
              Service
            </h6>
            <ul className="flex flex-col gap-[16px]">
              <li className="text-base text-[#2E2E2E]">
                <Link href="/find-doctor"> Find Doctors </Link>
              </li>
              {/* <li className="text-base text-[#2E2E2E]">
                <Link href="/consultation"> Consultation </Link>
              </li> */}
              {/* <li className="text-base text-[#2E2E2E]">
                <Link href="/find-doctor"> Book an Appointement </Link>
              </li> */}
              <li className="text-base text-[#2E2E2E]">
                <Link href="/more/medical-store"> Medicine Store </Link>
              </li>
              <li className="text-base text-[#2E2E2E]">
                <Link href="/register"> Register </Link>
              </li>
            </ul>
          </div>
          <div className="mt-[9px]">
            <h6 className="text-base text-[#094B89] font-bold mb-[15px] sm:mb-[24px]">
              Resource
            </h6>
            <ul className="flex flex-col gap-[16px]">
              <li className="text-base text-[#2E2E2E]">
                <Link href="/blog"> Blogs </Link>
              </li>
              <li className="text-base text-[#2E2E2E]">
                <Link href="/find-doctor"> Our Doctors </Link>
              </li>
              {/* <li className="text-base text-[#2E2E2E]">
                <Link href="/profile"> Profile </Link>
              </li> */}
              <li className="text-base text-[#2E2E2E]">
                <Link href="/faq"> FAQ </Link>
              </li>
              <li className="text-base text-[#2E2E2E]">
                <Link href="/about"> About Us </Link>
              </li>
              <li className="text-base text-[#2E2E2E]">
                <Link href="/contact"> Contact Us </Link>
              </li>
              <li className="text-base text-[#2E2E2E]">
                <Link href="/career"> Careers </Link>
              </li>
            </ul>
          </div>
          <div className="mt-[9px]">
            <h6 className="text-base text-[#094B89] font-bold mb-[15px] sm:mb-[24px]">
              Our Social Media
            </h6>
            <ul className="flex flex-col gap-[16px]">
              {/* <li className="text-base text-[#2E2E2E]">
                <Link href="/"> Medium </Link>
              </li> */}
              <li className="text-base text-[#2E2E2E]">
                <Link href="https://www.instagram.com/apnaopdhealthservices/" target="__blank"> Instagram </Link>
              </li>
              <li className="text-base text-[#2E2E2E]">
                <Link href="https://www.facebook.com/share/1LNcUZMyyL/" target="__blank"> Facebook </Link>
              </li>
              {/* <li className="text-base text-[#2E2E2E]">
                <Link href="/"> Twitter </Link>
              </li> */}
              <li className="text-base text-[#2E2E2E]">
                <Link href="https://youtube.com/@apnaopdhealthservices?si=bU1kDxAQuTNuycng" target="__blank"> Youtube </Link>
              </li>
            </ul>
          </div>
          <div className="mt-[9px] 2xl:min-w-[296px]">
            <h6 className="text-base text-[#094B89] font-bold mb-[15px] sm:mb-[24px]">
              Join a Newsletter
            </h6>
            <Form name="subscribeForm" className="flex flex-col w-full">
              <label className="text-base text-[#2E2E2E] mb-[8px]">
                Your Email
              </label>
              <Form.Item name="search" className="mb-[24px] sm:w-full">
                <Input
                  placeholder="Enter Your Email"
                  className="h-[50px] border-[#CCCCCC] text-base"
                />
              </Form.Item>
              <button className="bg-[#3DB8F5] px-[38px] py-[10px] rounded-[8px] text-lg text-white font-bold w-fit">
                Subscribe
              </button>
            </Form>
          </div>
        </div>
      </div>
      <div className="bg-[#0C65A0] py-[40px]">
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto">
          <div className="flex justify-center gap-[20px] lg:gap-[40px] flex-col lg:flex-row">
            <div className="flex">
              <div className="mr-[16px]">
                <Image
                  src="/images/white_location.svg"
                  width={24}
                  height={24}
                  alt="Apna opd logo"
                />
              </div>
              <p className="text-white">
                MIV ApnaOpd Healthcare Services Pvt Ltd
                <br />
                Ff 61, First Floor, JTM Mall, Jagatpura Flyover
                <br />
                JAIPUR, RAJASTHAN 302017
                <br />
                India
              </p>
            </div>
            <div className="flex">
              <div className="mr-[16px]">
                <Image
                  src="/images/email.svg"
                  width={24}
                  height={24}
                  alt="Apna opd logo"
                />
              </div>
              <p className="text-white">support@apnaopd.com</p>
            </div>
            <div className="flex">
              <div className="mr-[16px]">
                <Image
                  src="/images/call.svg"
                  width={24}
                  height={24}
                  alt="Apna opd logo"
                />
              </div>
              <p className="text-white">+91 7427807857</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;