'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { ClipboardList, MessageCircle, Package as PackageIcon, Phone, MapPin, Star } from 'lucide-react';

const getStarIcons = (rating = 0) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars > 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return [
        ...Array(fullStars).fill(<FaStar className="text-yellow-300 text-xl" />),
        ...(halfStar ? [<FaStarHalfAlt className="text-yellow-300 text-xl" />] : []),
        ...Array(emptyStars).fill(<FaRegStar className="text-yellow-300 text-xl" />),
    ];
};

const HeroSection = ({
    res_data,
    setShowModal,
    setModalTest,
    data,
    healthProfile
}) => {
    const name = data?.name ?? "HealthLab Diagnostics";
    const location = data?.location ?? "City";
    const address = data?.address ?? "";
    const rating = healthProfile?.reviews ? parseFloat(
        (
            res_data?.healthProfile?.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
            res_data?.healthProfile?.reviews.length
        ).toFixed(1)
    ) : 0;
    const reviewCount = res_data?.healthProfile?.reviews?.length ?? 0;
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
                <h2 className="text-xl md:text-2xl font-semibold mt-2">Advanced Diagnostics & Pathology</h2>

                <div className="flex flex-wrap gap-4 my-4">
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                        <MapPin className="w-5 h-5" />
                        <span>{location} {address}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                        <Star className="w-5 h-5 text-yellow-300" />
                        <span>{rating}/5 • {reviewCount} Reviews</span>
                    </div>
                </div>

                <p className="mt-2 mb-4 text-lg opacity-90">
                    {healthProfile?.introduction}
                </p>

                <div className="flex flex-wrap gap-3 mt-2">
                    <button
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-6 py-3 flex items-center gap-2 shadow-lg transition text-base"
                        onClick={() => {
                            setShowModal(true);
                            setModalTest(null);
                        }}
                    >
                        <ClipboardList className="w-4 h-4" /> Book Test
                    </button>
                    <a href="#packages" className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-6 py-3 flex items-center gap-2 backdrop-blur transition text-base">
                        <PackageIcon className="w-4 h-4" /> Browse Packages
                    </a>
                    <a href={`tel:${phone}`}>
                        <button className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-6 py-3 flex items-center gap-2 backdrop-blur transition text-base">
                            <Phone className="w-4 h-4" /> Call Now
                        </button>
                    </a>
                    <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">
                        <button className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-6 py-3 flex items-center gap-2 backdrop-blur transition text-base">
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                        </button>
                    </a>
                </div>
            </div>

        </motion.section>
    );
};

export default HeroSection;
