"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AppointmentOptions from "@/app/components/more/VeterinaryComponents/Appointment";
import AvailableServices from "@/app/components/more/VeterinaryComponents/AvailableServices";
import ClinicInfoSection from "@/app/components/more/VeterinaryComponents/ClinicInfo";
import FAQ from "@/app/components/more/VeterinaryComponents/Faqs";
import FooterCTA from "@/app/components/more/VeterinaryComponents/Footer";
import Testimonials from "@/app/components/more/VeterinaryComponents/Testimonials";
import VetHeroSection from "@/app/components/more/VeterinaryComponents/VetHeroSection";
import VetProfileSection from "@/app/components/more/VeterinaryComponents/VetProfile";
import WhyChooseUs from "@/app/components/more/VeterinaryComponents/WhyChoose";

export default function VeterinaryPage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState({
    healthProfile: null,
    otherData: null,
  });
  console.log(id);
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
      console.log("healthServeProfile:", healthServeProfile.data);
      console.log("healthServeId:", healthServeUser);
    };
    fetchData();
  }, [id]);

  return data?.healthProfile ? (
    <div className="relative bg-white min-h-screen flex flex-col items-center">
      <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
        <div className="w-full">
          <VetHeroSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <VetProfileSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ClinicInfoSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <AppointmentOptions
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <AvailableServices
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <WhyChooseUs
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <Testimonials
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <FAQ data={data?.otherData} healthProfile={data?.healthProfile} />
          <FooterCTA
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
