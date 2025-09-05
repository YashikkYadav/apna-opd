"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; 
import { useRouter } from "next/navigation";
const hospitals = [
  { name: "Fortis", logo: "/images/hospitals/fortis.png" },
  { name: "Narayana", logo: "/images/hospitals/narayana.png" },
  { name: "Manipal", logo: "/images/hospitals/manipal.png" },
  { name: "MGM", logo: "/images/hospitals/mahatma_gandhi.png" },
  { name: "EHCC", logo: "/images/hospitals/ehcc.png" },
  { name: "Apollo", logo: "/images/hospitals/apollo.png" },
  { name: "Max", logo: "/images/hospitals/max.png" },
  { name: "Medanta", logo: "/images/hospitals/medanta.png" },
];

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const placeholderLogo = (
  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg">
    <span className="text-gray-400 text-2xl font-bold">🏥</span>
  </div>
);

const PartnerHospitalsWithLogos = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-[#fafbfc] py-8 px-4 md:px-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">Partner Hospitals</h2>
              <a onClick={() => router.push("/more/hospital")} className="text-blue-600 font-semibold hover:underline text-base">View All &rarr;</a>
        </div>
        <div className="flex gap-6 overflow-x-auto py-5 hide-scrollbar">
          {hospitals.map((h, idx) => (
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
              className="min-w-[150px] md:mx-2 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center px-8 py-6 text-lg font-semibold text-gray-700 transition-all duration-200 cursor-pointer outline-none"
            >
              {h.logo ? (
                <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-lg overflow-hidden bg-white border border-gray-100">
                  <Image src={h.logo} alt={h.name + ' logo'} width={64} height={64} className="object-contain" />
                </div>
              ) : (
                <div className="mb-3">{placeholderLogo}</div>
              )}
              <span className="mt-1 text-gray-700 text-lg font-medium">{h.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default PartnerHospitalsWithLogos; 