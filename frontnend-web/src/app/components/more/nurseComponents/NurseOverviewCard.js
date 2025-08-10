"use client";
import { motion } from "framer-motion";
import { FaHospitalAlt } from "react-icons/fa";

export default function NurseOverviewCar({NurseData, userData, specs}) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <FaHospitalAlt className="text-3xl text-blue-700" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          {specs && typeof specs === "string" && specs.length > 0
            ? specs.charAt(0).toUpperCase() + specs.slice(1)
            : "Nurse Overview"}
        </h2>
      </div>
      {/* Grid */}
      <div className="flex flex-wrap gap-12">
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(49, 93, 227)" }}
          className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all w-full"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">
            {`About Nurse ${userData?.name}`}
          </h3>
          <div className="text-gray-700 text-base font-medium">
            <p>{NurseData?.about}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(49, 93, 227)" }}
          className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">
            Service Provided
          </h3>
          <ul className="list-disc pl-5">
            {NurseData?.services.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(49, 93, 227)" }}
          className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">
            Availability & Charges
          </h3>
          <ul className="list-disc pl-5">
            <li>{`Working Hours - ${NurseData?.workingHours}  (${
              NurseData?.workingDays[0]
            } to ${NurseData?.workingDays[NurseData?.workingDays.length - 1]})`}</li>
            <li>{`Shift Flexibility - ${NurseData?.shiftFlexibility}`}</li>
            <li>{`Per Visit Charges - ${NurseData?.perVisitCharges}`}</li>
            <li>{`Booking Type - ${
              NurseData?.bookingType === "Both"
                ? "Home Visit | Hospital Duty"
                : NurseData?.bookingType
            }`}</li>
            <li>{`Area covered - ${NurseData?.areaCovered}`}</li>
          </ul>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(49, 93, 227)" }}
          className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">
            Language Spoken
          </h3>
          <ul className="list-disc pl-5">
            {NurseData?.languages.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
} 