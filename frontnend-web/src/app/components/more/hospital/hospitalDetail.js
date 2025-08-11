import { useEffect, useState } from "react";
import HospitalDepartmentsCard from "./HospitalDepartmentsCard";
import HospitalDoctorsCard from "./HospitalDoctorsCard";
import HospitalFacilitiesCard from "./HospitalFacilitiesCard";
import HospitalFeatureCard from "./HospitalFeatureCard";
import HospitalInsuranceCard from "./HospitalInsuranceCard";
import HospitalLocationCard from "./HospitalLocationCard";
import HospitalOverviewCard from "./HospitalOverviewCard";
import HospitalQuickActionsCard from "./HospitalQuickActionsCard";
import HospitalTestimonialsCard from "./HospitalTestimonialsCard";
import axios from "axios";

const FullDetailsPage = ({ profileData }) => {
  const [doctorData, setDoctorData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/hospital/${profileData.healthServeId}/doctor`
      );
      
      setDoctorData(response.data.doctors);
      console.log('res', response)
    };
    fetchData();
  }, [profileData.healthServeId]);

  return (
    <div className="pt-24">
      <HospitalFeatureCard profileData={profileData} />
      <HospitalOverviewCard profileData={profileData} />
      <HospitalDepartmentsCard profileData={profileData} />
      <HospitalDoctorsCard doctorData={doctorData} profileData={profileData} /> 
      <HospitalFacilitiesCard profileData={profileData} />
      <HospitalInsuranceCard profileData={profileData} />
      <HospitalLocationCard profileData={profileData} />
      <HospitalTestimonialsCard profileData={profileData} />
      <HospitalQuickActionsCard profileData={profileData} />
    </div>
  );
};

export default FullDetailsPage;
