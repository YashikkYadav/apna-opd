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

            const response_data = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data/`)
            const { healthServeProfile, healthServeUser } = response_data?.data?.healthServeProfileData
            setData({
                healthProfile: healthServeProfile, otherData: healthServeUser
            })
            console.log("response_data", healthServeProfile, healthServeUser)
        }
        fetchData()
    }, [])
    return (
        <div className="relative bg-white min-h-screen flex flex-col items-center">
            <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
                <div className="w-full">
                    <PhysiotherapyHero data={data?.otherData} />
                    <OverviewSection data={data} />
                    <ConditionsTreated data={data?.otherData} />
                    <TherapyPackages data={data?.otherData} packagesRef={packagesRef} />
                    <PhysioLocation data={data?.otherData} />
                    <PhysioReviews data={data} />
                    <PhysioFAQS data={data} openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />
                    <SupportOptions />
                </div>
            </main>
        </div>
    );
}
