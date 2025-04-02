import OurVision from "../components/about-components/ourVision";
import WhyChooseUs from "../components/about-components/whyChooseUs";
import About from "../components/common-components/about";
import BannerWithTitle from "../components/common-components/banner-with-title";

const AboutPage = () => {
    return (
        <div className="pt-[80px]">
            <BannerWithTitle title="Your Trusted Doctor Platform" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."/>
            <About/>
            <OurVision/>
            <WhyChooseUs/>
        </div>
    );
}

export default AboutPage;