import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-[#1569D8] flex flex-col justify-center items-center gap-5 pt-20 pb-14">
      <h2 className="text-white">Join Local Connect Today</h2>
      <p className=" text-center md:text-base lg:text-lg text-white leading-4 lg:leading-6 w-1/2">
        Experience the future of citizen-government interaction. Sign up now and
        make your voice heard.
      </p>

      <Link href={"/signup"}>
        <Button className="md:h-11 lg:h-12 lg:text-base font-bold lg:px-6 bg-white text-black hover:bg-white">
          Sign Up Today
        </Button>
      </Link>
    </div>
  );
};

export default Banner;
