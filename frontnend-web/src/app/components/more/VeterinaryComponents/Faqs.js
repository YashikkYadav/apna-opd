'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineQuestionMark } from 'react-icons/md';

const FAQ = ({ healthProfile,data }) => {
   
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
                        className={`bg-blue-50 rounded-xl border transition-all duration-300 ${openIndex === index ? 'border-blue-500 shadow-md' : 'border-blue-100 hover:border-blue-400'
                            }`}
                    >
                        <button
                            className="w-full flex justify-between items-center px-6 py-5 font-semibold text-left text-blue-800 focus:outline-none"
                            onClick={() => toggle(index)}
                        >
                            <span>{faq.question}</span>
                            <span className="text-xl text-blue-600 font-bold">
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
                                    className="px-6 pb-5 text-gray-700 text-base"
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

export default FAQ;
