"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaStar,
  FaBed,
  FaUserMd,
  FaRegHospital,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { MdEmergency } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { RiBankCardLine } from "react-icons/ri";
import { useState } from "react";
import FreeTrialModal from "./BookSession";
import { CalendarPlus } from "lucide-react";

export default function NurseFeatureCard({ NurseData, userData, specs }) {
  const { rating, nurseType } = NurseData || {};
  const { name, phone } = userData || {};
  const [modalOpen, setModalOpen] = useState(false);

  console.log("MM", NurseData);

  const features = [
    {
      icon: <FaRegCalendarCheck className="text-blue-400 text-xl" />,
      text: "+ Years Experience",
      dynamicValue: NurseData?.experience,
    },
    {
      icon: <FaUserMd className="text-purple-400 text-xl" />,
      text: "+ Happy Clients",
      dynamicValue: NurseData?.clients,
    },
    {
      icon: <FaRegHospital className="text-pink-400 text-xl" />,
      text: "",
      dynamicValue: NurseData?.workingAt,
    },
    ...(specs !== "nurse"
      ? [
          {
            icon: <FaMapMarkerAlt className="text-green-400 text-xl" />,
            text: "",
            dynamicValue: NurseData?.city,
          },
        ]
      : []),
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex flex-col mx-2 my-2 lg:flex-row items-center justify-center bg-[#0C65A0] rounded-2xl shadow-lg p-5 md:p-10 gap-8 md:gap-12 relative overflow-hidden"
        style={{ minHeight: 340 }}
      >
        {/* Left: Hospital Image */}
        <div className="z-10 flex-shrink-0 w-full lg:w-2/5 flex justify-center items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${NurseData?.profileImage}`}
            alt={`${name}` || "image"}
            width={340}
            height={340}
            className="rounded-xl object-contain bg-slate-100 shadow-md w-full h-[250px] md:h-[340px]"
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow mb-2 capitalize">
            {name}
          </h2>
          <p className="text-white/80 text-xl md:text-2xl font-medium mb-3">
            {nurseType}
          </p>
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            {typeof parseInt(rating) === "number" && parseInt(rating) > 0 && (
              <>
                {[...Array(Math.floor(parseInt(rating)))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-2xl" />
                ))}
                {parseInt(rating) % 1 !== 0 && (
                  <FaStar
                    key="half"
                    className="text-yellow-400 text-2xl opacity-50"
                  />
                )}
                {[...Array(5 - Math.ceil(parseInt(rating)))].map((_, i) => (
                  <FaStar
                    key={i + "empty"}
                    className="text-gray-300 text-2xl"
                  />
                ))}
              </>
            )}
            <span className="text-white text-xl font-semibold ml-2">
              {parseInt(rating)}/5
            </span>
            <span className="text-white/70 text-lg ml-2">
              ({NurseData?.testimonials?.length} reviews)
            </span>
          </div>
          {/* Features */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-2">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-white font-semibold px-6 py-4 border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                {f.icon}
                {f.dynamicValue ? `${f.dynamicValue} ${f.text}` : f.text}
              </div>
            ))}
            <div className="bg-white text-[#0C65A0] text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition hover:scale-105 flex items-center gap-2">
              ₹{NurseData?.perVisitCharges} Consultation Fees
            </div>
          </div>
          {/* Call Now Button */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-5">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-[#0C65A0] text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition hover:scale-105 flex items-center gap-2"
            >
              <CalendarPlus className="w-5 h-5" /> Book Session
            </button>
            <button
              className="text-white font-semibold px-10 py-4 border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition"
              onClick={() => {
                if (window.confirm(`Do you want to call ${name}?`)) {
                  window.location.href = `tel:${phone}`;
                }
              }}
            >
              📞 Call Now
            </button>
          </div>
          <FreeTrialModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
        {/* Background circles for effect */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
        <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />
      </motion.div>
    </>
  );
}
