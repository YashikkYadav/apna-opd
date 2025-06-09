'use client';
import React from "react";
import { FaRegCheckCircle, FaClinicMedical, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const buttonData = [
  {
    icon: <FaRegCheckCircle className="text-2xl" />,
    label: "Book Your First Appointment",
    filled: true,
    glow: true,
  },
  {
    icon: <FaClinicMedical className="text-2xl" />,
    label: "List Your Clinic or Hospital",
    filled: false,
    glow: false,
  },
  {
    icon: <FaHandshake className="text-2xl" />,
    label: "Partner With Us",
    filled: false,
    glow: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const buttonBase =
  "flex items-center justify-center gap-2 rounded-full px-4 py-2 min-h-[44px] w-full md:w-[220px] md:h-[52px] text-sm md:text-base font-medium transition-all duration-200";
const filledBtn =
  "bg-[#22a6f3] md:bg-gradient-to-br md:from-[#22a6f3] md:to-[#38a3d1] hover:bg-[#1b8ed1] text-white shadow-md md:shadow-lg";
const outlinedBtn =
  "border-2 border-white md:border-blue-200 text-white bg-transparent hover:bg-white hover:text-[#22a6f3] md:shadow";

const CTASection = () => {
  const router = useRouter();
  const handleClick = (idx) => {
    if (idx === 0) router.push("/find-doctor");
    else if (idx === 1) router.push("/register");
    else if (idx === 2) router.push("/contact");
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#274060] to-[#38a3d1] py-16 px-2 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-6 text-white drop-shadow-lg"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Ready to Experience Better Healthcare?
        </motion.h2>
        <motion.p
          className="text-center text-blue-100 mb-12 text-lg max-w-2xl mx-auto"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Join thousands of satisfied patients who trust Apna OPD for their healthcare needs
        </motion.p>
        {/* Mobile: triangle layout */}
        <div className="block md:hidden w-full">
          <div className="flex w-full gap-4">
            {buttonData.slice(0, 2).map((btn, idx) => (
              <motion.button
                key={btn.label}
                onClick={() => handleClick(idx)}
                variants={itemVariants}
                whileHover={
                  btn.glow
                    ? {
                        scale: 1.05,
                        color: '#fff',
                        boxShadow: '0 0 16px 4px rgba(255,255,255,0.18)',
                      }
                    : {
                        scale: 1.05,
                        boxShadow: btn.filled
                          ? '0 4px 16px 0 rgba(34,166,243,0.12)'
                          : '0 4px 16px 0 rgba(34,166,243,0.08)',
                      }
                }
                className={
                  buttonBase + ' ' + (btn.filled ? filledBtn : outlinedBtn) + ' w-1/2'
                }
                style={btn.glow ? { position: 'relative', zIndex: 1 } : {}}
              >
                {btn.icon}
                {btn.label}
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={() => handleClick(2)}
            variants={itemVariants}
            whileHover={
              buttonData[2].glow
                ? {
                    scale: 1.05,
                    color: '#fff',
                    boxShadow: '0 0 16px 4px rgba(255,255,255,0.18)',
                  }
                : {
                    scale: 1.05,
                    boxShadow: buttonData[2].filled
                      ? '0 4px 16px 0 rgba(34,166,243,0.12)'
                      : '0 4px 16px 0 rgba(34,166,243,0.08)',
                  }
            }
            className={
              buttonBase + ' ' + (buttonData[2].filled ? filledBtn : outlinedBtn) + ' mt-6 mx-auto w-2/3'
            }
            style={{ maxWidth: '320px' }}
          >
            {buttonData[2].icon}
            {buttonData[2].label}
          </motion.button>
        </div>
        {/* Desktop: 3 columns, equal size, equal gap */}
        <motion.div
          className="hidden md:grid md:grid-cols-3 md:gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {buttonData.map((btn, idx) => (
            <motion.button
              key={btn.label}
              onClick={() => handleClick(idx)}
              variants={itemVariants}
              whileHover={
                btn.glow
                  ? {
                      scale: 1.05,
                      color: '#fff',
                      boxShadow: '0 0 16px 4px rgba(255,255,255,0.18)',
                    }
                  : {
                      scale: 1.05,
                      boxShadow: btn.filled
                        ? '0 4px 16px 0 rgba(34,166,243,0.12)'
                        : '0 4px 16px 0 rgba(34,166,243,0.08)',
                    }
              }
              className={
                buttonBase + ' ' + (btn.filled ? filledBtn : outlinedBtn) + ' mx-auto'
              }
              style={{ width: '100%' }}
            >
              {btn.icon}
              {btn.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 