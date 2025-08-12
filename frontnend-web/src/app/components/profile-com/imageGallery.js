"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageGallery({ images1 }) {
  const images = images1 || [];
  const [selected, setSelected] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(null);

  const CARD_SIZE = 300;
  const GAP = 32;
  const SIDE_SCALE = 0.85;
  const SIDE_OPACITY = 0.5;

  // Autoplay
  useEffect(() => {
    if (autoplay && images.length > 0) {
      autoplayRef.current = setInterval(() => {
        setSelected((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }, 3000);
    }
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, images.length]);

  const goPrev = () => {
    setSelected((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setAutoplay(false);
  };

  const goNext = () => {
    setSelected((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setAutoplay(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-8 max-w-7xl mx-auto mt-12"
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-left">
        Gallery
      </h2>

      <div
        className="relative flex flex-col items-center"
        style={{ height: `${CARD_SIZE + 80}px` }}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        {/* Left Button */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg text-blue-700 p-3 rounded-full hover:bg-blue-100 transition"
          style={{ left: "-40px" }}
        >
          <FaChevronLeft />
        </button>

        {/* Image Cards */}
        <div className="relative flex justify-center items-center w-full">
          {images.map((src, idx) => {
            const offset = idx - selected;
            if (Math.abs(offset) > 2) return null;

            let scale = 1;
            let opacity = 1;
            let zIndex = 10 - Math.abs(offset);
            let translateX = offset * (CARD_SIZE * 0.7 + GAP);

            if (Math.abs(offset) === 1) {
              scale = SIDE_SCALE;
              opacity = SIDE_OPACITY;
            } else if (Math.abs(offset) === 2) {
              scale = SIDE_SCALE * 0.9;
              opacity = SIDE_OPACITY * 0.7;
            }

            return (
              <motion.div
                key={idx}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  width: `${CARD_SIZE}px`,
                  height: `${CARD_SIZE}px`,
                  transform: `translateX(${translateX - CARD_SIZE / 2}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
                onClick={() => {
                  setSelected(idx);
                  setAutoplay(false);
                }}
              >
                <Image
                  src={src}
                  alt={`Gallery ${idx}`}
                  width={CARD_SIZE}
                  height={CARD_SIZE}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Right Button */}
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg text-blue-700 p-3 rounded-full hover:bg-blue-100 transition"
          style={{ right: "-40px" }}
        >
          <FaChevronRight />
        </button>

        {/* Dots */}
        <div className="flex mt-6 space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelected(idx);
                setAutoplay(false);
              }}
              className={`w-3 h-3 rounded-full transition ${
                selected === idx ? "bg-blue-700" : "bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
