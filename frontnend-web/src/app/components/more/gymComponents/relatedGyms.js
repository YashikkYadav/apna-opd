'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaBolt } from 'react-icons/fa';

const RelatedGyms = ({
    city = '{{city}}',
    gyms = [
        {
            name: '{{related_gym_1_name}}',
            emoji: '🏋️',
            location: '{{related_gym_1_location}}',
            price: '{{related_gym_1_price}}',
        },
        {
            name: '{{related_gym_2_name}}',
            emoji: '💪',
            location: '{{related_gym_2_location}}',
            price: '{{related_gym_2_price}}',
        },
        {
            name: '{{related_gym_3_name}}',
            emoji: '🧘',
            location: '{{related_gym_3_location}}',
            price: '{{related_gym_3_price}}',
        },
    ],
}) => {
    const router = useRouter();

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Heading */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <span className="text-yellow-400 text-3xl"><FaBolt /></span>
                    Other Gyms in {city}
                </h2>
            </div>

            <p className="text-lg text-gray-600 mb-10">
                Explore more fitness options around you
            </p>

            {/* Gym Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {gyms.map((gym, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.04, boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.3)" }}
                        className="flex flex-col items-center justify-between bg-blue-600 rounded-2xl p-8 text-white shadow-md transition-all"
                    >
                        <div className="flex flex-col items-center gap-2 w-full">
                            <span className="text-4xl mb-2">{gym.emoji}</span>
                            <h3 className="text-xl font-extrabold mb-1 text-center">{gym.name}</h3>
                            <p className="text-base font-medium text-white/90 text-center mb-6">
                                {gym.location} • ₹{gym.price}/month
                            </p>
                        </div>
                        <button
                            onClick={() => router.push(`/gyms/${index}`)}
                            className="mt-auto rounded-full px-6 py-3 text-lg font-bold hover:border-white hover:text-white bg-white text-blue-700 shadow transition w-full max-w-[200px]"
                        >
                            View Details
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default RelatedGyms;
