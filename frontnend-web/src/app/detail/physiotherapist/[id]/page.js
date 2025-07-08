'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Calendar,
    MapPin,
    Home as HomeIcon,
    CalendarPlus,
    Package,
    User,
    Stethoscope,
    MessageCircle,
    HelpCircle,
    Headphones,
    ChevronDown,
    Phone,
    Star,
    AlertCircle,
    GraduationCap,
    Languages,
    Award,
    HeartPulse,
} from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
const getAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;

  const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  return (total / reviews.length).toFixed(1); // rounded to 1 decimal
};
export default function Home() {
    const params = useParams();
    const id = params.id;
    const packagesRef = useRef(null);
    const [openFAQ, setOpenFAQ] = useState(null);
    const [data,setData]=useState({
        healthProfile:null,otherData:null
    })

    const stars = Array(5).fill(0);

    useEffect(() => {
        const fetchData = async () => {

            const response_data = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data/`)
            const {healthServeProfile,healthServeUser}=response_data?.data?.healthServeProfileData
            setData({
                healthProfile:healthServeProfile,otherData:healthServeUser
            })
            console.log("response_data",healthServeProfile,healthServeUser)
        }
        fetchData()
    }, [])
    return (
        <div className="min-h-screen bg-[#f6fafd] py-6 px-2 md:px-0">
            {/* Hero/Doctor Card */}
            <div className="max-w-7xl mx-auto rounded-3xl shadow-2xl bg-[#1573ad] p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden mt-6">
                {/* Background Circles */}
                <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-300/30 rounded-full z-0" />
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-300/30 rounded-full z-0" />
                {/* Therapist Photo - now square with rounded corners */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                    <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-gradient-to-tr from-pink-500 to-yellow-300 flex items-center justify-center text-6xl font-bold text-white shadow-lg relative overflow-hidden">
                        <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-T3ZfSx2hyuNb-IcIVQCcjZnSR_hPI2V6dg&s"
                            alt="Dr. Priya Sharma"
                            width={288}
                            height={288}
                            className="object-cover w-full h-full rounded-2xl"
                            priority
                        />
                        <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-base border-2 border-white">✓</span>
                    </div>
                </div>
                {/* Info Section */}
                <div className="relative z-10 flex flex-col justify-center text-white w-full md:w-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">Dr. {data?.otherData?.name}</h1>
                    <h2 className="text-xl md:text-2xl font-semibold mt-2">Female • Certified Physiotherapist</h2>
                    <div className="flex flex-wrap gap-4 my-4">
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                            <Calendar className="w-5 h-5" />
                            <span>8 Years Experience</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                            <MapPin className="w-5 h-5" />
                            <span>{data?.otherData?.address} {data?.otherData?.location}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                            <HomeIcon className="w-5 h-5" />
                            <span>5km radius for home visits</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-300 text-2xl">★★★★★</span>
                        <span className="ml-2 text-lg">{getAverageRating(data?.healthProfile?.reviews)} ({data?.healthProfile?.reviews.length||0})</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {
                            data?.healthProfile?.doctorInfo?.features.map((item)=>(
                                <>
                                {item.enabled &&<span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur">{item.label}</span>}
                                </>

                            ))
                        }
                      
                    </div>
                    {/* CTA Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-8 py-3 flex items-center gap-2 shadow-lg transition text-lg">
                            <CalendarPlus className="w-5 h-5" />
                            Book Session
                        </button>
                        <button className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-8 py-3 flex items-center gap-2 backdrop-blur transition text-lg">
                            <Package className="w-5 h-5" />
                            Explore Packages
                        </button>
                    </div>
                </div>
            </div>

            {/* Overview Section as 3 Cards */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <div className="flex items-center gap-3 mb-8">
                    <User className="w-8 h-8 text-blue-600" />
                    <h2 className="text-4xl font-extrabold text-blue-700">Overview</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* About Card */}
                    <div className="bg-[#f6fafd] rounded-2xl shadow-md p-7 text-gray-800">
                        <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2"><HeartPulse className="w-6 h-6 text-pink-500" />About</h3>
                        <p className="text-base leading-relaxed">
                            Dr. Priya Sharma is a highly experienced physiotherapist with 8 years of dedicated practice in rehabilitation and pain management. She specializes in post-operative care, elderly rehabilitation, and sports recovery. Her patient-centered approach combines evidence-based treatments with compassionate care, helping patients achieve optimal recovery and improved quality of life.
                        </p>
                    </div>
                    {/* Education & Certifications Card */}
                    <div className="bg-[#f6fafd] rounded-2xl shadow-md p-7 text-gray-800">
                        <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2"><GraduationCap className="w-6 h-6 text-blue-400" />Education & Certifications</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><span className="font-semibold">Education:</span> BPT, MPT (Orthopedics)</li>
                            <li><span className="font-semibold">Certifications:</span> Dry Needling, Manual Therapy</li>
                            <li><span className="font-semibold">Special Interests:</span> Post-Op Care, Elderly Rehab, Sports Recovery</li>
                        </ul>
                    </div>
                    {/* Languages Card */}
                    <div className="bg-[#f6fafd] rounded-2xl shadow-md p-7 text-gray-800 border-2 border-blue-400">
                        <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2"><Languages className="w-6 h-6 text-green-500" />Languages</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Hindi</li>
                            <li>English</li>
                            <li>Rajasthani</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Conditions Treated */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <section className="rounded-xl p-6 md:p-10 shadow-md bg-[#1573ad] text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 section-title">
                        <Stethoscope className="w-6 h-6 text-white" />
                        Conditions Treated
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {data?.healthProfile?.doctorInfo?.conditions.map((c) => (
                            <button
                                key={c.label}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-3 text-base transition shadow-md focus:outline-none"
                                type="button"
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* Therapy Packages */}
            <div className="max-w-7xl mx-auto mt-12 px-2" ref={packagesRef}>
                <section className="bg-transparent rounded-xl p-0 shadow-none border-none" id="packages">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-800 section-title">
                        <Package className="w-6 h-6 text-blue-600" />
                        Therapy Packages
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data?.healthProfile?.packages.slice(0, 3).map((pkg) => (
                            <div
                                key={pkg.title}
                                className="bg-white border-2 border-blue-400 rounded-2xl shadow-md p-7 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-blue-900 uppercase flex-1">{pkg.name}</h3>
                                        <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">{pkg.discount}</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 mb-3">
                                        {pkg?.details && pkg?.details?.map((d) => (
                                            <div key={d.label} className="flex items-center gap-2 text-gray-700">
                                                <Calendar className="w-4 h-4 text-blue-400" />
                                                <span className="font-semibold">{d.value}</span>
                                                <span className="text-xs text-gray-500">{d.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-2xl font-bold text-blue-500 mb-2">
                                        {pkg.price} <span className="text-base text-gray-400 line-through font-normal">{pkg.oldPrice}</span>
                                    </div>
                                    <ul className="list-disc pl-5 mb-4 text-gray-700">
                                        {pkg?.benefits &&pkg?.benefits?.map((b) => (
                                            <li key={b}>{b}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-wrap gap-3 mt-4">
                                    <button className="bg-green-100 text-green-700 font-semibold rounded-full px-5 py-2 text-base">₹ Consultation Fee</button>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2 text-base">Book Appointment</button>
                                    <button className="border-2 border-blue-600 text-blue-600 font-semibold rounded-full px-6 py-2 text-base bg-white">View Profile</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {data?.healthProfile?.packages.length > 3 && (
                        <div className="flex justify-center mt-8">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-3 text-lg shadow-md">View All</button>
                        </div>
                    )}
                </section>
            </div>

            {/* Location & Contact Section (moved here) */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <h2 className="text-3xl font-extrabold text-blue-700 mb-8 flex items-center gap-3">
                    <MapPin className="w-8 h-8 text-pink-500" />
                    Location & Contact
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Map View Card */}
                    <div className="bg-slate-100 rounded-2xl p-10 flex flex-col justify-center items-start min-h-[260px]">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-4xl">🌍</span>
                            <div className="text-xl font-bold text-slate-800">Interactive<br />Map View</div>
                        </div>
                        <div className="mt-6 text-lg text-slate-500 font-semibold">GARG ENT<br />&MULTISPECIALTY<br />HOSPITAL</div>
                    </div>
                    {/* Contact Info Card */}
                    <div className="bg-slate-100 rounded-2xl p-10 min-h-[260px] flex flex-col justify-center">
                        <div className="text-2xl font-bold text-slate-900 mb-6">Contact Information</div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full"><MapPin className="w-6 h-6 text-blue-600" /></div>
                            <div>
                                <div className="font-bold text-slate-800">Address:</div>
                                <div className="text-slate-700">{data?.otherData?.address} {data?.otherData?.location}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full"><Phone className="w-6 h-6 text-blue-600" /></div>
                            <div>
                                <div className="font-bold text-slate-800">Phone:</div>
                                <div className="text-slate-700">{data?.otherData?.phone}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-full"><MessageCircle className="w-6 h-6 text-blue-600" /></div>
                            <div>
                                <div className="font-bold text-slate-800">Email:</div>
                                <div className="text-slate-700">{data?.otherData?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials (upgraded to match reference) */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <h2 className="text-3xl font-extrabold text-blue-700 mb-8 flex items-center gap-3">
                    <Star className="w-8 h-8 text-yellow-400" />
                    Patient Reviews & Testimonials
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {data?.healthProfile?.reviews && data?.healthProfile?.reviews?.map((t, i) => (
                        <div key={i} className="bg-slate-100 rounded-2xl p-10 border-l-4 border-blue-400 flex flex-col justify-between min-h-[220px]">
                            <div className="text-4xl text-blue-300 mb-2">“”</div>
                            <div className="text-lg text-slate-700 font-medium mb-4">{t.comment}</div>
                            <div className="flex items-center gap-2 mt-auto">
                                <span className="text-yellow-400 text-xl">{'★'.repeat(t.rating) + (t.rating < 5 ? '☆'.repeat(5 - t.rating) : '')}</span>
                                <span className="text-slate-500 font-semibold ml-2">{t.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <section className="rounded-xl p-6 md:p-10 shadow-md bg-[#1573ad] text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                        <HelpCircle className="w-6 h-6 text-white" />
                        Frequently Asked Questions
                    </h2>
                    <div className="flex flex-col gap-4">
                        {data?.healthProfile?.faqs && data?.healthProfile?.faqs?.map((f, i) => (
                            <div key={i} className="bg-white text-[#1573ad] rounded-xl shadow-md border-l-4 border-blue-400 overflow-hidden">
                                <button
                                    className="w-full flex justify-between items-center p-5 font-semibold text-left focus:outline-none"
                                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                                >
                                    <span>{f.q}</span>
                                    <ChevronDown
                                        className={`w-6 h-6 text-blue-500 transition-transform ${openFAQ === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`px-5 pb-4 text-base transition-all duration-300 ${openFAQ === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                                >
                                    {f.a}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Support */}
            <div className="max-w-7xl mx-auto mt-12 px-2 mb-12">
                <section className="rounded-xl p-6 md:p-10 shadow-md bg-[#1573ad] text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                        <Headphones className="w-6 h-6 text-white" />
                        Need Help or Support?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <a
                            href="#"
                            className="bg-white border-2 border-blue-400 text-[#1573ad] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:scale-105 hover:shadow-blue-200 transition"
                        >
                            <div className="text-4xl mb-3">💬</div>
                            <div className="font-bold text-lg mb-1">Chat on WhatsApp</div>
                            <div className="text-base text-blue-500">Quick responses</div>
                        </a>
                        <a
                            href="#"
                            className="bg-white border-2 border-blue-400 text-[#1573ad] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:scale-105 hover:shadow-blue-200 transition"
                        >
                            <div className="text-4xl mb-3">📞</div>
                            <div className="font-bold text-lg mb-1">Call Support</div>
                            <div className="text-base text-blue-500">9am - 8pm</div>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
