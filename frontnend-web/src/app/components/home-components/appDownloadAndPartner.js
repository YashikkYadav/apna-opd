"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple, FaHospitalAlt, FaUserMd, FaFlask, FaUserNurse } from "react-icons/fa";
import { useRouter } from "next/navigation";
const appFeatures = [
  "Easy appointment booking",
  "Track your test results",
  "Get instant reports",
  "24/7 customer support",
];

const partnerOptions = [
  { icon: <FaHospitalAlt className="inline mr-2" />, label: "List Your Hospital" },
  { icon: <FaUserMd className="inline mr-2" />, label: "Register as Doctor" },
  { icon: <FaFlask className="inline mr-2" />, label: "Join as Lab Partner" },
  { icon: <FaUserNurse className="inline mr-2" />, label: "Offer Nursing Services" },
];

const buttonVariants = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0 0 0 2px #2563eb, 0 0 16px #2563eb",
  },
};
const greenButtonVariants = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0 0 0 2px #10b981, 0 0 16px #10b981",
  },
};

const AppDownloadAndPartner = () => {
  const router = useRouter();
  return (
    <section className="w-full py-8 px-4 md:px-3">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Download Our App */}
        <div className="rounded-2xl bg-[#0C65A0] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Text */}
          <div className="flex-1 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Download Our App</h2>
            <p className="mb-4 text-base md:text-lg">Get the Apna OPD mobile app for easier booking, tracking your tests, and managing your health records on the go.</p>
            <ul className="mb-6 list-disc pl-5 space-y-1">
              {appFeatures.map((f, i) => (
                <li key={i} className="text-white/90 text-base md:text-lg">✓ {f}</li>
              ))}
            </ul>
            <div className="flex gap-4 mt-2">
              <motion.a
                onClick={() => router.push("/more/app_download")}
                variants={buttonVariants}
                whileHover="whileHover"
                className="flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-3 rounded-full text-base shadow transition-all duration-200 cursor-pointer"
              >
                <FaGooglePlay className="text-xl" /> Play Store
              </motion.a>
              <motion.a
                onClick={() => router.push("/more/app_download")}
                variants={buttonVariants}
                whileHover="whileHover"
                className="flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-3 rounded-full text-base shadow transition-all duration-200 cursor-pointer"
              >
                <FaApple className="text-xl" /> App Store
              </motion.a>
            </div>
          </div>
          {/* Right: Mobile Screenshot in Device Frame */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[200px] h-[400px] md:w-[220px] md:h-[440px] rounded-3xl bg-white shadow-lg flex items-center justify-center border-2 border-gray-200 relative overflow-hidden">
              <img
                src="/images/localhost.png"
                alt="Apna OPD Mobile Website Screenshot"
                className="w-[180px] h-[380px] md:w-[200px] md:h-[420px] object-cover rounded-2xl"
                draggable={false}
              />
              {/* Home button for realism */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
        {/* Join as Partner */}
        <div className="rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] p-8 md:p-14 flex flex-col items-center justify-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Join as Partner - Grow with Apna OPD</h2>
          <p className="text-white text-base md:text-lg text-center mb-4 max-w-2xl">Expand your healthcare business and reach thousands of patients looking for quality healthcare services.</p>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            {partnerOptions.map((opt, i) => (
              <motion.a
                key={i}
                onClick={() => router.push("/register")}
                variants={greenButtonVariants}
                whileHover="whileHover"
                className="flex items-center justify-center gap-2 bg-white text-[#059669] font-semibold px-8 py-4 rounded-xl text-base shadow transition-all duration-200 cursor-pointer w-full md:w-auto"
              >
                {opt.icon} {opt.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadAndPartner; 