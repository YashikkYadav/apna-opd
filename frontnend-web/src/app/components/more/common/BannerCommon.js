"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InquiryModal from "./InquiryModal";

const BannerCommon = ({ serviceData, serviceType }) => {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const formatServiceType = (type) => {
    return type.replace(/-/g, ' ').replace(/_/g, ' ').split(' ')?.map(
      word => word.charAt(0).toUpperCase() + word?.slice(1)
    ).join(' ');
  };

  const handleBackToListing = () => {
    if (mounted) {
      router.push(`/more/${serviceType}`);
    }
  };

  const handleHomeClick = () => {
    if (mounted) {
      router.push('/');
    }
  };

  if (!serviceData) return null;

  return (
    <div className="bg-[#0B66A1] banner-with-search">
      <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto">
        <div className="flex flex-col pt-[60px] md:pt-[96px] pb-[60px] lg:pb-0">
          <div className="title-24 text-white flex mb-[56px] flex-col sm:flex-row gap-[10px] sm:gap-0">
            <span className="cursor-pointer" onClick={handleHomeClick}>Home </span>{" "}
            <Image
              className="-rotate-90 mx-[8px]"
              src="/images/down_arrow_white.svg"
              width={17}
              height={10}
              alt="Down Arrow"
            />
            <span className="cursor-pointer" onClick={handleBackToListing}>
              {formatServiceType(serviceType)}
            </span>{" "}
            <Image
              className="-rotate-90 mx-[8px]"
              src="/images/down_arrow_white.svg"
              width={17}
              height={10}
              alt="Down Arrow"
            />
            <span>{serviceData.title}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
            <div className="flex lg:mr-[20px]">
              <Image
                src={serviceData.images?.[0] || "/images/image_placeholder.svg"}
                width={504}
                height={608}
                alt={serviceData.title}
                className="h-[400px] md:h-[604px] object-cover rounded-t-[8px] rounded-b-[8px] lg:rounded-b-none"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-[32px]">
                <h2 className="title-48 !text-white mb-[8px]">
                  {serviceData.title}
                </h2>
                <h5 className="title-24 text-white !font-medium capitalize">
                  {formatServiceType(serviceType)} Service
                </h5>
              </div>
              <div className="mb-[32px]">
                <h5 className="title-24 text-white mb-[8px]">
                  {serviceData.contactDetails?.organization || "Service Provider"}
                </h5>
                <p className="text-base text-white !font-normal">
                  {serviceData.contactDetails?.address || "Address not available"}
                </p>
              </div>
              
              {serviceData.schedule && (
                <div className="mb-[32px]">
                  <h5 className="title-24 text-white mb-[8px]">
                    Available Hours
                  </h5>
                  <div className="flex flex-col md:flex-row gap-[16px] md:gap-[56px]">
                    {Object.entries(serviceData.schedule || {})?.map(([day, hours]) => (
                      <div key={day}>
                        <p className="text-base text-white !font-normal">{day}</p>
                        <p className="text-base text-white font-bold">
                          {hours}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-[32px]">
                <h3 className="title-32 text-white">
                  {serviceData.price ? `Service Cost: ₹${serviceData.price}` : "Contact for pricing"}
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-[15px]">
                <button 
                  className="px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold border-white border hover:border-white hover:text-white"
                  onClick={() => setShowModal(true)}
                >
                  Enquire
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
          serviceData={serviceData}
          serviceType={serviceType}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BannerCommon;
