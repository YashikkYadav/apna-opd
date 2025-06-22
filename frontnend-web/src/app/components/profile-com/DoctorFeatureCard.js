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
import AppointmentModal from "../common-components/AppointmentModal";

export default function DoctorFeatureCard({ doctorData, specs }) {
  const { name, images, type, rating, reviews, appointmentFee, phone } =
    doctorData || {};
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const features = [
    {
      icon: <FaRegCalendarCheck className="text-blue-400 text-2xl" />,
      text: "+Years Experience",
      dynamicValue: doctorData.experience,
    },
    {
      icon: <FaUserMd className="text-purple-400 text-2xl" />,
      text: "+ Happy Clients",
      dynamicValue: doctorData.happyClients,
    },
    {
      icon: <FaRegHospital className="text-pink-400 text-2xl" />,
      text: "",
      dynamicValue: doctorData.doctorId.clinicName,
    },
    ...(specs !== "nurse"
      ? [
          {
            icon: <FaMapMarkerAlt className="text-green-400 text-2xl" />,
            text: "",
            dynamicValue: doctorData.doctorId.location,
          },
        ]
      : []),
  ];

  function getProfileImage(images) {
    return images.find((image) => image.type === "profilePhoto");
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex flex-col mx-2 my-2 md:flex-row items-center justify-center bg-[#0C65A0] rounded-2xl shadow-lg p-8 md:p-12 gap-8 md:gap-16 relative overflow-hidden"
        style={{ minHeight: 340 }}
      >
        {/* Left: Hospital Image */}
        <div className="z-10 flex-shrink-0 w-full md:w-[340px] flex justify-center items-center">
          <Image
            src={
              images && images.length
                ? getProfileImage(images).url
                : "/images/d1.png"
            }
            alt={name}
            width={340}
            height={340}
            className="bg-gray-300 rounded-xl object-cover shadow-md w-full h-[220px] md:h-[340px]"
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow mb-2">
            {name}
          </h2>
          <p className="text-white/80 text-xl md:text-2xl font-medium mb-4">
            {type}
          </p>
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {rating &&
              [...Array(rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-2xl" />
              ))}
            {rating &&
              [...Array(5 - rating)].map((_, i) => (
                <FaStar key={i} className="text-gray-300 text-2xl" />
              ))}
            <span className="text-white text-xl font-semibold ml-2">
              {rating}/5
            </span>
            <span className="text-white/70 text-lg ml-2">
              ({reviews} reviews)
            </span>
          </div>
          {/* Features */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/30 backdrop-blur px-5 py-3 rounded-xl text-white text-lg font-medium shadow hover:shadow-lg transition"
              >
                {f.icon}
                {f.dynamicValue ? `${f.dynamicValue} ${f.text}` : f.text}
              </div>
            ))}
          </div>
          {specs === "doctorId" && (
            <div className="mt-2 bg-green-500 backdrop-blur px-5 py-3 rounded-xl text-white text-lg font-medium shadow hover:shadow-lg transition">
              ₹{appointmentFee} consultationFee
            </div>
          )}
          {/* Call Now Button */}
          <button
            className="mt-8 flex items-center gap-3 bg-[#3DB8F5] hover:bg-[#256fa1] text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 text-xl transform hover:scale-105 hover:shadow-xl"
            onClick={() => {
              if (window.confirm(`Do you want to call ${name}?`)) {
                window.location.href = `tel:${phone}`;
              }
            }}
          >
            <FaPhoneAlt className="text-2xl" />
            Call Now
          </button>
          <button
            className="mt-4 flex items-center gap-3 bg-[#34D399] hover:bg-[#059669] text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 text-xl transform hover:scale-105 hover:shadow-xl"
            onClick={() => setShowAppointmentModal(true)}
          >
            <FaRegCalendarCheck className="text-2xl" />
            Appointment
          </button>
        </div>
        {/* Background circles for effect */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
        <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />
      </motion.div>
      <AppointmentModal
        doctorDetails={doctorData}
        visible={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />
    </>
  );
}
