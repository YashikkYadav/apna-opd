"use client";
import { motion } from "framer-motion";

const benefits = [
  {
    emoji: "🏋️‍♂️",
    title: "Physical Health Benefits",
    points: [
      "Improved flexibility, strength, and posture",
      "Better immunity and cardiovascular health",
      "Effective weight management",
      "Relief from chronic pain and muscle tension",
    ],
  },
  {
    emoji: "🧠",
    title: "Mental Health Benefits",
    points: [
      "Significant stress reduction and anxiety management",
      "Enhanced focus and mental clarity",
      "Better sleep quality and emotional balance",
      "Increased self-awareness and confidence",
    ],
  },
  {
    emoji: "🌟",
    title: "Holistic Wellness",
    points: [
      "Balanced lifestyle and healthy habits",
      "Stronger mind-body connection",
      "Community support and lasting friendships",
      "Sustainable approach to long-term health",
    ],
  },
];

export default function BenefitsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="max-w-7xl mx-auto px-6 md:px-12 mt-12 mb-8 shadow-xl py-10 rounded-3xl"
    >
      {/* Title */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Transform Your Life - Benefits of Joining
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-2 rounded"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04 }}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{benefit.emoji}</span>
              <h3 className="text-xl font-bold text-blue-700">
                {benefit.title}
              </h3>
            </div>
            <ul className="list-disc px-3 text-gray-700 space-y-2">
              {benefit.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
