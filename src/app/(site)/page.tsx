import Banner from "@/components/Home/Banner";
import FeaturesSection from "@/components/Home/FeaturesSection";
import Header from "@/components/Home/Header";
import HeroSection from "@/components/Home/HeroSection";
import ImpactSection from "@/components/Home/ImpactSection";
import MailSection from "@/components/Home/MailSection";
import React from "react";

const page = () => {
  return (
    <>
      {/* <Header /> */}
      <HeroSection />
      <FeaturesSection />
      <ImpactSection/>
      <Banner />
      <MailSection />
    </>
  );
};

export default page;
