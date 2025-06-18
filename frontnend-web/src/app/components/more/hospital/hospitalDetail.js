
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

