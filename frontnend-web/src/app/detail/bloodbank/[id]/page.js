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
        healthProfile: null, userData: null
    })

    useEffect(() => {
        const fetchData = async () => {
            const response_data = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
            );
            console.log("Response Data:", response_data.data);

            const { healthServeProfile, healthServeUser } = response_data.data.healthServeProfileData;

            setData({
                healthProfile: healthServeProfile?.data || null,
                otherData: healthServeUser || null,
            });
            console.log("healthServeProfile:", healthServeProfile?.data);
            console.log("healthServeUser:", healthServeUser);
        };
        fetchData();
    }, [id]);

    return (
        <div className="relative bg-white min-h-screen flex flex-col items-center">
            <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
                {/* Hero section with full width */}
                <div className="w-full">
                    <HeroSection
                        data={data?.userData} healthProfile={data?.healthProfile}
                    />
                </div>

                {/* Other components in 90% width with rounded sections */}
                <div className="max-w-[90vw] mx-auto space-y-10">
                    <Availability data={data?.userData} healthProfile={data?.healthProfile} />
                    <About data={data?.userData} healthProfile={data?.healthProfile} />
                    <Contact data={data?.userData} healthProfile={data?.healthProfile} />
                    <WhyChoose data={data?.userData} healthProfile={data?.healthProfile} />
                    <RequestSteps data={data?.userData} healthProfile={data?.healthProfile} />
                    <Reviews data={data?.userData} healthProfile={data?.healthProfile} />
                    <NearbyBanks data={data?.userData} healthProfile={data?.healthProfile} />
                    <UrgentBanner data={data?.userData} healthProfile={data?.healthProfile} />
                </div>
            </main>
        </div>
    );

}
