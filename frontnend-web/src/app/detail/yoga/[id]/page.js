"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import YogaHero from "@/app/components/more/yogaComponent/YogaHero";
import OverviewSection from "@/app/components/more/yogaComponent/YogaAbout";
import YogaFooter from "@/app/components/more/yogaComponent/YogaFooter";
import YogaServices from "@/app/components/more/yogaComponent/YogaServices";
import YogaFacilitiesCard from "@/app/components/more/yogaComponent/YogaFacilities";
import Reviews from "@/app/components/more/yogaComponent/YogaReviews";

import axios from "axios";
import FAQS from "@/app/components/more/yogaComponent/YogaFaqs";
import LocationAndContact from "@/app/components/more/yogaComponent/YogaLocation";
import ImageGallery from "@/app/components/more/yogaComponent/YogaGallery";
import BenefitsSection from "@/app/components/more/yogaComponent/YogaBenefits";
import InstructorsSection from "@/app/components/more/yogaComponent/YogaInstructors";
import Packages from "@/app/components/more/yogaComponent/YogaPackages";

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
          <YogaHero
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <OverviewSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <YogaServices
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ImageGallery profileData={data?.healthProfile} />
          <BenefitsSection />
          <YogaFacilitiesCard profileData={data?.healthProfile} />
          <InstructorsSection profileData={data?.healthProfile} />
          <Packages profileData={data?.healthProfile} />
          <LocationAndContact
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <Reviews healthProfile={data?.healthProfile} />
          <FAQS healthProfile={data?.healthProfile} />
          <YogaFooter data={data?.otherData} />
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
