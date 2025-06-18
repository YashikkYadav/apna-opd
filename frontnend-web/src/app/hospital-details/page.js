import React from "react";
import HospitalFeatureCard from "@/app/components/more/hospital/HospitalFeatureCard";
import HospitalOverviewCard from "@/app/components/more/hospital/HospitalOverviewCard";
import HospitalDepartmentsCard from "@/app/components/more/hospital/HospitalDepartmentsCard";
import HospitalDoctorsCard from "@/app/components/more/hospital/HospitalDoctorsCard";
import HospitalFacilitiesCard from "@/app/components/more/hospital/HospitalFacilitiesCard";
import HospitalInsuranceCard from "@/app/components/more/hospital/HospitalInsuranceCard";
import HospitalLocationCard from "@/app/components/more/hospital/HospitalLocationCard";
import HospitalTestimonialsCard from "@/app/components/more/hospital/HospitalTestimonialsCard";
import HospitalQuickActionsCard from "@/app/components/more/hospital/HospitalQuickActionsCard";

const FullDetailsPage = () => {
  return (
    <div className="pt-24">
      <HospitalFeatureCard />
      <HospitalOverviewCard />
      <HospitalDepartmentsCard />
      <HospitalDoctorsCard />
      <HospitalFacilitiesCard />
      <HospitalInsuranceCard />
      <HospitalLocationCard />
      <HospitalTestimonialsCard />
      <HospitalQuickActionsCard />
    </div>
  );
};

export default FullDetailsPage;
