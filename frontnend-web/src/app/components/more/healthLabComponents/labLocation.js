'use client';

import { motion } from 'framer-motion';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaGlobe,
    FaClock,
} from 'react-icons/fa';

const LocationAndContact = ({ data }) => {
    const {
        name = 'Unknown Center',
        address,
        location,
        phone,
        emergencyPhone,
        email,
        website,
        hours = { 'Mon–Sun': '8:00 AM – 11:00 PM' },
    } = data || {};

    const fullAddress = [address, location].filter(Boolean).join(', ');

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-16 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-4">
                    <span className="text-4xl text-pink-500">
                        <FaMapMarkerAlt />
                    </span>
                    Location & Contact
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Map View */}
                <div className="bg-blue-50 rounded-2xl flex items-center p-8 min-h-[300px]">
                    <div className="flex flex-col space-y-3">
                        <div className="text-4xl">🗺️</div>
                        <div className="text-xl font-bold text-gray-800">Interactive Map View</div>
                        <div className="text-gray-500 font-medium">{name}</div>
                        <div className="text-gray-600 font-semibold">{fullAddress}</div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-[#F7F9FB] rounded-2xl p-8 flex flex-col gap-8 min-h-[320px] md:min-h-[400px] justify-center">
                    <div>
                        <div className="font-bold text-2xl mb-4">Contact Information</div>

                        {/* Address */}
                        <div className="flex items-start gap-4 mb-4 text-lg">
                            <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                                <FaMapMarkerAlt />
                            </span>
                            <div>
                                <span className="font-bold">Address:</span>
                                <br />
                                {fullAddress || 'N/A'}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4 mb-4 text-lg">
                            <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                                <FaPhoneAlt />
                            </span>
                            <div>
                                <span className="font-bold">Phone:</span>
                                <br />
                                {phone || 'N/A'}
                                {emergencyPhone && (
                                    <>
                                        <br />
                                        <span className="font-semibold">Emergency:</span> {emergencyPhone}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4 mb-4 text-lg">
                            <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                                <FaEnvelope />
                            </span>
                            <div>
                                <span className="font-bold">Email:</span>
                                <br />
                                {Array.isArray(email)
                                    ? email.map((e, i) => <div key={i}>{e}</div>)
                                    : email || 'N/A'}
                            </div>
                        </div>

                        {/* Website */}
                        {website && (
                            <div className="flex items-start gap-4 mb-4 text-lg">
                                <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                                    <FaGlobe />
                                </span>
                                <div>
                                    <span className="font-bold">Website:</span>
                                    <br />
                                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                                        {website}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Hours */}
                        {hours && (
                            <div className="flex items-start gap-4 text-lg">
                                <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                                    <FaClock />
                                </span>
                                <div>
                                    <span className="font-bold">Working Hours:</span>
                                    <br />
                                    {Object.entries(hours).map(([day, time], idx) => (
                                        <div key={idx}>
                                            {day}: {time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LocationAndContact;
