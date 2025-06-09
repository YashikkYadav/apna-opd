import OurVision from "../components/about-components/ourVision";
import About from "../components/common-components/about";
import BannerWithTitle from "../components/common-components/banner-with-title";

const AboutPage = () => {
    return (
        <div className="pt-[80px]">
            <BannerWithTitle title="Your Trusted Doctor Platform in India" description="Apna OPD is India’s reliable healthcare platform helping you find verified doctors and book online consultations anytime, anywhere. Whether you need a general physician or a specialist, we connect you with top-rated medical professionals in just a few clicks.Start your health journey with confidence — fast, secure, and trusted by thousands across the country."/>
            <About/>
            <OurVision/>
        </div>
    );
}

export default AboutPage;