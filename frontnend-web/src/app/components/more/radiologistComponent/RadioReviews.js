'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { FaStar,FaRegStar,FaStarHalfAlt } from 'react-icons/fa';

function getStarIcons(avgRating) {
  const stars = [];
  const safeRating = avgRating ?? 0;
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating - fullStars > 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-[#FFD700] text-2xl" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-[#FFD700] text-2xl" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-[#FFD700] text-2xl" />);
  }
  return stars;
}


export default function RadioReviews({ testimonials }) {

  const avgRating = testimonials?.length
    ? (testimonials?.reduce((sum, r) => sum + r?.rating, 0) / testimonials?.length).toFixed(1)
    : '0.0';
  const reviewCount = testimonials?.length || 0;

  const [filter, setFilter] = useState('Recent');

  const reviews = testimonials;

  const filters = ['Recent', 'High Rating', 'Low Rating'];

  const filteredReviews = reviews?.filter(r => {
    if (filter === 'Recent') return true;
    if (filter === 'High Rating') return r.rating >= 4;
    if (filter === 'Low Rating') return r.rating <= 3;
    return true;
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-4 md:mb-0 border-b-2 md:border-b-0 border-blue-400 pb-2 md:pb-0">
          Patient Reviews
        </h2>
        <div className="text-right">
          <span className="text-4xl font-bold text-blue-600">{avgRating}</span>
          <div className="flex items-center gap-1 justify-end">
            {getStarIcons(parseFloat(avgRating))}
            <span className="text-gray-600 text-sm ml-2">{reviewCount} reviews</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters?.map(btn => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${filter === btn
              ? 'bg-blue-500 text-white border-blue-500 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
              }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <AnimatePresence>
        {filteredReviews?.map((r, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="border-b last:border-none pb-4 mb-4"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900">{r?.author}</span>
                <div className="flex items-center">
                  {[...Array(r?.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-orange-400 fill-orange-400" />
                  ))}
                </div>
                {r?.verified && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Verified Patient
                  </span>
                )}
              </div>

            </div>
            <p className="text-gray-700">{r?.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.section>
  );
}
