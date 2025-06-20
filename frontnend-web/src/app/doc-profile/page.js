"use client";
import { useParams } from "next/navigation";
import Faqs from "../components/profile-com/faqs";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axios";
import { MdEmergency } from "react-icons/md";
import { FaBed, FaUserMd } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { RiBankCardLine } from "react-icons/ri";
import ImageGallery from "../components/profile-com/DocImageGallery";
import HospitalLocationCard from "../components/more/hospital/HospitalLocationCard";
import DoctorFeatureCard from "../components/profile-com/DoctorFeatureCard";
import DoctorOverviewCar from "../components/profile-com/DoctorOverviewCar";
import DoctorTestimonialsCard from "../components/profile-com/DoctorTestimonialsCard";
import DoctorSpecialistsCard from "../components/profile-com/DoctorSpecialistsCard";

// Consolidated data into a single object
export const doctorDetails = {
  name: "Nurse Pooja Mehra",
  type: "B.Sc. Nursing",
  rating: 4,
  reviews: 2847,
  image: "/images/d2.png",
  phone: "+911140555555",
  yearsOfService: "6",
  feature1:"Gynecologist & Obstetrician",
  feature2:"Manipal Hospital",
  feature3:"Jaipur, India",
  consultationFee:500,
  address: {
    street: "Sector 19, Phase II, Dwarka",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110075",
    country: "India"
  },
  contact: {
    phone: "+91-11-4055-5555",
    emergency: "+91-11-4055-5911",
    email: "info@maxhealthcare.com",
    appointmentEmail: "appointments@maxhealthcare.com",
    website: "www.maxhealthcare.in"
  },
  location: {
    latitude: 28.6139,
    longitude: 77.2090
  },
  overviewData: [
    {
      title: "About",
      staticPrefix: "About ",
      dynamicValue: "Nurse Pooja Mehra",
      list: [
        "Pooja Mehra is a certified critical care nurse with 6+ years of experience in patient monitoring, emergency response, and elderly care. Currently working at Manipal Hospital, Jaipur, she specializes in providing comprehensive nursing care with a focus on patient comfort and recovery. Her expertise includes post-operative care, geriatric nursing, and emergency medical support.",
      ],
    },
    {
      title: "Services Provided",
      staticPrefix: "",
      dynamicValue: "",
      list: [
        "Home Care",
        "Post-operative Care",
        "Geriatric Care",
        "Pediatric Care",
        "Emergency IV/IM Injection",
        "ICU/NICU Experience",
      ],
    },
    {
      title: "Availability & Charges",
      staticPrefix: "",
      dynamicValue: "",
      list: [
        "Working Hours : Mon–Sat (9 AM to 6 PM)",
        "Shift Flexibility - Yes",
        "Per Visit Charge ₹500–₹1000",
        "Booking Type - Home Visit / Hospital Duty",
        "Area Covered - Jaipur & nearby 20 km",
      ],
    },
    {
      title: "Languages Spoken",
      staticPrefix: "",
      dynamicValue: "",
      list: [
        "English",
        "Hindi",
        "Rajasthani",
      ],
    },
  ],
  testimonials: [
    {
      stars: 5,
      title: "Excellent Care",
      text: "Outstanding treatment and care received during my cardiac surgery. The doctors and nursing staff were exceptional.",
      author: "Rajesh Kumar",
      context: "Cardiology Patient",
    },
    {
      stars: 3,
      title: "Professional Staff",
      text: "Very impressed with the cleanliness, technology, and professional approach of all staff members. Highly recommended!",
      author: "Priya Sharma",
      context: "Orthopedics Patient",
    },
    {
      stars: 4,
      title: "Good Facilities",
      text: "Modern facilities and experienced doctors. The only issue was the waiting time, but overall satisfied with the treatment.",
      author: "Amit Gupta",
      context: "General Medicine",
    },
    {
      stars: 5,
      title: "Child-Friendly",
      text: "Excellent pediatric care for my daughter. Dr. Vikram was very patient and caring. The pediatric ward is well-designed.",
      author: "Neha Agarwal",
      context: "Pediatrics Parent",
    },
  ],
  faqs: [
    {
      question: "What are your consultation hours?",
      answer: "Monday to Saturday, 9:00 AM to 5:00 PM"
    },
    {
      question: "Do you provide online consultations?",
      answer: "Yes, we provide online consultations"
    },
    {
      question: "What insurance plans do you accept?",
      answer: "We accept most major insurance plans. Please contact our office for specific details."
    },
    {
      question: "How can I schedule an appointment?",
      answer: "You can schedule an appointment through our website, by calling our office, or by visiting in person."
    },
    {
      question: "What should I bring to my first appointment?",
      answer: "Please bring your ID, insurance card, medical history, and any relevant medical reports or prescriptions."
    }
  ],
  images: [
    {
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=800&fit=crop",
      alt: "Modern Hospital Building"
    },
    {
      url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=800&fit=crop",
      alt: "Emergency Department"
    },
    {
      url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=800&fit=crop",
      alt: "Operation Theater"
    },
    {
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=800&fit=crop",
      alt: "Patient Room"
    },
    {
      url: "https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?w=800&h=800&fit=crop",
      alt: "Medical Laboratory"
    },
    {
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=800&fit=crop",
      alt: "Hospital Reception"
    }
  ],
  specialists : [
    {
      title: "Certifications",
      items:[
        "Nursing Registration - (Verified)RN-JR-2018-001234",
        "BLS Certification - (Verified)Valid until 2025",
      ]
    },
    {
      title: "ID",
      items:[
        "Aadhaar (Verified)"
      ]
    },
  ]
};

const ProfilePage = () => {
  return (
    <div className="pt-[80px]">
      <DoctorFeatureCard doctorData={doctorDetails} />
      <DoctorOverviewCar doctorData={doctorDetails} />
      <DoctorSpecialistsCard doctorData={doctorDetails} />
      <ImageGallery images={doctorDetails.images} />
      <HospitalLocationCard hospitalData={doctorDetails} />
      <DoctorTestimonialsCard testimonials={doctorDetails.testimonials} />
      <Faqs doctorDetails={doctorDetails} />
    </div>
  );
};

export default ProfilePage;
