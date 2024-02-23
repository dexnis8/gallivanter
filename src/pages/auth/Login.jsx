/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { Alert, Collapse, FormHelperText } from "@mui/material";
import GoogleIcon from "../../components/icons/GoogleIcon";
import ShwPwdEye from "../../components/icons/ShwPwdEye";
import {
  useLoginAsUserMutation,
  useLoginMutation,
} from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/authToken";
import GalliHeader from "../../components/header";

export const SignInAsCreator = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const dispatch = useDispatch();
  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();

  const onFormSubmit = (data) => {
    login(data);
  };
  useEffect(() => {
    // Handle all conditions here
    // 2. dispatch setToken
    if (isSuccess) {
      toast.success("Logged in successfully");
      dispatch(setToken(data?.token));
      // dispatch(setUser(data?.data?.user));
      navigate("/dashboard/overview");
    }
  }, [error, data]);
  console.log(data);
  console.log(error);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <div className="mb-3">
        <Collapse in={error}>
          <Alert onClose={() => {}} variant="filled" severity="warning">
            {error?.data?.message || error?.error}
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
                errors.email?.message ? "border-red-100" : "border-grey-800"
              } px-4 rounded-lg outline-none ${
                errors.email?.message
                  ? "focus:border-red-100 border-2"
                  : "focus:border-purple-600"
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
        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Password</h4>
          <div>
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
                    ? "focus:border-red-100 border-2"
                    : "focus:border-purple-600"
                } `}
                {...register("password", {
                  required: "Password is required!",
                })}
              />
              <span
                onClick={handleClickShowPassword}
                className="absolute right-2 top-[14px] cursor-pointer"
              >
                <ShwPwdEye size={18} />
              </span>
            </div>
            <FormHelperText error>{errors.password?.message}</FormHelperText>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs ">
          <span className="flex gap-x-1 text-xs text-black-900 items-center">
            <input type="checkbox" className="h-[12px] w-[12px] " /> Remember me
          </span>
          <Link
            to={"/auth/forgot-password"}
            className="text-orange-500 underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 py-3 rounded-lg text-purple-100 text-base bg-orange-500 hover:opacity-75 transition-opacity "
        >
          {isLoading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
        </button>
        <p className="text-xs text-center">
          Don't have an account?{" "}
          <Link to={"/auth/sign-up/user"} className="text-orange-500 underline">
            Get one here
          </Link>
        </p>
      </form>
    </>
  );
};

export const SignInAsUser = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const dispatch = useDispatch();
  const [login, { data, isLoading, isSuccess, error }] =
    useLoginAsUserMutation();

  const onFormSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      console.log(response);
    } catch (error) {
      // Handle registration error, if needed
      toast.error("An error ocurred");
    }
  };
  useEffect(() => {
    // Handle all conditions here
    // 2. dispatch setToken
    if (isSuccess) {
      toast.success("Logged in successfully");
      dispatch(setToken(data?.token));
      // dispatch(setUser(data?.data?.user));
      navigate("/user/joined-tours");
    }
  }, [error, data]);
  console.log(data);
  console.log(error);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <div className="mb-3">
        <Collapse in={error}>
          <Alert onClose={() => {}} variant="filled" severity="error">
            {error?.data?.message || error?.error}
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
                errors.email?.message ? "border-red-100" : "border-grey-800"
              } px-4 rounded-lg outline-none ${
                errors.email?.message
                  ? "focus:border-red-100 border-2"
                  : "focus:border-purple-600"
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
        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Password</h4>
          <div>
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
                    ? "focus:border-red-100 border-2"
                    : "focus:border-purple-600"
                } `}
                {...register("password", {
                  required: "Password is required!",
                })}
              />
              <span
                onClick={handleClickShowPassword}
                className="absolute right-2 top-[14px] cursor-pointer"
              >
                <ShwPwdEye size={18} />
              </span>
            </div>
            <FormHelperText error>{errors.password?.message}</FormHelperText>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs ">
          <span className="flex gap-x-1 text-xs text-black-900 items-center">
            <input type="checkbox" className="h-[12px] w-[12px] " /> Remember me
          </span>
          <Link
            to={"/auth/forgot-password"}
            className="text-orange-500 underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 py-3 rounded-lg text-purple-100 text-base bg-orange-500 hover:opacity-75 transition-opacity "
        >
          {isLoading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
        </button>
        <p className="text-xs text-center">
          Don't have an account?{" "}
          <Link
            to={"/auth/sign-up/creator"}
            className="text-orange-500 underline"
          >
            Get one here
          </Link>
        </p>
      </form>
    </>
  );
};

// Login Logic
const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <GalliHeader />
      <div className="flex py-5 overflow-y-auto gap-3 flex-col bg-primary-200  h-[100vh] w-[100vw]  items-center ">
        {/* <div
          onClick={() => navigate("/")}
          className="mx-auto flex items-center justify-center overflow-hidden  w-[100px] h-[53px] p-8 "
        >
          <img src={logo} alt="logo" className=" " />
           <h2>Gallivanter</h2> 
        </div> */}
        <div className=" w-[95%] sm:w-[436px] shadow-card p-[28px] sm:p-[48px] rounded-lg bg-white ">
          <h1 className="text-center font-bold text-[20px] text-primary-800 mb-5 ">
            Sign in to Gallivanter
          </h1>
          <div>
            {/* Tabs should go below */}
            <div className="grid grid-cols-2 text-center gap-5 mb-3">
              <NavLink to="user">
                {({ isActive }) => (
                  <>
                    <span
                      className={` border-x-0 px-5 sm:px-10 transition-all duration-300 w-full ${
                        isActive ? "text-orange-500" : "text-primary-800"
                      } ${
                        isActive ? "font-semibold" : "font-normal"
                      } border-t-0 ${
                        isActive && "border-orange-500"
                      } border-2 `}
                    >
                      As user
                    </span>
                  </>
                )}
              </NavLink>
              <NavLink to="creator">
                {({ isActive }) => (
                  <>
                    <span
                      className={` border-x-0  transition-all duration-300 px-5 sm:px-10 w-full ${
                        isActive ? "text-orange-500" : "text-primary-800"
                      } ${
                        isActive ? "font-semibold" : "font-normal"
                      } border-t-0 ${
                        isActive && "border-orange-500"
                      } border-2 `}
                    >
                      As creator
                    </span>
                  </>
                )}
              </NavLink>
            </div>
            {/* This is responsible for the tab switch */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
