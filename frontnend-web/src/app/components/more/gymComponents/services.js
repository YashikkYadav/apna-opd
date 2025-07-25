'use client';
import { motion } from 'framer-motion';

const programs = [
    {
        title: 'Weight Loss Program',
        desc: 'Structured program combining cardio, strength training, and nutrition guidance',
    },
    {
        title: 'Muscle Building',
        desc: 'Progressive strength training program for lean muscle development',
    },
    {
        title: 'CrossFit & HIIT',
        desc: 'High-intensity workouts for improved cardiovascular fitness and strength',
    },
    {
        title: 'Body Transformation',
        desc: 'Complete 12-week transformation program with dedicated trainer support',
    },
    {
        title: 'Yoga & Pilates',
        desc: 'Mind-body wellness programs for flexibility, balance, and stress relief',
    },
    {
        title: 'Nutrition Consultation',
        desc: 'Personalized diet plans and nutrition guidance from certified nutritionists',
    },
];

const ProgramsAndServices = ({healthProfile}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Section Title */}
            <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
                    Programs & Services
                </h2>
                <p className="text-gray-600 text-lg mt-2">
                    Choose from our comprehensive range of fitness programs designed for every goal
                </p>
            </div>

            {/* Program Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {healthProfile?.programs?.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white border-l-4 border-blue-500 hover:border-blue-700 rounded-2xl p-6 shadow-md transition-all"
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-700 text-sm">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default ProgramsAndServices;
