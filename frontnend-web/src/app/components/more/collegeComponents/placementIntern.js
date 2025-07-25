'use client';
import { motion } from 'framer-motion';
import { FaArrowRight, FaHospitalAlt, FaUserGraduate } from 'react-icons/fa';

const hospitals = [
    '{{hospital_1}}',
    '{{hospital_2}}',
    '{{hospital_3}}',
    '{{hospital_4}}',
    '{{hospital_5}}',
];

const careerServices = [
    'Mandatory internship in final year',
    'Resume building workshops',
    'Interview preparation sessions',
    'Career counseling services',
    'Alumni network support',
];

const PlacementAndInternship = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-16"
        >
            {/* Section Title */}
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <FaUserGraduate className="text-blue-700 text-3xl" />
                    Placement & Internship Opportunities
                </h2>
                <p className="text-gray-600 text-lg mt-2">
                    Leverage real-world exposure with our extensive hospital tie-ups and career development support.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hospital Tie-ups */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#F7F9FB] rounded-2xl p-6 hover:shadow-md border-l-4 border-blue-500 transition-all"
                >
                    <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <FaHospitalAlt /> Hospital Tie-ups
                    </h3>
                    <ul className="space-y-3">
                        {hospitals.map((name, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <FaArrowRight className="text-blue-500 mt-1" />
                                <span>{name} – {`city`}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Career Services */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#F7F9FB] rounded-2xl p-6 hover:shadow-md border-l-4 border-blue-500 transition-all"
                >
                    <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <FaUserGraduate /> Career Services
                    </h3>
                    <ul className="space-y-3">
                        {careerServices.map((service, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <FaArrowRight className="text-blue-500 mt-1" />
                                <span>{service}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default PlacementAndInternship;
