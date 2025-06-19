"use client";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

export default function HospitalLocationCard({ profileData }) {
  const {
    name,
    address,
    locality,
    city,
    state,
    pincode,
    phone,
    emergencyPhone,
    email,
    website,
    visitingHours,
  } = profileData || {};

  const fullAddress = [address, locality, city, state, pincode]
    .filter(Boolean)
    .join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-16 max-w-7xl mx-auto mt-12 mb-8"
    >
      <div className="flex items-center gap-4 mb-12">
        <span className="text-4xl text-pink-500">
          <FaMapMarkerAlt />
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700">
          Location & Contact
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-2xl flex items-center p-8 min-h-[320px] md:min-h-[250px]">
          <span className="text-2xl flex items-center gap-3 text-gray-700">
            <span className="text-3xl">🗺️</span>
            <span className="font-semibold">Interactive Map View</span>
            <span className="font-medium text-gray-500 ml-2 text-lg">
              {name || "Hospital Location"}
            </span>
          </span>
        </div>

        <div className="bg-[#F7F9FB] rounded-2xl p-8 flex flex-col gap-8 min-h-[320px] md:min-h-[400px] justify-center">
          <div>
            <div className="font-bold text-2xl mb-4">Contact Information</div>

            {fullAddress && (
              <div className="flex items-start gap-4 mb-4 text-lg">
                <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <span className="font-bold">Address:</span>
                  <br />
                  {fullAddress}
                </div>
              </div>
            )}

            {phone && (
              <div className="flex items-start gap-4 mb-4 text-lg">
                <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                  <FaPhoneAlt />
                </span>
                <div>
                  <span className="font-bold">Phone:</span>
                  <br />
                  {phone}
                  {emergencyPhone && (
                    <>
                      <br />
                      Emergency: {emergencyPhone}
                    </>
                  )}
                </div>
              </div>
            )}

            {email && (
              <div className="flex items-start gap-4 mb-4 text-lg">
                <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                  <FaEnvelope />
                </span>
                <div>
                  <span className="font-bold">Email:</span>
                  <br />
                  {Array.isArray(email)
                    ? email.map((e, i) => <div key={i}>{e}</div>)
                    : email}
                </div>
              </div>
            )}

            {website && (
              <div className="flex items-start gap-4 mb-4 text-lg">
                <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                  <FaGlobe />
                </span>
                <div>
                  <span className="font-bold">Website:</span>
                  <br />
                  {website}
                </div>
              </div>
            )}

            {visitingHours && (
              <div className="flex items-start gap-4 text-lg">
                <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl">
                  <FaClock />
                </span>
                <div>
                  <span className="font-bold">Visiting Hours:</span>
                  <br />
                  {Object.entries(visitingHours).map(([key, val], i) => (
                    <div key={i}>
                      {key}: {val}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}