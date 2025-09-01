"use client";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaHome,
  FaMapPin,
  FaTools,
  FaStethoscope,
  FaHandsHelping
} from "react-icons/fa";



const WhyChooseUs = () => {
  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Verified Physiotherapists",
      description:
        "All physiotherapists are licensed professionals with BPT/MPT degrees and years of clinical experience",
    },
    {
      icon: <FaHome className="text-blue-600 text-4xl" />,
      title: "Home Visit Services",
      description:
        "Convenient physiotherapy sessions at your home with portable equipment and personalized care",
    },
    {
      icon: <FaTools className="text-blue-600 text-4xl" />,
      title: "Advanced Equipment",
      description:
        "State-of-the-art rehabilitation equipment including electrotherapy, ultrasound, and exercise machines",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-4xl" />,
      title: "Specialized Treatments",
      description:
        "Expert care for sports injuries, neurological conditions, orthopedic problems, and post-operative rehabilitation",
    },
    {
      icon: <FaHandsHelping className="text-blue-600 text-4xl" />,
      title: "Holistic Approach",
      description:
        "Comprehensive treatment combining manual therapy, exercise prescription, and lifestyle modifications",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "Proven Recovery",
      description:
        "High success rates with 90%+ patients reporting significant improvement within 4-6 weeks",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:px-8 mx-auto mb-8 mt-12 md:py-12"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold text-left text-blue-700 mb-12"
      >
        Why Choose <span className="text-blue-500">Apna OPD Physiotherapist?</span>
      </motion.h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 transition-all cursor-pointer"
          >
            <div className="bg-blue-100 rounded-full p-5 mb-4 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
