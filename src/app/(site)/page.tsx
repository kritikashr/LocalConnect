import Banner from "@/components/Home/Banner";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import ImpactSection from "@/components/Home/ImpactSection";
import React from "react";

const page = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ImpactSection />
      <Banner />
    </>
  );
};

export default page;
