import React from "react";
import FrontCard from "../ui/Card";
import { SlLocationPin } from "react-icons/sl";
import { FiAlertTriangle } from "react-icons/fi";
import { TbSpeakerphone } from "react-icons/tb";

const FeaturesSection = () => {
  return (
    <div className="flex flex-col justify-center items-center px-16 pt-20 pb-15 bg-white">
      <h2 >Core Features</h2>
      <div className=" flex gap-16">
        <FrontCard
          title="Request Services"
          content="Initiate requests for services like permits or maintenance."
          linkTitle="Submit a Request"
          link="/services"
          Icon={SlLocationPin }
          width="3"
        />
        <FrontCard
          title="File Complaint"
          content="Report issues directly to the municipality and get timely responses."
          linkTitle="File a complaint"
          link="/complaint"
          Icon={FiAlertTriangle}
          width="2"
        />
        <FrontCard
          title="Stay Informed"
          content="Get the latest local news, alerts, and event information."
          linkTitle="Read local news"
          link="/news"
          Icon={TbSpeakerphone }
          width="1"
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
