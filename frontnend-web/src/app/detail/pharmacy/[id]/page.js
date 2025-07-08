"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
    Search,
    Phone,
    MessageCircle,
    Clock,
    MapPin,
    Star,
    ShoppingCart,
    Filter,
    Check,
    Plus,
    Minus,
    X,
    RefreshCw,
} from "lucide-react";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import axios from "axios";



const PharmacyStorePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("name");
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState("delivery");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const params = useParams();
    const id = params.id;
    // Dynamic data state
    const [data, setData] = useState({
        features: [],
        medicines: [],
        reviews: [],
        faqs: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [lastUpdate, setLastUpdate] = useState(null);
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);
    const [dataVersion, setDataVersion] = useState(0); // Force re-renders
    const [res_data, set_res_data] = useState({
        healthProfile: null, otherData: null
    })
    // useEffect(() => {
    //     const fetchData = async () => {


    //     }
    //     fetchData()
    // }, [])
    const categories = ["All", "Tablet", "Syrup", "Injection", "OTC", "Ayurvedic"];
    const timeSlots = [
        "9:00 AM - 12:00 PM",
        "12:00 PM - 3:00 PM",
        "3:00 PM - 6:00 PM",
        "6:00 PM - 9:00 PM",
    ];

    const fetchData = useCallback(async (showNotification = true) => {
        try {
            console.log('🔄 Fetching pharmacy data...');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data/`)
            const { healthServeProfile, healthServeUser,statusCode } = response?.data?.healthServeProfileData
            set_res_data({
                healthProfile: healthServeProfile, otherData: healthServeUser
            })
            console.log("response", healthServeProfile, healthServeUser,response?.data,statusCode===201)
            // const response = await fetch('http://localhost:3000/api/pharmacy', {
            //     cache: 'no-store',
            //     headers: {
            //         'Cache-Control': 'no-cache',
            //         'Pragma': 'no-cache'
            //     }
            // });

            if (statusCode===201) {
      

                setData(healthServeProfile);
                setDataVersion(prev => prev + 1); // Force re-render

                

                setLastUpdate(new Date());

                // Show update notification
                if (showNotification) {
                    setShowUpdateNotification(true);
                    setTimeout(() => setShowUpdateNotification(false), 3000);
                }
            } else {
                console.error('❌ Failed to fetch data:', response.status);
                setError('Failed to load pharmacy data');
            }
        } catch (error) {
            console.error('💥 Error fetching pharmacy data:', error);
            setError('Failed to load pharmacy data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(false);

        // Auto-refresh every 10 seconds
        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval);
    }, [fetchData]);

    const filteredMedicines = useMemo(() => {
        let filtered = data.medicines.filter((medicine) => {
            const matchesSearch =
                medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.salt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" || medicine.category === selectedCategory;
            const matchesStock = !showInStockOnly || medicine.inStock;
            const matchesDiscount = !showDiscountedOnly || medicine.discount > 0;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock &&
                matchesDiscount
            );
        });

        // Sort medicines
        if (sortBy === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "price") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "discount") {
            filtered.sort((a, b) => b.discount - a.discount);
        }

        return filtered;
    }, [data.medicines, searchTerm, selectedCategory, showInStockOnly, showDiscountedOnly, sortBy, dataVersion]);

    const addToCart = (medicine) => {
        const existingItem = cart.find((item) => item.id === medicine.id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === medicine.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...medicine, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            setCart(cart.filter((item) => item.id !== id));
        } else {
            setCart(
                cart.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const acceptsPrescriptions = data.features.some(
        f => f.label && f.label.trim().toLowerCase() === 'accepts prescriptions' && f.enabled
    );
    console.log('Features:', data.features, 'Accepts Prescriptions:', acceptsPrescriptions);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f6fafd] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading pharmacy data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#f6fafd] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
                    <button
                        onClick={() => fetchData()}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f6fafd] py-6 px-2 md:px-0">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto rounded-3xl shadow-2xl bg-[#1573ad] p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden mt-6">
                {/* Background Circles */}
                <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-300/30 rounded-full z-0" />
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-300/30 rounded-full z-0" />
                {/* Pharmacy Image Frame */}
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-gradient-to-tr from-blue-500 to-green-200 flex items-center justify-center text-6xl font-bold text-white shadow-lg relative overflow-hidden">
                    <Image
                        src="/pharmacy-image.jpg" // Replace with your pharmacy image path
                        alt="Pharmacy"
                        width={288}
                        height={288}
                        className="object-cover w-full h-full rounded-2xl"
                        priority
                    />
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-base border-2 border-white">
                        ✓
                    </span>
                </div>
                {/* Pharmacy Info */}
                <div className="relative z-10 flex-1 flex flex-col justify-center text-white w-full md:w-auto">
                    <div className="flex items-center justify-between mb-4">
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">{res_data?.otherData?.name}</h1>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchData()}
                                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors disabled:opacity-50"
                                title="Refresh data"
                            >
                                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                            </button>
                            {lastUpdate && (
                                <span className="text-sm text-blue-100">
                                    Last updated: {lastUpdate.toLocaleTimeString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 mb-4">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                            <Check size={14} />
                            Verified
                        </div>
                        <div className="flex items-center gap-2 text-blue-100">
                            <MapPin size={16} />
                            <span>{res_data?.otherData?.address} {res_data?.otherData?.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-100">
                            <Clock size={16} />
                            <span>Open: 8:00 AM - 11:00 PM</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {data.features.filter(f => f.enabled).map((feature, index) => (
                            <span key={`${feature.label}-${index}-${dataVersion}`} className="bg-green-500 px-3 py-1 rounded-full text-sm">
                                {feature.label}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button className="bg-white text-blue-700 font-semibold rounded-full px-8 py-3 flex items-center gap-2 shadow-lg transition text-lg">
                            <ShoppingCart className="w-5 h-5" />
                            Order Medicines
                        </button>
                        <button className="bg-blue-500 text-white font-semibold rounded-full px-8 py-3 flex items-center gap-2 shadow-lg transition text-lg">
                            <Phone className="w-5 h-5" />
                            Call Now
                        </button>
                    </div>
                </div>
            </div>

            {/* About & Services Section */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingCart className="w-8 h-8 text-blue-600" />
                    <h2 className="text-4xl font-extrabold text-blue-700">About {res_data?.otherData?.name}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* About Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-7 text-gray-800">
                        <h3 className="text-2xl font-bold text-blue-700 mb-3">About</h3>
                        <p className="text-base leading-relaxed">
                            Serving the Jaipur community for over 15 years, MediPlus Pharmacy is your trusted healthcare partner. We specialize in providing genuine medicines at affordable prices with fast delivery across the city.
                        </p>
                    </div>
                    {/* Services Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-7 text-gray-800">
                        <h3 className="text-2xl font-bold text-blue-700 mb-3">Services Offered</h3>
                        <ul className="text-base leading-relaxed space-y-1">
                            <li>• Allopathic Medicines</li>
                            <li>• Ayurvedic Products</li>
                            <li>• Surgical Equipment</li>
                            <li>• Home Delivery</li>
                        </ul>
                        <h3 className="text-2xl font-bold text-blue-700 mt-6 mb-3">Partnerships</h3>
                        <ul className="text-base leading-relaxed space-y-1">
                            <li>• SMS Hospital</li>
                            <li>• Fortis Healthcare</li>
                            <li>• Local Clinics Network</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Search & Filters Section */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <div className="bg-white rounded-2xl shadow-2xl p-7 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search medicines by name, salt, or condition..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price">Sort by Price</option>
                                <option value="discount">Sort by Discount</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={showInStockOnly}
                                onChange={(e) => setShowInStockOnly(e.target.checked)}
                                className="rounded"
                            />
                            <span className="text-sm">In Stock Only</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={showDiscountedOnly}
                                onChange={(e) => setShowDiscountedOnly(e.target.checked)}
                                className="rounded"
                            />
                            <span className="text-sm">Discounted Items</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Medicine Catalog Section */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingCart className="w-8 h-8 text-blue-600" />
                    <h2 className="text-4xl font-extrabold text-blue-700">Available Medicines</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMedicines.map((medicine) => (
                        <div
                            key={medicine.id}
                            className="relative bg-white rounded-2xl border-2 border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between min-h-[420px]"
                        >
                            {/* Discount Badge */}
                            {medicine.discount > 0 && (
                                <span className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full z-10">
                                    {medicine.discount}% OFF
                                </span>
                            )}
                            {/* Title */}
                            <h3 className="text-lg font-bold text-blue-900 uppercase mb-2 tracking-wide">
                                {medicine.name}
                            </h3>
                            {/* Details Row */}
                            <div className="flex items-center gap-4 mb-2 text-blue-700 text-sm font-medium">
                                <Clock className="w-4 h-4" />
                                <span>60 mins</span>
                                <span className="mx-2">|</span>
                                <MapPin className="w-4 h-4" />
                                <span>{medicine.category}</span>
                                <span className="mx-2">|</span>
                                <span>{medicine.packSize}</span>
                            </div>
                            {/* Price Row */}
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-bold text-blue-700">₹{medicine.price}</span>
                                <span className="text-gray-400 line-through font-semibold">₹{medicine.mrp}</span>
                            </div>
                            {/* Features List */}
                            <ul className="mb-4 text-gray-700 text-sm list-disc pl-5">
                                <li>Salt: {medicine.salt}</li>
                                <li>Manufacturer: {medicine.manufacturer}</li>
                                <li>{medicine.inStock ? 'In Stock' : 'Out of Stock'}</li>
                            </ul>
                            {/* Buttons */}
                            <div className="flex flex-col gap-2 mt-auto">
                                <button className="bg-green-100 text-green-800 font-semibold rounded-full py-2">
                                    ₹ Consultation Fee
                                </button>
                                <button
                                    onClick={() => addToCart(medicine)}
                                    disabled={!medicine.inStock}
                                    className="bg-blue-600 text-white font-bold rounded-full py-2 hover:bg-blue-700 transition disabled:bg-gray-300 disabled:text-gray-500"
                                >
                                    Book Appointment
                                </button>
                                <button className="border-2 border-blue-600 text-blue-700 font-bold rounded-full py-2 hover:bg-blue-50 transition">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.features.map((feature, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${feature.enabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-3 ${feature.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                <span className={`font-medium ${feature.enabled ? 'text-green-800' : 'text-gray-600'}`}>
                                    {feature.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Prescription Upload Section - Only show if "Accepts Prescriptions" is enabled */}
            {acceptsPrescriptions && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Prescription</h2>
                    <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-blue-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="text-lg font-medium text-blue-900 mb-2">
                            Upload your prescription
                        </div>
                        <p className="text-blue-700 mb-4">
                            We accept prescriptions in PDF, JPG, or PNG format. Maximum file size: 5MB.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Choose File
                            </button>
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Take Photo
                            </button>
                        </div>
                        <div className="mt-4 text-sm text-blue-600">
                            <p>• Supported formats: PDF, JPG, PNG</p>
                            <p>• Maximum file size: 5MB</p>
                            <p>• `Well process your prescription within 24 hours`</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Reviews Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-2">
                        <span className="text-4xl">⭐</span> Patient Reviews & Testimonials
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-[#fafdff] border-2 border-blue-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between min-h-[220px] relative"
                        >
                            {/* Blue Quote Icon */}
                            <div className="absolute top-6 left-6 text-blue-300 text-3xl font-serif select-none">s</div>
                            {/* Review Text */}
                            <blockquote className="italic text-gray-800 mb-6 mt-2 z-10 relative text-lg">
                                {review.review}
                            </blockquote>
                            {/* Meta Row */}
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="flex items-center text-yellow-400 text-base">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="font-bold text-gray-700 ml-2">{review.name}</span>
                                <span className="text-gray-500 font-semibold">• {review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Location & Contact Section */}
            <div className="max-w-7xl mx-auto mt-12 px-2">
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-2 flex items-center gap-3">
                        <MapPin className="w-8 h-8 text-pink-500" /> Location & Contact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left: Map View & Address */}
                        <div className="bg-[#f4f8fc] rounded-2xl p-8 flex flex-col items-start gap-6 min-h-[260px]">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">📍</span>
                                <div className="font-bold text-xl text-gray-800">Interactive<br />Map View</div>
                            </div>
                            <div className="font-bold text-lg text-gray-600 mt-4">{res_data?.otherData?.name}</div>
                            <div className="text-gray-500 font-semibold text-base">{res_data?.otherData?.address} {res_data?.otherData?.location}</div>
                        </div>
                        {/* Right: Contact Info */}
                        <div className="bg-[#f4f8fc] rounded-2xl p-8 flex flex-col gap-6 min-h-[260px]">
                            <div className="font-bold text-2xl text-gray-800 mb-2">Contact Information</div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="bg-blue-100 text-blue-600 rounded-full p-3 flex items-center justify-center">
                                    <MapPin className="w-6 h-6" />
                                </span>
                                <div>
                                    <div className="font-semibold text-gray-700">Address:</div>
                                    <div className="text-gray-600">{res_data?.otherData?.address} {res_data?.otherData?.location}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="bg-blue-100 text-blue-600 rounded-full p-3 flex items-center justify-center">
                                    <Phone className="w-6 h-6" />
                                </span>
                                <div>
                                    <div className="font-semibold text-gray-700">Phone:</div>
                                    <div className="text-gray-600">{res_data?.otherData?.phone}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="bg-blue-100 text-blue-600 rounded-full p-3 flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6" />
                                </span>
                                <div>
                                    <div className="font-semibold text-gray-700">Email:</div>
                                    <div className="text-gray-600">{res_data?.otherData?.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="w-full bg-[#1780b6] py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-2">
                        <span className="text-3xl">❓</span> Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {data.faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="bg-white border-2 border-blue-400 rounded-2xl shadow-sm px-6 py-4 cursor-pointer group transition-all duration-200"
                            >
                                <summary className="flex items-center justify-between text-blue-800 font-semibold text-lg select-none group-open:text-blue-600">
                                    {faq.q}
                                    <span className="ml-2 text-blue-600 group-open:rotate-180 transition-transform">
                                        ▼
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-700 text-base leading-relaxed">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact & Support Section */}
            <div className="w-full bg-[#1780b6] py-16 rounded-2xl mt-12">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 flex items-center gap-3">
                        <span className="inline-block bg-white/20 rounded-full p-2">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M6 8V7a6 6 0 1112 0v1M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        Need Help or Support?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* WhatsApp Card */}
                        <div className="bg-white rounded-2xl border-2 border-blue-300 shadow-md flex flex-col items-center py-10 px-6 text-center transition hover:shadow-lg">
                            <span className="mb-4">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="24" rx="24" ry="24" fill="url(#chatGradient)" /><path d="M34 32.5c-1.1 0-2.2-.2-3.2-.6-1-.4-2-.9-2.9-1.6l-1.1-.8c-.3-.2-.7-.2-1 0l-2.1 1.2c-2.2-1.1-4.1-2.9-5.2-5.2l1.2-2.1c.2-.3.2-.7 0-1l-.8-1.1c-.7-.9-1.2-1.9-1.6-2.9-.4-1-.6-2.1-.6-3.2 0-1.1.2-2.2.6-3.2.4-1 .9-2 1.6-2.9.7-.9 1.6-1.6 2.6-2.1C22.1 8.2 23 8 24 8c1.1 0 2.2.2 3.2.6 1 .4 2 .9 2.9 1.6.9.7 1.6 1.6 2.1 2.6.5 1 .7 2.1.7 3.2 0 1.1-.2 2.2-.6 3.2-.4 1-.9 2-1.6 2.9l-.8 1.1c-.2.3-.2.7 0 1l1.2 2.1c-1.1 2.2-2.9 4.1-5.2 5.2l-2.1-1.2c-.3-.2-.7-.2-1 0l-.8 1.1c-.7.9-1.2 1.9-1.6 2.9-.4 1-.6 2.1-.6 3.2 0 1.1.2 2.2.6 3.2.4 1 .9 2 1.6 2.9.7.9 1.6 1.6 2.6 2.1C25.9 39.8 25 40 24 40z" fill="#B0B7C3" /></svg>
                            </span>
                            <div className="text-xl font-bold text-[#1877b7] mb-1">Chat on WhatsApp</div>
                            <div className="text-blue-500 text-base">Quick responses</div>
                        </div>
                        {/* Call Card */}
                        <div className="bg-white rounded-2xl border-2 border-blue-300 shadow-md flex flex-col items-center py-10 px-6 text-center transition hover:shadow-lg">
                            <span className="mb-4">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="24" rx="24" ry="24" fill="url(#phoneGradient)" /><path d="M33.7 31.3l-3.2-3.2c-.6-.6-1.5-.6-2.1 0l-1.1 1.1c-2.2-1.1-4.1-2.9-5.2-5.2l1.1-1.1c.6-.6.6-1.5 0-2.1l-3.2-3.2c-.6-.6-1.5-.6-2.1 0l-1.1 1.1c-1.1 2.2-2.9 4.1-5.2 5.2l1.1 1.1c.6.6.6 1.5 0 2.1l-3.2 3.2c-.6.6-.6 1.5 0 2.1z" fill="url(#phoneGradient2)" /></svg>
                            </span>
                            <div className="text-xl font-bold text-[#1877b7] mb-1">Call Support</div>
                            <div className="text-blue-500 text-base">9am - 8pm</div>
                        </div>
                    </div>
                </div>
                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="chatGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#b4c6f8" />
                            <stop offset="100%" stopColor="#c7b4f8" />
                        </linearGradient>
                        <linearGradient id="phoneGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#f857a6" />
                            <stop offset="100%" stopColor="#ff5858" />
                        </linearGradient>
                        <linearGradient id="phoneGradient2" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#f857a6" />
                            <stop offset="100%" stopColor="#ff5858" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Cart Modal */}
            {showCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-blue-700">Your Cart</h2>
                                <button
                                    onClick={() => setShowCart(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {cart.length === 0 ? (
                                <p className="text-gray-600 text-center py-8">Your cart is empty</p>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-6">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-blue-800">{item.name}</h3>
                                                    <p className="text-gray-600 text-sm">{item.salt}</p>
                                                    <p className="text-green-600 font-semibold">₹{item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t pt-4">
                                        <h3 className="text-xl font-bold mb-4 text-blue-700">Delivery Options</h3>
                                        <div className="space-y-3 mb-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="delivery"
                                                    value="delivery"
                                                    checked={deliveryOption === "delivery"}
                                                    onChange={(e) => setDeliveryOption(e.target.value)}
                                                />
                                                <span>Home Delivery (₹30)</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="delivery"
                                                    value="pickup"
                                                    checked={deliveryOption === "pickup"}
                                                    onChange={(e) => setDeliveryOption(e.target.value)}
                                                />
                                                <span>Store Pickup (Free)</span>
                                            </label>
                                        </div>

                                        {deliveryOption === "delivery" && (
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium mb-2">Select Time Slot:</label>
                                                <select
                                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                                    value={selectedTimeSlot}
                                                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                                >
                                                    <option value="">Choose time slot</option>
                                                    {timeSlots.map((slot) => (
                                                        <option key={slot} value={slot}>
                                                            {slot}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span>Subtotal:</span>
                                                <span>₹{cartTotal}</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span>Delivery:</span>
                                                <span>₹{deliveryOption === "delivery" ? 30 : 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                                                <span>Total:</span>
                                                <span>₹{cartTotal + (deliveryOption === "delivery" ? 30 : 0)}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                                                Cash on Delivery
                                            </button>
                                            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                                Pay Online
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Debug Panel - Remove in production */}
            <div className="fixed top-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
                <div className="font-bold mb-2">Debug Info:</div>
                <div>Features: {data.features.filter(f => f.enabled).length} enabled</div>
                <div>Medicines: {data.medicines.length} total</div>
                <div>Reviews: {data.reviews.length} total</div>
                <div>FAQs: {data.faqs.length} total</div>
                <div>Data Version: {dataVersion}</div>
                <div>Last Updated: {lastUpdate?.toLocaleTimeString() || 'Never'}</div>
            </div>

            {/* Update Notification */}
            {showUpdateNotification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-right">
                    <div className="flex items-center gap-2">
                        <Check size={16} />
                        <span>Data updated successfully!</span>
                    </div>
                </div>
            )}

            {/* Last Updated Info */}
            {lastUpdate && (
                <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs opacity-75">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                </div>
            )}
        </div>
    );
};

export default PharmacyStorePage; 