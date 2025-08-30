"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion"; 
import { useRouter } from "next/navigation";  
const packages = [
  {
    badge: "POPULAR",
    title: "Full Body Checkup",
    subtitle: "Complete health screening with 50+ tests",
    price: 1999,
    oldPrice: 3999,
    link: "/more/full_body_checkup",
  },
  {
    badge: "WOMEN",
    title: "Women's Wellness",
    subtitle: "Comprehensive women's health package",
    price: 2499,
    oldPrice: 4999,
    link: "/more/women_wellness",
  },
  {
    badge: "HEART",
    title: "Heart Health Panel",
    subtitle: "Complete cardiac risk assessment",
    price: 1799,
    oldPrice: 3599,
    link: "/more/heart_health_panel",
  },
  {
    badge: "SENIOR",
    title: "Senior Citizen Plans",
    subtitle: "Tailored health checkup for seniors",
    price: 2999,
    oldPrice: 5999,
    link: "/more/senior_citizen_plans",
  },
];

const stats = [
  { value: 85000, label: "Monthly Visitors" },
  { value: 500, label: "Verified Doctors" },
  { value: 100, label: "Partner Hospitals" },
  { value: 35, label: "Cities Covered" },
  { value: 20, label: "Diagnostic Labs" },
  { value: "ISO", label: "Certified & HIPAA Compliant" },
];

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

function useCountUp(to, duration = 1.2) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (typeof to !== "number") return;
    let start = 0;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.floor(progress * (to - start) + start);
      setCount(val);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(to);
    }
    setCount(0);
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [to]);
  return count;
}

const HealthPackagesAndStats = () => {
  // Count up for each stat except ISO
  const counts = [
    useCountUp(85000),
    useCountUp(500),
    useCountUp(100),
    useCountUp(35),
    useCountUp(20),
  ];
  const router = useRouter();
  return (
    <section className="w-full bg-[#fafbfc] py-8 px-4 md:px-3">
      <div className="max-w-7xl mx-auto">
        {/* Health Packages */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Health Packages</h2>
            <a href="/more/health_packages" className="text-blue-600 font-semibold hover:underline text-base">View All &rarr;</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {packages.map((pkg, idx) => (
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
              className="bg-white rounded-2xl shadow-md flex flex-col items-start justify-between py-8 px-6 min-h-[210px] transition-all duration-200 cursor-pointer outline-none"
            >
              <span className="inline-block bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-lg mb-2 w-fit">{pkg.badge}</span>
              <div className="text-xl font-bold text-gray-800 mb-1">{pkg.title}</div>
              <div className="text-gray-600 text-base mb-2">{pkg.subtitle}</div>
              <div className="text-lg font-bold text-gray-900 mb-4">
                ₹{pkg.price} <span className="text-gray-400 font-medium line-through text-base ml-1">₹{pkg.oldPrice}</span>
              </div>
              <button onClick={() => router.push(pkg.link)} className="bg-blue-600 text-white font-semibold text-base px-8 py-3 rounded-full transition-all duration-200 hover:bg-blue-700 whitespace-nowrap mt-auto">
                Book Package
              </button>
            </motion.div>
          ))}
        </div>
        {/* Stats Bar */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-[#2740c6] to-[#2563eb] py-12 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-6">
          <div className="flex flex-wrap w-full justify-between items-center gap-y-8">
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <span className="text-4xl md:text-5xl font-extrabold text-blue-200">{counts[0]}+</span>
              <span className="text-white text-lg mt-2 text-center">Monthly Visitors</span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <span className="text-4xl md:text-5xl font-extrabold text-blue-200">{counts[1]}+</span>
              <span className="text-white text-lg mt-2 text-center">Verified Doctors</span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <span className="text-4xl md:text-5xl font-extrabold text-blue-200">{counts[2]}+</span>
              <span className="text-white text-lg mt-2 text-center">Partner Hospitals</span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <span className="text-4xl md:text-5xl font-extrabold text-blue-200">{counts[3]}+</span>
              <span className="text-white text-lg mt-2 text-center">Cities Covered</span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <span className="text-4xl md:text-5xl font-extrabold text-blue-200">{counts[4]}+</span>
              <span className="text-white text-lg mt-2 text-center">Diagnostic Labs</span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <span className="text-4xl md:text-5xl font-extrabold text-blue-200">ISO</span>
              <span className="text-white text-lg mt-2 text-center">Certified & HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthPackagesAndStats; 