"use client";
import { useParams } from "next/navigation";
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
import { useEffect , useState} from "react";
import axiosInstance from "@/app/config/axios";

const ServicePage = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const specs = params.specs;
  const [serviceData, setServiceData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/health-serve/list?&location=&type=${params.specs}`
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
    if (params.specs) {
      fetchData();
    }
  }, []);

  if (loading) return <Loader />;

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

  return <div className="pt-[80px]">{renderServiceComponent()}</div>;
};

export default ServicePage;
