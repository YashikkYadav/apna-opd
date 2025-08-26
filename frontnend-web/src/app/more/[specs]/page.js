"use client";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Select } from "antd";
import SearchBarForServices from "../../components/common-components/SearchBarForServices";
import Ambulance from "../../components/more/ambulance/ambulance";
import Hospital from "../../components/more/hospital/hospital";
import Vatenary from "../../components/more/vatenary/vatenary";
import Emergency from "../../components/more/emergency/emergency";
import Gym from "../../components/more/gym/gym";
import Yoga from "../../components/more/yoga/yoga";
import CommercialMeditation from "../../components/more/commercialMeditation/commercialMeditation";
import NashamuktiKendra from "../../components/more/nasha-mukti/nashaMukti";
import MedicalStore from "../../components/more/medicalstore/medicalstore";
import NursingCollege from "@/app/components/more/nursingCollege/nursingCollege";
import BloodBank from "../../components/more/bloodBank/bloodBank";
import Physiotherapist from "../../components/more/physiotherapist/physiotherapist";
import BloodDonor from "../../components/more/bloodDonor/bloodDonor";
import Nurse from "../../components/more/nurse/nurse";
import Radiologist from "../../components/more/radiologist/radiologist";
import Laboratory from "@/app/components/more/laboratory/laboratory";
import IvfClinic from "@/app/components/more/ivfClinic/ivfClinic";
import { serviceTypes } from "../../data/constants";
import Loader from "@/app/components/common-components/Loader";
import Pagination from "../../components/more/common/Pagination";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const ServicePage = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();
  const specs = params.specs;
  const [serviceData, setServiceData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  const fetchData = useCallback(
    async (locationQuery = "", page = 1, nameQuery = "") => {
      let sanitizedSpecs = params.specs.replace(/-/g, "_");
      if (sanitizedSpecs === "nurse") {
        sanitizedSpecs = "nursing_staff";
      }

      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/health-serve/list?location=${locationQuery}&type=${sanitizedSpecs}&page=${page}&name=${nameQuery}`
        );
        if (response?.list?.healthServeProfileList) {
          setServiceData(response.list.healthServeProfileList);
          setCurrentPage(response.list.currentPage || 1);
          setTotalPages(response.list.totalPages || 1);
          setTotalItems(response.list.totalItems || 0);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    },
    [params.specs]
  );

  console.log("data", serviceData);

  useEffect(() => {
    const locationQuery = searchParams.get("location") || "";
    const nameQuery = searchParams.get("name") || "";
    setLocation(locationQuery);
    setName(nameQuery);
    if (params.specs) {
      fetchData(locationQuery, 1, nameQuery);
    }
  }, [params.specs, searchParams, fetchData]);

  if (loading) return <Loader />;
  console.log(specs);
  const getServiceTitle = () => {
    switch (specs) {
      case serviceTypes.AMBULANCE:
        return "Find Ambulance Services";
      case serviceTypes.HOSPITAL:
        return "Find Hospitals";
      case serviceTypes.VATENARY:
        return "Find Vatenary Services";
      case serviceTypes.EMERGENCY:
        return "Find Emergency Services";
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
      case serviceTypes.NURSING_MEDICAL_COLLEGE:
        return "Find Nursing Colleges";
      case serviceTypes.BLOOD_BANK:
        return "Find Blood Banks";
      case serviceTypes.PHYSIOTHERAPIST:
        return "Find Physiotherapists";
      case serviceTypes.BLOOD_DONOR:
        return "Find Blood Donors";
      case serviceTypes.NURSE:
        return "Find Nursing Services";
      case serviceTypes.RADIOLOGIST:
        return "Find Radiologists";
      case serviceTypes.LABORATORY:
        return "Find Laboratories";
      case serviceTypes.IVFCLINIC:
        return "Find IVF Clinics";
      default:
        return "Find Services";
    }
  };

  const renderServiceComponent = (totalItems) => {
    switch (specs) {
      case serviceTypes.AMBULANCE:
        return <Ambulance serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.HOSPITAL:
        return <Hospital serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.VATENARY:
        return <Vatenary serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.EMERGENCY:
        return <Emergency serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.GYM:
        return <Gym serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.YOGA:
        return <Yoga serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.MEDITATION:
        return (
          <CommercialMeditation
            serviceData={serviceData}
            totalItems={totalItems}
          />
        );
      case serviceTypes.NASHA_MUKTI:
        return (
          <NashamuktiKendra serviceData={serviceData} totalItems={totalItems} />
        );
      case serviceTypes.MEDICAL_STORE:
        return (
          <MedicalStore serviceData={serviceData} totalItems={totalItems} />
        );
      case serviceTypes.NURSING_MEDICAL_COLLEGE:
        return (
          <NursingCollege serviceData={serviceData} totalItems={totalItems} />
        );
      case serviceTypes.BLOOD_BANK:
        return <BloodBank serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.PHYSIOTHERAPIST:
        return (
          <Physiotherapist serviceData={serviceData} totalItems={totalItems} />
        );
      case serviceTypes.BLOOD_DONOR:
        return <BloodDonor serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.NURSE:
        return <Nurse serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.RADIOLOGIST:
        return (
          <Radiologist serviceData={serviceData} totalItems={totalItems} />
        );
      case serviceTypes.LABORATORY:
        return <Laboratory serviceData={serviceData} totalItems={totalItems} />;
      case serviceTypes.IVFCLINIC:
        return <IvfClinic serviceData={serviceData} totalItems={totalItems} />;
      default:
        return <div>Service not found</div>;
    }
  };

  const handleSearch = (locationQuery, name) => {
    if (!locationQuery && !name) {
      router.push(`/more/${params.specs}`);
      fetchData("", 1, "");
      return;
    }
    let query = `/more/${params.specs}?`;
    if (locationQuery) query += `location=${locationQuery}&`;
    if (name) query += `name=${name}`;
    router.push(query);
    fetchData(locationQuery, 1, name);
  };

  const handlePageChange = (page) => {
    const locationQuery = searchParams.get("location") || "";
    setCurrentPage(page);
    fetchData(locationQuery, page);
  };

  return (
    <div className="pt-[120px] p-8">
      <div>
        <SearchBarForServices
          onSearch={handleSearch}
          location={location}
          name={name}
        />
      </div>
      <div className="bg-sky-50 px-[15px] sm:px-[30px] mx-auto py-[60px] ">
        <div>
          {renderServiceComponent(totalItems)}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
