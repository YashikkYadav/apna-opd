"use client";
import React from "react";
import { useRouter } from "next/navigation";
const offers = [
  {
    badge: "50% OFF",
    badgeColor: "bg-red-500",
    title: "Complete Thyroid Panel",
    subtitle: "TSH, T3, T4 - Home collection available",
    price: 299,
    oldPrice: 599,
    button: "Book Now",
    buttonColor: "bg-blue-600",
    link: "/more/thyroid",
  },
  {
    badge: "₹199 ONLY",
    badgeColor: "bg-red-500",
    title: "Home Sample Collection",
    subtitle: "Free home visit for blood tests",
    price: 199,
    oldPrice: 399,
    button: "Book Now",
    buttonColor: "bg-blue-600",
    link: "/more/blood_bank",
  },
  {
    badge: "SPECIAL",
    badgeColor: "bg-red-500",
    title: "Cardiologist Consultation",
    subtitle: "Expert heart specialists available",
    price: 299,
    oldPrice: 599,
    button: "Consult Now",
    buttonColor: "bg-blue-600",
    link: "/more/cardiologist",
  },
];

const FlashOffers = () => {
  const router = useRouter();
  return (
    <section className="w-full flex justify-center py-8 px-2 md:px-0">
      <div className="w-full max-w-7xl rounded-2xl bg-gradient-to-br from-[#fff3c7] to-[#ffe89e] p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <span role="img" aria-label="fire" className="text-2xl md:text-3xl">🔥</span>
          Flash Offers - Health Deals of the Day
        </h2>
        <div className="flex flex-col gap-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-6 shadow-md gap-4 md:gap-0"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 flex-1">
                <span className={`inline-block ${offer.badgeColor} text-white font-bold text-xs px-4 py-2 rounded-lg mb-2 md:mb-0 w-fit`}>{offer.badge}</span>
                <div>
                  <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">{offer.title}</div>
                  <div className="text-gray-500 text-base mb-2">{offer.subtitle}</div>
                  <div className="text-lg font-bold text-gray-900">
                    ₹{offer.price} <span className="text-gray-400 font-medium line-through text-base ml-1">₹{offer.oldPrice}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => router.push(offer.link)} className={`${offer.buttonColor} text-white font-semibold text-base px-8 py-3 rounded-full transition-all duration-200 hover:bg-blue-700 whitespace-nowrap mt-2 md:mt-0`}>{offer.button}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashOffers; 