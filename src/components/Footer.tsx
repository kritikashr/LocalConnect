import React from "react";
import MailSection from "./MailSection";
import Link from "next/link";
import { LuFacebook } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <div className="bg-blue-900 text-white py-10">
        <MailSection />
        <div className=" px-15 pt-1 flex justify-between font-semibold">
          <ul className="space-y-4">
            <p className="font-bold text-lg">About Us</p>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Our Mission
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Our Team
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Contact
              </Link>
            </li>
          </ul>
          <ul className="space-y-4">
            <p className="font-bold text-lg">Services</p>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                News
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Complaint
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Service Provider
              </Link>
            </li>
          </ul>
          <ul className="space-y-4">
            <p className="font-bold text-lg">Resources</p>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Forms & Documents
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Help Center
              </Link>
            </li>
          </ul>
          <ul className="space-y-4">
            <p className="font-bold text-lg">Legal</p>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline text-[#919bad]">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white py-4">
        <div className="mx-15 flex justify-center items-center text-[#646464] font-semibold">
          <p className="text-base w-2/3 flex justify-end pr-10">
            &copy; 2025 Local Connect, All Rights Reserved.
          </p>
          <div className="flex w-1/3 space-x-4 justify-end">
            <Link href="#" className="hover:text-blue-700">
              <LuFacebook size={25}/>
            </Link>
            <Link href="#" className="hover:text-blue-700">
              <SiInstagram size={25}/>
            </Link>
            <Link href="#" className="hover:text-blue-700">
              <BsTwitterX size={25}/>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
