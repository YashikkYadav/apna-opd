'use client';
import { motion } from 'framer-motion';

const FacilitiesSection = (healthProfile) => {
    const facilities = [
        {
            icon: "💪",
            title: "Strength & Cardio Equipment",
            desc: "Latest machines from top brands including treadmills, ellipticals, and strength training equipment",
        },
        {
            icon: "🏋️‍♂️",
            title: "Functional Training Zone",
            desc: "Dedicated area for functional movements, CrossFit, and athletic training",
        },
        {
            icon: "🧑‍🏫",
            title: "Personal Training",
            desc: "One-on-one sessions with certified trainers for personalized fitness programs",
        },
        {
            icon: "🧘‍♂️",
            title: "Yoga & Group Classes",
            desc: "Yoga, Zumba, Pilates, and other group fitness classes for all levels",
        },
        {
            icon: "🛁",
            title: "Steam & Shower",
            desc: "Clean changing rooms with steam room, showers, and secure lockers",
        },
        {
            icon: "❄️",
            title: "Climate Controlled",
            desc: "Fully air-conditioned facility with music system and Wi-Fi connectivity",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Section Title */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
                    World-Class Facilities
                </h2>
            </div>

            {/* Facility Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {healthProfile?.facilities?.map((facility, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{
                            scale: 1.04,
                            boxShadow: '0 0 0 4px rgba(59,130,246,0.3)'
                        }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 text-center hover:border-2 hover:border-blue-500 transition-all"
                    >
                        <div className="text-4xl mb-4">{facility.icon}</div>
                        <h3 className="text-blue-700 text-lg font-bold mb-1">{facility}</h3>
                        <p className="text-gray-600 text-sm">{facility.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default FacilitiesSection;
