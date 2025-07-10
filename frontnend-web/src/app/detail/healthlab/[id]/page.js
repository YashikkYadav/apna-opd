"use client";

import { useState, useEffect } from "react";
import {
    MapPin,
    CheckCircle2,
    Star,
    Search as SearchIcon,
    Filter,
    Home,
    FlaskConical,
    Clock,
    User,
    ChevronDown,
    Phone,
    MessageCircle,
    Package as PackageIcon,
    ClipboardList,
    BadgeCheck,
    FileText,
    X,
    Headphones,
} from "lucide-react";
import Image from 'next/image';
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
    const [res_data, set_res_data] = useState({
        healthProfile: null, otherData: null
    })
    // Fetch data from API and set all state
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data/`)
                const { healthServeProfile, healthServeUser, statusCode } = response?.data?.healthServeProfileData
                set_res_data({
                    healthProfile: healthServeProfile, otherData: healthServeUser
                })
                console.log("response", healthServeProfile, healthServeUser, response?.data, statusCode === 201)

                setLabInfo(healthServeUser)
                const data = healthServeProfile
                if (statusCode === 201) {
                    setTestsData(data?.tests || []);
                    setPackagesData(data?.packages || []);
                    setReviewsData(data?.reviews || []);
                    setFaqData(data?.faqs || []);
                    setLabInfo(data?.labInfo || {});
                    setCertifications(data?.certifications || []);
                    setHighlights(data?.highlights || []);
                } else {
                    setError('Failed to load healthlab data');
                }
            } catch (err) {
                setError('Failed to load healthlab data: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [reloadFlag]);

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
        <div className="min-h-screen bg-[#f6fafd]">
            {/* Hero Section */}
            <section className="relative bg-[#1573ad] text-white py-12 overflow-hidden rounded-b-3xl shadow-xl mb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="max-w-6xl mx-auto rounded-3xl shadow-2xl bg-[#1573ad] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                        {/* Background Circles */}
                        <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-300/30 rounded-full z-0" />
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-300/30 rounded-full z-0" />

                        {/* Lab Image */}
                        <div className="relative z-10 flex-shrink-0">
                            <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-gradient-to-tr from-pink-500 to-yellow-300 flex items-center justify-center text-6xl font-bold text-white shadow-lg relative overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center"
                                    alt="HealthLab Diagnostics"
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
                            <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">{res_data?.otherData?.name}</h1>
                            <h2 className="text-xl md:text-2xl font-semibold mt-2">Advanced Diagnostics & Pathology</h2>
                            <div className="flex flex-wrap gap-4 my-4">
                                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                                    <MapPin className="w-5 h-5" />
                                    <span>{res_data?.otherData?.location} {res_data?.otherData?.address}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                                    <Star className="w-5 h-5 text-yellow-300" />
                                    {getAverageRating(res_data?.healthProfile?.reviews) || 0}/5 • {res_data?.healthProfile?.reviews?.length || 0} Reviews
                                </div>
                            </div>
                            <p className="mt-2 mb-4 text-lg opacity-90">
                                Advanced diagnostics with cutting-edge technology • Blood Tests • Imaging • At-home Sample Collection
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-6 py-3 flex items-center gap-2 shadow-lg transition text-base" onClick={() => { setShowModal(true); setModalTest(null); }}>
                                    <ClipboardList className="w-4 h-4" /> Book Test
                                </button>
                                <a href="#packages" className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-6 py-3 flex items-center gap-2 backdrop-blur transition text-base">
                                    <PackageIcon className="w-4 h-4" /> Browse Packages
                                </a>
                                <a 
                                    href={`tel:${res_data?.otherData?.phone}`}
                                >
                                    <button className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-6 py-3 flex items-center gap-2 backdrop-blur transition text-base">
                                        <Phone className="w-4 h-4" /> Call Now
                                    </button>
                                </a>
                                <a
                                    href={`https://wa.me/91${res_data?.otherData?.phone}`} // Replace with your actual WhatsApp number (with country code, no + or dashes)
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="bg-white/20 text-white border-2 border-white/30 font-semibold rounded-full px-6 py-3 flex items-center gap-2 backdrop-blur transition text-base">
                                        <MessageCircle className="w-4 h-4" /> WhatsApp
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="bg-[#1573ad] text-white rounded-3xl shadow-lg -mt-8 pb-12 pt-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3"><FlaskConical className="w-8 h-8 text-pink-300" /> About HealthLab Diagnostics</h2>
                    <p className="text-lg text-blue-100 mb-6">
                        Leading healthcare diagnostics provider with over 15 years of excellence in pathology and radiology services. We combine state-of-the-art technology with expert medical professionals to deliver accurate and timely results.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 mt-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-3">Certifications & Accreditations</h3>
                            <div className="flex flex-wrap gap-3">
                                {certifications.map((cert) => (
                                    <span key={cert} className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border-2 border-white/30">{cert}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 border-2 border-blue-300">
                            <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                            <div className="flex flex-col gap-4">
                                {highlights.map((h) => (
                                    <div key={h.title} className="flex items-center gap-4 bg-white/20 rounded-lg p-3 shadow-sm">
                                        {h.icon}
                                        <div>
                                            <div className="font-semibold text-white">{h.title}</div>
                                            <div className="text-xs text-blue-100">{h.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Search Bar */}
            <div className="sticky top-0 z-30 bg-[#1573ad] shadow-md py-4">
                <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            className="w-full py-3 pl-5 pr-12 border-2 border-blue-200 rounded-xl text-lg focus:outline-none focus:border-pink-400 shadow-sm bg-white text-blue-900 placeholder-blue-400"
                            placeholder="Search for tests, packages, or health conditions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 w-6 h-6" />
                    </div>
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <select className="filter-select py-2 px-4 border-2 border-blue-200 rounded-lg bg-white text-base text-blue-900" value={testType} onChange={e => setTestType(e.target.value)}>
                            <option value="">All Test Types</option>
                            <option value="blood">Blood Tests</option>
                            <option value="urine">Urine Tests</option>
                            <option value="hormonal">Hormonal</option>
                            <option value="imaging">Imaging</option>
                        </select>
                        <select className="filter-select py-2 px-4 border-2 border-blue-200 rounded-lg bg-white text-base text-blue-900" value={price} onChange={e => setPrice(e.target.value)}>
                            <option value="">All Prices</option>
                            <option value="0-500">₹0 - ₹500</option>
                            <option value="500-1000">₹500 - ₹1000</option>
                            <option value="1000-2000">₹1000 - ₹2000</option>
                            <option value="2000">₹2000+</option>
                        </select>
                        <select className="filter-select py-2 px-4 border-2 border-blue-200 rounded-lg bg-white text-base text-blue-900" value={location} onChange={e => setLocation(e.target.value)}>
                            <option value="">All Locations</option>
                            <option value="home">Home Collection</option>
                            <option value="lab">Lab Visit</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tabs for Tests/Packages */}
            <div className="container mx-auto px-4 max-w-6xl mt-10">
                <div className="flex border-b-2 border-blue-200 mb-8">
                    <button
                        className={classNames(
                            "px-6 py-3 font-semibold text-lg border-b-4 transition-all rounded-t-2xl",
                            tab === 'tests' ? "border-pink-500 text-pink-600 bg-pink-100" : "border-transparent text-blue-100 hover:text-pink-600"
                        )}
                        onClick={() => setTab('tests')}
                    >
                        Individual Tests
                    </button>
                    <button
                        className={classNames(
                            "px-6 py-3 font-semibold text-lg border-b-4 transition-all rounded-t-2xl",
                            tab === 'packages' ? "border-pink-500 text-pink-600 bg-pink-100" : "border-transparent text-blue-100 hover:text-pink-600"
                        )}
                        onClick={() => setTab('packages')}
                    >
                        Test Packages
                    </button>
                </div>

                {/* Individual Tests Tab */}
                {tab === 'tests' && (
                    <div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-blue-100 mb-1">Diagnostic Tests</h2>
                                <p className="text-blue-200">Choose from our comprehensive range of diagnostic tests</p>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button className="bg-pink-100 text-pink-700 font-semibold px-4 py-2 rounded-lg">Grid View</button>
                                <button className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg">List View</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-6">
                            {filteredTests.map((test) => {
                                const discount = Math.round((1 - test.discountedPrice / test.originalPrice) * 100);
                                return (
                                    <div key={test.id} className="bg-white rounded-2xl p-6 shadow-md border-2 border-blue-300 hover:border-pink-400 transition-all flex flex-col justify-between">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <div className="text-lg font-bold text-blue-900 mb-1">{test.name}</div>
                                                {test.popular && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">Popular</span>}
                                            </div>
                                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 text-white text-2xl text-center">{test.icon}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-slate-500 text-sm mb-3">
                                            <div className="flex items-center gap-2"><FlaskConical className="w-4 h-4" /> {test.sampleType}</div>
                                            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {test.reportTime}</div>
                                            <div className="flex items-center gap-2">{test.homeCollection ? <Home className="w-4 h-4" /> : <User className="w-4 h-4" />} {test.homeCollection ? 'Home Collection' : 'Lab Visit'}</div>
                                            <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Digital Report</div>
                                        </div>
                                        <div className="flex items-center justify-between border-t pt-4 mt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-emerald-600 font-bold text-lg">₹{test.discountedPrice}</span>
                                                <span className="line-through text-slate-400 text-base">₹{test.originalPrice}</span>
                                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">{discount}% OFF</span>
                                            </div>
                                            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-4 py-2 flex items-center gap-2 shadow transition" onClick={() => { setShowModal(true); setModalTest(test.name); }}>
                                                <ClipboardList className="w-4 h-4" /> Book Test
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Test Packages Tab */}
                {tab === 'packages' && (
                    <div id="packages">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-blue-100 mb-1">Health Packages</h2>
                            <p className="text-blue-200">Comprehensive health checkup packages at discounted rates</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 mt-6">
                            {packagesData.map((pkg, idx) => {
                                const discount = Math.round((1 - pkg.discountedPrice / pkg.originalPrice) * 100);
                                return (
                                    <div key={pkg.id} className="bg-white rounded-2xl p-7 shadow-md border-2 border-blue-300 hover:border-pink-400 transition-all flex flex-col justify-between mb-4">
                                        <div className="grid grid-cols-[1fr_auto] gap-4 items-start mb-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-blue-900 mb-1 flex items-center gap-2">{pkg.name} {pkg.popular && <Star className="w-4 h-4 text-yellow-400" />}</h3>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FlaskConical className="w-3 h-3" /> {pkg.testsCount} Parameters</span>
                                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><User className="w-3 h-3" /> {pkg.recommendedFor}</span>
                                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> {pkg.reportTime}</span>
                                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Home className="w-3 h-3" /> Home Collection</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-emerald-600 font-bold text-xl">₹{pkg.discountedPrice}</div>
                                                <div className="text-slate-400 line-through text-sm">₹{pkg.originalPrice}</div>
                                                <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold inline-block mt-1">{discount}% OFF</div>
                                                <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-4 py-2 flex items-center gap-2 shadow transition mt-3 w-full" onClick={() => { setShowModal(true); setModalTest(pkg.name); }}>
                                                    <ClipboardList className="w-4 h-4" /> Book Package
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-4 mt-2">
                                            <button className="flex justify-between items-center w-full font-semibold text-pink-600" onClick={() => setOpenPackage(openPackage === pkg.id ? null : pkg.id)}>
                                                <span>Tests Included ({pkg.testsCount})</span>
                                                <ChevronDown className={classNames("w-5 h-5 transition-transform", openPackage === pkg.id ? "rotate-180" : "")} />
                                            </button>
                                            <div className={classNames("grid grid-cols-2 gap-2 mt-2 transition-all overflow-hidden", openPackage === pkg.id ? "max-h-40" : "max-h-0")}
                                                style={{ transition: 'max-height 0.3s', maxHeight: openPackage === pkg.id ? 200 : 0 }}>
                                                {Array.isArray(pkg.tests) && pkg.tests.map((test, testIndex) => (
                                                    <div key={`${pkg.id}-test-${testIndex}-${test}`} className="bg-white px-3 py-1 rounded text-xs text-blue-700 border border-blue-200">{test}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Patient Reviews Section */}
            <section className="bg-[#1573ad] py-12 mt-12 rounded-3xl shadow-xl">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><MessageCircle className="w-6 h-6 text-white" /> Patient Reviews</h2>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button className="bg-white/20 text-white font-semibold px-4 py-2 rounded-full">All Reviews</button>
                        <button className="bg-white/20 text-white font-semibold px-4 py-2 rounded-full">Blood Tests</button>
                        <button className="bg-white/20 text-white font-semibold px-4 py-2 rounded-full">Packages</button>
                        <button className="bg-white/20 text-white font-semibold px-4 py-2 rounded-full">Home Collection</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {reviewsData.map((review) => (
                            <div key={review.id} className="bg-white rounded-xl p-6 border-l-4 border-pink-400 shadow-md">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-blue-900 mb-1">{review.name}</h4>
                                        <small className="text-slate-500">Booked: {review.test}</small>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex gap-1 text-yellow-400 text-lg">
                                            {Array.from({ length: review.rating }).map((_, i) => <Star key={`${review.id}-star-${i}`} className="w-4 h-4" fill="currentColor" />)}
                                        </div>
                                        <small className="text-slate-400">{review.date}</small>
                                    </div>
                                </div>
                                <p className="text-slate-700 mt-2">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location & Contact Section (new, above FAQ) */}
            <section className="max-w-6xl mx-auto mt-12 px-4">
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
                        <div className="mt-6 text-lg text-slate-500 font-semibold">
                            {(res_data?.otherData?.name ? res_data?.otherData?.name.toUpperCase() : '')}<br />
                            {(res_data?.otherData?.location ? res_data?.otherData?.location.toUpperCase() : '')}
                        </div>
                    </div>
                    {/* Contact Info Card */}
                    <div className="bg-slate-100 rounded-2xl p-10 min-h-[260px] flex flex-col justify-center">
                        <div className="text-2xl font-bold text-slate-900 mb-6">Contact Information</div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full"><MapPin className="w-6 h-6 text-blue-600" /></div>
                            <div>
                                <div className="font-bold text-slate-800">Address:</div>
                                <div className="text-slate-700">{res_data?.otherData?.location ? res_data?.otherData?.location.toUpperCase() : ''}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full"><Phone className="w-6 h-6 text-blue-600" /></div>
                            <div>
                                <div className="font-bold text-slate-800">Phone:</div>
                                <div className="text-slate-700">{res_data?.otherData?.phone}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-full"><MessageCircle className="w-6 h-6 text-blue-600" /></div>
                            <div>
                                <div className="font-bold text-slate-800">Email:</div>
                                <div className="text-slate-700">{res_data?.otherData?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-[#1573ad] py-12 mt-12 rounded-3xl shadow-xl">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><PackageIcon className="w-6 h-6 text-white" /> Frequently Asked Questions</h2>
                    <div className="flex flex-col gap-4">
                        {faqData.map((faq, i) => (
                            <div key={`faq-${i}-${faq.question.substring(0, 20)}`} className="bg-white rounded-xl shadow-md border-l-4 border-pink-400 overflow-hidden">
                                <button
                                    className="w-full flex justify-between items-center p-5 font-semibold text-left focus:outline-none"
                                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown className={classNames("w-6 h-6 text-pink-500 transition-transform", openFAQ === i ? "rotate-180" : "")} />
                                </button>
                                <div className={classNames("px-5 pb-4 text-base transition-all duration-300", openFAQ === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0", "overflow-hidden")}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fadeIn">
                        <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-700" onClick={() => setShowModal(false)}><X className="w-6 h-6" /></button>
                        <h3 className="text-2xl font-bold text-blue-700 mb-4">Book {modalTest ? modalTest : "a Test"}</h3>
                        {/* Add the rest of your modal content here, e.g. form fields, buttons, etc. */}
                    </div>
                </div>
            )}
        </div>
    );
}