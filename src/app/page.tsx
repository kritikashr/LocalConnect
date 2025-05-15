import Banner from "@/components/Home/Banner";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import React from "react";

const page = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Banner/>
    </>
  );
};

export default page;
