"use client";

import { useState, useEffect } from "react";

import HeroSection from "@/app/components/more/healthLabComponents/labHeroSection";
import LocationAndContact from "@/app/components/more/healthLabComponents/labLocation";
import AboutSection from "@/app/components/more/healthLabComponents/labAbout";
import FAQSection from "@/app/components/more/healthLabComponents/labFAQS";
import LabFilterBar from "@/app/components/more/healthLabComponents/labSearch";
import DiagnosticTabs from "@/app/components/more/healthLabComponents/labTabs";
import ReviewSection from "@/app/components/more/healthLabComponents/reviewSection";

import { useParams } from 'next/navigation';
import axios from "axios";
const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / reviews.length).toFixed(1); // rounded to 1 decimal
};
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function HealthLabPage() {
    // Dynamic data state - initialize as empty
    const [testsData, setTestsData] = useState([]);
    const [packagesData, setPackagesData] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);
    const [faqData, setFaqData] = useState([]);
    const [labInfo, setLabInfo] = useState({});
    const [certifications, setCertifications] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [reloadFlag, setReloadFlag] = useState(0);
    const params = useParams();
    const id = params.id;

    // UI state
    const [tab, setTab] = useState('tests');
    const [search, setSearch] = useState('');
    const [testType, setTestType] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [openFAQ, setOpenFAQ] = useState(null);
    const [openPackage, setOpenPackage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalTest, setModalTest] = useState(null);
    const [data, set_res_data] = useState({
        healthProfile: null, otherData: null
    })
  
    // Fetch data from API and set all state
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                console.log('🔄 Fetching pharmacy data...');
                const response_data = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
                );
                console.log("Response Data:", response_data.data);

                const { healthServeProfile, healthServeUser } = response_data.data.healthServeProfileData;
                set_res_data({
                    healthProfile: healthServeProfile || null,
                    otherData: healthServeUser || null,
                });

                setTestsData(healthServeProfile?.tests)
                setPackagesData(healthServeProfile?.packages)
                console.log("response", healthServeProfile, healthServeUser);

                setLabInfo(healthServeUser || {});
                const data = healthServeProfile || {};

            } catch (err) {
                setError('Failed to load healthlab data: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Filtering logic
    const filteredTests = testsData.filter((test) => {
        const matchesSearch = test.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = !testType || test.category === testType;
        const matchesLocation = !location || (location === 'home' ? test.homeCollection : !test.homeCollection);
        let matchesPrice = true;
        if (price) {
            const [min, max] = price.split('-');
            if (max) {
                matchesPrice = test.discountedPrice >= parseInt(min) && test.discountedPrice <= parseInt(max);
            } else {
                matchesPrice = test.discountedPrice >= parseInt(min);
            }
        }
        return matchesSearch && matchesType && matchesLocation && matchesPrice;
    });

    if (error) {
        return (
            <div className="min-h-screen bg-[#f6fafd] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
                    <button onClick={() => setReloadFlag(f => f + 1)} className="bg-blue-600 text-white px-4 py-2 rounded">Retry</button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f6fafd] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-lg text-blue-700">Loading Health Lab Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-white min-h-screen flex flex-col items-center">
            <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
                <div className="w-full">
                    <HeroSection data={data?.otherData} healthProfile={data?.healthProfile} />
                    <AboutSection data={data?.otherData} healthProfile={data?.healthProfile} />
                    <LabFilterBar search={search} setSearch={setSearch} testType={testType} setTestType={setTestType} price={price} setPrice={setPrice} location={location} setLocation={setLocation} />
                    <DiagnosticTabs tab={tab} setTab={setTab} filteredTests={filteredTests} packagesData={packagesData} setShowModal={setShowModal} setModalTest={setModalTest} openPackage={openPackage} setOpenPackage={setOpenPackage} />
                    <ReviewSection data={data?.otherData} healthProfile={data?.healthProfile} />
                    <LocationAndContact data={data?.otherData} healthProfile={data?.healthProfile} />
                    <FAQSection faqs={faqData} openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} healthProfile={data?.healthProfile}/>
                </div>
            </main>
        </div>
    );
}