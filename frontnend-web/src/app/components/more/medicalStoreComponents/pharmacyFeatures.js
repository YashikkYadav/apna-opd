'use client';
import { motion } from 'framer-motion';

const FeatureTag = ({ enabled }) => (
    <span
        className={`text-xs font-semibold px-3 py-1 rounded-full ${
            enabled
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
        }`}
    >
        {enabled ? 'Enabled' : 'Unavailable'}
    </span>
);

const FeatureCard = ({ label, enabled }) => (
    <motion.div
        whileHover={{ scale: 1.04, boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }}
        className={`rounded-2xl p-6 min-h-[160px] border-l-4 transition-all ${
            enabled
                ? 'bg-green-50 border-green-500'
                : 'bg-gray-50 border-gray-300'
        }`}
    >
        <h4
            className={`text-lg font-bold ${
                enabled ? 'text-green-700' : 'text-gray-600'
            }`}
        >
            {label}
        </h4>
        <div className="mt-3">
            <FeatureTag enabled={enabled} />
        </div>
    </motion.div>
);

const FeatureHighlights=({ features = [] })=> {
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
                {features.map((feature, idx) => (
                    <FeatureCard key={idx} {...feature} />
                ))}
            </div>
        </motion.section>
    );
}

export default FeatureHighlights;