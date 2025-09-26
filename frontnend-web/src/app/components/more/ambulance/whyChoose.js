"use client";
import { motion } from "framer-motion";
import { FaAmbulance, FaUserMd, FaRegClock, FaHeadset } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { GiFirstAidKit } from "react-icons/gi";

const WhyChooseUs = () => {
  const featuresData = [
    {
      icon: <FaAmbulance className="text-blue-600 text-4xl" />,
      title: "Fast Response",
      description:
        "Quick ambulance dispatch with real-time tracking to reach you on time.",
    },
    {
      icon: <GiFirstAidKit className="text-blue-600 text-4xl" />,
      title: "Fully Equipped",
      description:
        "Advanced life support equipment and emergency medical kits in every vehicle.",
    },
    {
      icon: <FaUserMd className="text-blue-600 text-4xl" />,
      title: "Trained Medical Staff",
      description:
        "Certified paramedics and doctors onboard to provide critical care during transit.",
    },
    {
      icon: <MdMedicalServices className="text-blue-600 text-4xl" />,
      title: "Critical Care Support",
      description:
        "Specialized ambulances for cardiac, neonatal, and trauma emergencies.",
    },
    {
      icon: <FaHeadset className="text-blue-600 text-4xl" />,
      title: "24/7 Helpline",
      description:
        "Dedicated emergency helpline to book ambulances anytime, anywhere.",
    },
    {
      icon: <FaRegClock className="text-blue-600 text-4xl" />,
      title: "Round-the-Clock Service",
      description:
        "Available day and night to handle all kinds of medical emergencies.",
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
        Why Choose <span className="text-blue-500">Apna OPD Ambulance?</span>
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
