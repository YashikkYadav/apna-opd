"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import ClinicHeroSection from "@/app/components/more/ivfClinicComponents/ivfHeroSection";
import ClinicAboutSection from "@/app/components/more/ivfClinicComponents/ivfAbout";
import FertilityServices from "@/app/components/more/ivfClinicComponents/ivfServices";
import LeadFertilitySpecialist from "@/app/components/more/ivfClinicComponents/specialist";
import TestimonialsCard from "@/app/components/more/common/ProfileTestimonial";
import LocationAndContact from "@/app/components/more/common/LocationCard";
import ImageGallery from "@/app/components/more/common/ImageGallery";
import WhyChoose from "@/app/components/more/ivfClinicComponents/whyChooseUS";
import FAQS from "@/app/components/more/common/Faqs";
import IvfFooter from "@/app/components/more/ivfClinicComponents/ivfFooter";
import ClinicDoctorsSection from "@/app/components/more/ivfClinicComponents/ivfDoctors";
import { Import } from "lucide-react";

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
          <ClinicHeroSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ClinicAboutSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ClinicDoctorsSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <FertilityServices
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ImageGallery profileData={data?.healthProfile} />
          {/* <LeadFertilitySpecialist
              data={data?.otherData}
              healthProfile={data?.healthProfile}
            /> */}
          <TestimonialsCard
            data={data?.otherData}
            testimonials={data?.healthProfile.testimonials}
          />
          <LocationAndContact
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <WhyChoose
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <FAQS data={data?.otherData} healthProfile={data?.healthProfile} />
          <IvfFooter
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
