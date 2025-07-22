'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone, MapPin, Clock } from 'lucide-react';

const PharmacyHero = ({ healthProfile, data, dataVersion, lastUpdate }) => {
    const features = data?.features?.filter(f => f.enabled) || [];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 "
        >
            {/* Decorative Circles */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
            <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

            {/* Pharmacy Image */}
            <div className="z-10 flex-shrink-0 w-full md:w-[340px] flex justify-center">
                <Image
                    src="/pharmacy-image.jpg"
                    alt={data?.name}
                    width={320}
                    height={320}
                    className="rounded-xl object-cover shadow-md w-full h-[220px] md:h-[340px]"
                />
            </div>

            {/* Pharmacy Info */}
            <div className="z-10 flex-1 space-y-6 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow">
                    Welcome to {data?.name}
                </h2>
                <p className="text-white/90 text-lg max-w-xl">
                    {healthProfile?.introduction}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/80 pt-2">
                    <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" /> {data?.location || "Your City"}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5" /> Open: 8 AM – 11 PM
                    </span>
                    {lastUpdate && (
                        <span className="flex items-center gap-2">
                            ⏱ Last updated: {lastUpdate.toLocaleTimeString()}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                    <button className="bg-white text-green-700 text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition hover:scale-105">
                        🛒 Order Medicines
                    </button>
                    <a href={`tel:${data?.phone}`}>
                        <button className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105">
                            📞 Call Pharmacy
                        </button>
                    </a>
                    <button className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105">
                        📍 View Location
                    </button>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                    <span className="bg-white/30 px-4 py-2 rounded-full text-sm font-medium">
                        ✔ Verified Pharmacy
                    </span>
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                        ⚡ Express Delivery
                    </span>
                    {features.map((feature, index) => (
                        <span
                            key={`${feature.label}-${index}-${dataVersion}`}
                            className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium"
                        >
                            {feature.label}
                        </span>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default PharmacyHero;
