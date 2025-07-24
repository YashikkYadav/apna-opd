'use client';

import { motion } from 'framer-motion';
import { FaPhoneAlt, FaGlobe, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';

const LocationAndContact = ({ website_url = '{{website_url}}',

    healthProfile,
    data
}) => {
    const contactItems = [
        {
            icon: <FaPhoneAlt className="text-blue-600 text-xl" />,
            label: 'Phone',
            value: data?.phone,
        },
        {
            icon: <FaWhatsapp className="text-blue-600 text-xl" />,
            label: 'WhatsApp',
            value: data?.phone,
        },
        {
            icon: <FaGlobe className="text-blue-600 text-xl" />,
            label: 'Website',
            value: website_url,
            isLink: true,
        },
        {
            icon: <FaEnvelope className="text-blue-600 text-xl" />,
            label: 'Email',
            value: data?.email,
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
            {/* Header */}
            <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Visit Us Today</h2>
                <p className="text-gray-600 text-lg mt-2">
                    Conveniently located in the heart of {data?.address}
                </p>
            </div>

            {/* Address Card */}
            <div className="bg-[#F7F9FB] p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02] mb-6 flex items-start gap-4">
                <GoLocation className="text-blue-500 text-xl mt-[2px]" />
                <div>
                    <p className="font-semibold text-gray-800">Address:</p>
                    <p className="text-gray-600 text-base mt-1">{data?.address}</p>
                </div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {contactItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-5 rounded-xl border-l-4 border-blue-500 hover:border-blue-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex items-start gap-4"
                    >
                        <div className="mt-1">{item.icon}</div>
                        <div>
                            <p className="font-semibold text-gray-800">{item.label}:</p>
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
                                <p className="text-base mt-1 text-blue-700 font-medium">{item.value}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Google Map Placeholder */}
            <div className="bg-blue-50 mt-10 p-6 rounded-xl text-center hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <p className="font-bold text-lg text-blue-700 mb-2">🗺️ Google Map</p>
                <p className="text-gray-600">{data?.location}</p>
                <div className="bg-blue-200 w-full h-48 mt-4 rounded-md flex items-center justify-center">
                    <span className="text-blue-700 font-semibold">Map Placeholder</span>
                </div>
            </div>
        </motion.section>
    );
};

export default LocationAndContact;
