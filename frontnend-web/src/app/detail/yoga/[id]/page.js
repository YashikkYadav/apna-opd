"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import YogaHero from "@/app/components/more/yogaComponent/YogaHero";
import OverviewSection from "@/app/components/more/yogaComponent/YogaAbout";
import YogaFooter from "@/app/components/more/yogaComponent/YogaFooter";

import axios from "axios";

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
          <YogaFooter data={data?.otherData} />
        </div>
      </main>
    </div>
  ) : (
    <div className="min-h-64 pt-[120px] flex items-center justify-center">
      <h1 className="text-3xl text-blue-800">
        We’re updating this profile to serve you better. Stay tuned!
      </h1>
    </div>
  );
}
