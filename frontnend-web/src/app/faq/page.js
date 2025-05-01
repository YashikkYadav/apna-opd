import BannerWithTitle from "../components/common-components/banner-with-title";
import GetInTouch from "../components/common-components/getInTouch";
import FAQ from "../components/faq-components/faq";

const FAQPage = () => {
    return (
        <div className="pt-[80px]">
            <BannerWithTitle title="Got Questions? We've Got Clear Answers" description="Not sure how Apna OPD works? Wondering if online consultations are safe, secure, or even effective? You're not alone. Dive into the answers to our most commonly asked questions and see how Apna OPD is transforming healthcare across India — one appointment at a time."/>
            <FAQ/>
            <GetInTouch/>
        </div>
    );
}

export default FAQPage;