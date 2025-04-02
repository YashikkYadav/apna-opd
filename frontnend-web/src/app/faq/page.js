import BannerWithTitle from "../components/common-components/banner-with-title";
import GetInTouch from "../components/common-components/getInTouch";
import FAQ from "../components/faq-components/faq";

const FAQPage = () => {
    return (
        <div className="pt-[80px]">
            <BannerWithTitle title="Frequently Asked Questions" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."/>
            <FAQ/>
            <GetInTouch/>
        </div>
    );
}

export default FAQPage;