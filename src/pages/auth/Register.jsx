/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { Alert, Collapse, FormHelperText } from "@mui/material";
import GoogleIcon from "../../components/icons/GoogleIcon";
import ShwPwdEye from "../../components/icons/ShwPwdEye";
import {
  useRegisterCreatorMutation,
  useRegisterUserMutation,
} from "../../redux/api/AuthApi";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { setToken, setUser } from "../../redux/slices/authToken";
import { useDispatch } from "react-redux";
import GalliHeader from "../../components/header";

// Register as a creator
export const SignUpAsCreator = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [registerCreator, { data, isLoading, isSuccess, error }] =
    useRegisterCreatorMutation();

  const onFormSubmit = (data) => {
    console.log(data);
    registerCreator(data);
  };

  useEffect(() => {
    if (data?.status === "success") {
      toast.success("Signup successful");
      dispatch(setToken(data?.token));
      navigate("/dashboard/overview");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    console.log(data);
    console.log(error);
  }, [error, data]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <div className="mb-3">
        <Collapse in={error}>
          <Alert onClose={() => {}} variant="filled" severity="error">
            {error?.error}
          </Alert>
        </Collapse>
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
        className="flex flex-col gap-y-3"
      >
        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">First Name</h4>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Isaac"
              className={`border text-sm py-[12px] text-grey-800 ${
                errors.firstName?.message ? "border-red-100" : "border-grey-800"
              } px-4 rounded-lg outline-none ${
                errors.firstName?.message
                  ? "focus:border-red-500 border-1"
                  : "focus:border-primary-800"
              } `}
              {...register("firstName", {
                required: "First name is required!",
              })}
            />
            <FormHelperText error>{errors.firstName?.message}</FormHelperText>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Last Name</h4>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Ayorinde"
              className={`border text-sm py-[12px] text-grey-800 ${
                errors.lastName?.message ? "border-red-100" : "border-grey-800"
              } px-4 rounded-lg outline-none ${
                errors.lastName?.message
                  ? "focus:border-red-500 border-1"
                  : "focus:border-primary-800"
              } `}
              {...register("lastName", {
                required: "Last name is required!",
              })}
            />
            <FormHelperText error>{errors.lastName?.message}</FormHelperText>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Phone Number</h4>
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
                required: "Phone number is required!",
                pattern: {
                  value:
                    /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            <FormHelperText error>{errors.phoneNumber?.message}</FormHelperText>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Email</h4>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="example@gmail.com"
              className={`border text-sm py-[12px] text-grey-800 ${
                errors.email?.message ? "border-red-100" : "border-grey-800"
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

        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Company Name</h4>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Isaac"
              className={`border text-sm py-[12px] text-grey-800 ${
                errors.companyName?.message
                  ? "border-red-100"
                  : "border-grey-800"
              } px-4 rounded-lg outline-none ${
                errors.companyName?.message
                  ? "focus:border-red-500 border-1"
                  : "focus:border-primary-800"
              } `}
              {...register("companyName", {
                required: "First name is required!",
              })}
            />
            <FormHelperText error>{errors.companyName?.message}</FormHelperText>
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
                    ? "focus:border-red-500 border-1"
                    : "focus:border-primary-800"
                } `}
                {...register("password", {
                  required: "Password is required!",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 symbol.",
                  },
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

        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">
            Password Confirmation
          </h4>
          <div>
            <div className="relative flex flex-col">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`border text-sm py-[12px] text-grey-800 ${
                  errors.confirmPassword?.message
                    ? "border-red-100"
                    : "border-grey-800"
                } px-4 rounded-lg outline-none ${
                  errors.confirmPassword?.message
                    ? "focus:border-red-500 border-1"
                    : "focus:border-primary-800"
                } `}
                {...register("confirmPassword", {
                  required: "Confirm password!",
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              <span
                onClick={handleClickShowPassword}
                className="absolute right-2 top-[14px] cursor-pointer"
              >
                <ShwPwdEye size={18} />
              </span>
            </div>
            <FormHelperText error>
              {errors.confirmPassword?.message}
            </FormHelperText>
          </div>
        </div>
        {/* 
        <div className="flex gap-1 items-center text-xs ">
          <span
            className={`flex gap-x-1 text-xs text-black-900 ${
              errors?.agreed_to_terms?.message
                ? "text-red-500"
                : "text-black-900"
            } items-center`}
          >
            <input
              type="checkbox"
              className="h-[12px] w-[12px] "
              {...register("agreed_to_terms", {
                required: "Kindly agree with our",
              })}
            />{" "}
            {errors?.agreed_to_terms?.message
              ? errors?.agreed_to_terms?.message
              : "I agree with the"}
          </span>
          <Link to={"/"} className="text-primary-800 underline">
            Terms & Conditions
          </Link>
        </div> */}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 py-3 rounded-lg text-purple-100 text-base bg-orange-500 hover:opacity-75 transition-opacity "
        >
          {isLoading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
        </button>
        <p className="text-xs text-center">
          Already have an account?{" "}
          <Link
            to={"/auth/sign-in/creator"}
            className="text-primary-800 underline"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </>
  );
};

// Register as a user

export const SignUpAsUser = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [registerUser, { data, isLoading, isSuccess, error }] =
    useRegisterUserMutation();

  const onFormSubmit = (data) => {
    console.log(data);
    registerUser(data);
  };

  useEffect(() => {
    if (data?.status === "success") {
      toast.success("Signup Successful");
      dispatch(setToken(data?.token));

      // change this to the users dashboard
      navigate("/user/joined-tours");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    console.log(data);
    console.log(error);
  }, [error, data]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <div className="mb-3">
        <Collapse in={error}>
          <Alert onClose={() => {}} variant="filled" severity="error">
            {error?.errors}
          </Alert>
        </Collapse>
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
        className="flex flex-col gap-y-3"
      >
        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">First Name</h4>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Isaac"
              className={`border text-sm py-[12px] text-grey-800 ${
                errors.firstName?.message ? "border-red-100" : "border-grey-800"
              } px-4 rounded-lg outline-none ${
                errors.firstName?.message
                  ? "focus:border-red-500 border-1"
                  : "focus:border-primary-800"
              } `}
              {...register("firstName", {
                required: "First name is required!",
              })}
            />
            <FormHelperText error>{errors.firstName?.message}</FormHelperText>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Last Name</h4>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Ayorinde"
              className={`border text-sm py-[12px] text-grey-800 ${
                errors.lastName?.message ? "border-red-100" : "border-grey-800"
              } px-4 rounded-lg outline-none ${
                errors.lastName?.message
                  ? "focus:border-red-500 border-1"
                  : "focus:border-primary-800"
              } `}
              {...register("lastName", {
                required: "Last name is required!",
              })}
            />
            <FormHelperText error>{errors.lastName?.message}</FormHelperText>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Phone Number</h4>
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
                    /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            <FormHelperText error>{errors.phoneNumber?.message}</FormHelperText>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">Email</h4>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="example@gmail.com"
              className={`border text-sm py-[12px] text-grey-800 ${
                errors.email?.message ? "border-red-100" : "border-grey-800"
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
                    ? "focus:border-red-500 border-1"
                    : "focus:border-primary-800"
                } `}
                {...register("password", {
                  required: "Password is required!",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 symbol.",
                  },
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

        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm text-black-ercas font-normal">
            Password Confirmation
          </h4>
          <div>
            <div className="relative flex flex-col">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`border text-sm py-[12px] text-grey-800 ${
                  errors.confirmPassword?.message
                    ? "border-red-100"
                    : "border-grey-800"
                } px-4 rounded-lg outline-none ${
                  errors.confirmPassword?.message
                    ? "focus:border-red-500 border-1"
                    : "focus:border-primary-800"
                } `}
                {...register("confirmPassword", {
                  required: "Confirm password!",
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              <span
                onClick={handleClickShowPassword}
                className="absolute right-2 top-[14px] cursor-pointer"
              >
                <ShwPwdEye size={18} />
              </span>
            </div>
            <FormHelperText error>
              {errors.confirmPassword?.message}
            </FormHelperText>
          </div>
        </div>

        {/* <div className="flex gap-1 items-center text-xs ">
          <span
            className={`flex gap-x-1 text-xs text-black-900 ${
              errors?.agreed_to_terms?.message
                ? "text-red-500"
                : "text-black-900"
            } items-center`}
          >
            <input
              type="checkbox"
              className="h-[12px] w-[12px] "
              {...register("agreed_to_terms", {
                required: "Kindly agree with our",
              })}
            />{" "}
            {errors?.agreed_to_terms?.message
              ? errors?.agreed_to_terms?.message
              : "I agree with the"}
          </span>
          <Link to={"/"} className="text-primary-800 underline">
            Terms & Conditions
          </Link>
        </div> */}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 py-3 rounded-lg text-purple-100 text-base bg-orange-500 hover:opacity-75 transition-opacity "
        >
          {isLoading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
        </button>
        <p className="text-xs text-center">
          Already have an account?{" "}
          <Link
            to={"/auth/sign-in/user"}
            className="text-primary-800 underline"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </>
  );
};

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <GalliHeader />
      <div className="flex py-5 gap-3 flex-col bg-primary-200   w-[100vw] overflow-x-hidden justify-center items-center ">
        {/* <div
          onClick={() => navigate("/")}
          className="mx-auto flex items-center justify-center overflow-hidden  w-[100px] h-[53px] p-8 "
        >
          <img src={logo} alt="logo" className=" " />
        
        </div> */}
        <div className=" w-[95%] sm:w-[436px] shadow-card p-[28px] sm:p-[48px] rounded-lg bg-white ">
          <h1 className="text-center font-bold text-[20px] text-primary-800 mb-5 ">
            Create an account
          </h1>
          <div className="grid grid-cols-2 text-center gap-5 mb-3">
            <NavLink to="user">
              {({ isActive }) => (
                <>
                  <span
                    className={` border-x-0 px-5 sm:px-10 transition-all duration-300 w-full ${
                      isActive ? "text-orange-500" : "text-primary-800"
                    } ${
                      isActive ? "font-semibold" : "font-normal"
                    } border-t-0 ${isActive && "border-orange-500"} border-2 `}
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
                    } border-t-0 ${isActive && "border-orange-500"} border-2 `}
                  >
                    As creator
                  </span>
                </>
              )}
            </NavLink>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
