'use client';

import { motion } from 'framer-motion';
import { FlaskConical, ShieldCheck, Award, Zap, Sparkles } from 'lucide-react';

const AboutSection = ({
    healthProfile,
    about = 'Leading healthcare diagnostics provider with over 15 years of excellence in pathology and radiology services. We combine state-of-the-art technology with expert medical professionals to deliver accurate and timely results.',
    certifications = ['NABL Accredited', 'ISO 9001:2015', 'ICMR Approved'],
    highlights = [
        {
            title: 'Real-Time Reporting',
            desc: 'Instant access to digital reports via mobile or email.',
            icon: <Zap className="w-6 h-6 text-pink-300" />,
        },
        {
            title: 'Certified Technicians',
            desc: 'Team of highly trained pathologists and radiologists.',
            icon: <ShieldCheck className="w-6 h-6 text-pink-300" />,
        },
        {
            title: 'Advanced Equipment',
            desc: 'Automated analyzers & digital imaging for accuracy.',
            icon: <Award className="w-6 h-6 text-pink-300" />,
        },
        {
            title: 'At-Home Collection',
            desc: 'Convenient doorstep sample pickup services.',
            icon: <Sparkles className="w-6 h-6 text-pink-300" />,
        },
    ],
}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-16 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="mb-6 flex items-center gap-3">
                <FlaskConical className="w-8 h-8 text-pink-300" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">About HealthLab Diagnostics</h2>
            </div>

            {/* Description */}
            <p className="text-black-100 text-lg leading-relaxed mb-8 max-w-4xl">
                {healthProfile?.about}
            </p>

            {/* Grid: Certifications + Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Certifications as Cards */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-600 shadow transition-all"
                >
                    <h3 className="text-xl font-bold text-blue-700 mb-4">Certifications & Accreditations</h3>
                    <div className="flex flex-wrap gap-4">
                        {healthProfile?.certifications?.map((cert, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-blue-200 rounded-xl px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50 transition"
                            >
                                {cert}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Highlights as Cards */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-600 shadow transition-all"
                >
                    <h3 className="text-xl font-bold text-blue-700 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {healthProfile?.keyFeatures?.map((title, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:bg-blue-50 transition"
                            >
                                <div className="font-semibold text-blue-800">{title}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AboutSection;
