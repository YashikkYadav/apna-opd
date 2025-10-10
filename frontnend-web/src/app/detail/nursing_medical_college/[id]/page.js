"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import AdmissionProcess from "@/app/components/more/collegeComponents/admissionProcess";
import CollegeHeroSection from "@/app/components/more/collegeComponents/collegeHeroSection";
import CollegeOverview from "@/app/components/more/collegeComponents/collegeOverview";
import CollegeFooter from "@/app/components/more/collegeComponents/collegeFooter";
import CoursesOffered from "@/app/components/more/collegeComponents/collegeOffers";
import TestimonialsCard from "@/app/components/more/common/ProfileTestimonial";
import CampusFacilities from "@/app/components/more/collegeComponents/Facilities";
import LocationAndContact from "@/app/components/more/common/LocationCard";
import Faculty from "@/app/components/more/collegeComponents/faculty";
import PlacementAndInternship from "@/app/components/more/collegeComponents/placementIntern";
import RelatedColleges from "@/app/components/more/collegeComponents/relatedColleges";
import WhyChooseCollege from "@/app/components/more/collegeComponents/whyChooseClg";
import ImageGallery from "@/app/components/more/common/ImageGallery";

export default function VeterinaryPage() {
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
      console.log("Response Data:", response_data.data);

      const { healthServeProfile, healthServeUser } =
        response_data?.data?.healthServeProfileData;

      setData({
        healthProfile: healthServeProfile?.data || null,
        otherData: healthServeUser || null,
      });

      console.log("healthServeProfile:", healthServeProfile.data);
      console.log("healthServeUser:", healthServeUser);
    };
    fetchData();
  }, [id]);

  return data?.healthProfile ? (
    <div className="relative bg-white min-h-screen flex flex-col items-center">
      <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
        <div className="w-full">
          <CollegeHeroSection
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <CollegeOverview
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <CoursesOffered
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <WhyChooseCollege
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <CampusFacilities
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <PlacementAndInternship
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <ImageGallery profileData={data?.healthProfile} />
          {/* <Faculty  data={data?.otherData} healthProfile={data?.healthProfile} /> */}
          <AdmissionProcess
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          <TestimonialsCard testimonials={data?.healthProfile.testimonials} data={data?.otherData} />
          <LocationAndContact
            data={data?.otherData}
            healthProfile={data?.healthProfile}
          />
          {/* <RelatedColleges  data={data?.otherData} healthProfile={data?.healthProfile}/> */}
          <CollegeFooter
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
