"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

const images = [
  // 6 unique hospital equipment images from Unsplash
  "/images/heroCarousel/heroCarou1.png",
  "/images/heroCarousel/heroCarou2.png",
  "/images/heroCarousel/heroCarou3.png",
  "/images/heroCarousel/heroCarou4.png",
  "/images/heroCarousel/heroCarou5.png",
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
    zIndex: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
};

const swipeConfidenceThreshold = 80;
const AUTOPLAY_DURATION = 4000; // 4 seconds

const HeroCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      Promise.all(imagePromises)
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Error preloading images:", error);
          setIsLoading(false); // Continue even if some images fail to load
        });
    };

    preloadImages();
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isLoading) {
      timeoutRef.current = setTimeout(() => {
        setPage(([p]) => [p + 1, 1]);
      }, AUTOPLAY_DURATION);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [page, isLoading]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > swipeConfidenceThreshold) {
      paginate(-1);
    } else if (dx < -swipeConfidenceThreshold) {
      paginate(1);
    }
    touchStartX.current = null;
  };

  const paginate = (newDirection) => {
    setPage(([p]) => [p + newDirection, newDirection]);
  };

  return (
    <section className="w-full flex justify-center items-center bg-white">
      <div className="relative w-full mt-2 mx-4 md:mx-2 h-[220px] md:h-[420px] flex items-center overflow-hidden rounded-2xl shadow-lg">
        {/* Left Arrow */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-100 rounded-full p-2 shadow transition hidden md:block"
          onClick={() => paginate(-1)}
          aria-label="Previous"
        >
          <FaChevronLeft className="text-2xl text-blue-600" />
        </button>
        {/* Carousel Slide */}
        <div
          className="w-full h-full flex items-center justify-center select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={imageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 400, damping: 40, duration: 0.5 }}
              className="w-full h-full relative"
            >
              <Image
                src={images[imageIndex]}
                alt="carousel"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover rounded-2xl shadow-lg"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Right Arrow */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-100 rounded-full p-2 shadow transition hidden md:block"
          onClick={() => paginate(1)}
          aria-label="Next"
        >
          <FaChevronRight className="text-2xl text-blue-600" />
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === imageIndex ? "bg-blue-600" : "bg-blue-200"}`}
              onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel; 