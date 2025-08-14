"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InquiryModal from "./InquiryModal";
import RatingModal from "../../../components/common-components/RatingModal";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/app/config/axios";
import { message } from "antd";

const BannerCommon = ({ profileData, serviceType }) => {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const router = useRouter();

  const handleBackToListing = () => {
    if (mounted) {
      router.push(`/more/${serviceType}`);
    }
  };

  const handleHomeClick = () => {
    if (mounted) {
      router.push("/");
    }
  };

  const handleRatingSubmit = async ({ rating }) => {
    try {
      const response = await axiosInstance.post(`/health-serve/rating`, {
        healthServeId: profileData?._id,
        rating,
      });

      if (response.message && response) {
        toast.success("Rating submitted successfully");
        setShowRateModal(false);
      } else {
        toast.error("Failed to submit rating. Please try again.");
      }
    } catch (error) {
      console.log("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    }
  };

  if (!profileData) return null;

  return (
    <div className="bg-[#0B66A1] banner-with-search">
      <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto">
        <div className="flex flex-col pt-[60px] md:pt-[96px] pb-[60px] lg:pb-0">
          <div className="title-24 text-white flex mb-[56px] flex-col sm:flex-row gap-[10px] sm:gap-0">
            <span
              className="cursor-pointer mr-[10px]"
              onClick={handleHomeClick}
            >
              Home{" "}
            </span>
            {"  "}
            <Image
              className="-rotate-90 mx-[8px]"
              src="/images/down_arrow_white.svg"
              width={17}
              height={10}
              alt="Down Arrow"
            />
            <span className="cursor-pointer" onClick={handleBackToListing}>
              {serviceType
                .replace(/-/g, " ")
                .replace(/_/g, " ")
                .split(" ")
                ?.map((word) => word.charAt(0).toUpperCase() + word?.slice(1))
                .join(" ")}
            </span>{" "}
            <Image
              className="-rotate-90 mx-[8px]"
              src="/images/down_arrow_white.svg"
              width={17}
              height={10}
              alt="Down Arrow"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
            <div className="flex lg:mr-[20px]">
              <Image
                src={
                  profileData?.images && profileData?.images?.length
                    ? profileData?.images[0]?.url
                    : "/images/image_placeholder.svg"
                }
                width={504}
                height={608}
                alt={profileData?.name}
                className="h-[400px] md:h-[604px] object-cover rounded-t-[8px] rounded-b-[8px] lg:rounded-b-none"
              />
            </div>
            <div className="flex flex-col justify-center pb-[20px]">
              <div className="mb-[32px]">
                <h2 className="title-48 !text-white mb-[8px]">
                  {profileData?.name}
                </h2>
                <h5 className="title-24 text-white !font-medium capitalize">
                  {serviceType} Service
                </h5>
              </div>
              <div className="mb-[32px]">
                <h5 className="title-24 text-white mb-[8px]">
                  {serviceType || "Service Provider"}
                </h5>
                <p className="text-base text-white !font-normal">
                  {profileData?.location || "Address not available"}
                </p>
              </div>

              <div className="mb-[32px]">
                <h3 className="title-32 text-white">
                  {profileData?.price
                    ? `Service Cost: ₹${profileData?.price}`
                    : "Contact for pricing"}
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-[15px]">
                <button
                  className="px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold border-white border hover:border-white hover:text-white"
                  onClick={() => setShowModal(true)}
                >
                  Enquire
                </button>
                <button
                  className="underline px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold hover:text-white"
                  onClick={() => setShowRateModal(true)}
                >
                  Want to Rate?
                </button>
                {/* {serviceData.contactDetails?.phone && (
                  <a 
                    href={`tel:${serviceData.contactDetails.phone}`}
                    className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold hover:bg-[#69b6ff] text-center"
                  >
                    Call Now
                  </a>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <InquiryModal
          profileData={profileData}
          serviceType={serviceType}
          onClose={() => setShowModal(false)}
        />
      )}
      {showRateModal && (
        <RatingModal
          visible={showRateModal}
          onClose={() => setShowRateModal(false)}
          onSubmit={handleRatingSubmit}
        />
      )}
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default BannerCommon;
