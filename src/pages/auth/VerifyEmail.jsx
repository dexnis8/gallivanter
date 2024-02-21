import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useResendVerificationMailMutation } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(30);
    const [resend, setResend] = useState(false)
    const { register, handleSubmit, formState } = useForm()
    const { errors } = formState
    const [resendVerificationMail, { data, isLoading, error }] = useResendVerificationMailMutation()


    useEffect(() => {
        const timer = setInterval(() => {
            setCountDown((prev) => (prev -= 1));
        }, 1000);
        countDown == 0 && clearInterval(timer);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await resendVerificationMail(data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        console.log(data)
        console.log(error)
        if (data?.status === 'success') {
            toast.success(data?.message)
            navigate('/auth/login')
        }
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [data, isLoading, error])

    return (
        <>
            <div className="flex py-5 overflow-y-auto gap-3 flex-col bg-purple-200  h-[100vh] w-[100vw] justify-center items-center ">
                <div
                    onClick={() => navigate("/")}
                    className="mx-auto flex items-center justify-center overflow-hidden  w-[195px] h-[53px] p-8 "
                >
                    <img src={logo} alt="logo" className="w-[100%] " />
                </div>
                <div className=" w-[95%] sm:w-[436px] shadow-card p-[28px] sm:p-[48px] rounded-lg bg-white ">
                    <h1 className="text-center font-bold text-[20px] text-black-ercas mb-3 ">
                        Verify your email
                    </h1>
                    <div>
                        <p className="text-center mx-auto w-[90%] text-[15px] text-grey-1000 mb-5  ">
                            We sent a verification link to your registered email.
                        </p>

                        {
                            resend ? <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>

                                <div className="flex flex-col gap-y-1">
                                    <h4 className="text-sm text-black-ercas font-normal">Email</h4>
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            placeholder="example@gmail.com"
                                            className={`border text-sm py-[12px] text-grey-800 ${errors.email?.message
                                                ? "border-red-100"
                                                : "border-grey-800"
                                                } px-4 rounded-lg outline-none ${errors.email?.message
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
                                <button

                                    disabled={countDown > 0}
                                    //  onClick={() => }
                                    className={` w-full py-3 rounded-lg text-purple-100 text-base bg-purple-700 hover:opacity-75 transition-opacity`}
                                >
                                    {isLoading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
                                </button>
                            </form> : <button

                                disabled={countDown > 0}
                                onClick={() => setResend(true)}
                                className={`${countDown > 0 ? 'opacity-50' : 'opacity-100'} mx-2 w-full py-3 rounded-lg text-purple-100 text-base bg-purple-700 hover:opacity-75 transition-opacity`}
                            >
                                Resend Link {countDown > 0 && "in"} {countDown > 0 && countDown}
                            </button>
                        }


                        <p className="text-xs mt-2 text-center">
                            Back to{" "}
                            <Link to={"/auth/login"} className="text-purple-400 underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyEmail;
