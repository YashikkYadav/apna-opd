"use client";
import React, { useState } from "react";
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Droplet,
  CheckCircle,
  Star,
  Award,
  Clock,
  User,
  FileText,
} from "lucide-react";

export default function BloodDonorDetails() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample donor data based on schema
  const donor = {
    name: "Rajesh Kumar",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bloodGroup: "O+",
    about:
      "Dedicated blood donor with 15+ years of experience. Passionate about saving lives through regular blood donation. Available for emergency situations.",
    gender: "Male",
    dob: "1988-05-15",
    address: "123 Gandhi Nagar, Sector 15",
    locality: "Rohini",
    city: "Delhi",
    state: "Delhi",
    pincode: "110085",
    lastDonationDate: "2025-07-15",
    numberOfDonations: "42",
    eligibilityStatus: true,
    weight: "72",
    willingToDonate: true,
    preferredDonationLocation: "Anywhere",
    emergencyAvailability: true,
    idProofType: "Aadhaar",
    idProofNumber: "XXXX-XXXX-8765",
    verifiedDonor: true,
    languagesSpoken: ["English", "Hindi", "Punjabi"],
    medicalConditions: [],
    testimonials: [
      {
        rating: 5,
        title: "Life Saver",
        text: "Rajesh donated blood during my emergency surgery. Forever grateful for his quick response!",
        author: "Priya Sharma",
        context: "Emergency Donation",
      },
      {
        rating: 5,
        title: "Highly Reliable",
        text: "Very professional and caring donor. Always available when needed most.",
        author: "Dr. Amit Verma",
        context: "Hospital Coordinator",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
    ],
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const calculateDaysSinceLastDonation = (lastDate) => {
    const last = new Date(lastDate);
    const today = new Date();
    const diffTime = Math.abs(today - last);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Blood Donor Profile</h1>
          </div>
          <p className="text-red-100">Verified and active blood donor</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={donor.profileImage}
                    alt={donor.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-red-500 mx-auto"
                  />
                  {donor.verifiedDonor && (
                    <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold mt-4 text-gray-800">
                  {donor.name}
                </h2>
                <div className="inline-flex items-center gap-2 mt-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-lg">
                  <Droplet className="w-5 h-5" />
                  {donor.bloodGroup}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <User className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold">
                      {calculateAge(donor.dob)} years
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">
                      {donor.city}, {donor.state}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Request Blood Donation
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-red-500" />
                    <span className="text-gray-600">Total Donations</span>
                  </div>
                  <span className="font-bold text-red-600">
                    {donor.numberOfDonations}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <span className="text-gray-600">Last Donation</span>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {calculateDaysSinceLastDonation(donor.lastDonationDate)}{" "}
                    days ago
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-500" />
                    <span className="text-gray-600">Eligibility</span>
                  </div>
                  <span
                    className={`font-semibold ${
                      donor.eligibilityStatus
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {donor.eligibilityStatus ? "Eligible" : "Not Eligible"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-red-500" />
                    <span className="text-gray-600">Emergency</span>
                  </div>
                  <span
                    className={`font-semibold ${
                      donor.emergencyAvailability
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {donor.emergencyAvailability
                      ? "Available"
                      : "Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-3 text-gray-800">
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {donor.languagesSpoken.map((lang, idx) => (
                  <span
                    key={idx}
                    className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <div className="flex gap-1 p-2">
                  {["overview", "medical", "testimonials", "gallery"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors capitalize ${
                          activeTab === tab
                            ? "bg-red-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        About Donor
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {donor.about}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">
                            Full Address
                          </p>
                          <p className="text-gray-800">{donor.address}</p>
                          <p className="text-gray-800">
                            {donor.locality}, {donor.city}
                          </p>
                          <p className="text-gray-800">
                            {donor.state} - {donor.pincode}
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">
                            Preferred Location
                          </p>
                          <p className="text-gray-800 font-semibold">
                            {donor.preferredDonationLocation}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            Willing to donate at any location for emergencies
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        Verification Details
                      </h3>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-semibold">
                            Verified Donor
                          </span>
                        </div>
                        <p className="text-gray-700">
                          ID Type:{" "}
                          <span className="font-semibold">
                            {donor.idProofType}
                          </span>
                        </p>
                        <p className="text-gray-700">
                          ID Number:{" "}
                          <span className="font-semibold">
                            {donor.idProofNumber}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "medical" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        Medical Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">
                            Blood Group
                          </p>
                          <p className="text-2xl font-bold text-red-600">
                            {donor.bloodGroup}
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">Weight</p>
                          <p className="text-2xl font-bold text-gray-800">
                            {donor.weight} kg
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">Gender</p>
                          <p className="text-xl font-semibold text-gray-800">
                            {donor.gender}
                          </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">
                            Date of Birth
                          </p>
                          <p className="text-xl font-semibold text-gray-800">
                            {donor.dob}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        Donation History
                      </h3>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-700">Total Donations</span>
                          <span className="text-2xl font-bold text-red-600">
                            {donor.numberOfDonations}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-700">
                            Last Donation Date
                          </span>
                          <span className="font-semibold text-gray-800">
                            {donor.lastDonationDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Current Status</span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {donor.eligibilityStatus
                              ? "Eligible to Donate"
                              : "Not Eligible"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        Medical Conditions
                      </h3>
                      <div className="border border-gray-200 rounded-lg p-4">
                        {donor.medicalConditions.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {donor.medicalConditions.map((condition, idx) => (
                              <li key={idx} className="text-gray-700">
                                {condition}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span>No medical conditions reported</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "testimonials" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      Testimonials & Reviews
                    </h3>
                    {donor.testimonials.map((testimonial, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-lg p-5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {testimonial.context}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          {testimonial.title}
                        </h4>
                        <p className="text-gray-700 mb-3">{testimonial.text}</p>
                        <p className="text-sm text-gray-600">
                          - {testimonial.author}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "gallery" && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      Photo Gallery
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {donor.galleryImages.map((image, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg overflow-hidden border border-gray-200"
                        >
                          <img
                            src={image}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
