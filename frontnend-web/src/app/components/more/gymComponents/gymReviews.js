'use client';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: `I lost 15 kg in 4 months at {{gym_name}}! The trainers are incredibly supportive and the facilities are top-notch. Best decision I ever made for my health.`,
        name: '{{testimonial_1_name}}',
        title: 'Software Engineer',
        avatar: '1️⃣',
    },
    {
        quote: `The personal training sessions helped me build muscle and confidence. {{gym_name}} has become my second home. The community here is amazing!`,
        name: '{{testimonial_2_name}}',
        title: 'Marketing Manager',
        avatar: '2️⃣',
    },
    {
        quote: `After years of irregular fitness routines, {{gym_name}} helped me establish a consistent workout schedule. The results speak for themselves!`,
        name: '{{testimonial_3_name}}',
        title: 'Business Owner',
        avatar: '3️⃣',
    },
];

const SuccessStories = ({healthProfile}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto my-12"
        >
            {/* Heading */}
            <div className="text-left mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
                    Success Stories
                </h2>
                <p className="text-gray-600 text-lg mt-2">
                    Real transformations from our amazing members
                </p>
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {healthProfile?.testimonials.map((t, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 text-center hover:border-2 hover:border-blue-500 transition-all"
                    >
                        <p className="text-gray-700 italic text-base mb-6">
                            "{t.text}"
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            
                            <div className="text-left">
                                <p className="text-blue-700 font-bold text-sm">- {t.author}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default SuccessStories;

