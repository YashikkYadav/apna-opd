import BannerWithTitle from "../components/common-components/banner-with-title";
import Contact from "../components/contact-com/contact";

const ContactPage = () => {
    return (
        <div className="pt-[80px]">
            <BannerWithTitle title="Contact Us" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."/>
            <Contact/>
        </div>
    );
}

export default ContactPage;