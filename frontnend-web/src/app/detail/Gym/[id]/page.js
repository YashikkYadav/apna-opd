'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

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
        healthProfile: null, otherData: null
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data/`);
                const profileData = res?.data?.healthServeProfileData;

                if (!profileData) {
                    console.warn("Backend error:", res?.data?.error);
                    return;
                }

                const { healthServeProfile, healthServeUser } = profileData;
                setData({
                    healthProfile: healthServeProfile,
                    otherData: healthServeUser
                });
                console.log("1:", healthServeUser, data?.otherData);
            } catch (err) {
                console.error("Request failed:", err);
            }
        };

        fetchData();
    }, [id]);
    return (
        <div className="relative bg-white min-h-screen flex flex-col items-center">
            <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
                <div className="w-full">
                    <HeroSection healthProfile={data?.otherData}/>
                    <AboutSection healthProfile={data?.otherData}/>
                    <FacilitiesSection healthProfile={data?.otherData}/>
                    <ProgramsAndServices healthProfile={data?.otherData}/>
                    <CertifiedTrainers healthProfile={data?.otherData}/>
                    <GymTimings healthProfile={data?.otherData}/>
                    <MembershipPlans healthProfile={data?.otherData}/>
                    <VisitUsToday healthProfile={data?.otherData}/>
                    <SuccessStories healthProfile={data?.otherData}/>
                    <FAQSection healthProfile={data?.otherData} />
                    <RelatedGyms healthProfile={data?.otherData}/>
                    <GymFooter healthProfile={data?.otherData}/>
                </div>
            </main>
        </div>
    )
}