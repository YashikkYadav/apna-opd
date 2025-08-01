"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaStar,
  FaBed,
  FaStarHalfAlt,
  FaUserMd,
  FaRegStar,
  FaRegHospital,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmergency } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { RiBankCardLine } from "react-icons/ri";

const allowedFeatures = [
  "24/7 Emergency",
  "500+ Beds",
  "NABH Accredited",
  "50+ Specialists",
  "Insurance Accepted",
];

const features = [
  {
    icon: <MdEmergency className="text-pink-400 text-2xl" />,
    text: "24/7 Emergency",
  },
  { icon: <FaBed className="text-pink-300 text-2xl" />, text: "500+ Beds" },
  {
    icon: <BsShieldCheck className="text-green-400 text-2xl" />,
    text: "NABH Accredited",
  },
  {
    icon: <FaUserMd className="text-blue-600 text-2xl" />,
    text: "50+ Specialists",
  },
  {
    icon: <RiBankCardLine className="text-blue-600 text-2xl" />,
    text: "Insurance Accepted",
  },
];

export default function HospitalFeatureCard({ profileData }) {
  const avgRating = profileData?.testimonials?.length ? (profileData?.testimonials.reduce((sum, r) => sum + r.rating, 0) / profileData?.testimonials.length).toFixed(1) : "0.0";
  const reviewCount = profileData?.testimonials?.length || 0;

  function getFeatureIconByText(text) {
    switch (text) {
      case "24/7 Emergency":
        return <MdEmergency className="text-pink-400 text-2xl" />;
      case "500+ Beds":
        return <FaBed className="text-pink-300 text-2xl" />;
      case "NABH Accredited":
        return <BsShieldCheck className="text-green-400 text-2xl" />;
      case "50+ Specialists":
        return <FaUserMd className="text-blue-600 text-2xl" />;
      case "Insurance Accepted":
        return <RiBankCardLine className="text-blue-600 text-2xl" />;
      default:
        return null;
    }
  }
  function getStarIcons(rating) {
    const stars = [];
    const safeRating = rating ?? 0;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating - fullStars > 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 text-2xl" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 text-2xl" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-gray-400 text-2xl" />
      );
    }

    return stars;
  }
  return (
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
          src={`http://localhost:3001/public/${profileData?.profileImage}`}
          alt="Max Super Speciality Hospital"
          width={340}
          height={340}
          className="rounded-xl object-cover shadow-md w-full h-[220px] md:h-[340px]"
        />
      </div>
      {/* Right: Content */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow mb-2">
          {profileData.name ?? "Dummy Name"}
        </h2>
        <p className="text-white/80 text-xl md:text-2xl font-medium mb-4">
          {profileData.introduction ?? "Dummy Intro"}
        </p>
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {getStarIcons(avgRating)}
          <span className="text-white text-xl font-semibold ml-2">
            {profileData.rating + "/5" ?? "0/5"}
          </span>
          <span className="text-white/70 text-lg ml-2">
            {reviewCount + " reviews" ?? "0 reviews"}
          </span>
        </div>
        {/* Features */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
          {(profileData.facilities ?? features.map((f) => f.text)).map(
            (f, i) =>
              allowedFeatures.includes(f) && (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/30 backdrop-blur px-5 py-3 rounded-xl text-white text-lg font-medium shadow hover:shadow-lg transition"
                >
                  {getFeatureIconByText(f)}
                  {f}
                </div>
              )
          )}
        </div>
        {/* Call Now Button */}
        <button
          className="mt-8 flex items-center gap-3 bg-[#3DB8F5] hover:bg-[#256fa1] text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 text-xl transform hover:scale-105 hover:shadow-xl"
          onClick={() => {
            if (
              window.confirm(
                `Do you want to call ${profileData.name ?? "N/A"} ?`
              )
            ) {
              window.location.href = profileData.phone ?? "tel:+911140555555";
            }
          }}
        >
          <FaPhoneAlt className="text-2xl" />
          Call Now
        </button>
      </div>
      {/* Background circles for effect */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />
    </motion.div>
  );
}
