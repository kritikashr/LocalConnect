import React from "react";
import FrontCard from "../ui/Card";
import { IoNewspaperOutline } from "react-icons/io5";

const FeaturesSection = () => {
  return (
    <div className="flex flex-col justify-center items-center px-12">
      <h2 className="text-[43px] font-bold">Core Features</h2>
      <div className=" flex gap-10">
        <FrontCard
          title="Request Services"
          content="Initiate requests for services like permits or maintenance."
          linkTitle="Submit a Request"
          link="/services"
          Icon={IoNewspaperOutline}
        />
        <FrontCard
          title="File Complaint"
          content="Report issues directly to the municipality and get timely responses."
          linkTitle="File a complaint"
          link="/complaint"
          Icon={IoNewspaperOutline}
        />
        <FrontCard
          title="Stay Informed"
          content="Get the latest local news, alerts, and event information."
          linkTitle="Read local news"
          link="/news"
          Icon={IoNewspaperOutline}
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
