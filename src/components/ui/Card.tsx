import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type props = {
  title: string;
  content: string;
  linkTitle: string;
  link: string;
  Icon: IconType;
  width: string;
};

const FrontCard = ({ title, content, linkTitle, link, Icon, width }: props) => {
  return (
    <div className=" flex flex-col items-center gap-4 px-5 py-6 border-2 border-[#7F7F7F,30%]  rounded-xl mt-13 w-1/3">
      <Icon size={60} color="#1569D8" strokeWidth={width}/>
      <div className="text-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-[#00000099] leading-5 my-4 px-5">{content}</p>
        <Link href={link} className="text-primary">
          {linkTitle}
        </Link>
      </div>
    </div>
  );
};

export default FrontCard;
