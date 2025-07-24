import React from "react";
import { IconType } from "react-icons";

type props = {
  title: string;
  content: string;
  Icon: IconType;
};

const ImpactCard = ({ title, content, Icon }: props) => {
  return (
    <div className="px-7 py-8 bg-white border-2 border-[#7F7F7F,30%]  rounded-xl mt-13 w-1/3 flex flex-col gap-3">
      <Icon size={50} color="#1569D8" className="ml-3" />
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-[#00000099] leading-5">{content}</p>
    </div>
  );
};

export default ImpactCard;
