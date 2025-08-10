"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaStar, FaChevronDown } from "react-icons/fa";

const NurseFaqs = ({ NurseData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring" }}
        className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl text-yellow-400">
            <FaStar />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {Array.isArray(NurseData?.faqs) && NurseData.faqs.length > 0 ? (
            NurseData.faqs.map((faq, index) => (
              <motion.div
                key={faq.id || index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-5 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-panel-${index}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg text-gray-800">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-blue-500"
                    >
                      <FaChevronDown />
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-white border-t border-blue-100">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-gray-500 text-lg">No FAQs available.</div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring" }}
        className="bg-white rounded-3xl shadow-xl p-3 md:p-3 max-w-7xl mx-auto mt-1 mb-8"
      >
        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-1 p-12 bg-gradient-to-r from-blue-100 to-white rounded-2xl"
        >
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Need More Information?
          </h3>
          <p className="text-gray-600 mb-4 text-xl">
            If you have any other questions or need further assistance, please
            don&apos;t hesitate to contact us.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-lg px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NurseFaqs;
