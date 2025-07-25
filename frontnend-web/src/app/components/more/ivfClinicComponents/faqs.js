'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineQuestionMark } from 'react-icons/md';

const FAQSection = ({ data,healthProfile }) => {
    

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
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold text-blue-700 mb-10">
                <MdOutlineQuestionMark className="text-blue-600 text-4xl" />
                Frequently Asked Questions
            </h2>

            <div className="max-w-4xl mx-auto space-y-4">
                {healthProfile?.faqs?.map((faq, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-blue-100 bg-blue-50 transition-all duration-300 hover:border-blue-500 hover:shadow-md"
                    >
                        <button
                            className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left text-gray-800 focus:outline-none rounded-xl"
                            onClick={() => toggle(index)}
                        >
                            {faq.question}
                            <span className="text-2xl text-blue-600">{openIndex === index ? '−' : '+'}</span>
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    key="answer"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-4 text-gray-700"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default FAQSection;
