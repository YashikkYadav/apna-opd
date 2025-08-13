"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import ClinicHeroSection from "@/app/components/more/ivfClinicComponents/ivfHeroSection";
import ClinicAboutSection from "@/app/components/more/ivfClinicComponents/ivfAbout";
import FertilityServices from "@/app/components/more/ivfClinicComponents/ivfServices";
import LeadFertilitySpecialist from "@/app/components/more/ivfClinicComponents/specialist";
import SuccessStories from "@/app/components/more/ivfClinicComponents/successStories";
import VisitClinic from "@/app/components/more/ivfClinicComponents/visit";
import WhyChoose from "@/app/components/more/ivfClinicComponents/whyChooseUS";
import FAQSection from "@/app/components/more/ivfClinicComponents/faqs";
import IvfFooter from "@/app/components/more/ivfClinicComponents/ivfFooter";

export default function IvfPage() {
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

      const { healthServeProfile, healthServeUser } = response_data?.data?.healthServeProfileData;

      setData({
        healthProfile: healthServeProfile || null,
        otherData: healthServeUser || null,
      });
      console.log("healthServeProfile:", healthServeProfile);
      console.log("healthServeUser:", healthServeUser);
    };
    fetchData();
  }, [id]);

  return (
    <div className="relative bg-white min-h-screen flex flex-col items-center">
      <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
        <div className="w-full">
          <ClinicHeroSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ClinicAboutSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <FertilityServices
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          {/* <LeadFertilitySpecialist
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          /> */}
          <SuccessStories
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <VisitClinic
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <WhyChoose
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <FAQSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <IvfFooter
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
        </div>
      </main>
    </div>
  );
}
