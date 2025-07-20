'use client';
import { motion } from 'framer-motion';

const reasons = [
    {
        icon: '🏆',
        title: 'NAAC/NABH Recognition',
        desc: 'Accredited by top regulatory bodies ensuring quality education standards',
    },
    {
        icon: '👨‍🏫',
        title: 'Experienced Faculty',
        desc: 'Learn from industry experts with years of practical experience',
    },
    {
        icon: '🔬',
        title: 'Modern Labs & Equipment',
        desc: 'State-of-the-art laboratories and medical equipment for hands-on learning',
    },
    {
        icon: '💼',
        title: 'Placement Assistance',
        desc: 'Dedicated placement cell with tie-ups with leading hospitals',
    },
    {
        icon: '🏠',
        title: 'Hostel & Transportation',
        desc: 'Comfortable accommodation and reliable transport facilities',
    },
    {
        icon: '🎯',
        title: 'Practical Training Focus',
        desc: 'Emphasis on clinical rotations and real-world medical experience',
    },
];

const WhyChooseCollege = ({ healthProfile}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Heading */}
            <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
                    Why Choose <span className="text-blue-600">{healthProfile?.name}</span>?
                </h2>
                <p className="text-gray-600 text-lg mt-2">
                    Discover what makes us the preferred choice for medical education
                </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reasons.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04 }}
                        className="bg-white rounded-2xl px-6 py-8 text-center shadow-sm border-l-4 border-blue-500 hover:border-blue-700 transition-all"
                    >
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default WhyChooseCollege;
