import BannerWithSearch from "../components/common-components/banner-with-search";
import Specialist from "../components/find-doctor-components/specialist";
import Treatment from "../components/find-doctor-components/treatment";
import SearchResultsData from "../components/search-result-components/searchResultsData";
const FindDoctor = () => {
    return (
      <div className="pt-[56px] md:pt-[80px]">
        <SearchResultsData />
      </div>
    );
}

export default FindDoctor;