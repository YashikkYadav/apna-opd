'use client';
import { motion } from 'framer-motion';

const timings = [
    { label: 'Monday - Friday', value: '{{weekday_timings}}' },
    { label: 'Sunday', value: '{{sunday_timings}}' },
];

const GymTimings = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Section Heading */}
            <div className="text-left mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
                    Gym Timings
                </h2>
                <p className="text-gray-600 text-lg mt-2">
                    Flexible hours to fit your schedule
                </p>
            </div>

            {/* Timing Table */}
            <div className="bg-[#F7F9FB] rounded-xl border-l-4 border-blue-500 hover:border-blue-700 shadow-sm p-6 transition-all duration-300">
                <ul className="divide-y divide-blue-100">
                    {timings.map((item, idx) => (
                        <li
                            key={idx}
                            className="flex justify-between items-center py-4 text-gray-800 hover:text-blue-700 transition"
                        >
                            <span className="font-semibold">{item.label}</span>
                            <span className="text-blue-600 font-medium">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.section>
    );
};

export default GymTimings;

