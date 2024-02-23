/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Section.js
// import React from "react";

import { useNavigate } from "react-router-dom";

const OtherSection = ({
  title,
  subtitle,
  description,
  buttonText,
  imageSrc,
  bgColor,
}) => {
  // console.log(title);
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${bgColor} w-full lg:flex justify-center text-center lg:text-left`}
      >
        <div className=" pb-8 lg:pb-24 pt-40 w-full lg:flex justify-between max-w-[1920px] py-16 lg:py-32 items-center">
          <div className=" lg:ml-[160px] mx-[16px] lg:w-2/3">
            <p className=" text-[40px] leading-[46px] lg:text-[56px] text-[#381914] font-extrabold lg:leading-[64px] w-5/6 lg:w-full mx-auto lg:mx-0 font-cooper-std">
              {subtitle}
            </p>
            {description.map((item, index) => (
              <p
                key={index}
                className="text-[#222] leading-5 text-[18px] mt-4 mb-12 w-5/6 mx-auto lg:mx-0"
              >
                {item.description}
              </p>
            ))}
            <div
              className="mx-auto cursor-pointer hover:opacity-75 transition-all duration-300 lg:mx-0 bg-[#F76F59] text-white px-6 py-3 rounded-full w-fit mt-4 lg:mt-8 "
              onClick={() => navigate("/auth/sign-up/user")}
            >
              {buttonText}
            </div>
          </div>
          <div className="mt-12 lg:mt-0 mx-[24px] lg:mr-[16px] lg:w-2/3 flex items-center justify-center ">
            <img src={imageSrc} alt="" className="lg:w-[50vh] " />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherSection;
