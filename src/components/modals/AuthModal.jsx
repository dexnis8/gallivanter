/* eslint-disable react/prop-types */
// import  { useState } from "react";
import { SmallModalLayout } from "./ModalLayout";
import SuccessIcon from "../icons/SuccessIcon";
import { Link } from "react-router-dom";

const AuthModal = ({
  open,
  handleClose,
  handleOpen,
  header,
  text,
  btnText,
  btnAction,
}) => {
  return (
    <>
      <SmallModalLayout
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <div className="text-center px-6 py-12">
          <div className="flex h-[100px] mx-auto mb-5 w-[100px] rounded-full bg-purple-700 justify-center items-center">
            <SuccessIcon />
          </div>
          <h4 className="text-[20px] text-black-1200 font-bold ">{header}</h4>
          <p className="text-[15px] text-black-900 font-normal mt-1 ">{text}</p>
          <Link to="/auth/login">
            <button
              onClick={btnAction}
              type="submit"
              className="mt-8 w-full py-3 rounded-lg text-purple-100 text-base bg-purple-700 hover:opacity-75 transition-opacity "
            >
              {btnText}
            </button>
          </Link>
        </div>
      </SmallModalLayout>
    </>
  );
};
export default AuthModal;
