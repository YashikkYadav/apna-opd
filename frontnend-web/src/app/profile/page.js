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
import HospitalOverviewCard from "../components/more/hospital/HospitalOverviewCard";
import DoctorFeatureCard from "../components/profile-com/DoctorFeatureCard";
import DoctorOverviewCar from "../components/profile-com/DoctorOverviewCar";
import DoctorTestimonialsCard from "../components/profile-com/DoctorTestimonialsCard";



const ProfilePage = () => {
    const doctorDetail = {
            name: "Max Super Speciality Hospital",
            type: "Multi-Specialty Tertiary Care Hospital",
            rating: 4,
            reviews: 2847,
            image: "/images/max.png",
            phone: "+911140555555",
            yearsOfService: "35",
            bedCapacity: "500+",
            icuBeds: "50+",
            emergencyServices: "24/7",
            doctors: "100+",
            departments: "15+",
            
            About:[
              "Max Super Speciality Hospital is a leading healthcare institution providing world-class medical care with state-of-the-art facilities and cutting-edge technology. Established in 1985, we have been serving the community for over 35 years. ",
            ],
            KeyStats:[
              "500+ Beds",
              "15+ Specialties",
              "24/7 Emergency Services",
              "100+ Doctors",
              "50+ ICU Beds"
            ],
            accreditations: [
              "JCI International Standards",
              "ISO 9001:2015 Certified",
              "Green OT Certified",
              "NABL Certified Lab"
            ],
            awards: [
              "Best Multi-Specialty Hospital 2024",
              "Excellence in Patient Care",
              "Top Cardiac Care Center",
              "Digital Health Innovation Award"
            ],
            features: [
              { 
                icon: <MdEmergency className="text-pink-400 text-2xl" />,  
                staticText: "24/7 Emergency",
                dynamicValue: null
              },
              { 
                icon: <FaBed className="text-pink-300 text-2xl" />, 
                staticText: "Beds",
                dynamicValue: "500+"
              },
              { 
                icon: <BsShieldCheck className="text-green-400 text-2xl" />, 
                staticText: "NABH Accredited",
                dynamicValue: null
              },
              { 
                icon: <FaUserMd className="text-blue-600 text-2xl" />, 
                staticText: "Specialists",
                dynamicValue: "50+"
              },
              { 
                icon: <RiBankCardLine className="text-blue-600 text-2xl" />, 
                staticText: "Insurance Accepted",
                dynamicValue: null
              },
            ],
            // address:
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
                dynamicValue: "Max Hospital",
                list: [
                  "Max Hospital is a leading healthcare institution providing world-class medical care with state-of-the-art facilities and cutting-edge technology. Established in 1985, we have been serving the community for over 35 years.",
                ],
              },
              {
                title: "Key Statistics",
                staticPrefix: "",
                dynamicValue: "",
                list: [
                  "500+ Bed Capacity",
                  "50+ ICU Beds",
                  "24/7 Emergency Services",
                  "100+ Doctors",
                  "15+ Departments"
                ],
              },
              {
                title: "Accreditations",
                staticPrefix: "",
                dynamicValue: "",
                list: [
                      "JCI International Standards",
                      "ISO 9001:2015 Certified",
                      "Green OT Certified",
                      "NABL Certified Lab"
                    ],
              },
              {
                title: "Awards & Recognition",
                staticPrefix: "",
                dynamicValue: "",
                list: [
                      "Best Multi-Specialty Hospital 2024",
                      "Excellence in Patient Care",
                      "Top Cardiac Care Center",
                      "Digital Health Innovation Award"
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
        faqs:[
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
    };

  return (
    <div className="pt-[80px]">
      <DoctorFeatureCard  doctorDetail={doctorDetail}/>
      <HospitalOverviewCard doctorDetail={doctorDetail}/>
      <DoctorOverviewCar doctorDetail={doctorDetail}/>
      <ImageGallery doctorDetail={doctorDetail}/>
      <HospitalLocationCard doctorDetail={doctorDetail}/>
      <DoctorTestimonialsCard  doctorDetail={doctorDetail}/>
      <Faqs doctorDetail={doctorDetail}/>
    </div>
  );
};

export default ProfilePage;
