import { Divider } from "antd";
// import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const Footer = () => {
  // const navigate = useNavigate();
  return (
    <div className="mt-24 p-[16px] md:p-[64px] items-center justify-center flex flex-col">
      <Divider className="bg-[#bdbdbd]" />
      <div className="flex mt-24  max-w-[1920px]">
        <div className="w-2/3">
          <img
            src="/assets/images/logo.png"
            alt=""
            className="mb-6 w-[120px]"
          />
          <p>
            Gallivanter is a dynamic platform designed to connect and empower
            three distinct user groups within the world of travel and adventure:
            Tourists, Local Guides, and Tour Agents/Providers.
          </p>
        </div>
        <div className="flex gap-[32px]">
          <FaTwitter
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={
              () => {}
              // window.open("https://twitter.com/JoinSparkApp", "_blank")
            }
          />
          <FaFacebook
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() =>
              // window.open("https://www.facebook.com/joinsparkclub/", "_blank")
              {}
            }
          />
          <FaInstagram
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() =>
              // window.open("https://instagram.com/joinsparkapp", "_blank")
              {}
            }
          />
          <FaLinkedin
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() =>
              window.open(
                // "https://www.linkedin.com/company/joinsparkapp/about/",                                "_blank"
                {}
              )
            }
          />
          <FaTiktok
            size={24}
            color={`#381914`}
            className="cursor-pointer"
            onClick={() =>
              // window.open("https://www.tiktok.com/@joinsparkapp", "_blank")
              {}
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
