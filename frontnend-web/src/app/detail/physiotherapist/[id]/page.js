"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import PhysiotherapyHero from "@/app/components/more/physiotherapistComponents/physioHeroSection";
import FAQS from "@/app/components/more/common/Faqs";
import OverviewSection from "@/app/components/more/physiotherapistComponents/physioOverview";
import ConditionsTreated from "@/app/components/more/physiotherapistComponents/conditionsTreated";
import LocationAndContact from "@/app/components/more/common/LocationCard";
import TestimonialsCard from "@/app/components/more/common/ProfileTestimonial";
import SupportOptions from "@/app/components/more/physiotherapistComponents/physioSupport";
import TherapyPackages from "@/app/components/more/physiotherapistComponents/therapy";
import Image from "next/image";
import axios from "axios";
import ImageGallery from "@/app/components/more/common/ImageGallery";

export default function Home() {
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
      console.log("Response Data:", response_data.data);

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
  return data?.healthProfile ? (
    <div className="relative bg-white min-h-screen flex flex-col items-center">
      <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
        <div className="w-full">
          <PhysiotherapyHero
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <OverviewSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ConditionsTreated
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <TherapyPackages
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ImageGallery profileData={data?.healthProfile} />
          <LocationAndContact
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <TestimonialsCard
            data={data?.otherData}
            testimonials={data?.healthProfile.testimonials}
          />
          <FAQS
            data={data}
            openFAQ={openFAQ}
            setOpenFAQ={setOpenFAQ}
            healthProfile={data?.healthProfile}
          />
          {/* <SupportOptions /> */}
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
