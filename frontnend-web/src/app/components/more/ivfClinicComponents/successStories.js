'use client';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const SuccessStories = ({ data, doctor_name = "{{doctor_name}}" }) => {
    const testimonials = [
        {
            quote: `After 5 years of trying, we had almost given up hope. Dr. ${data?.name} and the team at ${data?.name} gave us the miracle we had been praying for. Our little angel is now 6 months old!`,
            author: 'Priya & Raj, Age 32–35',
        },
        {
            quote: `The care and compassion we received at ${data?.name} was exceptional. The staff made us feel comfortable throughout our IVF journey. We're now proud parents of twins!`,
            author: 'Sneha & Amit, Age 28–31',
        },
        {
            quote: `Professional, caring, and successful – that’s how I would describe ${data?.name}. They turned our fertility struggles into a beautiful success story. Thank you for making us parents!`,
            author: 'Kavya & Suresh, Age 35–38',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Section Title */}
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <FaHeart className="text-2xl text-blue-700" />
                    Success Stories from {data?.name}
                </h2>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {testimonials.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.2)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 flex flex-col text-center hover:border-2 hover:border-blue-500 transition-all"
                    >
                        <p className="italic text-gray-700 text-base mb-4">"{item.quote}"</p>
                        <p className="font-bold text-blue-700 text-sm">– {item.author}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default SuccessStories;
