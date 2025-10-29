"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AppointmentOptions from "@/app/components/more/VeterinaryComponents/Appointment";
import AvailableServices from "@/app/components/more/VeterinaryComponents/AvailableServices";
import FAQS from "@/app/components/more/common/Faqs";
import LocationAndContact from "@/app/components/more/common/LocationCard";
import FooterCTA from "@/app/components/more/VeterinaryComponents/Footer";
import TestimonialsCard from "@/app/components/more/common/ProfileTestimonial";
import VetHeroSection from "@/app/components/more/VeterinaryComponents/VetHeroSection";
import VetProfileSection from "@/app/components/more/VeterinaryComponents/VetProfile";
import WhyChooseUs from "@/app/components/more/VeterinaryComponents/WhyChoose";
import ImageGallery from "@/app/components/more/common/ImageGallery";

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
          <LocationAndContact
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
          <ImageGallery profileData={data?.healthProfile} />
          <WhyChooseUs
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <TestimonialsCard
            data={data?.otherData}
            testimonials={data?.healthProfile.testimonials}
          />
          <FAQS data={data?.otherData} healthProfile={data?.healthProfile} />
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
