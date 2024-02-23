/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { Alert, Collapse, FormHelperText } from "@mui/material";
import { useForgotPasswordMutation } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import GalliHeader from "../../components/header";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleModal = useSelector((state) => state.modals.addStore);
  console.log(toggleModal);
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // Queries
  const [forgotPassword, { data, isLoading, isSuccess, error }] =
    useForgotPasswordMutation();

  const onFormSubmit = async (data) => {
    try {
      await forgotPassword(data);
    } catch (error) {
      toast.error("An error ocurred");
    }
  };
  useEffect(() => {
    if (data?.status === "success") {
      toast.success(data?.message);
      navigate("/auth/reset-password-email-verification");
    }
  }, [error, data]);
  console.log(isLoading);
  console.log(data);
  console.log(error);

  return (
    <>
      <GalliHeader />
      <div className="flex py-5 overflow-y-auto gap-3 flex-col bg-primary-200  h-[100vh] w-[100vw] justify-center items-center ">
        {/* <div
          onClick={() => navigate("/")}
          className="mx-auto flex items-center justify-center overflow-hidden  w-[195px] h-[53px] p-8 "
        >
          <img src={logo} alt="logo" className="w-[100%] " />
        </div> */}
        <div className=" w-[95%] sm:w-[436px] shadow-card p-[28px] sm:p-[48px] rounded-lg bg-white ">
          <h1 className="text-center font-bold text-[20px] text-black-ercas mb-3 ">
            Forgot Password?
          </h1>
          <div>
            <p className="text-center text-[15px] text-grey-1000 mb-8  ">
              We will send reset instruction to your email.
            </p>
            <div className="mb-3">
              <Collapse in={error}>
                <Alert onClose={() => {}} variant="filled" severity="error">
                  {error?.data?.message}
                </Alert>
              </Collapse>
            </div>
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              noValidate
              className="flex flex-col gap-y-3"
            >
              <div className="flex flex-col gap-y-1">
                <h4 className="text-sm text-black-ercas font-normal">Email</h4>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className={`border text-sm py-[12px] text-grey-800 ${
                      errors.email?.message
                        ? "border-red-100"
                        : "border-grey-800"
                    } px-4 rounded-lg outline-none ${
                      errors.email?.message
                        ? "focus:border-red-100 border-2"
                        : "focus:border-primary-800"
                    } `}
                    {...register("email", {
                      required: "Email address is required!",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email address!",
                      },
                    })}
                  />
                  <FormHelperText error>{errors.email?.message}</FormHelperText>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 py-3 w-1/2 mx-auto rounded-full text-purple-100 text-base bg-orange-500 hover:opacity-75 transition-opacity "
              >
                {isLoading ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Reset Password"
                )}
              </button>
              <p className="text-xs mt-2 text-center">
                Back to{" "}
                <Link
                  to={"/auth/sign-in/user"}
                  className="text-orange-500 underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
