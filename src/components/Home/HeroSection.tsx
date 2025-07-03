import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className=" h-screen">
      <div className="flex flex-col justify-center items-center  gap-5 bg-[#969696] h-[87%]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
          Empowering Our Communities
        </h1>
        <p className=" text-center md:text-base lg:text-xl leading-5 lg:leading-7 ">
          Connecting you with local government for faster services and a better
          community.
          <br /> Stay informed, get support, and take part in building a
          stronger local future.
        </p>
        <div className="flex gap-5">
          <Link href="/file-complaint">
            <Button className="md:h-11 lg:h-12 lg:text-base lg:px-6">
              File Complaints
            </Button>
          </Link>
          <Link href="/request">
            <Button className="md:h-11 lg:h-12 lg:text-base lg:px-6">
              Request Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
