'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import AppointmentOptions from "@/app/components/more/VeterinaryComponents/Appointment";
import AvailableServices from "@/app/components/more/VeterinaryComponents/AvailableServices";
import ClinicInfoSection from "@/app/components/more/VeterinaryComponents/ClinicInfo";
import FAQ from "@/app/components/more/VeterinaryComponents/Faqs";
import FooterCTA from "@/app/components/more/VeterinaryComponents/Footer";
import Testimonials from "@/app/components/more/VeterinaryComponents/Testimonials";
import VetHeroSection from "@/app/components/more/VeterinaryComponents/VetHeroSection";
import VetProfileSection from "@/app/components/more/VeterinaryComponents/VetProfile";
import WhyChooseUs from "@/app/components/more/VeterinaryComponents/WhyChoose";

export default function VeterinaryPage() {
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
                console.log("1:",healthServeUser,data?.otherData);
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
                    <VetHeroSection healthProfile={data.otherData} />
                    <VetProfileSection healthProfile={data.otherData} />
                    <ClinicInfoSection healthProfile={data.otherData} />
                    <AppointmentOptions healthProfile={data.otherData} />
                    <AvailableServices healthProfile={data.otherData} />
                    <WhyChooseUs healthProfile={data.otherData} />
                    <Testimonials healthProfile={data.otherData} />
                    <FAQ healthProfile={data.otherData} />
                    <FooterCTA healthProfile={data.otherData} />
                </div>
            </main>
        </div>
    )
}