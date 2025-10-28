"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import {
  ClipboardList,
  MessageCircle,
  Package as PackageIcon,
  Phone,
  MapPin,
  Star,
} from "lucide-react";
import { useState } from "react";
import BookSession from "../common/BookSession";
import CallNow from "../common/CallNow"
import StarRating from "../../common-components/StarRating";

const HeroSection = ({ res_data, data, healthProfile }) => {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const name = data?.name ?? "HealthLab Diagnostics";
  const location = data?.location ?? "City";
  const address = data?.address ?? "";
  const avgRating = healthProfile?.testimonials?.length
    ? (
        healthProfile?.testimonials.reduce((sum, r) => sum + r.rating, 0) /
        healthProfile?.testimonials.length
      ).toFixed(1)
    : "0.0";
  const reviewCount = healthProfile?.testimonials?.length || 0;
  const phone = data?.phone;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-5 md:p-10 flex flex-col lg:flex-row items-center gap-10"
    >
      {/* Background Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

      {/* Left Image */}
      <div className="z-10 flex-shrink-0 w-full lg:w-2/5 flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${healthProfile?.profileImage}`}
          alt={name}
          width={288}
          height={288}
          className="rounded-xl object-contain bg-slate-100 shadow-md w-full h-[250px] md:h-[340px]"
        />
        <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-base border-2 border-white">
          ✓
        </span>
      </div>

      {/* Info */}
      <div className="relative z-10 flex flex-col justify-center text-white w-full lg:w-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold capitalize text-center lg:text-left mb-3">
          {name}
        </h1>

        <p className="mb-3 text-lg opacity-90 text-center lg:text-left">
          {healthProfile?.introduction}
        </p>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          {/* <div
            onClick={() => {
              const section = document.getElementById("labLocationSection");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur"
          >
            <MapPin className="w-5 h-5" />
            <span>
              {location} {address}
            </span>
          </div> */}
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <StarRating
              rating={avgRating}
              ratingCount={healthProfile?.testimonials?.length}
            />
          </div>
        </div>

        {/*tags */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 py-3">
          {healthProfile?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-white/20 text-white px-4 py-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-6 py-3 flex items-center gap-2 shadow-lg transition text-base"
            onClick={() => setModalOpen(true)}
          >
            <ClipboardList className="w-4 h-4" /> Book Test
          </button>
          <BookSession
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Book a Test"
          />
          <button
            onClick={() => {
              const section = document.getElementById("labPackagesSection");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-6 py-3 flex items-center gap-2 backdrop-blur transition text-base"
          >
            <PackageIcon className="w-4 h-4" /> Browse Packages
          </button>
          <button
            onClick={() => setCallModalOpen(true)}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105"
          >
            📞 Call Now
          </button>
          <CallNow
            isOpen={callModalOpen}
            onClose={() => setCallModalOpen(false)}
          />
          <button
            onClick={() => {
              const section = document.getElementById("LocationSection");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-white text-white text-lg px-8 py-2 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105"
          >
            📍 View Location
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
