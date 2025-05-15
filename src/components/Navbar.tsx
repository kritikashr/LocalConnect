import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between w-full  p-4 px-12 sticky top-0 left-0 bg-white">
        <div>Logo</div>
        <div className="flex gap-7">
          <Link href={"/"}>Home</Link>
          <Link href={"/services"}>Services</Link>
          <Link href={"/complaint"}>Complaint</Link>
          <Link href={"/news"}>News</Link>
          <Link href={"/admin"}>Admin</Link>
          <div>Profile</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
