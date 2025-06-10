import About from "./components/common-components/about";
import Article from "./components/home-components/article";
import Consult from "./components/home-components/consult";
import FourPoints from "./components/home-components/fourPoints";
import GetInTouch from "./components/common-components/getInTouch";
import WhatOurUsers from "./components/home-components/whatOurUsers";
import PopularCategories from "./components/home-components/popularCategories";
import FlashOffers from "./components/home-components/flashOffers";
import TopVerifiedDoctors from "./components/home-components/topVerifiedDoctors";
import HealthPackagesAndStats from "./components/home-components/healthPackagesAndStats";
import PatientTestimonialsHome from "./components/home-components/patientTestimonialsHome";
import AppDownloadAndPartner from "./components/home-components/appDownloadAndPartner";
import HeroCarousel from "./components/home-components/heroCarousel";
import PartnerHospitalsWithLogos from "./components/home-components/PartnerHospitalsWithLogos";

export default function Home() {
  return (
    <div className="pt-[80px]">
      <HeroCarousel />
      <PopularCategories />
      <FlashOffers />
      <TopVerifiedDoctors />
      <PartnerHospitalsWithLogos />
      <HealthPackagesAndStats />
      <PatientTestimonialsHome />
      <AppDownloadAndPartner />
    </div>
  );
}
