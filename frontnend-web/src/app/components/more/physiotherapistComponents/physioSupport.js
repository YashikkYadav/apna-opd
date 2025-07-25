'use client';
import { motion } from 'framer-motion';
import { MdSupportAgent } from 'react-icons/md';

const SupportOptions = ({ res_data }) => {

    const supportCards = [
        {
            icon: '💬',
            title: 'Chat on WhatsApp',
            desc: 'Quick responses via chat',
            href: `https://wa.me/91${res_data?.otherData?.phone}`,
            bg: 'bg-gradient-to-br from-blue-100 to-white',
            border: 'border-blue-300',
        },
        {
            icon: '📞',
            title: 'Call Support',
            desc: '9 AM – 8 PM support',
            href: `tel:+91${res_data?.otherData?.phone}`,
            bg: 'bg-gradient-to-br from-pink-100 to-white',
            border: 'border-pink-300',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Header */}
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <MdSupportAgent className="text-4xl text-blue-600" />
                    Need Help or Support?
                </h2>
                <p className="text-lg text-gray-600 mt-2">
                    We're here to assist you—choose your preferred support option.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportCards.map((card, i) => (
                    <motion.a
                        key={i}
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        className={`rounded-2xl p-8 flex flex-col items-center justify-between border-2 ${card.border} ${card.bg} shadow-md hover:shadow-xl transition-all text-center`}
                    >
                        <span className="text-5xl mb-4">{card.icon}</span>
                        <h3 className="text-xl font-bold text-blue-800 mb-1">{card.title}</h3>
                        <p className="text-blue-600 text-base">{card.desc}</p>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
};

export default SupportOptions;
