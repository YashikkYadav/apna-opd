'use client';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, MapPin } from 'lucide-react';

const AvailableMedicines = ({ filteredMedicines = [], addToCart }) => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMedicines?.map((medicine) => (
                    <motion.div
                        key={medicine.id}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 0 3px rgba(37,99,235,0.2)' }}
                        className="relative bg-[#F7F9FB] border border-blue-200 rounded-2xl p-6 shadow-sm transition-all flex flex-col justify-between min-h-[420px]"
                    >
                        {/* Discount Badge */}
                        {medicine.discount > 0 && (
                            <span className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full z-10">
                                {medicine.discount}% OFF
                            </span>
                        )}

                        {/* Medicine Name */}
                        <h3 className="text-lg font-bold text-blue-900 uppercase mb-2 tracking-wide">
                            {medicine.name}
                        </h3>

                        {/* Info Row */}
                        <div className="flex items-center gap-4 text-blue-700 text-sm font-medium mb-2">
                            <Clock className="w-4 h-4" />
                            <span>60 mins</span>
                            <span className="mx-2">|</span>
                            <MapPin className="w-4 h-4" />
                            <span>{medicine.category}</span>
                            <span className="mx-2">|</span>
                            <span>{medicine.packSize}</span>
                        </div>

                        {/* Price Display */}
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-blue-700">₹{medicine.price}</span>
                            <span className="text-gray-400 line-through font-semibold">₹{medicine.mrp}</span>
                        </div>

                        {/* Feature List */}
                        <ul className="mb-4 text-gray-700 text-sm list-disc pl-5">
                            <li>Salt: {medicine.salt}</li>
                            <li>Manufacturer: {medicine.manufacturer}</li>
                            <li>{medicine.inStock ? 'In Stock' : 'Out of Stock'}</li>
                        </ul>

                        {/* Buttons */}
                        <div className="flex flex-col gap-2 mt-auto">
                            <button className="bg-green-100 text-green-800 font-semibold rounded-full py-2">
                                ₹ Consultation Fee
                            </button>
                            <button
                                onClick={() => addToCart(medicine)}
                                disabled={!medicine.inStock}
                                className="bg-blue-600 text-white font-bold rounded-full py-2 hover:bg-blue-700 transition disabled:bg-gray-300 disabled:text-gray-500"
                            >
                                Book Appointment
                            </button>
                            <button className="border-2 border-blue-600 text-blue-700 font-bold rounded-full py-2 hover:bg-blue-50 transition">
                                View Profile
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default AvailableMedicines;
