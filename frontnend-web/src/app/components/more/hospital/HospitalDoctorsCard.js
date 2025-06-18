"use client";
import { motion } from "framer-motion";
import { FaUserMd, FaGraduationCap, FaStar, FaCalendarAlt, FaLanguage, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

function DoctorCard({ doctor }) {     
  const router = useRouter();

  const handleBookAppointment = () => {
    router.push(`/book-appointment?doctor=${encodeURIComponent(doctor.name)}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px blue" }}
      className="bg-white rounded-2xl shadow px-4 py-4 flex flex-col gap-4 max-w-[420px] min-w-[320px] h-full"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full rounded-full object-cover border-2 border-blue-700"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
            {doctor.initials}
          </div>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900">Dr. {doctor.name}</div>
          <div className="text-blue-600 font-semibold text-base cursor-pointer hover:underline">{doctor.title}</div>
        </div>
      </div>
      <div className="text-gray-700 text-base">
        <span className="flex items-center gap-1"><FaGraduationCap /> {doctor.qualification}</span>
        <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {doctor.rating}/5 ({doctor.reviews} reviews)</span>
      </div>
      <div className="text-gray-700 text-base">
        <span className="flex items-center gap-1"><FaCalendarAlt /> {doctor.experience} Years Experience</span>
        <span className="flex items-center gap-1"><FaLanguage /> {doctor.languages.join(", ")}</span>
      </div>
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="font-semibold mb-2">Available:</div>
        <div className="flex flex-wrap gap-2">
          {doctor.available.map((slot, idx) => (
            <span key={idx} className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {slot.label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch mt-auto">
        <span className="bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-full flex items-center justify-center w-full sm:w-auto text-sm">
          ₹{doctor.fee} Consultation Fee
        </span>
        <button onClick={() => {router.push("/find-doctor")}} className="bg-blue-700 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-600 transition w-full sm:w-auto text-xs">
          Book Appointment
        </button>
        <button onClick={() => {router.push("/find-doctor")}} className="border-2 border-blue-700 text-blue-700 font-bold px-4 py-2 rounded-full hover:bg-blue-100 transition w-full sm:w-auto text-xs">
          View Profile
        </button>
      </div>
    </motion.div>
  );
}

function DepartmentSection({ dept }) {

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10">
      {/* Department Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{dept.emoji}</span>
        <span className="font-bold text-lg text-blue-600">{dept.name} Department</span>
      </div>
      <div className="bg-blue-700 rounded-xl p-4 mb-6">
        <span className="text-white font-semibold text-base">{dept.emoji} {dept.name} Department</span>
        <div className="text-white text-base font-medium mt-1">{dept.desc}</div>
      </div>

      {/* Doctors Scroll Container */}  
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <FaChevronLeft size={20} />
          </button>
        )}

        {/* Doctors Scroll Area */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dept.doctors.map((doctor) => (
            <div key={doctor.name} className="pl-9 snap-start flex-none w-[calc(50%-1rem)]">
              <DoctorCard doctor={doctor} />  
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <FaChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function HospitalDoctorsCard({ hospitalData }) { 
  const departments = hospitalData?.ourDoctors || [];

  const [showAll, setShowAll] = useState(false);
  const visibleDepartments = showAll ? departments : departments.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">👨‍⚕️</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Our Doctors</h2>
      </div>

      {/* Departments */}
      {visibleDepartments.map((dept) => (
        <DepartmentSection key={dept.name} dept={dept} /> 
      ))}

      {/* Show More Button */}
      {departments.length > 3 && ( 
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center rounded-full justify-center gap-2 py-4 text-blue-700 font-semibold hover:text-blue-800 hover:border-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{showAll ? "Show Less" : "Show More Departments"}</span>
          <FaChevronDown className={`transform transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
        </motion.button>
      )}
    </motion.div>
  );
} 
