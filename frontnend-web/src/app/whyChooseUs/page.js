import HeroSection from "../components/whyChooseUs-components/heroSection";
import WhyChooseApnaOPD from "../components/whyChooseUs-components/whyChooseApnaOPD";
import CTASection from "../components/whyChooseUs-components/ctaSection";
import DiagnosticLabs from "../components/whyChooseUs-components/diagnosticLabs";
import PartnerHospitals from "../components/whyChooseUs-components/partnerHospitals";
import ImpactNumbers from "../components/whyChooseUs-components/impactNumbers";
import PatientTestimonials from "../components/whyChooseUs-components/patientTestimonials";

const WhyChooseUs = () => {
    return (
        <div className="pt-[80px]">
            <HeroSection/>
            <WhyChooseApnaOPD/>  
            <ImpactNumbers/>
            <PartnerHospitals/>
            <DiagnosticLabs/>
            <PatientTestimonials/>
            <CTASection/>
        </div>
    );
}

export default WhyChooseUs;