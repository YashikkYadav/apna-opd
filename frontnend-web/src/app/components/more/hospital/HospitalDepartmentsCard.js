"use client"
import React from "react";
import { FaUserMd, FaHeartbeat, FaTooth, FaEye, FaBrain, FaBone } from "react-icons/fa";
import { motion } from "framer-motion";



const getIconComponent = (iconName) => {
  switch (iconName) {
    case "heart":
      return <FaHeartbeat className="text-white text-3xl" />;
    case "user":
      return <FaUserMd className="text-white text-3xl" />;
    case "tooth":
      return <FaTooth className="text-white text-3xl" />;
    case "eye":
      return <FaEye className="text-white text-3xl" />;
    case "brain":
      return <FaBrain className="text-white text-3xl" />;
    case "bone":
      return <FaBone className="text-white text-3xl" />;
    default:
      return <FaUserMd className="text-white text-3xl" />;
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const HospitalDepartmentsCard = ({ hospitalData }) => {
  const departments = hospitalData?.departmentsList || [];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-blue-700">Departments</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {departments.map((dept, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 0 2px #3B82F6, 0 0 16px #3B82F6",
              }}
              className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center py-10 px-4 min-h-[220px] transition-all duration-200 cursor-pointer outline-none"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 mb-6">
                {getIconComponent(dept.icon)}
              </div>
              <div className="text-xl font-bold text-gray-800 mb-2 text-center">{dept.title}</div>
              <div className="text-gray-600 text-base text-center">{dept.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HospitalDepartmentsCard; 