'use client';
import { motion } from 'framer-motion';
import { FaHospitalAlt } from 'react-icons/fa';

const PharmacyAbout = ({
    data,
    healthProfile
}) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring" }}
        className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
      >
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3 ">
            <FaHospitalAlt className="text-3xl text-blue-700" />
            About {data?.name}
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-lg font-medium mb-8 max-w-4xl">
          {healthProfile?.about}
        </p>

        {/* Services & Partnerships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Services */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[160px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-3">Services</h3>
            <ul className="text-base text-gray-800 space-y-2 font-medium">
              {Array.isArray(healthProfile?.servicesOffered) &&
                healthProfile.servicesOffered.map((service) => (
                  <li
                    key={
                      service?._id || service?.name || JSON.stringify(service)
                    }
                  >
                    • {typeof service === "object" ? service?.name : service}
                  </li>
                ))}
            </ul>
          </motion.div>

          {/* Partnerships */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[160px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-3">
              Partnerships
            </h3>
            <ul className="text-base text-gray-800 space-y-2 font-medium">
              {Array.isArray(healthProfile?.partnerships) &&
                healthProfile.partnerships.map((partner) => (
                  <li key={partner?._id || partner?.name}>
                    • {partner?.name || JSON.stringify(partner)}
                  </li>
                ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    );
};

export default PharmacyAbout;
