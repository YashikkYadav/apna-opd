"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import LocationAndContact from "@/app/components/more/common/LocationCard";
import HeroSection from "@/app/components/more/bloodDonorComponent/DonorHero";
import OverviewSection from "@/app/components/more/bloodDonorComponent/DonorOverview";
import TestimonialsCard from "@/app/components/more/common/ProfileTestimonial";
import Conditions from "@/app/components/more/bloodDonorComponent/DonorCondition";

export default function BloodDonorPage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState({
    healthProfile: null,
    userData: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response_data = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
      );
      console.log("Response Data:", response_data?.data);

      const { healthServeProfile, healthServeUser } =
        response_data?.data?.healthServeProfileData;

      setData({
        healthProfile: healthServeProfile || null,
        userData: healthServeUser || null,
      });
      console.log("healthServeProfile:", healthServeProfile);
      console.log("healthServeUser:", healthServeUser);
    };
    fetchData();
  }, [id]);

  return data?.healthProfile?.data ? (
    <div className="relative bg-white flex flex-col items-center">
      <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
        {/* Hero section with full width */}
        <div className="w-full">
          <HeroSection
            data={data?.userData}
            healthProfile={data?.healthProfile}
          />
        </div>

        {/* Other components in 90% width with rounded sections */}
        <div className="max-w-[90vw] mx-auto space-y-10">
          <OverviewSection
            data={data?.userData}
            healthProfile={data?.healthProfile?.data}
          />
          {data?.healthProfile?.data?.medicalConditions?.length > 0 && (
            <Conditions
              data={data?.userData}
              healthProfile={data?.healthProfile}
            />
          )}
          <LocationAndContact
            data={data?.userData}
            healthProfile={data?.healthProfile}
          />

          <TestimonialsCard
            data={data?.userData}
            testimonials={data?.healthProfile.testimonials}
          />
        </div>
      </main>
    </div>
  ) : (
    <div className="min-h-80 pt-[110px] flex items-center justify-center">
      <h1 className="text-xl text-gray-500 font-semibold">
        We’re updating this profile to serve you better. Stay tuned!
      </h1>
    </div>
  );
}
