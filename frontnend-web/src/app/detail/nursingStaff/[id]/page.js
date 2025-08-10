"use client";


import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

import ImageGallery from '@/app/components/more/nurseComponents/ImageGallery';
import NurseFeatureCard from '@/app/components/more/nurseComponents/NurseFeatureCard';
import NurseFaqs from '@/app/components/more/nurseComponents/NurseFaqs';
import NurseTestimonialsCard from '@/app/components/more/nurseComponents/NurseTestimonialCard';
import NurseLocationCard from '@/app/components/more/nurseComponents/NurseLocationCard';
import NurseSpecialistsCard from '@/app/components/more/nurseComponents/NurseSpecialListCard';
import NurseOverviewCar from '@/app/components/more/nurseComponents/NurseOverviewCard';


// Consolidated data into a single object


const ProfilePage = () => {
  const params = useParams();
  const id = params.id;
  const packagesRef = useRef(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [data, setData] = useState({
    healthProfile: null,
    otherData: null,
  });

  const stars = Array(5).fill(0);

  useEffect(() => {
    const fetchData = async () => {
      const response_data = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
      );
      console.log("Response Data:", response_data);

      const { healthServeProfile, healthServeUser } =
        response_data?.data?.healthServeProfileData;

      setData({
        healthProfile: healthServeProfile?.data || null,
        otherData: healthServeUser || null,
      });

      console.log("healthServeProfile:", healthServeProfile);
      console.log("healthServeUser:", healthServeUser);
    };
    fetchData();
  }, [id]);
  return (
    <div className="pt-[80px]">
      <NurseFeatureCard
        userData={data.otherData}
        NurseData={data.healthProfile}
      />
      <NurseOverviewCar
        userData={data.otherData}
        NurseData={data.healthProfile}
      />
      <NurseSpecialistsCard NurseData={data.healthProfile} />
      <ImageGallery NurseData={data.healthProfile} />
      <NurseLocationCard
        userData={data.otherData}
        NurseData={data.healthProfile}
      />
      <NurseTestimonialsCard NurseData={data.healthProfile} />
      
      <NurseFaqs NurseData={data.healthProfile} /> 
    </div>
  );
};

export default ProfilePage;
