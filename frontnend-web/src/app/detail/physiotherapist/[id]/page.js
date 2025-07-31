'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import PhysiotherapyHero from '@/app/components/more/physiotherapistComponents/physioHeroSection';
import PhysioFAQS from '@/app/components/more/physiotherapistComponents/physioFaqs';
import OverviewSection from '@/app/components/more/physiotherapistComponents/physioOverview';
import ConditionsTreated from '@/app/components/more/physiotherapistComponents/conditionsTreated';
import PhysioLocation from '@/app/components/more/physiotherapistComponents/physioLocation';
import PhysioReviews from '@/app/components/more/physiotherapistComponents/physioReviews';
import SupportOptions from '@/app/components/more/physiotherapistComponents/physioSupport';
import TherapyPackages from '@/app/components/more/physiotherapistComponents/therapy';
import Image from 'next/image';
import axios from 'axios';

export default function Home() {
    const params = useParams();
    const id = params.id;
    const packagesRef = useRef(null);
    const [openFAQ, setOpenFAQ] = useState(null);
    const [data, setData] = useState({
        healthProfile: null, otherData: null
    })

    const stars = Array(5).fill(0);

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

            console.log("healthServeProfile:", healthServeProfile);
            console.log("healthServeUser:", healthServeUser);
        };
        fetchData();
    }, [id]);
    return (
        <div className="relative bg-white min-h-screen flex flex-col items-center">
            <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
                <div className="w-full">
                    <PhysiotherapyHero
                        data={data?.otherData}
                        healthProfile={data?.healthProfile}
                    />
                    <OverviewSection data={data?.otherData} healthProfile={data?.healthProfile} />
                    <ConditionsTreated data={data?.otherData} healthProfile={data?.healthProfile} />
                    <TherapyPackages data={data?.otherData} healthProfile={data?.healthProfile} />
                    <PhysioLocation data={data?.otherData} healthProfile={data?.healthProfile} />
                    <PhysioReviews data={data?.otherData} healthProfile={data?.healthProfile} />
                    <PhysioFAQS data={data} openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} healthProfile={data?.healthProfile}/>
                    {/* <SupportOptions /> */}
                </div>
            </main>
        </div>
    );
}
