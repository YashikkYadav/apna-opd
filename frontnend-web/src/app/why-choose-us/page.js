import HeroSection from "../components/whyChooseUs-components/heroSection";
import WhyChooseApnaOPD from "../components/whyChooseUs-components/whyChooseApnaOPD";
import CTASection from "../components/whyChooseUs-components/ctaSection";
import DiagnosticLabs from "../components/whyChooseUs-components/diagnosticLabs";
import PartnerHospitals from "../components/whyChooseUs-components/partnerHospitals";
import ImpactNumbers from "../components/whyChooseUs-components/impactNumbers";
import PatientTestimonials from "../components/whyChooseUs-components/patientTestimonials";
import HeroSection2 from "../components/whyChooseUs-components/heroSection2";

const WhyChoose = () => {
    return (
        <div className="pt-[80px]">
            <HeroSection/>
            <WhyChooseApnaOPD/>  
            <ImpactNumbers/>
            <PartnerHospitals/>
            <DiagnosticLabs/>
            <PatientTestimonials/>
            <HeroSection2/>
            <CTASection/>
        </div>
    );
}

export default WhyChoose;