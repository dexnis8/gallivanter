/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'

import { FormHelperText } from "@mui/material";
import ShwPwdEye from "../../../components/icons/ShwPwdEye";
import { ClipLoader } from "react-spinners";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetCreatorProfileQuery,
  useUpdateCreatorProfileMutation,
} from "../../../redux/api/Services";

const CreatorProfile = () => {
  const {
    data: profile,
    isLoading: loadingProfile,
    error,
  } = useGetCreatorProfileQuery();

  const [
    updateCreatorProfile,
    { data: newProfile, isLoading: updatingProfile, error: errorUpdating },
  ] = useUpdateCreatorProfileMutation();

  const [showPassword, setShowPassword] = useState(false);

  // Use the defaultValues object directly in the useForm hook
  const form = useForm({
    defaultValues: {
      firstName: profile?.data?.firstName || "",
      lastName: profile?.data?.lastName || "",
      email: profile?.data?.email || "",
      phoneNumber: profile?.data?.phoneNumber || "",
    },
  });

  const { register, handleSubmit, formState, watchc, isSuccess } = form;
  const { errors } = formState;

  useEffect(() => {
    // Update default values when the profile data changes
    form.reset({
      firstName: profile?.data?.firstName || "",
      lastName: profile?.data?.lastName || "",
      email: profile?.data?.email || "",
      phoneNumber: profile?.data?.phoneNumber || "",
    });
    if (error) {
      toast.error("Error fetching profile");
    }
  }, [profile, form.reset, error]);

  const onFormSubmit = (data) => {
    console.log(data);
    updateCreatorProfile(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    console.log(newProfile);
    console.log(errorUpdating);
    if (isSuccess) {
      toast.success("Profile updated successfully");
    }
  }, [newProfile, updatingProfile, errorUpdating]);
  return (
    <>
      {loadingProfile ? (
        <ClipLoader />
      ) : (
        <div className="px-10 py-5 rounded-lg shadow-md border">
          <h3 className="text-xl font-bold mb-3">Personal Details</h3>
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            noValidate
            className="flex flex-col gap-y-3 "
          >
            <div className="w-1/2">
              <div className="flex flex-col gap-y-1">
                <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                  First Name
                </h4>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Isaac"
                    className={`border text-sm py-[12px] text-grey-800 ${
                      errors.firstName?.message
                        ? "border-red-100"
                        : "border-grey-800"
                    } px-4 rounded-lg outline-none ${
                      errors.firstName?.message
                        ? "focus:border-red-500 border-1"
                        : "focus:border-primary-800"
                    } `}
                    {...register("firstName", {
                      required: "First name is required!",
                    })}
                  />
                  <FormHelperText error>
                    {errors.firstName?.message}
                  </FormHelperText>
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                  Last Name
                </h4>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Ayorinde"
                    className={`border text-sm py-[12px] text-grey-800 ${
                      errors.lastName?.message
                        ? "border-red-100"
                        : "border-grey-800"
                    } px-4 rounded-lg outline-none ${
                      errors.lastName?.message
                        ? "focus:border-red-500 border-1"
                        : "focus:border-primary-800"
                    } `}
                    {...register("lastName", {
                      required: "Last name is required!",
                    })}
                  />
                  <FormHelperText error>
                    {errors.lastName?.message}
                  </FormHelperText>
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                  Phone Number
                </h4>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="09065706757"
                    className={`border text-sm py-[12px] text-grey-800 ${
                      errors.phoneNumber?.message
                        ? "border-red-100"
                        : "border-grey-800"
                    } px-4 rounded-lg outline-none ${
                      errors.phoneNumber?.message
                        ? "focus:border-red-500 border-1"
                        : "focus:border-primary-800"
                    } `}
                    {...register("phoneNumber", {
                      required: "WhatsApp number is required!",
                      pattern: {
                        value:
                          // eslint-disable-next-line no-useless-escape
                          /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  <FormHelperText error>
                    {errors.phoneNumber?.message}
                  </FormHelperText>
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                  Email
                </h4>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="example@gmail.com"
                    className={`border text-sm py-[12px] text-grey-800 ${
                      errors.email?.message
                        ? "border-red-100"
                        : "border-grey-800"
                    } px-4 rounded-lg outline-none ${
                      errors.email?.message
                        ? "focus:border-red-500 border-1"
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
              <h3 className="text-xl font-bold my-3">Change password</h3>
              <div className="flex flex-col gap-y-1">
                <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                  Old password
                </h4>
                <div>
                  <div className="relative flex flex-col">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter old password"
                      className={`border text-sm py-[12px] text-grey-800 ${
                        errors.old_password?.message
                          ? "border-red-100"
                          : "border-grey-800"
                      } px-4 rounded-lg outline-none ${
                        errors.old_password?.message
                          ? "focus:border-red-500 border-1"
                          : "focus:border-primary-800"
                      } `}
                      // {...register("old_password", {
                      //   // required: "Old password is required!",
                      //   pattern: {
                      //     value:
                      //       /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      //     message:
                      //       "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 symbol.",
                      //   },
                      // })}
                    />
                    <span
                      onClick={handleClickShowPassword}
                      className="absolute right-2 top-[14px] cursor-pointer"
                    >
                      <ShwPwdEye size={18} />
                    </span>
                  </div>
                  {/* <FormHelperText error>
                    {errors.old_password?.message}
                  </FormHelperText> */}
                </div>
                <div>
                  <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                    New password
                  </h4>
                  <div className="relative flex flex-col">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`border text-sm py-[12px] text-grey-800 ${
                        errors.password?.message
                          ? "border-red-100"
                          : "border-grey-800"
                      } px-4 rounded-lg outline-none ${
                        errors.password?.message
                          ? "focus:border-red-500 border-1"
                          : "focus:border-primary-800"
                      } `}
                      // {...register("password", {
                      //   // required: "Password is required!",
                      //   pattern: {
                      //     value:
                      //       /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      //     message:
                      //       "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 symbol.",
                      //   },
                      // })}
                    />
                    <span
                      onClick={handleClickShowPassword}
                      className="absolute right-2 top-[14px] cursor-pointer"
                    >
                      <ShwPwdEye size={18} />
                    </span>
                  </div>
                  {/* <FormHelperText error>
                    {errors.password?.message}
                  </FormHelperText> */}
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                  Password Confirmation
                </h4>
                <div>
                  <div className="relative flex flex-col">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`border text-sm py-[12px] text-grey-800 ${
                        errors.password_confirmation?.message
                          ? "border-red-100"
                          : "border-grey-800"
                      } px-4 rounded-lg outline-none ${
                        errors.password_confirmation?.message
                          ? "focus:border-red-500 border-1"
                          : "focus:border-primary-800"
                      } `}
                      // {...register("password_confirmation", {
                      //   // required: "Confirm password!",
                      //   validate: (val) => {
                      //     if (watch("password") != val) {
                      //       return "Your passwords do no match";
                      //     }
                      //   },
                      // })}
                    />
                    <span
                      onClick={handleClickShowPassword}
                      className="absolute right-2 top-[14px] cursor-pointer"
                    >
                      <ShwPwdEye size={18} />
                    </span>
                  </div>
                  {/* <FormHelperText error>
                    {errors.password_confirmation?.message}
                  </FormHelperText> */}
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center justify-end text-xs ">
              <button
                type="submit"
                disabled={updatingProfile}
                className="mt-8 px-10 py-3 rounded-lg text-purple-100 text-base bg-orange-500 hover:opacity-75 transition-opacity "
              >
                {updatingProfile ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Update profile"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreatorProfile;
