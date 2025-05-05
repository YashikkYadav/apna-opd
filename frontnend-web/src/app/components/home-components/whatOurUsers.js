"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    text: "Booking a gynecologist on Apna OPD was super quick and easy. The consultation was smooth, and I felt truly heard. I'll definitely use it again.",
    name: "Ritika Sharma",
    location: "Delhi",
    role: "",
    image: "/images/doctorpng.png"
  },
  {
    text: "I needed advice for my father's joint pain but didn't know where to start. Apna OPD connected me with a specialist in minutes. We had a proper video consultation, and he finally got relief after weeks of discomfort.",
    name: "Sandeep Rao",
    location: "Hyderabad",
    role: "",
    image: "/images/doctorpng2.png"
  },
  {
    text: "I work long hours and can't always take time off. Apna OPD let me consult a general physician during my lunch break—no waiting rooms, no stress. Just real help when I needed it most.",
    name: "Amit Khurana",
    location: "Delhi",
    role: "",
    image: "/images/doctorpng.png"
  },
  {
    text: "After days of struggling with skin issues, I found a dermatologist on Apna OPD. She not only treated me but explained everything so clearly. It felt more personal than any clinic I've visited before.",
    name: "Neha Joshi",
    location: "Indore",
    role: "",
    image: "/images/doctorpng2.png"
  },
  {
    text: "My mother was feeling unwell late at night, and we didn't want to rush to the hospital unnecessarily. Through Apna OPD, I booked a video consult with a doctor who reassured us and guided the right steps. That peace of mind meant everything.",
    name: "Rahul Verma",
    location: "Jaipur",
    role: "",
    image: "/images/doctorpng.png"
  }
];

const WhatOurUsers = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="relative overflow-hidden" style={{ height: '600px' }}>
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          width: `${testimonials.length * 100}%`,
          transform: `translateX(-${current * (100 / testimonials.length)}%)`,
        }}
      >
        {testimonials.map((data, idx) => (
          <div key={idx} className="flex flex-col md:flex-row w-full flex-shrink-0" style={{ width: `${100 / testimonials.length}%` }}>
            <div className="md:w-[40%] bg-[#EBEBEB]">
              <Image src={data.image} width={400} height={400} alt="Doctor Image" className="w-full h-full max-h-[600px]" />
            </div>
            <div className="md:w-[60%] bg-[#094B89] py-[64px] px-[15px] lg:px-[30px] xl:px-[40px]">
              <div className="flex mb-[48px] gap-[10px]">
                <h2 className="title-48 !text-white max-w-[400px] xl:mr-[230px]">What Our Users Have to Say</h2>
                <Image src="/images/comma.svg" width={85} height={53} alt="Comma Image" />
              </div>
              <h4 className="title-32 text-white !font-medium mb-[16px]">{data.text}</h4>
              <div>
                <h6 className="text-base font-bold mb-[8px] text-white">{data.name}{data.role && `, ${data.role}`}</h6>
                <p className="text-sm text-white">{data.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatOurUsers;