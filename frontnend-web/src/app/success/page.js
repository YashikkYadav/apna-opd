'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircleOutlined, ClockCircleOutlined, EnvironmentOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CopyIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

export default function AppointmentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  
  const doctorName = searchParams.get('doctorName') || "Dr. John Doe";
  const appointmentDate = searchParams.get('appointmentDate') || "2025-05-20";
  const appointmentTime = searchParams.get('appointmentTime') || "10:00 AM";
  const appointmentMode = searchParams.get('appointmentMode') || "online"; // online or offline
  const meetLink = searchParams.get('meetLink') || "https://meet.google.com/abc-defg-hij";
  const location = searchParams.get('location') || "Main Clinic, First Floor, Room 101";

  const isOnline = appointmentMode === "online";
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  const copyMeetLink = () => {
    navigator.clipboard.writeText(meetLink)
      .then(() => {
        setCopied(true);
        toast.success("Meeting link copied to clipboard!");
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        toast.error("Failed to copy link: " + err);
      });
  };

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-[100px]">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <CheckCircleOutlined style={{ fontSize: '48px', color: '#10B981' }} />
          </div>
          
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
            Appointment Booked Successfully!
          </h2>
          
          <p className="text-center text-gray-600 mb-6">
            Your appointment has been confirmed. Here are the details:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-start mb-3">
              <UserOutlined className="mt-1 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{doctorName}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-3">
              <CalendarOutlined className="mt-1 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(appointmentDate)}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-3">
              <ClockCircleOutlined className="mt-1 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{appointmentTime}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-3">
              <EnvironmentOutlined className="mt-1 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Mode</p>
                <p className="font-medium">{isOnline ? "Online Consultation" : "In-person Visit"}</p>
              </div>
            </div>
            
            {!isOnline && (
              <div className="flex items-start">
                <EnvironmentOutlined className="mt-1 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{location}</p>
                </div>
              </div>
            )}
            
            {isOnline && (
              <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Online Meeting Link:</p>
                <div className="flex items-center justify-between">
                  <p className="text-blue-600 text-sm truncate mr-2">{meetLink}</p>
                  <button 
                    onClick={copyMeetLink}
                    className={`p-1.5 rounded-md ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                    title="Copy meeting link"
                  >
                    <CopyIcon className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Click the icon to copy the link. Join the meeting on time.
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">            
            <button
              onClick={goToHome}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 px-4 rounded-md transition duration-200"
            >
              Back to Home
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              A confirmation has been sent to your email and mobile number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
