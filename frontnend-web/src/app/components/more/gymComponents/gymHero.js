'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import FreeTrialModal from './FreeTrialModel';

function getStarIcons(rating) {
    const stars = [];
    const safeRating = rating ?? 0;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating - fullStars > 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-gray-300 text-2xl" />);
    }

    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="text-gray-300 text-2xl" />);
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-white text-2xl" />);
    }

    return stars;
}

const HeroSection = ({
    gymName = "PowerFit",
    city = "Bangalore",
    rating = 4.6,
    reviewCount = 312,
    imageUrl = "/images/gym-default.jpg",
    healthProfile,
    data
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
        >
            {/* Decorative Circles */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
            <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

            {/* Left Image */}
            <div className="z-10 flex-shrink-0 w-full md:w-[340px] flex justify-center">
                <Image
                    src={imageUrl}
                    alt={data?.name}
                    width={320}
                    height={320}
                    className="rounded-xl object-cover shadow-md w-full h-[220px] md:h-[340px]"
                />
            </div>

            {/* Right Content */}
            <div className="z-10 flex-1 space-y-6 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">
                    {data?.name}
                </h1>

                <p className="text-white/90 text-lg max-w-xl">
                    {healthProfile?.introduction}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-2 justify-center md:justify-start">
                    {getStarIcons(rating)}
                    <span className="text-white text-xl font-semibold ml-2">{healthProfile?.rating}/5</span>
                    <span className="text-white/70 text-lg ml-2">({healthProfile?.reviewCount} reviews)</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                    {healthProfile?.tags?.map((tag, index) => (
                        <span key={index} className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                    <div>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-white text-blue-700 px-6 py-4 rounded-full font-bold"
                        >
                            Book a Free Trial
                        </button>

                        <FreeTrialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                    </div>

                    <div>
                        <button
                        onClick={() => {
                                const section = document.getElementById("plansSection");
                                section?.scrollIntoView({ behavior: "smooth" });
                            }}
                         className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105">
                            📋 Plans
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={() => {
                                const section = document.getElementById("locationSection");
                                section?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="text-white font-semibold px-6 py-4 border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition"
                        >
                            📍 Directions
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default HeroSection;
