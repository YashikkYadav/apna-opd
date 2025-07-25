'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Head from "next/head";
import UrgentBanner from "@/app/components/more/bloodBankComponents/UrgentBanner";
import About from "@/app/components/more/bloodBankComponents/About";
import Contact from "@/app/components/more/bloodBankComponents/Contact";
import WhyChoose from "@/app/components/more/bloodBankComponents/WhyChoose";
import HeroSection from "@/app/components/more/bloodBankComponents/HeroSection";
import Reviews from "@/app/components/more/bloodBankComponents/Reviews";
import NearbyBanks from "@/app/components/more/bloodBankComponents/NearBy";
import RequestSteps from "@/app/components/more/bloodBankComponents/RequestSteps";
import Availability from "@/app/components/more/bloodBankComponents/Availability";

export default function BloodBankPage() {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState({
        healthProfile: null, otherData: null
    })

    useEffect(() => {
        const fetchData = async () => {
            const response_data = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/`);
            const { healthServeProfile } = response_data.data;
            setData({
                healthProfile: healthServeProfile || null,
                otherData: healthServeProfile?.healthServeId || null
            });
            console.log("healthServeProfile:", healthServeProfile);
            console.log("healthServeId:", healthServeProfile?.healthServeId);
        };
        fetchData();
    }, [id]);

    return (
        <div className="relative bg-white min-h-screen flex flex-col items-center">
            <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
                {/* Hero section with full width */}
                <div className="w-full">
                    <HeroSection
                        data={data?.otherData} healthProfile={data?.healthProfile}
                    />
                </div>

                {/* Other components in 90% width with rounded sections */}
                <div className="max-w-[90vw] mx-auto space-y-10">
                    <Availability data={data?.otherData} healthProfile={data?.healthProfile} />
                    <About data={data?.otherData} healthProfile={data?.healthProfile} />
                    <Contact data={data?.otherData} healthProfile={data?.healthProfile} />
                    <WhyChoose data={data?.otherData} healthProfile={data?.healthProfile} />
                    <RequestSteps data={data?.otherData} healthProfile={data?.healthProfile} />
                    <Reviews data={data?.otherData} healthProfile={data?.healthProfile} />
                    <NearbyBanks data={data?.otherData} healthProfile={data?.healthProfile} />
                    <UrgentBanner data={data?.otherData} healthProfile={data?.healthProfile} />
                </div>
            </main>
        </div>
    );

}
