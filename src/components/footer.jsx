import { Divider } from "antd";
// import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const Footer = () => {
  // const navigate = useNavigate();
  return (
    <div className=" p-[16px] md:p-[64px] items-center justify-center flex flex-col">
      <Divider className="bg-[#bdbdbd]" />
      <div className="sm:flex-row flex-col sm:gap-0 gap-5 flex sm:mt-24  max-w-[1920px]">
        <div className="sm:w-2/3">
          <img
            src="/assets/images/logo.png"
            alt=""
            className="mb-6 w-[120px]"
          />
          <p>
            {/* Gallivanter is a dynamic platform designed to connect and empower
            three distinct user groups within the world of travel and adventure:
            Tourists, Local Guides, and Tour Agents/Providers. */}
            Gallivanter helps you manage your tour operations seamlessly. We are
            the operating system for tour businesses in Africa.
          </p>
        </div>
        <div className="flex gap-[32px]">
          <FaTwitter
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() => {
              window.open("https://twitter.com/GallivanterAfri/", "_blank");
            }}
          />
          <FaYoutube
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.youtube.com/@gallivanterafrica/",
                "_blank"
              )
            }
          />

          <FaFacebook
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() => {
              window.open(
                " https://www.facebook.com/profile.php?id=61557671332594/",
                "_blank"
              );
            }}
          />
          <FaInstagram
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() => {
              window.open(
                " https://www.instagram.com/gallivanterafrica/",
                "_blank"
              );
            }}
          />
          <FaLinkedin
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/gallivanter-africa/",
                "_blank"
              )
            }
          />
          <FaSnapchat
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.snapchat.com/add/gallivanterafri/",
                "_blank"
              )
            }
          />
          <FaTiktok
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() =>
              window.open("https://tiktok.com/@gallivanterafrica/", "_blank")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
