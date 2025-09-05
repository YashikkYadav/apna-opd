"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";

import PharmacyHero from "@/app/components/more/medicalStoreComponents/pharmacyHeroSection";
import PharmacyAbout from "@/app/components/more/medicalStoreComponents/pharmacyAbout";
import CartModal from "@/app/components/more/medicalStoreComponents/pharmacyCart";
import FAQSection from "@/app/components/more/medicalStoreComponents/pharmacyFaqs";
import FeatureHighlights from "@/app/components/more/medicalStoreComponents/pharmacyFeatures";
import PharmacyLocationCard from "@/app/components/more/medicalStoreComponents/pharmacyLocation";
import AvailableMedicines from "@/app/components/more/medicalStoreComponents/pharmacyMedicines";
import TestimonialsSection from "@/app/components/more/medicalStoreComponents/pharmacyReviews";
import MedicineFilterBar from "@/app/components/more/medicalStoreComponents/pharmacySearch";
import UploadPrescription from "@/app/components/more/medicalStoreComponents/pharmacyUpload";
import SupportOptions from "@/app/components/more/medicalStoreComponents/supportOptions";

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
    faqs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdate, setLastUpdate] = useState(null);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [dataVersion, setDataVersion] = useState(0); // Force re-renders
  const [res_data, set_res_data] = useState({
    healthProfile: null,
    otherData: null,
  });
  // useEffect(() => {
  //     const fetchData = async () => {

  //     }
  //     fetchData()
  // }, [])
  const categories = [
    "All",
    "Tablet",
    "Syrup",
    "Injection",
    "OTC",
    "Ayurvedic",
  ];
  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
  ];
  const [medicines, setMed] = useState(null);
  const fetchData = useCallback(
    async (showNotification = true) => {
      try {
        console.log("🔄 Fetching pharmacy data...");
        const response_data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile/profile-data`
        );
        console.log("Response Data:", response_data.data);

        const { healthServeProfile, healthServeUser } =
          response_data?.data?.healthServeProfileData;
        setMed(healthServeProfile?.medicines);
        console.log("med", medicines);
        set_res_data({
          healthProfile: healthServeProfile || null,
          otherData: healthServeUser || null,
        });
        console.log("healthServeProfile:", healthServeProfile);
        console.log("healthServeUser:", healthServeUser);
        console.log("response", healthServeProfile, healthServeUser);

        // if (statusCode === 201) {
        //     setData(healthServeProfile || {});
        //     setDataVersion(prev => prev + 1);
        //     setLastUpdate(new Date());

        //     // Show update notification
        //     if (showNotification) {
        //         setShowUpdateNotification(true);
        //         setTimeout(() => setShowUpdateNotification(false), 3000);
        //     }
        // } else {
        //     console.error('❌ Failed to fetch data:', response.status);
        //     setError(process.env.NEXT_CLIENT_PROFILE_COMING_SOON_MESSAGE);
        // }
      } finally {
        setLoading(false);
      }
    },
    [id, medicines]
  );
  useEffect(() => {
    fetchData(false);

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, [fetchData]);
  // console.log("aaaa",data)
  const filteredMedicines = useMemo(() => {
    let filtered = medicines?.filter((medicine) => {
      console.log(medicine);
      const matchesSearch = medicine?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // ||
      // medicine?.salt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || medicine?.category === selectedCategory;
      const matchesStock = !showInStockOnly || medicine?.stock > 0;
      const matchesDiscount = !showDiscountedOnly || medicine?.discount > 0;

      return (
        matchesSearch && matchesCategory && matchesStock && matchesDiscount
      );
    });

    // Sort medicines
    if (sortBy === "name") {
      filtered?.sort((a, b) => a?.name.localeCompare(b?.name));
    } else if (sortBy === "price") {
      filtered?.sort((a, b) => a?.price - b?.price);
    } else if (sortBy === "discount") {
      filtered?.sort((a, b) => b?.discount - a?.discount);
    }

    return filtered;
  }, [
    medicines,
    searchTerm,
    selectedCategory,
    showInStockOnly,
    showDiscountedOnly,
    sortBy,
  ]);

  const addToCart = (medicine) => {
    const existingItem = cart.find((item) => item?.id === medicine?.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === medicine?.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item?.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item?.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );
  const cartCount = cart.reduce((total, item) => total + item?.quantity, 0);

  const acceptsPrescriptions = data?.features.some(
    (f) =>
      f?.label &&
      f?.label.trim().toLowerCase() === "accepts prescriptions" &&
      f?.enabled
  );
  console.log(
    "Features:",
    data?.features,
    "Accepts Prescriptions:",
    acceptsPrescriptions
  );

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

  return res_data?.healthProfile ? (
    <div className="relative bg-white min-h-screen flex flex-col items-center">
      <main className="pt-[120px] px-4 pb-16 space-y-10 w-full">
        <div className="w-full">
          <PharmacyHero
            data={res_data?.otherData}
            healthProfile={res_data?.healthProfile}
          />
          <PharmacyAbout
            data={res_data?.otherData}
            healthProfile={res_data?.healthProfile}
          />
          <CartModal
            cart={cart}
            setCart={setCart}
            showCart={showCart}
            setShowCart={setShowCart}
            updateQuantity={updateQuantity}
            cartTotal={cartTotal}
            cartCount={cartCount}
          />
          <MedicineFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showInStockOnly={showInStockOnly}
            setShowInStockOnly={setShowInStockOnly}
            showDiscountedOnly={showDiscountedOnly}
            setShowDiscountedOnly={setShowDiscountedOnly}
            categories={categories}
          />
          <AvailableMedicines
            medicines={filteredMedicines}
            addToCart={addToCart}
            cart={cart}
            data={res_data?.otherData}
          />
          <FeatureHighlights
            data={res_data?.otherData}
            healthProfile={res_data?.healthProfile}
          />
          <PharmacyLocationCard
            data={res_data?.otherData}
            healthProfile={res_data?.healthProfile}
          />
          <TestimonialsSection
            data={res_data?.otherData}
            healthProfile={res_data?.healthProfile}
          />
          {acceptsPrescriptions && <UploadPrescription />}
          <FAQSection
            faqs={data?.faqs}
            healthProfile={res_data?.healthProfile}
          />
          {/* <SupportOptions data={res_data?.otherData} healthProfile={res_data?.healthProfile} /> */}
        </div>
      </main>
    </div>
  ) : (
    <div className="min-h-64 pt-[120px] flex items-center justify-center">
      <h1 className="text-3xl text-blue-800">
        We’re updating this profile to serve you better. Stay tuned!
      </h1>
    </div>
  );
};

export default PharmacyStorePage;
