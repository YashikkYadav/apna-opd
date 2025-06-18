"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

export default function HospitalLocationCard({ hospitalData }) {
  const { address = {}, contact = {}, location = {} } = hospitalData || {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map */}
        <div className="bg-[#F7F9FB] rounded-2xl p-4 min-h-[400px]">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9012415990155!2d${location.longitude || 0}!3d${location.latitude || 0}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          />
        </div>
        {/* Contact Info */}
        <div className="bg-[#F7F9FB] rounded-2xl p-8 flex flex-col gap-8 min-h-[320px] md:min-h-[400px] justify-center">
          <div>
            <div className="font-bold text-2xl mb-4">Contact Information</div>
            <div className="flex items-start gap-4 mb-4 text-lg">
              <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl"><FaMapMarkerAlt /></span>
              <div>
                <span className="font-bold">Address:</span><br />
                {address.street || ''}<br />
                {address.city || ''} - {address.pincode || ''}, {address.state || ''}, {address.country || ''}
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4 text-lg">
              <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl"><FaPhoneAlt /></span>
              <div>
                <span className="font-bold">Phone:</span><br />
                {contact.phone || ''}<br />
                Emergency: {contact.emergency || ''}
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4 text-lg">
              <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl"><FaEnvelope /></span>
              <div>
                <span className="font-bold">Email:</span><br />
                {contact.email || ''}<br />
                {contact.appointmentEmail || ''}
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4 text-lg">
              <span className="bg-blue-100 text-blue-700 rounded-full p-3 text-2xl"><FaGlobe /></span>
              <div>
                <span className="font-bold">Website:</span><br />
                {contact.website || ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 