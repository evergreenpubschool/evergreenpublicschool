import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import { CgMail } from "react-icons/cg";


export const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/evergreenpublicschoolktl?stkn=MTRmZGJ4Y2xuM2pydw==",
    icon: FaInstagram,
    className:
      "bg-[#FDF0F4] text-[#C96F8D] hover:bg-[#F3C6D3] hover:text-[#8E405A]",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/evergreenpublicschoolktl/?http_ref=eyJ0cyI6IjE3ODkyMDYxOTk0MTMiLCJyIjoiaHR0cHM6XC9cL3d3dy5nb29nbGUuY29tXC8ifQ%3D%3D&cah=1&rwtsid=kOAW0yK3unIuXZsgX",
    icon: FaFacebookF,
    className:
      "bg-[#EDF6FC] text-[#4E82A6] hover:bg-[#BFDCF1] hover:text-[#315D7A]",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@evergreenpublicschoolktl?si=1wVsZP01q02w2Jh6",
    icon: FaYoutube,
    className:
      "bg-[#FFF8DC] text-[#B58B25] hover:bg-[#F8E7A1] hover:text-[#705715]",
  },
  {
    name: "Gmail",
    href: "mailto:evergreenpubschoolkaithal@gmail.com",
    icon: CgMail,
    className:
      "bg-[#F4EFFB] text-[#765FA3] hover:bg-[#D8C7F0] hover:text-[#514073]",
  },
];