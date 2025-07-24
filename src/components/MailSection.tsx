import React from "react";
import Email from "./Form/Email";

const MailSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 py-14">
      <h3>Stay Updated</h3>
      <Email />
    </div>
  );
};

export default MailSection;
 