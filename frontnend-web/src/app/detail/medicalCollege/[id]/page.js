'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

import AdmissionProcess from "@/app/components/more/collegeComponents/admissionProcess";
import CollegeHeroSection from "@/app/components/more/collegeComponents/collegeHeroSection";
import CollegeOverview from "@/app/components/more/collegeComponents/collegeOverview";
import CollegeFooter from "@/app/components/more/collegeComponents/collegeFooter";
import CoursesOffered from "@/app/components/more/collegeComponents/collegeOffers";
import StudentTestimonials from "@/app/components/more/collegeComponents/studentReviews";
import CampusFacilities from "@/app/components/more/collegeComponents/Facilities";
import ContactAndLocation from "@/app/components/more/collegeComponents/contactInfo";
import Faculty from "@/app/components/more/collegeComponents/faculty";
import PlacementAndInternship from "@/app/components/more/collegeComponents/placementIntern";
import RelatedColleges from "@/app/components/more/collegeComponents/relatedColleges";
import WhyChooseCollege from "@/app/components/more/collegeComponents/whyChooseClg";

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
                console.log(healthServeUser, data?.otherData);
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
                    <CollegeHeroSection healthProfile={data?.otherData}/>
                    <CollegeOverview healthProfile={data?.otherData}/>
                    <CoursesOffered healthProfile={data?.otherData}/>
                    <WhyChooseCollege healthProfile={data?.otherData}/>
                    <CampusFacilities healthProfile={data?.otherData}/>
                    <PlacementAndInternship healthProfile={data?.otherData} />
                    <Faculty healthProfile={data?.otherData}/>
                    <AdmissionProcess healthProfile={data?.otherData}/>
                    <StudentTestimonials healthProfile={data?.otherData}/>
                    <ContactAndLocation healthProfile={data?.otherData}/>
                    <RelatedColleges healthProfile={data?.otherData}/>
                    <CollegeFooter healthProfile={data?.otherData}/>
                </div>
            </main>

        </div>
    )

}