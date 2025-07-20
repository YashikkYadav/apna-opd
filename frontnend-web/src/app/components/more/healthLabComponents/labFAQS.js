'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineQuestionMark } from 'react-icons/md';

const FAQSection = ({ faqs = [] }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-blue-700 rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                    <MdOutlineQuestionMark className="text-4xl text-white" />
                    Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white border-2 rounded-2xl shadow-sm px-6 py-4 transition-all duration-200 cursor-pointer ${openIndex === index
                                ? 'border-blue-500'
                                : 'border-blue-400 hover:border-blue-500'
                                }`}
                        >
                            <button
                                className="w-full flex justify-between items-center text-blue-800 font-semibold text-lg focus:outline-none"
                                onClick={() => toggle(index)}
                            >
                                <span>{faq.q}</span>
                                <span className="ml-2 text-blue-600 text-xl transition-transform transform group-hover:rotate-180">
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 text-gray-700 text-base leading-relaxed"
                                    >
                                        {faq.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default FAQSection;
