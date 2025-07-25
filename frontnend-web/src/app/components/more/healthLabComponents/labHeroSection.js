'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { ClipboardList, MessageCircle, Package as PackageIcon, Phone, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import BookTest from './BookTests';
import CallNow from './CallNow';

function getStarIcons(avgRating) {
    const stars = [];
    const safeRating = avgRating ?? 0;
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
    res_data,
    data,
    healthProfile
}) => {
    const [callModalOpen, setCallModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const name = data?.name ?? "HealthLab Diagnostics";
    const location = data?.location ?? "City";
    const address = data?.address ?? "";
    const avgRating = healthProfile?.testimonials?.length ? (healthProfile?.testimonials.reduce((sum, r) => sum + r.rating, 0) / healthProfile?.testimonials.length).toFixed(1) : "0.0";
    const reviewCount = healthProfile?.testimonials?.length || 0;
    const phone = data?.phone;

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 "
        >

            {/* Background Circles */}
            <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-300/30 rounded-full z-0" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-300/30 rounded-full z-0" />

            {/* Image */}
            <div className="z-10 flex-shrink-0 w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-500 to-yellow-300 shadow-lg relative">
                <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center"
                    alt={name}
                    width={288}
                    height={288}
                    className="object-cover w-full h-full rounded-2xl"
                    priority
                />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-base border-2 border-white">✓</span>
            </div>

            {/* Info */}
            <div className="relative z-10 flex flex-col justify-center text-white w-full md:w-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">{name}</h1>
                {/* <h2 className="text-xl md:text-2xl font-semibold mt-2">Advanced Diagnostics & Pathology</h2> */}

                <div className="flex flex-wrap gap-4 my-4">
                    <div
                        onClick={() => {
                            const section = document.getElementById("labLocationSection");
                            section?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                        <MapPin className="w-5 h-5" />
                        <span>{location} {address}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        {getStarIcons(parseFloat(avgRating))}
                        <span className="text-white text-xl font-semibold ml-2">{avgRating}/5</span>
                        <span className="text-white/70 text-lg ml-2">({reviewCount} reviews)</span>
                    </div>
                </div>

                <p className="mt-2 mb-4 text-lg opacity-90">
                    {healthProfile?.introduction}
                </p>

                {/*tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                    {healthProfile?.tags?.map((tag, index) => (
                        <span key={index} className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                    <button
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-6 py-3 flex items-center gap-2 shadow-lg transition text-base"
                        onClick={() => setModalOpen(true)}
                    >
                        <ClipboardList className="w-4 h-4" /> Book Test
                    </button>
                    <BookTest isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                    <button
                        onClick={() => {
                            const section = document.getElementById("labPackagesSection");
                            section?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-6 py-3 flex items-center gap-2 backdrop-blur transition text-base">
                        <PackageIcon className="w-4 h-4" /> Browse Packages
                    </button>
                    <button
                        onClick={() => setCallModalOpen(true)}
                        className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105">
                        📞 Call Now
                    </button>
                    <CallNow isOpen={callModalOpen} onClose={() => setCallModalOpen(false)} />
                    <button
                        onClick={() => {
                            const section = document.getElementById("labLocationSection");
                            section?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="border-2 border-white text-white text-lg px-8 py-2 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105">
                        📍 View Location
                    </button>
                </div>
            </div>

        </motion.section>
    );
};

export default HeroSection;
