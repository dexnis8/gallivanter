import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const ConfirmMail = () => {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => (prev -= 1));
    }, 1000);
    countDown == 0 && clearInterval(timer);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="flex py-5 overflow-y-auto gap-3 flex-col bg-primary-200  h-[100vh] w-[100vw] justify-center items-center ">
        <div
          onClick={() => navigate("/")}
          className="mx-auto flex items-center justify-center overflow-hidden  w-[195px] h-[53px] p-8 "
        >
          <img src={logo} alt="logo" className="w-[100%] " />
        </div>
        <div className=" w-[95%] sm:w-[436px] shadow-card p-[28px] sm:p-[48px] rounded-lg bg-white ">
          <h1 className="text-center font-bold text-[20px] text-black-ercas mb-3 ">
            Forgot Password?
          </h1>
          <div>
            <p className="text-center mx-auto w-[90%] text-[15px] text-grey-1000 mb-5  ">
              We sent a password reset link to your registered email.
            </p>

            <button
              type="submit"
              disabled={countDown > 0}
              onClick={() => navigate("/auth/forgot-password")}
              className="mx-2 w-full py-3 rounded-lg text-purple-100 text-base bg-orange-500 hover:opacity-75 transition-opacity "
            >
              Resend Link {countDown > 0 && "in"} {countDown > 0 && countDown}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmMail;
