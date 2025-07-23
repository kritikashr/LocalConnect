import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./Header";

const HeroSection = () => {
  return (
    <div>
      <div
        className="h-[90vh]"
        style={{
          backgroundImage: "url('/home.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className="flex flex-col justify-center items-center gap-5  h-[87%] bg-opacity-50">
          <h1 className="text-4xl md:text-5xl lg:text-[55px]   font-semibold">
            Empowering Our Communities
          </h1>
          <p className="text-center md:text-base lg:text-lg leading-5 lg:leading-6 font-semibold">
            Connecting you with local government for faster services and a
            better community.
            <br /> Stay informed, get support, and take part in building a
            stronger local future.
          </p>
          <div className="flex gap-5">
            <Link href="/file-complaint">
              <Button className="md:h-9 lg:h-11 lg:text-lg font-bold lg:px-6">
                File Complaints
              </Button>
            </Link>
            <Link href="/request">
              <Button className="md:h-9 lg:h-11 lg:text-lg font-bold lg:px-6 bg-white text-black hover:text-white">
                Request Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
