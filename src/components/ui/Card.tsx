import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type props = {
  title: string;
  content: string;
  linkTitle: string;
  link: string;
  Icon: IconType;
};

const FrontCard = ({ title, content, linkTitle, link, Icon }: props) => {
  return (
    <div className=" flex flex-col items-center gap-5 p-10">
      <Icon size={65} />
      <div className="text-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-[#00000099] leading-4 my-5">{content}</p>
        <Link href={link} className="text-[#3FACD4]">
          {linkTitle}
        </Link>
      </div>
    </div>
  );
};

export default FrontCard;
