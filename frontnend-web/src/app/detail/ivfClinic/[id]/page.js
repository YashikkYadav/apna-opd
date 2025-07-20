'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

import ClinicHeroSection from '@/app/components/more/ivfClinicComponents/ivfHeroSection';
import ClinicAboutSection from "@/app/components/more/ivfClinicComponents/ivfAbout";
import FertilityServices from '@/app/components/more/ivfClinicComponents/ivfServices';
import LeadFertilitySpecialist from '@/app/components/more/ivfClinicComponents/specialist';
import SuccessStories from '@/app/components/more/ivfClinicComponents/successStories';
import VisitClinic from '@/app/components/more/ivfClinicComponents/visit';
import WhyChoose from '@/app/components/more/ivfClinicComponents/whyChooseUS';
import FAQSection from '@/app/components/more/ivfClinicComponents/faqs';
import IvfFooter from '@/app/components/more/ivfClinicComponents/ivfFooter';

export default function IvfPage() {
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
                    <ClinicHeroSection data={data?.otherData}/>
                    <ClinicAboutSection data={data?.otherData}/>
                    <FertilityServices data={data?.otherData}/>
                    <LeadFertilitySpecialist data={data?.otherData}/>
                    <SuccessStories data={data?.otherData}/>
                    <VisitClinic data={data?.otherData}/>
                    <WhyChoose data={data?.otherData}/>
                    <FAQSection data={data?.otherData}/>
                    <IvfFooter data={data?.otherData}/>
                </div>
            </main>
        </div>
    )
}