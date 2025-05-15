import React from "react";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <div>
      <h2>Join Smart Local Connect Today</h2>
      <p>
        Experience the future of citizen-government interaction. Sign up now and
        make your voice heard.
      </p>
      <Button className="md:h-11 lg:h-12 lg:text-base lg:px-6">Sign Up</Button>
    </div>
  );
};

export default Banner;
