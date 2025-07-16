'use client';
import { motion } from 'framer-motion';
import { FaUserMd } from 'react-icons/fa';

const LeadFertilitySpecialist = ({
    doctor_name = "{{doctor_name}}",
    degrees = "{{degrees}}",
    experience_years = "{{experience_years}}",
    specializations = "{{specializations}}",
    couples_treated = "{{couples_treated}}",
    imageUrl = "/images/max.png"
}) => {
    const info = [
        { label: 'EXPERIENCE', value: `${experience_years}+ Years in Fertility & IVF` },
        { label: 'DEGREES', value: degrees },
        { label: 'SPECIALIZATION', value: specializations },
        { label: 'COUPLES TREATED', value: `${couples_treated}+ successful cases` },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                    <img
                        src={imageUrl}
                        alt={`Dr. ${doctor_name}`}
                        className="rounded-full border-4 border-blue-200 shadow-xl w-40 h-40 object-cover"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
                            <FaUserMd className="text-2xl text-blue-500" />
                            Dr. {doctor_name}
                        </h2>
                        <p className="text-gray-700 pt-3 text-base font-medium leading-relaxed">
                            Compassionate fertility expert with a strong track record of success in IVF and reproductive health. Dedicated to guiding couples through their parenthood journey.
                        </p>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {info.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.03, boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.3)' }}
                                className="bg-[#F7F9FB] p-5 rounded-xl border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                            >
                                <p className="text-sm font-semibold text-gray-500">{item.label}</p>
                                <p className="text-lg font-bold text-blue-700 mt-1">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default LeadFertilitySpecialist;
