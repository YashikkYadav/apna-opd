"use client";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Select } from "antd";
import SearchBarForServices from "../../components/common-components/SearchBarForServices";
import Ambulance from "../../components/more/ambulance/ambulance";
import Gym from "../../components/more/gym/gym";
import Yoga from "../../components/more/yoga/yoga";
import CommercialMeditation from "../../components/more/commercialMeditation/commercialMeditation";
import NashamuktiKendra from "../../components/more/nasha-mukti/nashaMukti";
import MedicalStore from "../../components/more/medicalstore/medicalstore";
import NursingCollege from "../../components/more/nursingCollege/nursingCollege";
import BloodBank from "../../components/more/bloodBank/bloodBank";
import Physiotherapist from "../../components/more/physiotherapist/physiotherapist";
import BloodDonor from "../../components/more/bloodDonor/bloodDonor";
import { serviceTypes } from "../../data/constants";
import Loader from "@/app/components/common-components/Loader";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axios";
import { useRouter } from "next/navigation";

const ServicePage = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();
  const specs = params.specs;
  const [serviceData, setServiceData] = useState(null);
  const router = useRouter();

  const fetchData = async (locationQuery = "") => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/health-serve/list?location=${locationQuery}&type=${params.specs}`
      );
      if (response?.list?.healthServeProfileList) {
        setServiceData(response.list.healthServeProfileList);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const locationQuery = searchParams.get("location") || "";
    setLocation(locationQuery);
    if (params.specs) {
      fetchData(locationQuery);
    }
  }, [params.specs, searchParams]);

  if (loading) return <Loader />;

  const getServiceTitle = () => {
    switch (specs) {
      case serviceTypes.AMBULANCE:
        return "Find Ambulance Services";
      case serviceTypes.GYM:
        return "Find Fitness Centers & Gyms";
      case serviceTypes.YOGA:
        return "Find Yoga Centers";
      case serviceTypes.MEDITATION:
        return "Find Meditation Centers";
      case serviceTypes.NASHA_MUKTI:
        return "Find Nasha Mukti Kendras";
      case serviceTypes.MEDICAL_STORE:
        return "Find Medical Stores";
      case serviceTypes.NURSING_COLLEGE:
        return "Find Nursing Colleges";
      case serviceTypes.BLOOD_BANK:
        return "Find Blood Banks";
      case serviceTypes.PHYSIOTHERAPIST:
        return "Find Physiotherapists";
      case serviceTypes.BLOOD_DONOR:
        return "Find Blood Donors";
      default:
        return "Find Services";
    }
  };

  const renderServiceComponent = () => {
    switch (specs) {
      case serviceTypes.AMBULANCE:
        return <Ambulance serviceData={serviceData} />;
      case serviceTypes.GYM:
        return <Gym serviceData={serviceData} />;
      case serviceTypes.YOGA:
        return <Yoga serviceData={serviceData} />;
      case serviceTypes.MEDITATION:
        return <CommercialMeditation serviceData={serviceData} />;
      case serviceTypes.NASHA_MUKTI:
        return <NashamuktiKendra serviceData={serviceData} />;
      case serviceTypes.MEDICAL_STORE:
        return <MedicalStore serviceData={serviceData} />;
      case serviceTypes.NURSING_COLLEGE:
        return <NursingCollege serviceData={serviceData} />;
      case serviceTypes.BLOOD_BANK:
        return <BloodBank serviceData={serviceData} />;
      case serviceTypes.PHYSIOTHERAPIST:
        return <Physiotherapist serviceData={serviceData} />;
      case serviceTypes.BLOOD_DONOR:
        return <BloodDonor serviceData={serviceData} />;
      default:
        return <div>Service not found</div>;
    }
  };

  const handleSearch = (locationQuery) => {
    if (locationQuery) {
      router.push(`/more/${params.specs}?location=${locationQuery}`);
    } else {
      router.push(`/more/${params.specs}`);
    }
  };

  return (
    <div className="pt-[80px]">
      <div className="bg-[#0D7EB7] banner-with-search">
        <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right">
          <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative md:h-[700px] pb-[60px] flex flex-col items-center">
            <div className="flex justify-between items-end pt-[60px] md:pt-[129px]">
              <div className="max-w-[700px] mx-auto">
                <h1 className="title-64 mb-[32px] text-center max-w-[530px] mx-auto">
                  {getServiceTitle()}
                </h1>
                <p className="text-base text-white mb-[88px] text-center">
                  Find the best healthcare services near you. Professional and reliable assistance available.
                </p>
              </div>
            </div>

            <div>
              <SearchBarForServices onSearch={handleSearch} location={location} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto my-[60px] md:my-[120px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
          <div className="lg:w-[34%] flex lg:flex-col gap-2 md:gap-0">
            <div className="mb-[20px] md:mb-[80px] w-full">
              <h2 className="title-48 mb-[24px]">Location</h2>
              <Select
                className="!h-[50px] w-full max-w-[296px]"
                placeholder="Location"
                size="large"
                prefix={
                  <Image
                    className="mr-3"
                    src="/images/blue_location.svg"
                    width={24}
                    height={24}
                    alt="Location Icon"
                  />
                }
                value={location || undefined}
                onChange={(value) => {
                  handleSearch(value);
                }}
              >
                {location && (
                  <Select.Option key={location} value={location}>
                    {location}
                  </Select.Option>
                )}
              </Select>
            </div>
          </div>
          
          <div className="lg:w-[66%]">
            {renderServiceComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
