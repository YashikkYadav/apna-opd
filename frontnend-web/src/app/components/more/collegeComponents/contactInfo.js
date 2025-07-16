'use client';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaGlobe, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { IoLocationSharp } from "react-icons/io5";

const ContactAndLocation = ({
    phone = '{{phone_number}}',
    email = '{{email}}',
    website = '{{college_website}}',
    address = '{{full_address}}, {{city}}, {{state}} - {{pincode}}',
    collegeName = '{{college_name}}',
    city = '{{city}}',
    state = '{{state}}',
    healthProfile
}) => {
    const items = [
        {
            icon: <FaPhoneAlt className="text-blue-600 text-xl" />,
            label: "Phone:",
            value: healthProfile?.phone,
            highlight: true,
        },
        {
            icon: <FaEnvelope className="text-blue-600 text-xl" />,
            label: "Email:",
            value: healthProfile?.email,
        },
        {
            icon: <FaGlobe className="text-blue-600 text-xl" />,
            label: "Website:",
            value: website,
            isLink: true,
        },
        {
            icon: <FaMapMarkerAlt className="text-blue-600 text-xl" />,
            label: "Address:",
            value: healthProfile?.location,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            <h3 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2 mb-8">
                <IoLocationSharp className="text-blue-700 text-3xl" /> Contact & Location
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Info Cards */}
                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-[#F7F9FB] p-5 rounded-xl border-l-4 border-blue-500 hover:border-blue-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex items-start gap-4"
                        >
                            <div className="mt-1">{item.icon}</div>
                            <div>
                                <p className="font-semibold text-gray-800">{item.label}</p>
                                {item.isLink ? (
                                    <a
                                        href={item.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 mt-1 underline block break-words"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <p
                                        className={`text-base mt-1 ${item.highlight ? 'text-blue-700 font-medium' : 'text-gray-600'
                                            }`}
                                    >
                                        {item.value}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* CTA Buttons */}
                    <div className="flex gap-4 pt-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transition">
                            Request a Callback
                        </button>
                    </div>
                </div>

                {/* Right Map Area */}
                <div className="bg-blue-50 p-6 rounded-xl text-sm text-gray-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex flex-col justify-center items-center text-center">
                    <p className="font-bold text-lg text-blue-700 mb-2">🗺️ Google Map</p>
                    <p className="text-gray-600">Map integration will be placed here</p>
                    <p className="mt-2 text-gray-500 font-medium">
                        {healthProfile?.name}, {healthProfile?.location}
                    </p>
                    <div className="bg-blue-200 w-full h-48 mt-4 rounded-md flex items-center justify-center">
                        <span className="text-blue-700 font-semibold">Map Placeholder</span>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default ContactAndLocation;
