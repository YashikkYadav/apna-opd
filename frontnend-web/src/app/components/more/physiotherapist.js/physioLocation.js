'use client';

import { motion } from 'framer-motion';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaMap,
} from 'react-icons/fa';

const LocationAndContact = ({ data }) => {
    const {
        name = 'Unknown Hospital',
        address,
        location,
        phone,
        email,
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
                    <FaMapMarkerAlt className="text-pink-500 text-3xl" />
                    Location & Contact
                </h2>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Map Card */}
                <div className="bg-blue-50 rounded-2xl p-8 min-h-[260px] flex flex-col justify-center space-y-4">
                    <div className="text-4xl">🗺️</div>
                    <div className="text-xl font-bold text-gray-800">Interactive Map View</div>
                    <div className="text-base font-semibold text-gray-600">{name}</div>
                    <div className="text-gray-600">{fullAddress}</div>
                </div>

                {/* Contact Info */}
                <div className="bg-[#F7F9FB] rounded-2xl p-8 flex flex-col gap-6 min-h-[260px] justify-center">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h3>

                        {/* Address */}
                        <div className="flex items-start gap-4 mb-4">
                            <span className="bg-blue-100 p-3 rounded-full text-blue-700 text-xl">
                                <FaMapMarkerAlt />
                            </span>
                            <div>
                                <div className="font-bold text-slate-800">Address:</div>
                                <div className="text-slate-700">{fullAddress || 'N/A'}</div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4 mb-4">
                            <span className="bg-blue-100 p-3 rounded-full text-blue-700 text-xl">
                                <FaPhoneAlt />
                            </span>
                            <div>
                                <div className="font-bold text-slate-800">Phone:</div>
                                <div className="text-slate-700">{phone || 'N/A'}</div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <span className="bg-blue-100 p-3 rounded-full text-blue-700 text-xl">
                                <FaEnvelope />
                            </span>
                            <div>
                                <div className="font-bold text-slate-800">Email:</div>
                                <div className="text-slate-700">{email || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LocationAndContact;
