'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaHospitalAlt } from 'react-icons/fa';

const ClinicAboutSection = ({
    clinic_name = "{{clinic_name}}",
    city = "{{city}}",
    years_in_service = "{{years_in_service}}",
    authority = "{{authority}}",
    success_rate = "{{success_rate}}",
    data
}) => {
    const description = `${data?.name} has been a beacon of hope for couples seeking fertility treatments in ${data?.location} for over ${years_in_service} years. Our state-of-the-art facility combines cutting-edge technology with compassionate care to help you achieve your dream of parenthood.`;

    const items = [
        { label: "🏥 Licensed By", value: authority },
        { label: "📅 Years in Service", value: years_in_service },
        { label: "📈 Success Rate", value: `${success_rate}%` },
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
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <FaHospitalAlt className="text-3xl text-blue-700" />
                    About {data?.name}
                </h2>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg font-medium mb-8 max-w-4xl">
                {description}
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.4)",
                        }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[180px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                    >
                        <h3 className="text-lg font-bold text-blue-600 mb-2">{item.label}</h3>
                        <div className="text-gray-800 text-base font-medium">{item.value}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ClinicAboutSection;
