'use client';
import { motion } from 'framer-motion';
import { FaStar, FaHeartbeat, FaUsers, FaRupeeSign, FaFlask } from 'react-icons/fa';
import { MdSupport, MdTrendingUp } from 'react-icons/md';

const WhyChoose = ({ data,healthProfile }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-left">
                    Why Choose {data?.name}?
                </h2>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {healthProfile?.features?.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 2px rgba(59,130,246,0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                    >
                        <div className="mb-3">{item.icon}</div>
                        <h3 className="text-lg font-bold text-blue-700 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default WhyChoose;
