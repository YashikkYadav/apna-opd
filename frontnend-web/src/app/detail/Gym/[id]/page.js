"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import HeroSection from "@/app/components/more/gymComponents/gymHero";
import AboutSection from "@/app/components/more/gymComponents/aboutGym";
import FacilitiesSection from "@/app/components/more/gymComponents/facilities";
import FAQSection from "@/app/components/more/gymComponents/gymFaqs";
import GymFooter from "@/app/components/more/gymComponents/gymFooter";
import SuccessStories from "@/app/components/more/gymComponents/gymReviews";
import VisitUsToday from "@/app/components/more/gymComponents/locationInfo";
import RelatedGyms from "@/app/components/more/gymComponents/relatedGyms";
import ProgramsAndServices from "@/app/components/more/gymComponents/services";
import GymTimings from "@/app/components/more/gymComponents/timings";
import CertifiedTrainers from "@/app/components/more/gymComponents/trainers";
import MembershipPlans from "@/app/components/more/gymComponents/plans";

export default function GymPage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState({
    healthProfile: null,
    otherData: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response_data = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
      );
      console.log("Response Data:", response_data);

      const { healthServeProfile, healthServeUser } =
        response_data?.data?.healthServeProfileData;

      setData({
        healthProfile: healthServeProfile || null,
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
          <HeroSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <AboutSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <FacilitiesSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ProgramsAndServices
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <CertifiedTrainers
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <GymTimings
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <MembershipPlans
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <VisitUsToday
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <SuccessStories
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <FAQSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <RelatedGyms
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <GymFooter
            data={data?.otherData}
            healthProfile={data?.healthProfile}
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
