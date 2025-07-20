'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineQuestionMark } from 'react-icons/md';

const FAQSection = ({ data }) => {
    const faqs = [
        {
            question: `What is the success rate of IVF at ${data?.name}?`,
            answer: `Our IVF success rates vary by age group, but we maintain consistently high success rates of ${6}% across all age categories. We provide detailed success rate breakdowns during your consultation to set realistic expectations.`,
        },
        {
            question: 'Is IVF painful or risky?',
            answer: 'IVF is generally well-tolerated with minimal discomfort. Our experienced team uses the latest techniques to minimize any discomfort. We provide comprehensive pre-treatment counseling to address all your concerns about the procedure.',
        },
        {
            question: 'What’s the ideal age to start fertility treatment?',
            answer: 'While fertility naturally declines with age, we successfully treat patients across all age groups. Early intervention generally leads to better outcomes, but it’s never too late to explore your options with our fertility specialists.',
        },
        {
            question: 'Do you offer EMI or financial counseling?',
            answer: 'Yes, we offer flexible payment options including EMI facilities and financial counseling to make fertility treatments more accessible. Our team will work with you to find a payment plan that suits your budget.',
        },
        {
            question: 'Can I consult online first?',
            answer: 'Absolutely! We offer online consultations through Apna OPD platform. This allows you to discuss your concerns with our specialists from the comfort of your home before deciding on an in-person visit.',
        },
    ];

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
                {faqs.map((faq, index) => (
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
