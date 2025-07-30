'use client';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, MapPin } from 'lucide-react';

const AvailableMedicines = ({ medicines, addToCart, healthProfile }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Section Title */}
            <div className=" mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <ShoppingCart className="w-8 h-8 text-blue-600" />

                    Available Medicines
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicines?.map((medicine, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 0 3px rgba(37,99,235,0.2)' }}
                        className="bg-[#F7F9FB] border border-blue-200 rounded-2xl p-6 shadow-sm transition-all"
                    >
                        <h3 className="text-xl font-bold text-blue-900 mb-2">{medicine.name}</h3>
                        <p className="text-blue-700 mb-1 font-medium">Dosage: <span className="font-normal">{medicine.dosage}</span></p>
                        <p className="text-blue-700 font-medium">Price: <span className="text-blue-800 font-bold">₹{medicine.price}</span></p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default AvailableMedicines;
