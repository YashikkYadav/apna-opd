"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getServiceData } from "../../../data/constants";

const SuggestedService = ({ serviceType, currentId }) => {
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (serviceType && typeof window !== 'undefined') {
      // Convert serviceType to the format used in constants.js
      const type = serviceType.replace(/-/g, '_');
      // Get all services of this type
      const allServices = getServiceData(type);
      // Filter out the current service and limit to 2
      const filteredServices = allServices
        .filter(service => service.id.toString() !== currentId)
        .slice(0, 2);
      
      setServices(filteredServices);
    }
  }, [serviceType, currentId]);

  const handleDetailsClick = (id) => {
    if (typeof window !== 'undefined') {
      router.push(`/more/${serviceType}/${id}/details`);
    }
  };

  const formatServiceType = (type) => {
    return type.replace(/-/g, ' ').replace(/_/g, ' ').split(' ').map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (services.length === 0) return null;

  return (
    <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto pb-[50px]">
      <h1 className="title-48 mb-[42px]">Other {formatServiceType(serviceType)} Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {services.map((service) => (
          <div key={service.id} className="flex justify-between">
            <div className="flex flex-col lg:flex-row w-full">
              <div className="lg:mr-[10px] xl:mr-[32px]">
                <Image
                  src={service.images?.[0] || "/images/image_placeholder.svg"}
                  width={200}
                  height={200}
                  alt={service.title}
                  className="rounded-[8px] w-full object-cover lg:max-w-[200px] max-h-[200px]"
                />
              </div>
              <div className="flex flex-col">
                <div className="pt-[16px] pb-[16px] lg:pt-0">
                  <h3 className="title-32 mb-[8px]">{service.title}</h3>
                  <p className="text-base text-[#2E2E2E] mb-[16px] !font-medium">
                    {service.experience || "Experienced Service Provider"}
                  </p>
                  <h4 className="title-24 text-[#808080] !font-medium">
                    {service.contactDetails?.address || "Location not specified"}
                  </h4>
                </div>
                <div className="flex justify-between lg:flex-col xl:flex-row">
                  <h2 className="title-32 !text-[#5151E1]">
                    {service.price ? `₹${service.price}` : "Contact for price"}
                  </h2>
                  <button 
                    className="bg-[#3DB8F5] px-[35px] py-[10px] rounded-[8px] text-lg text-white font-bold hover:bg-[#69b6ff]"
                    onClick={() => handleDetailsClick(service.id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedService;
