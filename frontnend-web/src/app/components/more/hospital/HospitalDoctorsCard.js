/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaGraduationCap,
  FaStar,
  FaCalendarAlt,
  FaLanguage,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const departments = [
  {
    name: "Cardiology",
    emoji: "❤️",
    desc: "Expert cardiologists providing comprehensive heart care",
    doctors: [
      {
        initials: "DS",
        name: "Dr. Rajesh Sharma",
        title: "Senior Cardiologist",
        qualification: "MD, DM Cardiology",
        rating: 4.9,
        reviews: 234,
        experience: 15,
        languages: ["Hindi", "English"],
        available: [{ label: "Mon-Fri: 9AM-1PM" }, { label: "Sat: 9AM-12PM" }],
        fee: 800,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        initials: "PM",
        name: "Dr. Priya Mehta",
        title: "Interventional Cardiologist",
        qualification: "MD, DM, Fellowship",
        rating: 4.8,
        reviews: 189,
        experience: 12,
        languages: ["Hindi", "English", "Gujarati"],
        available: [{ label: "Tue-Thu: 2PM-6PM" }, { label: "Sat: 10AM-2PM" }],
        fee: 1000,
        image:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      },
      {
        initials: "AK",
        name: "Dr. Arun Kumar",
        title: "Pediatric Cardiologist",
        qualification: "MD, DM, Fellowship in Pediatric Cardiology",
        rating: 4.7,
        reviews: 156,
        experience: 10,
        languages: ["Hindi", "English", "Punjabi"],
        available: [
          { label: "Mon, Wed, Fri: 11AM-3PM" },
          { label: "Sat: 9AM-1PM" },
        ],
        fee: 1200,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        initials: "SG",
        name: "Dr. Sneha Gupta",
        title: "Cardiac Electrophysiologist",
        qualification: "MD, DM, Fellowship in Cardiac Electrophysiology",
        rating: 4.9,
        reviews: 142,
        experience: 8,
        languages: ["Hindi", "English", "Marathi"],
        available: [{ label: "Tue, Thu: 9AM-1PM" }, { label: "Sat: 2PM-5PM" }],
        fee: 1500,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    name: "Orthopedics",
    emoji: "🦴",
    desc: "Bone and joint care with robotic surgery",
    doctors: [
      {
        initials: "AK",
        name: "Dr. Amit Kumar",
        title: "Orthopedic Surgeon",
        qualification: "MS, DNB Orthopedics",
        rating: 4.7,
        reviews: 150,
        experience: 10,
        languages: ["English", "Hindi"],
        available: [{ label: "Mon, Wed, Fri: 10AM-1PM" }],
        fee: 900,
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
      },
      {
        initials: "SG",
        name: "Dr. Sneha Gupta",
        title: "Consultant Orthopedic Surgeon",
        qualification: "MS Orthopedics",
        rating: 4.6,
        reviews: 120,
        experience: 8,
        languages: ["English", "Hindi"],
        available: [{ label: "Tue, Thu: 11AM-2PM" }],
        fee: 950,
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop",
      },
      {
        initials: "RK",
        name: "Dr. Rahul Khanna",
        title: "Sports Medicine Specialist",
        qualification: "MS Orthopedics, Fellowship in Sports Medicine",
        rating: 4.8,
        reviews: 98,
        experience: 7,
        languages: ["English", "Hindi", "Punjabi"],
        available: [{ label: "Mon-Fri: 2PM-5PM" }, { label: "Sat: 10AM-1PM" }],
        fee: 1100,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        initials: "PS",
        name: "Dr. Priya Singh",
        title: "Joint Replacement Specialist",
        qualification: "MS Orthopedics, Fellowship in Joint Replacement",
        rating: 4.9,
        reviews: 112,
        experience: 9,
        languages: ["English", "Hindi", "Gujarati"],
        available: [{ label: "Tue, Thu: 9AM-12PM" }, { label: "Sat: 2PM-5PM" }],
        fee: 1300,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    name: "Neurology",
    emoji: "🧠",
    desc: "Brain and spine treatment by experts",
    doctors: [
      {
        initials: "SK",
        name: "Dr. Sunita Kapoor",
        title: "Consultant Neurologist",
        qualification: "MD, DM Neurology",
        rating: 4.8,
        reviews: 120,
        experience: 11,
        languages: ["English", "Hindi"],
        available: [{ label: "Mon-Fri: 2PM-5PM" }],
        fee: 950,
        image:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      },
      {
        initials: "AM",
        name: "Dr. Anil Mehra",
        title: "Senior Neurologist",
        qualification: "MD, DM Neurology",
        rating: 4.7,
        reviews: 105,
        experience: 13,
        languages: ["English", "Hindi"],
        available: [{ label: "Mon, Wed: 10AM-1PM" }],
        fee: 1000,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        initials: "RK",
        name: "Dr. Ravi Kumar",
        title: "Epilepsy Specialist",
        qualification: "MD, DM Neurology, Fellowship in Epilepsy",
        rating: 4.9,
        reviews: 88,
        experience: 9,
        languages: ["English", "Hindi", "Tamil"],
        available: [
          { label: "Tue, Thu: 11AM-2PM" },
          { label: "Sat: 9AM-12PM" },
        ],
        fee: 1200,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        initials: "NS",
        name: "Dr. Neha Sharma",
        title: "Movement Disorder Specialist",
        qualification: "MD, DM Neurology, Fellowship in Movement Disorders",
        rating: 4.8,
        reviews: 76,
        experience: 7,
        languages: ["English", "Hindi", "Marathi"],
        available: [{ label: "Mon, Wed: 2PM-5PM" }, { label: "Fri: 10AM-1PM" }],
        fee: 1100,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    name: "Pediatrics",
    emoji: "👶",
    desc: "Comprehensive child healthcare",
    doctors: [
      {
        initials: "RS",
        name: "Dr. Ritu Singh",
        title: "Pediatrician",
        qualification: "MD Pediatrics",
        rating: 4.9,
        reviews: 98,
        experience: 9,
        languages: ["English", "Hindi"],
        available: [{ label: "Mon-Sat: 11AM-2PM" }],
        fee: 700,
        image:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      },
      {
        initials: "VK",
        name: "Dr. Varun Khanna",
        title: "Consultant Pediatrician",
        qualification: "MD Pediatrics",
        rating: 4.8,
        reviews: 85,
        experience: 7,
        languages: ["English", "Hindi"],
        available: [{ label: "Tue, Thu: 9AM-12PM" }],
        fee: 750,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        initials: "AP",
        name: "Dr. Anjali Patel",
        title: "Pediatric Neurologist",
        qualification: "MD Pediatrics, Fellowship in Pediatric Neurology",
        rating: 4.9,
        reviews: 92,
        experience: 8,
        languages: ["English", "Hindi", "Gujarati"],
        available: [{ label: "Mon, Wed: 2PM-5PM" }, { label: "Sat: 10AM-1PM" }],
        fee: 1000,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        initials: "MK",
        name: "Dr. Mohit Kumar",
        title: "Pediatric Cardiologist",
        qualification: "MD Pediatrics, Fellowship in Pediatric Cardiology",
        rating: 4.8,
        reviews: 78,
        experience: 6,
        languages: ["English", "Hindi", "Punjabi"],
        available: [
          { label: "Tue, Thu: 11AM-2PM" },
          { label: "Fri: 9AM-12PM" },
        ],
        fee: 1200,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    name: "Gynecology",
    emoji: "👩‍⚕️",
    desc: "Women's health and maternity care",
    doctors: [
      {
        initials: "AP",
        name: "Dr. Anjali Patel",
        title: "Gynecologist",
        qualification: "MD, DGO",
        rating: 4.8,
        reviews: 110,
        experience: 13,
        languages: ["English", "Hindi"],
        available: [{ label: "Mon-Fri: 10AM-1PM" }],
        fee: 850,
        image:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      },
      {
        initials: "NS",
        name: "Dr. Neha Sinha",
        title: "Consultant Gynecologist",
        qualification: "MD, DGO",
        rating: 4.7,
        reviews: 95,
        experience: 10,
        languages: ["English", "Hindi"],
        available: [{ label: "Wed, Fri: 2PM-5PM" }],
        fee: 900,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        initials: "SK",
        name: "Dr. Shweta Kapoor",
        title: "Infertility Specialist",
        qualification: "MD, DGO, Fellowship in Reproductive Medicine",
        rating: 4.9,
        reviews: 86,
        experience: 8,
        languages: ["English", "Hindi", "Punjabi"],
        available: [{ label: "Mon, Wed: 2PM-5PM" }, { label: "Sat: 10AM-1PM" }],
        fee: 1500,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        initials: "RK",
        name: "Dr. Ritu Khanna",
        title: "High-Risk Pregnancy Specialist",
        qualification: "MD, DGO, Fellowship in Maternal-Fetal Medicine",
        rating: 4.8,
        reviews: 92,
        experience: 9,
        languages: ["English", "Hindi", "Gujarati"],
        available: [{ label: "Tue, Thu: 9AM-12PM" }, { label: "Fri: 2PM-5PM" }],
        fee: 1300,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    name: "Oncology",
    emoji: "🧪",
    desc: "Cancer treatment and care",
    doctors: [
      {
        initials: "VK",
        name: "Dr. Vikram Khanna",
        title: "Oncologist",
        qualification: "MD, DM Oncology",
        rating: 4.7,
        reviews: 90,
        experience: 8,
        languages: ["English", "Hindi"],
        available: [{ label: "Tue, Thu: 3PM-6PM" }],
        fee: 1200,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        initials: "SM",
        name: "Dr. Shalini Mehra",
        title: "Consultant Oncologist",
        qualification: "MD, DM Oncology",
        rating: 4.8,
        reviews: 80,
        experience: 9,
        languages: ["English", "Hindi"],
        available: [{ label: "Mon, Fri: 11AM-2PM" }],
        fee: 1250,
        image:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      },
      {
        initials: "AK",
        name: "Dr. Arun Kumar",
        title: "Radiation Oncologist",
        qualification: "MD, DM Radiation Oncology",
        rating: 4.9,
        reviews: 75,
        experience: 7,
        languages: ["English", "Hindi", "Tamil"],
        available: [{ label: "Mon, Wed: 2PM-5PM" }, { label: "Sat: 10AM-1PM" }],
        fee: 1400,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        initials: "PS",
        name: "Dr. Priya Sharma",
        title: "Pediatric Oncologist",
        qualification: "MD, DM Pediatric Oncology",
        rating: 4.8,
        reviews: 68,
        experience: 6,
        languages: ["English", "Hindi", "Marathi"],
        available: [
          { label: "Tue, Thu: 11AM-2PM" },
          { label: "Fri: 9AM-12PM" },
        ],
        fee: 1500,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
  },
];

function formatDoctorSlots(locations = []) {
  const dayMap = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun"
  };

  const result = [];

  for (const loc of locations) {
    const days = loc.days.map(day => dayMap[day] || day);
    const label = `${days.join(", ")}: ${loc.from.replace(/^0/, "")}-${loc.to.replace(/^0/, "")}`;
    result.push({ label });
  }

  return result;
}

function getDoctorProfileImage(images = []) {
  const profile = images.find((img) => img.type === "profilePhoto");
  return profile?.url || "/default-doctor?.png";
}

function getDoctorInitials(name = "") {
  return name
    .split(" ")
    .map(word => word[0]?.toUpperCase())
    .join("");
}

function DoctorCard({ doctor }) {
  const router = useRouter();

  const [doctorDetails, setDoctorDetails] = useState({})

  useEffect(() => {
    setDoctorDetails(doctor?.doctorId)

  }, [doctor])

  const handleBookAppointment = () => {
    router.push(
      `/book-appointment?doctor=${encodeURIComponent(doctorDetails?.name)}`
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px blue" }}
      className="bg-white rounded-2xl shadow px-4 py-4 flex flex-col gap-4 max-w-[420px] min-w-[320px] h-full"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <img
            src={doctor?.doctorProfile.images ? getDoctorProfileImage(doctor?.doctorProfile?.images) : ""}
            alt={doctor?.name}
            className="w-full h-full rounded-full object-cover border-2 border-blue-700"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
            {getDoctorInitials(doctor?.name)}
          </div>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900">{doctor?.name}</div>
          <div className="text-blue-600 font-semibold text-base cursor-pointer hover:underline">
            {doctor?.speciality}
          </div>
        </div>
      </div>
      <div className="text-gray-700 text-base">
        <span className="flex items-center gap-1">
          {/* <FaGraduationCap /> {doctor?.qualification} */}
        </span>
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-400" /> {doctor?.doctorProfile.rating}/5 (
          {doctor?.ratingCount} reviews)
        </span>
      </div>
      <div className="text-gray-700 text-base">
        <span className="flex items-center gap-1">
          <FaCalendarAlt /> {doctor?.doctorProfile.experience} Years Experience
        </span>
        <span className="flex items-center gap-1">
          {/* <FaLanguage /> {doctor?.languages?.join(", ")} */}
        </span>
      </div>
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="font-semibold mb-2">Available:</div>
        <div className="flex flex-wrap gap-2">
          {formatDoctorSlots(doctor?.doctorProfile.locations).map((slot, idx) => (
            <span
              key={idx}
              className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold"
            >
              {slot.label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch mt-auto">
        <span className="bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-full flex items-center justify-center w-full sm:w-auto text-sm">
          ₹{doctor?.doctorProfile.appointmentFee} Consultation Fee
        </span>
        <button
          onClick={() => {
            router.push(`/${doctor?._id}/profile`);
          }}
          className="bg-blue-700 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-600 transition w-full sm:w-auto text-xs"
        >
          Book Appointment
        </button>
        <button
          onClick={() => {
            router.push(`/${doctor?._id}/profile`);
          }}
          className="border-2 border-blue-700 text-blue-700 font-bold px-4 py-2 rounded-full hover:bg-blue-100 transition w-full sm:w-auto text-xs"
        >
          View Profile
        </button>
      </div>
    </motion.div>
  );
}

function DepartmentSection({ dept }) {
  const dep = dept.doctorId
  console.log("dept", dept)
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-10">
      {/* Department Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{dept.emoji}</span>
        <span className="font-bold text-lg text-blue-600">
          {dep.speciality} Department
        </span>
      </div>
      <div className="bg-blue-700 rounded-xl p-4 mb-6">
        <span className="text-white font-semibold text-base">
          {dep.speciality} Department
        </span>
        <div className="text-white text-base font-medium mt-1">{dept.desc}</div>
      </div>

      {/* Doctors Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
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
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          
            <div
              
              className="pl-9 snap-start flex-none w-[calc(60%-1rem)]"
            >
              <DoctorCard doctor={dept} />
            </div>
          
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <FaChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

// function getDepartmentWiseDoctors(doctors) {
//   const map = {};

//   // for (const doc of doctors) {
//   //   if (!doc.doctorProfile) continue;
//   //   const dept = doc.speciality;
//   //   if (!map[dept]) map[dept] = [];
//   //   map[dept].push(doc);
//   // }

//   return Object.entries(map)?.map(([name, doctors]) => {
//     const meta = departments.find((d) => d.name === name) || {};
//     return {
//       name,
//       emoji: meta.emoji || "🏥",
//       desc: meta.desc || "Department",
//       doctors,
//     };
//   });
// }

export default function HospitalDoctorsCard({ profileData, doctorData }) {
  const [showAll, setShowAll] = useState(false);
  //const visibleDepartments = showAll ? departments : departments.slice(0, 3);
  // const departments = getDepartmentWiseDoctors(doctorData);
  console.log('doc', doctorData)
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Our Doctors
        </h2>
      </div>

      {doctorData?.map((dept) => (
        <DepartmentSection key={dept?.doctorId?._id} dept={dept} />
      ))}

      {/* Show More Button */}
      {doctorData?.length > 3 && (
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center rounded-full justify-center gap-2 py-4 text-blue-700 font-semibold hover:text-blue-800 hover:border-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{showAll ? "Show Less" : "Show More Departments"}</span>
          <FaChevronDown
            className={`transform transition-transform duration-300 ${
              showAll ? "rotate-180" : ""
            }`}
          />
        </motion.button>
      )}
    </motion.div>
  );
}