'use client';

import { motion } from 'framer-motion';
import { Calendar, Package } from 'lucide-react';

const TherapyPackages = ({ data }) => {
    const packages = data?.packages?.slice(0, 3) || [];

    return (
        <motion.div
            id="therapyPackagesSection"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <Package className="text-3xl text-blue-700" />
                    Therapy Packages for <span className="text-blue-500">{data?.name ?? 'Doctor'}</span>
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg, idx) => (
                    <motion.div
                        key={pkg?.name || idx}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 3px rgba(59,130,246,0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 flex flex-col justify-between border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-bold text-blue-800 uppercase">{pkg?.name}</h3>
                                {pkg?.discount && (
                                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {pkg?.discount}
                                    </span>
                                )}
                            </div>

                            <div className="grid gap-2 mb-3">
                                {pkg?.details?.map((d, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-700">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <span className="font-semibold">{d.value}</span>
                                        <span className="text-xs text-gray-500">{d.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="text-2xl font-bold text-blue-500 mb-2">
                                {pkg?.price}
                                {pkg?.oldPrice && (
                                    <span className="ml-2 text-base text-gray-400 line-through font-normal">
                                        {pkg?.oldPrice}
                                    </span>
                                )}
                            </div>

                            <ul className="list-disc pl-5 mb-4 text-gray-700 text-sm">
                                {pkg?.benefits?.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-3">
                            <button className="bg-green-100 text-green-700 font-semibold rounded-full px-4 py-2 text-sm">
                                ₹ Consultation Fee
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-5 py-2 text-sm">
                                Book Now
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 font-semibold rounded-full px-5 py-2 text-sm bg-white hover:bg-blue-50">
                                View Profile
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* View All CTA */}
            {data?.packages?.length > 3 && (
                <div className="flex justify-center mt-10">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-3 text-lg shadow-md">
                        View All Packages
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default TherapyPackages;
