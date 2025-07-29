'use client';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';



const NearbyBloodBanks = ({data,healthProfile}) => {
    

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className=" mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                <FaMapMarkerAlt className="text-3xl text-blue-700" />
                
                    Nearby Blood Banks in <span className="text-blue-600">{data?.locality ??"Dummy City"}</span>
                </h2>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {healthProfile?.nearbyBloodBanks?.map((bank, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[160px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                    >
                        <p className="text-lg font-bold text-blue-700 mb-1">{bank.name}</p>
                        <p className="text-gray-600 mb-1">{bank.distance} away</p>
                        <p className="text-yellow-500 font-semibold flex items-center gap-1">
                            <FaStar /> {bank.rating}/5
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default NearbyBloodBanks;
