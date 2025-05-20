'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircleOutlined } from '@ant-design/icons';

export default function RegistrationSuccess() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(9);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  
  // Set up staged animations
  useEffect(() => {
    // Show main container
    setTimeout(() => setVisible(true), 100);
    
    // Show icon
    setTimeout(() => setIconVisible(true), 500);
    
    // Show content
    setTimeout(() => setContentVisible(true), 800);
    
    // Show button
    setTimeout(() => setButtonVisible(true), 1100);
    
    // Set up countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        const newValue = prev > 0 ? prev - 1 : 0;
        setProgress((9 - newValue) * 10); // Convert to percentage (0-100)
        return newValue;
      });
    }, 1000);
    
    // Set up redirect
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);
    
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timer);
    };
  }, [router]);
  
  // Simple bounce animation
  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setBounce(prev => !prev);
    }, 1000);
    
    return () => clearInterval(bounceInterval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div 
        className={`bg-white p-8 shadow-lg rounded-lg w-full max-w-xl transition-all duration-500 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div 
            className={`rounded-full bg-green-100 p-4 transition-all duration-500 ease-out ${
              iconVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          >
            <CheckCircleOutlined style={{ fontSize: '40px', color: '#10B981' }} />
          </div>
        </div>
        
        {/* Success Content */}
        <div className={`transition-all duration-500 ease-out ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
            Registration Successful!
          </h2>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <p className="text-center text-gray-700">
              Your account has been successfully created!
            </p>
            <p className="text-center text-gray-700 mt-2">
              Now you need to complete your profile to continue.
            </p>
            <p className="text-center text-gray-700 mt-2">
              Log in to your dashboard using the same credentials and complete your profile.
            </p>
          </div>
          
          {/* Redirect Information */}
          <div className="flex flex-col items-center justify-center">
            <div className={`text-blue-600 font-medium mb-2 transition-transform duration-300 ${
              bounce ? 'transform -translate-y-1' : 'transform translate-y-0'
            }`}>
              Redirecting to Payment Page...
            </div>
            
            <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm mb-4">
              in {countdown} seconds
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-200 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Button */}
        <div className={`mt-8 text-center transition-all duration-500 ease-out ${
          buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-200"
          >
            Proceed Now
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-6">
            If you are not redirected automatically, please click the button above.
          </p>
        </div>
      </div>
    </div>
  );
}