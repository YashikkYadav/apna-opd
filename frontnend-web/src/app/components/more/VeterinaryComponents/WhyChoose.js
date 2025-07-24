'use client';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const WhyChoose = ({
    healthProfile,data,
    affiliatedHospitalsCount = "{{affiliated_hospitals_count}}",
}) => {
    const features = [
        {
            icon: "✅",
            title: "Verified Inventory",
            desc: "Real-time updated blood stock information",
        },
        {
            icon: "🚨",
            title: "Emergency Support",
            desc: "24/7 emergency assistance via Apna OPD",
        },
        {
            icon: "🏥",
            title: "Hospital Trusted",
            desc: `Preferred by ${affiliatedHospitalsCount}+ hospitals`,
        },
        {
            icon: "🔒",
            title: "Secure Requests",
            desc: "Safe and secure blood request system",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className=" mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                <FaStar className="text-3xl text-blue-700" />
                
                    Why Choose <span className="text-blue-500">{data?.name ?? "Dummy Data"}</span> on Apna OPD?
                </h2>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {healthProfile?.facilities?.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, boxShadow: "0 0 0 4px rgba(59,130,246,0.5)" }} // blue
                        className="bg-[#F7F9FB] rounded-2xl p-6 flex flex-col items-center text-center hover:border-2 hover:border-blue-500 transition-all"
                    >
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <h3 className="text-lg font-bold mb-1 text-blue-700">{item}</h3>
                        <p className="text-base text-gray-600">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default WhyChoose;