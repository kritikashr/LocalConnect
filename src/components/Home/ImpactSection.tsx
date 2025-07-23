import React from "react";
import ImpactCard from "./ImpactCard";
import { PiLightbulb } from "react-icons/pi";
import { MdBalance } from "react-icons/md";
import { LuHandshake } from "react-icons/lu";

const ImpactSection = () => {
  return (
    <div className="flex flex-col justify-center items-center px-16 pt-20 pb-15 bg-[#F4F4F4]">
      <h2>Our Impact</h2>
      <div className=" flex gap-14">
        <ImpactCard
          title="Increased Efficiency"
          content="Streamline processes and reduce response times for services and complaints."
          Icon={PiLightbulb}
        />
        <ImpactCard
          title="Enhanced Transparency"
          content="Provide citizens with visibility into municipal operations and progress."
          Icon={MdBalance}
        />
        <ImpactCard
          title="Stronger Community"
          content="Foster better communication and engagement between citizens and government."
          Icon={LuHandshake}
        />
      </div>
    </div>
  );
};

export default ImpactSection;
