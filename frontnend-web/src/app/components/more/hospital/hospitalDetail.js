import React, { useEffect } from "react";
import HospitalFeatureCard from "@/app/components/more/hospital/HospitalFeatureCard";
import HospitalOverviewCard from "@/app/components/more/hospital/HospitalOverviewCard";
import HospitalDepartmentsCard from "@/app/components/more/hospital/HospitalDepartmentsCard";
import HospitalDoctorsCard from "@/app/components/more/hospital/HospitalDoctorsCard";
import HospitalFacilitiesCard from "@/app/components/more/hospital/HospitalFacilitiesCard";
import HospitalInsuranceCard from "@/app/components/more/hospital/HospitalInsuranceCard";
import HospitalLocationCard from "@/app/components/more/hospital/HospitalLocationCard";
import HospitalTestimonialsCard from "@/app/components/more/hospital/HospitalTestimonialsCard";
import HospitalQuickActionsCard from "@/app/components/more/hospital/HospitalQuickActionsCard";

const FullDetailsPage = ({profileData}) => {
  return (
    <div className="pt-24">
      <HospitalFeatureCard profileData={profileData}  />
      <HospitalOverviewCard profileData={profileData}/>
      <HospitalDepartmentsCard profileData={profileData}/>
      <HospitalDoctorsCard profileData={profileData}/>
      <HospitalFacilitiesCard profileData={profileData}/>
      <HospitalInsuranceCard profileData={profileData}/>
      <HospitalLocationCard profileData={profileData}/>
      <HospitalTestimonialsCard profileData={profileData}/>
      <HospitalQuickActionsCard profileData={profileData}/>
    </div>
  );
};

export default FullDetailsPage;