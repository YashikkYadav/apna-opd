'use client';
import { motion } from 'framer-motion';
import { FaClipboardList } from 'react-icons/fa';

const RequestSteps = ({ healthProfile,data }) => {
    const steps = [
        {
            step: 1,
            title: "Check Availability",
            desc: "View real-time blood stock",
        },
        {
            step: 2,
            title: "Select Component",
            desc: "Choose required blood type",
        },
        {
            step: 3,
            title: "Contact Direct",
            desc: "Call or fill quick form",
        },
        {
            step: 4,
            title: "Confirm Stock",
            desc: "Verify availability",
        },
        {
            step: 5,
            title: "Visit Location",
            desc: "Get directions and visit",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Section Title */}
            <div className="flex items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3 ">
                    <FaClipboardList className="text-3xl text-blue-700" />

                    How to Request Blood from <span className="text-blue-500">{data?.name ?? "Dummy Name"}</span>
                </h2>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {steps.map((item) => (
                    <motion.div
                        key={item.step}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 text-center hover:border-2 hover:border-blue-500 transition-all"
                    >
                        <div className="text-white bg-blue-600 rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold mb-3">
                            {item.step}
                        </div>
                        <h4 className="text-blue-700 font-semibold text-lg mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default RequestSteps;
