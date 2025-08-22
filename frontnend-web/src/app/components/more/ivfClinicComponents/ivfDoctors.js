'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd } from 'react-icons/fa';

const ClinicDoctorsSection = ({ healthProfile }) => {
    if (!healthProfile?.doctors || healthProfile.doctors.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="mb-8 flex items-center gap-3">
                <FaUserMd className="text-3xl text-blue-700" />
                <h3 className="text-2xl md:text-3xl font-extrabold text-blue-700">Our Specialized Doctors</h3>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthProfile.doctors.map((doctor, index) => (
                    <motion.div
                        key={index}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.4)",
                        }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[180px] w-[400px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                    >
                        <h4 className="font-semibold text-black text-lg">
                            Name: <span className="text-blue-600">{doctor.name}</span>
                        </h4>
                        <p className="text-black text-md">
                            Specialization: <span className="text-blue-600">{doctor.specialization}</span>
                        </p>
                        <p className="text-black text-md mt-1">
                            Experience: <span className="text-blue-600">{doctor.experience} years</span>
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ClinicDoctorsSection;

