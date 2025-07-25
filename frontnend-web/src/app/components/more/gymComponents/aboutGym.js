'use client';
import { motion } from 'framer-motion';
import { FaDumbbell } from 'react-icons/fa';

const AboutSection = ({
    gymName = "{{gym_name}}",
    city = "{{locality}}",
    year_established = "{{year_established}}",
    members = "500+",
    trainers = "10+",
    healthProfile,
    data
}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-white rounded-3xl shadow-md p-6 md:p-12 max-w-7xl mx-auto my-12"
        >
            {/* Title */}
            <div className=" mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <FaDumbbell className="text-3xl text-blue-700" />

                    About {data?.name}
                </h2>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <p className="text-gray-700 text-lg leading-relaxed">
                    {healthProfile?.about}
                </p>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Since", value: healthProfile?.established  },
                        { label: "Happy Members", value: healthProfile?.totalMembers  },
                        { label: "Expert Trainers", value: healthProfile?.noOfTrainers },
                        { label: "Open Hours", value: healthProfile?.operatingHours },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.03 }}
                            className="rounded-xl text-blue-700 text-center py-8 px-4 font-bold text-xl md:text-2xl shadow-md bg-[#F7F9FB] border-l-4 border-blue-500 hover:border-blue-700 transition-all"
                        >
                            <div className="text-3xl md:text-4xl font-extrabold mb-2">{item.value}</div>
                            <div className="text-sm md:text-base font-medium text-blue-600">{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default AboutSection;
