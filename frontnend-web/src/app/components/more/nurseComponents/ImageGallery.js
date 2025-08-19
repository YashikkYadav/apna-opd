"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageGallery = ({ NurseData }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const autoplayRef = useRef(null);
  const loadedImagesRef = useRef({});

  // Ensure galleryImages is always an array and memoized
  const galleryImages = useMemo(
    () =>
      Array.isArray(NurseData?.galleryImages) ? NurseData.galleryImages : [],
    [NurseData?.galleryImages]
  );

  const CARD_SIZE = 290; // px
  const SIDE_SCALE = 0.8;
  const SIDE_OPACITY = 0.6;
  const GAP = 32; // px

  // Enhanced preload images with loading status tracking
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = galleryImages.length;

    const preloadImage = (imageUrl) => {
      return new Promise((resolve) => {
        const img = new window.Image();

        img.onload = () => {
          loadedImagesRef.current[imageUrl] = true;
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };

        img.onerror = () => {
          // If image fails to load, still count it as loaded to prevent blocking
          loadedImagesRef.current[imageUrl] = true;
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };

        // Set src after setting up event handlers
        img.src = imageUrl || "";
      });
    };

    const preloadAllImages = async () => {
      try {
        const preloadPromises = galleryImages.map((img) =>
          preloadImage(img.url)
        );
        await Promise.all(preloadPromises);
      } catch (error) {
        // If there's an error, still set images as loaded to prevent blocking
        setImagesLoaded(true);
      }
    };

    preloadAllImages();

    // Cleanup function
    return () => {
      loadedImagesRef.current = {};
    };
  }, [galleryImages]);

  // Autoplay functionality - only start when images are loaded
  useEffect(() => {
    if (isAutoplay && imagesLoaded && galleryImages.length > 0) {
      autoplayRef.current = setInterval(() => {
        setSelectedImage((prev) =>
          prev < galleryImages.length - 1 ? prev + 1 : 0
        );
      }, 3000); // 3 seconds interval
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, imagesLoaded, galleryImages.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  const goToPrev = () => {
    if (galleryImages.length > 0) {
      setSelectedImage((prev) =>
        prev > 0 ? prev - 1 : galleryImages.length - 1
      );
      setIsAutoplay(false); // Pause autoplay on manual navigation
    }
  };

  const goToNext = () => {
    if (galleryImages.length > 0) {
      setSelectedImage((prev) =>
        prev < galleryImages.length - 1 ? prev + 1 : 0
      );
      setIsAutoplay(false); // Pause autoplay on manual navigation
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl text-yellow-400">
          <FaStar />
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Doctor Gallery
        </h2>
      </div>
      {/* Carousel */}
      <div
        className="relative w-full flex flex-col items-center max-w-4xl mx-auto mb-6"
        style={{
          height: `${CARD_SIZE + 80}px`,
          minHeight: `${CARD_SIZE + 80}px`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Carousel */}
        <div
          className="relative flex items-center justify-center w-full"
          style={{
            height: `${CARD_SIZE}px`,
            minHeight: `${CARD_SIZE}px`,
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg text-blue-700 p-3 rounded-full hover:bg-blue-100 transition z-10 focus:outline-none"
            aria-label="Previous image"
            style={{ left: "-40px" }}
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          {/* Cards */}
          <div
            className="relative w-full flex items-center justify-center"
            style={{ height: `${CARD_SIZE}px` }}
          >
            {galleryImages.length > 0 &&
              galleryImages.map((img, idx) => {
                const offset = idx - selectedImage;
                if (Math.abs(offset) > 2) return null; // Only show center and 2 sides

                let scale = 1;
                let opacity = 1;
                let zIndex = 10 - Math.abs(offset);
                let translateX = offset * (CARD_SIZE * 0.7 + GAP);

                if (offset === -2 || offset === 2) {
                  scale = SIDE_SCALE * 0.9;
                  opacity = SIDE_OPACITY * 0.7;
                } else if (offset === -1 || offset === 1) {
                  scale = SIDE_SCALE;
                  opacity = SIDE_OPACITY;
                }

                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "0",
                      width: `${CARD_SIZE}px`,
                      height: `${CARD_SIZE}px`,
                      transform: `
                      translateX(${translateX - CARD_SIZE / 2}px)
                      scale(${scale})
                    `,
                      transition:
                        "transform 0.5s cubic-bezier(.25,.8,.25,1), opacity 0.5s",
                      zIndex,
                      opacity,
                      boxShadow:
                        offset === 0
                          ? "0 8px 32px rgba(0,0,0,0.25)"
                          : "0 2px 8px rgba(0,0,0,0.10)",
                      cursor: offset === 0 ? "default" : "pointer",
                      background: "#fff",
                      borderRadius: "1rem",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setSelectedImage(idx);
                      setIsAutoplay(false);
                    }}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`}
                      alt={"Gallery image"}
                      width={CARD_SIZE}
                      height={CARD_SIZE}
                      className="object-cover"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "1rem",
                      }}
                      priority={offset === 0}
                    />
                  </div>
                );
              })}
          </div>
          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg text-blue-700 p-3 rounded-full hover:bg-blue-100 transition z-10 focus:outline-none"
            aria-label="Next image"
            style={{ right: "-40px" }}
          >
            <FaChevronRight className="text-2xl" />
          </button>
        </div>
        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {galleryImages.length > 0 &&
            galleryImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition ${
                  selectedImage === index ? "bg-blue-700" : "bg-blue-200"
                }`}
                onClick={() => {
                  setSelectedImage(index);
                  setIsAutoplay(false);
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageGallery;
