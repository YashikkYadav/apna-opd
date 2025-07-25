"use client";
import { motion } from "framer-motion";

const services = [
    {
        name: "Pet Vaccination",
        description: "Complete vaccination schedule for dogs, cats, and other pets",
        
    },
    {
        name: "Deworming",
        description: "Regular deworming treatments for optimal pet health",
    },
    {
        name: "Animal Surgery",
        description: "Minor and major surgical procedures with modern equipment",
    },
    {
        name: "Emergency Treatment",
        description: "24/7 emergency care for critical situations",
    },
    {
        name: "Health Checkups",
        description: "Comprehensive health examinations and diagnostics",
    },
    {
        name: "Nutrition Advice",
        description: "Personalized diet plans for your pet's specific needs",
    },
];

const Tag = ({ label }) => (
    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
        {label}
    </span>
);

const ServiceCard = ({ name, description, icon, tags }) => (
    <motion.div
        whileHover={{ scale: 1.04, boxShadow: "0 0 0 3px rgba(37,99,235,0.3)" }}
        className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] text-center border-l-4 border-blue-500 hover:border-blue-600 transition-all"
    >
        <div className="text-4xl mb-4">{icon}</div>
        <h4 className="text-xl font-bold text-blue-700">{name}</h4>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {tags.map((tag, idx) => (
                <Tag key={idx} label={tag} />
            ))}
        </div>
    </motion.div>
);

export default function AvailableServices({data,healthProfile}) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-10 text-left">
                Available Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {healthProfile?.services?.map((s, idx) => (
                    <ServiceCard key={idx} {...s} />
                ))}
            </div>
        </motion.section>
    );
}

