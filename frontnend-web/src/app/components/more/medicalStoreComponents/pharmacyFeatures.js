'use client';
import { motion } from 'framer-motion';



const FeatureCard = ({ label, enabled }) => (
    <motion.div
        whileHover={{ scale: 1.04, boxShadow: '0 0 0 3px rgba(9, 137, 234, 0.2)' }}
        className={`rounded-2xl p-6 min-h-[80px] border-l-4 transition-all ${
            enabled
                ? 'bg-blue-50 border-blue-500'
                : 'bg-gray-50 border-gray-300'
        }`}
    >
        <h4
            className={`text-lg font-bold ${
                enabled ? 'text-blue-700' : 'text-gray-600'
            }`}
        >
            {label}
        </h4>
    </motion.div>
);

const FeatureHighlights=({healthProfile })=> {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-10">
                Our Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {healthProfile?.facilities.map((feature, idx) => (
                    <FeatureCard key={idx} label={feature} />
                ))}
            </div>
        </motion.section>
    );
}

export default FeatureHighlights;