"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";  
const doctors = [
  {
    name: "Dr. Rajesh Sharma",
    specialty: "Cardiologist",
    hospital: "Fortis Hospital",
    rating: 4.8,
    reviews: 125,
    fee: 500,
    button: "Book Appointment",
    img: "/images/d1.png",
    link: "/more/cardiologist",
  },
  {
    name: "Dr. Priya Gupta",
    specialty: "Gynaecologist",
    hospital: "Narayana Hospital",
    rating: 4.9,
    reviews: 98,
    fee: 600,
    button: "Book Appointment",
    img: "/images/d2.png",
    link: "/more/gynaecologist",
  },
  {
    name: "Dr. Amit Jain",
    specialty: "Orthopedic",
    hospital: "MGM Hospital",
    rating: 4.7,
    reviews: 156,
    fee: 450,
    button: "Book Appointment",
    img: "/images/d3.png",
    link: "/more/orthopedic",
  },
  {
    name: "Dr. Sunita Agarwal",
    specialty: "Dermatologist",
    hospital: "Manipal Hospital",
    rating: 4.8,
    reviews: 89,
    fee: 550,
    button: "Book Appointment",
    img: "/images/d4.png",
    link: "/more/dermatologist",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const TopVerifiedDoctors = () => {    
  const router = useRouter();
  return (
    <section className="w-full bg-[#fafbfc] py-8 px-2 md:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Top Verified Doctors</h2>
          <a href="/more/doctors" className="text-blue-600 font-semibold hover:underline text-base">View All &rarr;</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 0 2px #2563eb, 0 0 16px #2563eb",
              }}
              className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-between py-8 px-6 min-h-[370px] transition-all duration-200 cursor-pointer outline-none"
            >
              <div className="flex items-center justify-center w-24 h-24 mb-6">
                <img src={doc.img} alt={doc.name} className="w-24 h-24 object-cover rounded-full border-4 border-white shadow" />
              </div>
              <div className="text-xl font-bold text-gray-800 mb-1 text-center">{doc.name}</div>
              <div className="text-gray-600 text-base text-center mb-2">
                {doc.specialty}  B7 {doc.hospital}
              </div>
              <div className="flex items-center justify-center gap-1 text-yellow-400 text-base mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`text-sm ${i < Math.round(doc.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-yellow-500 font-semibold ml-1">{doc.rating}</span>
                <span className="text-yellow-500 ml-1">({doc.reviews} reviews)</span>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-4">
                ₹{doc.fee} <span className="font-normal text-base text-gray-500">consultation fee</span>
              </div>
              <button onClick={() => router.push(doc.link)} className="bg-blue-600 text-white font-semibold text-base px-8 py-3 rounded-full transition-all duration-200 hover:bg-blue-700 whitespace-nowrap mt-auto">
                {doc.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVerifiedDoctors; 