"use client";
import { motion } from "framer-motion";
import { FaUserMd, FaGraduationCap, FaStar, FaCalendarAlt, FaLanguage } from "react-icons/fa";

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
        available: [
          { label: "Mon-Fri: 9AM-1PM" },
          { label: "Sat: 9AM-12PM" },
        ],
        fee: 800,
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
        available: [
          { label: "Tue-Thu: 2PM-6PM" },
          { label: "Sat: 10AM-2PM" },
        ],
        fee: 1000,
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
        available: [
          { label: "Mon, Wed, Fri: 10AM-1PM" },
        ],
        fee: 900,
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
        available: [
          { label: "Tue, Thu: 11AM-2PM" },
        ],
        fee: 950,
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
        available: [
          { label: "Mon-Fri: 2PM-5PM" },
        ],
        fee: 950,
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
        available: [
          { label: "Mon, Wed: 10AM-1PM" },
        ],
        fee: 1000,
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
        available: [
          { label: "Mon-Sat: 11AM-2PM" },
        ],
        fee: 700,
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
        available: [
          { label: "Tue, Thu: 9AM-12PM" },
        ],
        fee: 750,
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
        available: [
          { label: "Mon-Fri: 10AM-1PM" },
        ],
        fee: 850,
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
        available: [
          { label: "Wed, Fri: 2PM-5PM" },
        ],
        fee: 900,
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
        available: [
          { label: "Tue, Thu: 3PM-6PM" },
        ],
        fee: 1200,
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
        available: [
          { label: "Mon, Fri: 11AM-2PM" },
        ],
        fee: 1250,
      },
    ],
  },
];

function DoctorCard({ doctor }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px #7B6EF6" }}
      className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 min-w-[320px] max-w-[420px] mx-auto"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6A8DFF] to-[#9B6EF6] flex items-center justify-center text-2xl font-bold text-white">
          {doctor.initials}
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900">{doctor.name}</div>
          <div className="text-[#6A8DFF] font-semibold text-base cursor-pointer hover:underline">{doctor.title}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-gray-700 text-base items-center">
        <span className="flex items-center gap-1"><FaGraduationCap /> {doctor.qualification}</span>
        <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {doctor.rating}/5 ({doctor.reviews} reviews)</span>
      </div>
      <div className="flex flex-wrap gap-4 text-gray-700 text-base items-center">
        <span className="flex items-center gap-1"><FaCalendarAlt /> {doctor.experience} Years Experience</span>
        <span className="flex items-center gap-1"><FaLanguage /> {doctor.languages.join(", ")}</span>
      </div>
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="font-semibold mb-2">Available:</div>
        <div className="flex flex-wrap gap-2">
          {doctor.available.map((slot, idx) => (
            <span key={idx} className="bg-[#6A8DFF] text-white px-4 py-1 rounded-full text-sm font-semibold">
              {slot.label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch mt-2 w-full">
        <span className="bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-full flex items-center justify-center w-full sm:w-auto text-sm">
          ₹{doctor.fee} Consultation Fee
        </span>
        <button className="bg-[#7B6EF6] text-white font-bold px-4 py-2 rounded-full hover:bg-[#6A8DFF] transition w-full sm:w-auto text-base">
          Book Appointment
        </button>
        <button className="border-2 border-[#7B6EF6] text-[#7B6EF6] font-bold px-4 py-2 rounded-full hover:bg-[#F7F9FB] transition w-full sm:w-auto text-base">
          View Profile
        </button>
      </div>
    </motion.div>
  );
}

export default function HospitalDoctorsCard() {
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#7B6EF6]">Our Doctors</h2>
      </div>
      {/* Departments */}
      {departments.map((dept) => (
        <div key={dept.name} className="mb-10">
          {/* Department Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{dept.emoji}</span>
            <span className="font-bold text-lg text-[#7B6EF6]">{dept.name} Department</span>
          </div>
          <div className="bg-gradient-to-r from-[#6A8DFF] to-[#9B6EF6] rounded-xl p-4 mb-6">
            <span className="text-white font-semibold text-base">{dept.emoji} {dept.name} Department</span>
            <div className="text-white text-base font-medium mt-1">{dept.desc}</div>
          </div>
          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dept.doctors.map((doctor) => (
              <DoctorCard key={doctor.name} doctor={doctor} />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
} 