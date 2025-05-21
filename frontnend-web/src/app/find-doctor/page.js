import BannerWithSearch from "../components/common-components/banner-with-search";
import Specialist from "../components/find-doctor-components/specialist";
import Treatment from "../components/find-doctor-components/treatment";

const FindDoctor = () => {
    return (
        <div className="pt-[80px]">
            <BannerWithSearch title="Find Our Specialist Doctors" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."/>
            <Specialist/>
            <Treatment/>
        </div>
    );
}

export default FindDoctor;