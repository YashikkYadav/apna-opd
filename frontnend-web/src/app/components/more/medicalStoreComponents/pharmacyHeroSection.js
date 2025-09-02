"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import CallSection from "./CallSection";
import { useRouter } from "next/navigation";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
function getStarIcons(avgRating) {
  const stars = [];
  const safeRating = avgRating ?? 0;
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating - fullStars > 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-[#FFD700] text-xl" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-[#FFD700] text-xl" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-[#FFD700] text-xl" />
    );
  }

  return stars;
}

const PharmacyHero = ({ healthProfile, data, dataVersion, lastUpdate }) => {
  // console.log("healthProfile", data)
  const features = data?.features?.filter((f) => f.enabled) || [];
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const avgRating = healthProfile?.testimonials?.length
    ? (
        healthProfile?.testimonials.reduce((sum, r) => sum + r?.rating, 0) /
        healthProfile?.testimonials.length
      ).toFixed(1)
    : "0.0";
  const reviewCount = healthProfile?.testimonials?.length || 0;
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-5 md:p-10 flex flex-col lg:flex-row items-center gap-10 "
    >
      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

      {/* Pharmacy Image */}
      <div className="z-10 flex-shrink-0 w-full lg:w-2/5 flex justify-center">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_IMAGE_URL}/${healthProfile?.profilePhoto}` ||
            ""
          }
          alt={data?.name}
          width={320}
          height={320}
          className="rounded-xl object-cover shadow-md w-full h-[250px] md:h-[340px]"
        />
      </div>

      {/* Pharmacy Info */}
      <div className="z-10 flex-1 space-y-2 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow">
          {data?.name}
        </h2>
        <p className="text-white/90 text-lg max-w-xl">
          {healthProfile?.introduction}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-white/80 pt-2">
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5" /> {data?.location || "Your City"}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5" /> Open:{" "}
            {healthProfile?.openTime || "9:00 AM"} -{" "}
            {healthProfile?.closeTime || "9:00 PM"}
          </span>
          {lastUpdate && (
            <span className="flex items-center gap-2">
              ⏱ Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          {getStarIcons(parseFloat(avgRating))}
          <span className="text-white font-semibold ml-2">{avgRating}/5</span>
          <span className="text-white/70 text-sm">({reviewCount} reviews)</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
          {healthProfile?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-white/20 text-white px-4 py-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
          <button
            onClick={() =>
              router.push(`/detail/medical_store/${data?.name}/MedicineOrder`)
            }
            className="bg-white text-green-700 text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition hover:scale-105"
          >
            🛒 Order Medicines
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105"
          >
            📞 Call Pharmacy
          </button>
          <CallSection isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          <button
            onClick={() => {
              const section = document.getElementById(
                "pharmacyLocationSection"
              );
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105"
          >
            📍 View Location
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default PharmacyHero;
