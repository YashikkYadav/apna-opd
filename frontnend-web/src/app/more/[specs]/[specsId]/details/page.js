import AboutDoctor from "../../../../components/profile-com/aboutDoctor";
import Banner from "../../../../components/profile-com/banner";
import ImageGallery from "../../../../components/profile-com/imageGallery";
import OtherSpecialist from "../../../../components/profile-com/otherSpecialist";

const ProfilePage = () => {
  return (
    <div className="pt-[80px]">
      <Banner />
      <AboutDoctor />
      <ImageGallery />
      <OtherSpecialist />
    </div>
  );
};

export default ProfilePage;
