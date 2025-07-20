'use client';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaLaptopMedical, FaRupeeSign } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const ClinicInfoSection = ({
    healthProfile,profileData
}) => {
    const {
        clinic_name,
        full_address,
        city,
        pincode,
        phone_number,
        fee,
    } = profileData || {}
    const infoItems = [
        {
            icon: <FaMapMarkerAlt className="text-blue-600 text-xl" />,
            label: "Address:",
            value: `${healthProfile?.address}`,
        },
        {
            icon: <FaPhoneAlt className="text-blue-600 text-xl" />,
            label: "Phone:",
            value: healthProfile?.phone,
            highlight: true,
        },
        {
            icon: <FaLaptopMedical className="text-blue-600 text-xl" />,
            label: "Consultation Mode:",
            value: "In-Clinic & Video Consult",
        },
        {
            icon: <FaRupeeSign className="text-blue-600 text-xl" />,
            label: "Starting Fee:",
            value: `₹${fee}`,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-3 mb-8">
                <IoLocationSharp /> Clinic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Info Cards */}
                <div className="space-y-4">
                    {infoItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-[#F7F9FB] p-5 rounded-xl border-l-4 border-blue-500 hover:border-blue-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex items-start gap-4"
                        >
                            <div className="mt-1">{item.icon}</div>
                            <div>
                                <p className="font-semibold text-gray-800">{item.label}</p>
                                <p
                                    className={`text-base mt-1 ${item.highlight
                                        ? 'text-blue-700 font-medium'
                                        : 'text-gray-600'
                                        }`}
                                >
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Map Placeholder */}
                <div className="bg-blue-50 p-6 rounded-xl text-sm text-gray-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <p className="font-bold text-lg text-blue-700 mb-2">🗺️ Interactive Map</p>
                    <p className="text-gray-600">Google Maps integration will be embedded here.</p>
                    <p className="mt-2 text-gray-500 font-medium">
                        Location: {healthProfile?.address}
                    </p>
                </div>
            </div>
        </motion.section>
    );
};

export default ClinicInfoSection;
