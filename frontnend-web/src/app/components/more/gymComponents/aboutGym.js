'use client';
import { motion } from 'framer-motion';
import { FaDumbbell } from 'react-icons/fa';

const AboutSection = ({
    gymName = "{{gym_name}}",
    city = "{{locality}}",
    year_established = "{{year_established}}",
    members = "500+",
    trainers = "10+",
    healthProfile
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

                    About {healthProfile?.name}
                </h2>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <p className="text-gray-700 text-lg leading-relaxed">
                    Established in <strong>{year_established}</strong>, {healthProfile?.name} has been serving{" "}
                    <strong>{healthProfile?.location}</strong> and nearby areas with dedication to fitness excellence. Our
                    state-of-the-art facility combines modern equipment with personalized training programs
                    to help you achieve your fitness goals.
                    <br /><br />
                    We believe fitness is not just about working out—it’s about creating a sustainable
                    lifestyle. Our certified trainers and supportive community will guide you every step of
                    the way, whether you're a beginner or an experienced athlete.
                    <br /><br />
                    {gymName} is more than just a gym; we're your fitness family, committed to helping you
                    transform your health and unlock your potential.
                </p>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Since", value: year_established },
                        { label: "Happy Members", value: members },
                        { label: "Expert Trainers", value: trainers },
                        { label: "Open Hours", value: "24/7" },
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
