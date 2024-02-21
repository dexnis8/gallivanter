import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import ShwPwdEye from "../../components/icons/ShwPwdEye";
import { PropagateLoader } from "react-spinners";
import {
  useResetPasswordMutation,
  useVerifyResetLinkQuery,
} from "../../redux/api/AuthApi";
import AuthModal from "../../components/modals/AuthModal";
import { toast } from "react-toastify";
import FullPageLoader from "../../components/FullPageLoader";

const NewPassword = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { resetLink } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(resetLink);

  // Queries
  const [resetPassword, { data, isLoading, isSuccess, error }] =
    useResetPasswordMutation();
  const {
    data: verification_data,
    isLoading: verifying_link,
    error: verification_error,
  } = useVerifyResetLinkQuery({ resetLink });



  useEffect(() => {
    console.log(verification_data);
    console.log(verification_error);
    if (verification_error) {
      toast.error("Invalid password rest link!");
      navigate("/auth/login");
    }
  }, [verification_data, verification_error, verifying_link]);
  const onFormSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await resetPassword(formData);
    } catch (error) {
      toast.error("An error ocurred");
    }
  };
  useEffect(() => {
    // Handle all conditions here
    // 1. handle errors
    // display success modal

    if (error) {
      toast.error("Error reseting password");
    }
  }, [error, data]);
  console.log(isLoading);
  console.log(data);
  console.log(error);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      {(!verification_data && verifying_link) || verification_error ? (
       <FullPageLoader />
      ) : (
        <div>
          <AuthModal
            open={open}
            header="Password Reset!"
            handleClose={() => setOpen(false)}
            text={
              "Your pssword has been successfully reset. Please click below to sign in"
            }
            btnText={"Sign In"}
          />
          <div className="flex py-5 overflow-y-auto gap-3 flex-col bg-purple-200  h-[100vh] w-[100vw] justify-center items-center ">
            <div
              onClick={() => navigate("/")}
              className="mx-auto flex items-center justify-center overflow-hidden  w-[195px] h-[53px] p-8 "
            >
              <img src={logo} alt="logo" className="w-[100%] " />
            </div>
            <div className=" w-[95%] sm:w-[436px] shadow-card p-[28px] sm:p-[48px] rounded-lg bg-white ">
              <h1 className="text-center font-bold text-[20px] text-black-ercas mb-1 ">
                Set New Password
              </h1>
              <div>
                <p className="text-center mx-auto w-[95%] text-[15px] text-grey-1000 mb-6  ">
                  Your new password must be different from your previously used
                  passwords.
                </p>
                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  noValidate
                  className="flex flex-col gap-y-3"
                >
                  <div className="flex flex-col gap-y-1">
                    <h4 className="text-sm text-black-ercas font-normal">
                      Password
                    </h4>
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
                          onClick={() => handleClickShowPassword(pwd)}
                          className="absolute right-2 top-[14px] cursor-pointer"
                        >
                          <ShwPwdEye size={18} />
                        </span>
                      </div>
                      <FormHelperText error>
                        {errors.password?.message}
                      </FormHelperText>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <h4 className="text-sm text-black-ercas font-normal">
                      Confirm Password
                    </h4>
                    <div>
                      <div className="relative flex flex-col">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className={`border text-sm py-[12px] text-grey-800 ${
                            errors.confirm_password?.message
                              ? "border-red-100"
                              : "border-grey-800"
                          } px-4 rounded-lg outline-none ${
                            errors.confirm_password?.message
                              ? "focus:border-red-100 border-2"
                              : "focus:border-purple-600"
                          } `}
                          {...register("confirm_password", {
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
                      <FormHelperText error>
                        {errors.password?.message}
                      </FormHelperText>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 py-3 rounded-lg text-purple-100 text-base bg-purple-700 hover:opacity-75 transition-opacity "
                  >
                    Reset Password
                  </button>
                  <p className="text-xs text-center">
                    Back to{" "}
                    <Link
                      to={"/auth/login"}
                      className="text-purple-400 underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPassword;
