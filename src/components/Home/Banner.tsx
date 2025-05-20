import React from "react";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <div className="bg-[#1569D8] flex flex-col justify-center items-center gap-5 mt-20 py-14">
      <h2 >Join Smart Local Connect Today</h2>
      <p  className=" text-center md:text-base lg:text-lg leading-4 lg:leading-6  w-md lg:w-xl">
        Experience the future of citizen-government interaction. Sign up now and
        make your voice heard.
      </p>
      <Button className="md:h-11 lg:h-12 lg:text-base lg:px-6">Sign Up</Button>
    </div>
  );
};

export default Banner;
