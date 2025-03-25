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

const ServicePage = () => {
  const params = useParams();
  const specs = params.specs;

  const renderServiceComponent = () => {
    switch (specs) {
      case serviceTypes.AMBULANCE:
        return <Ambulance />;
      case serviceTypes.GYM:
        return <Gym />;
      case serviceTypes.YOGA:
        return <Yoga />;
      case serviceTypes.MEDITATION:
        return <CommercialMeditation />;
      case serviceTypes.NASHA_MUKTI:
        return <NashamuktiKendra />;
      case serviceTypes.MEDICAL_STORE:
        return <MedicalStore />;
      case serviceTypes.NURSING_COLLEGE:
        return <NursingCollege />;
      case serviceTypes.BLOOD_BANK:
        return <BloodBank />;
      case serviceTypes.PHYSIOTHERAPIST:
        return <Physiotherapist />;
      case serviceTypes.BLOOD_DONOR:
        return <BloodDonor />;
      default:
        return <div>Service not found</div>;
    }
  };

  return <div className="pt-[80px]">{renderServiceComponent()}</div>;
};

export default ServicePage;
