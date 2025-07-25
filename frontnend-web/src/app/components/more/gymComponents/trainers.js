'use client';
import { motion } from 'framer-motion';
import { FaUserCheck } from 'react-icons/fa';

const CertifiedTrainers = ({
   healthProfile,data
}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <FaUserCheck className="text-blue-700 text-3xl" />
                    Our Certified Trainers
                </h2>
            </div>

            {/* Trainer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {healthProfile?.trainers?.map((trainer, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: '#e0f2fe', // light blue on hover
                            boxShadow: '0 6px 18px rgba(59, 130, 246, 0.3)', // blue glow
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-blue-100 hover:border-blue-500 transition-all"
                    >
                        
                        <h3 className="text-lg font-bold mb-1 text-blue-700">{trainer.name}</h3>
                        <p className="text-sm text-blue-600 mb-2">{trainer.experience} Years Experience</p>
                        <p className="text-sm text-gray-600">
                            <strong>Certification:</strong> {trainer.certification}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default CertifiedTrainers;

