'use client';

import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';

const Conditions = ({ data,healthProfile }) => {
    

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
                <h2 className="text-2xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <Stethoscope className="text-blue-600 w-10 h-10" />
                    <p className="mt-4 md:mt-10">Medical Conditions of <span className="text-blue-800">{data?.name ?? 'Doctor'}</span></p>
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 capitalize">
                {healthProfile?.data?.medicalConditions?.map((c, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.3)' }}
                        className="bg-[#f0f6fb] rounded-2xl p-5 text-center border border-transparent hover:border-blue-500 transition-all"
                    >
                        <div className="text-lg font-semibold text-blue-800">{c}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Conditions;
