import HospitalDepartmentsCard from "./HospitalDepartmentsCard";
import HospitalDoctorsCard from "./HospitalDoctorsCard";
import HospitalFacilitiesCard from "./HospitalFacilitiesCard";
import HospitalFeatureCard from "./HospitalFeatureCard";
import HospitalInsuranceCard from "./HospitalInsuranceCard";
import HospitalLocationCard from "./HospitalLocationCard";
import HospitalOverviewCard from "./HospitalOverviewCard";
import HospitalQuickActionsCard from "./HospitalQuickActionsCard";
import HospitalTestimonialsCard from "./HospitalTestimonialsCard";

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

