import BannerWithSearch from "../components/common-components/banner-with-search";
import Specialist from "../components/find-doctor-components/specialist";
import Treatment from "../components/find-doctor-components/treatment";

const FindDoctor = () => {
    return (
        <div className="pt-[80px]">
            <BannerWithSearch title="Find Our Specialist Doctors" description="Apna OPD is your all-in-one India healthcare platform to find doctors by specialty, location, or hospital."/>
            <Specialist/>
            <Treatment/>
        </div>
    );
}

export default FindDoctor;