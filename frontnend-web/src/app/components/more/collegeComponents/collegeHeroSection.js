'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useState } from 'react';
import ApplyNow from './ApplyNow';
import CallNow from "../VeterinaryComponents/CallNow";
function getStarIcons(avgRating) {
    const stars = [];
    const safeRating = avgRating ?? 0;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating - fullStars > 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <FaStar key={`full-${i}`} className="text-[#FFD700] text-2xl" />
        );
    }

    if (hasHalfStar) {
        stars.push(
            <FaStarHalfAlt key="half" className="text-[#FFD700] text-2xl" />
        );
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <FaRegStar key={`empty-${i}`} className="text-[#FFD700] text-2xl" />
        );
    }

    return stars;
}

const CollegeHeroSection = ({
    college_name = 'EduVista Institute',
    imageUrl = '/images/college-hero.jpg',
    healthProfile,
    data
}) => {
    const [callModalOpen, setCallModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const avgRating = healthProfile?.testimonials?.length ? (healthProfile?.testimonials.reduce((sum, r) => sum + r.rating, 0) / healthProfile?.testimonials.length).toFixed(1) : "0.0";
    const reviewCount = healthProfile?.testimonials?.length || 0;

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
        >
            {/* Background Circles */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
            <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

            {/* Left: College Image */}
            <div className="z-10 flex-shrink-0 w-full md:w-[340px] flex justify-center">
                <Image
                    src={`http://localhost:3001/public/${healthProfile?.profileImage}` || ""}

                    alt={college_name}
                    width={320}
                    height={320}
                    className="rounded-xl object-cover shadow-md w-full h-[220px] md:h-[340px]"
                />
            </div>

            {/* Right: College Info */}
            <div className="z-10 flex-1 space-y-6 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow">
                    {data?.name}
                </h2>

                <p className="text-white/90 text-lg max-w-xl">
                    {healthProfile?.about}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                    {getStarIcons(parseFloat(avgRating))}
                    <span className="text-white text-xl font-semibold ml-2">
                        {avgRating}/5
                    </span>
                    <span className="text-white/70 text-lg ml-2">
                        ({reviewCount} reviews)
                    </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                    {healthProfile?.tags?.map((tag, index) => (
                        <span key={index} className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-white text-blue-700 text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-blue-100 transition hover:scale-105">
                        🎓 Apply Now
                    </button>
                    <ApplyNow isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                    <button className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 transition hover:scale-105">
                        📄 Download Brochure
                    </button>
                    <button className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 transition hover:scale-105">
                        🌐 Visit Website
                    </button>
                    <button
                        onClick={() => setCallModalOpen(true)}
                        className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#0C65A0] transition hover:scale-105">
                        📞 Call Now
                    </button>
                    <CallNow isOpen={callModalOpen} onClose={() => setCallModalOpen(false)} />
                </div>



            </div>
        </motion.section>
    );
};

export default CollegeHeroSection;
