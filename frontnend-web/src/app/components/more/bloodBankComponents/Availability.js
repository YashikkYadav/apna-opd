'use client';
import { motion } from 'framer-motion';
import { FaTint } from 'react-icons/fa';

const STATUS = {
    available: "bg-green-50 border-green-500 text-green-600",
    limited: "bg-yellow-50 border-yellow-400 text-yellow-600",
    out: "bg-red-50 border-red-500 text-red-600",
};

const BloodCard = ({ label, status, highlight }) => {
    const color = STATUS[status];
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl border-b-4 p-4 min-h-[100px] text-center w-[60px] sm:w-[140px] md:w-[120px] font-semibold shadow-sm transition-all duration-300 ${color}`}
        >
            <div className="text-lg text-black">{label}</div>
            <div className="text-sm mt-1">{highlight}</div>
        </motion.div>
    );
};
const ComponentsCard = ({ label, status, highlight }) => {
    const color = STATUS[status];
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl border-b-4 p-4 min-h-[100px] text-center w-[60px] sm:w-[140px] md:w-[16vw] font-semibold shadow-sm transition-all duration-300 ${color}`}
        >
            <div className="text-lg text-black">{label}</div>
            <div className="text-sm mt-1">{highlight}</div>
        </motion.div>
    );
};

const Availability = ({data,healthProfile}) => {
    const { updatedAt } = healthProfile || {};

    let formattedDate = "";
    let formattedTime = "";

    if (updatedAt) {
      const dateObj = new Date(updatedAt); // Make sure it's a Date object

      formattedDate = `${dateObj.getDate().toString().padStart(2, "0")}/${(
        dateObj.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${dateObj.getFullYear()}`;

      formattedTime = `${dateObj
        .getHours()
        .toString()
        .padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`;
    }


    const bloodTypes = [
        { label: "A+", status: "available", highlight: "Available" },
        { label: "A-", status: "limited", highlight: "Limited" },
        { label: "B+", status: "available", highlight: "Available" },
        { label: "B-", status: "out", highlight: "Out of Stock" },
        { label: "AB+", status: "available", highlight: "Available" },
        { label: "AB-", status: "limited", highlight: "Limited" },
        { label: "O+", status: "available", highlight: "Available" },
        { label: "O-", status: "limited", highlight: "Limited" },
    ];

    const components = [
        { label: "Whole Blood", status: "available", highlight: "Available" },
        { label: "Platelets", status: "available", highlight: "Available" },
        { label: "Plasma", status: "limited", highlight: "Limited" },
        { label: "Red Cells", status: "available", highlight: "Available" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring" }}
        className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
      >
        {/* Title */}
        <div className=" mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C65A0] flex items-center gap-3">
            <FaTint className="text-3xl text-red-600" />
            Blood Types & Components Availability
          </h2>
        </div>

        {/* Blood Types */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center md:justify-around gap-2">
            {bloodTypes.map((item) => (
              <BloodCard key={item.label} {...item} />
            ))}
          </div>
        </div>

        {/* Components */}
        <div>
          <div className="flex flex-wrap justify-center md:justify-around gap-2">
            {components.map((item) => (
              <ComponentsCard key={item.label} {...item} />
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center pt-6 text-sm text-gray-500">
          📅 Last updated on{" "}
          <span className="font-medium">{`${formattedDate} | ${formattedTime}`}</span>
        </div>
      </motion.div>
    );
};

export default Availability;
