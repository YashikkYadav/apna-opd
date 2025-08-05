"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";
import { useState } from "react";
import BookSession from "./BookSession";
const AppointmentOptions = ({ clinicName = "Happy Tails Clinic" }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const options = [
        {
            title: "Clinic Visit",
            desc: `In-person consultation at ${clinicName}`,
            button: "Book Clinic Visit",
        },
        {
            title: "Online Consultation",
            desc: "Video call consultation from home",
            button: "Book Online",
        },
        {
            title: "Request Callback",
            desc: "We'll call you to schedule",
            button: "Request Callback",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Header */}
            <div className=" mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <span className="text-3xl text-yellow-400"><FaBolt /></span>

                    Book Your Appointment Today
                </h2>
            </div>

            <p className="text-lg text-gray-600 mb-10">
                Choose your preferred consultation mode and get the best care for your pet
            </p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {options.map((opt, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.04, boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.3)" }}
                        className="flex flex-col items-center justify-between bg-blue-600 rounded-2xl p-8 text-white shadow-md transition-all"
                    >
                        <div className="flex flex-col items-center gap-2 w-full">
                            <span className="text-4xl mb-2">{opt.emoji}</span>
                            <h3 className="text-xl font-extrabold mb-1 text-center">{opt.title}</h3>
                            <p className="text-base font-medium text-white/90 text-center mb-6">
                                {opt.desc}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-auto rounded-full px-6 py-3 text-lg font-bold hover:border-white hover:text-white bg-white text-blue-700 shadow transition w-full max-w-[200px]"
                        >
                            {opt.button}
                        </button>
                    </motion.div>
                ))}
                <BookSession isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </motion.div>
    );
};

export default AppointmentOptions;

