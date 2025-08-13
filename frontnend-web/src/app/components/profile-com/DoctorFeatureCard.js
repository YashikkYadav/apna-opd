'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useState } from 'react';
import BookAppointment from './Appointment'
import CallNow from '../more/VeterinaryComponents/CallNow';

function getStarIcons(avgRating) {
  const stars = [];
  const safeRating = avgRating ?? 0;
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating - fullStars > 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-[#FFD700] text-2xl" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-[#FFD700] text-2xl" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-[#FFD700] text-2xl" />);
  }
  return stars;
}

export default function DoctorFeatureCard({ doctorData }) {
  console.log("d", doctorData)
  const [openModal, setOpenModal] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  // console.log("mmm", doctorData)
  console.log(doctorData.images[0].filename)
  const avgRating = doctorData?.testimonials?.length
    ? (doctorData.testimonials.reduce((sum, r) => sum + r.rating, 0) / doctorData.testimonials.length).toFixed(1)
    : '0.0';
  const reviewCount = doctorData?.testimonials?.length || 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 m-6"
    >
      {/* Background Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

      {/* Left: Profile Image */}
      <div className="z-10 flex-shrink-0 w-full md:w-[300px] flex justify-center">
        <Image
          src={doctorData?.images[0]?.url}
          alt={doctorData?.doctorId?.name || "Doctor"}
          width={300}
          height={300}
          unoptimized
          className="rounded-xl object-cover shadow-md w-full h-[220px] md:h-[300px]"
        />
      </div>

      {/* Right: Content */}
      <div className="z-10 flex-1 space-y-5 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow">
          {doctorData?.doctorId?.name}
        </h2>
        <p className="text-white/90 text-lg max-w-xl">
          {doctorData?.introduction}
        </p>
        <div className="flex gap-4">
          <p className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
            {doctorData?.doctorId?.speciality}
          </p>
          <p className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
            {doctorData?.doctorId?.clinicName}
          </p>
          <p className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
            {doctorData?.experience}+ years of experience
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 justify-center md:justify-start">
          {getStarIcons(parseFloat(avgRating))}
          <span className="text-white text-xl font-semibold ml-2">
            {avgRating}/5
          </span>
          <span className="text-white/70 text-lg ml-2">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Specialties / Tags */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
          {doctorData?.specialties?.map((tag, i) => (
            <span
              key={i}
              className="bg-white/20 text-white px-4 py-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-white text-[#0C65A0] text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition hover:scale-105"
          >
            📅 Book Appointment
          </button>
          <BookAppointment
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
          <button
            onClick={() => setCallModalOpen(true)}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#0C65A0] transition hover:scale-105"
          >
            📞 Call Now
          </button>
          <CallNow
            isOpen={callModalOpen}
            onClose={() => setCallModalOpen(false)}
          />
          <button
            onClick={() => {
              const section = document.getElementById("location");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#0C65A0] transition hover:scale-105"
          >
            📍 Get Directions
          </button>
        </div>
      </div>
    </motion.section>
  );
}
