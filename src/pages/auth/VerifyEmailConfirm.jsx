import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import AuthModal from "../../components/modals/AuthModal";
import { useVerifyEmailQuery } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import FullPageLoader from "../../components/FullPageLoader";

const VerifyEmailConfirm = () => {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(10);
  const { verify_token } = useParams()
  console.log(verify_token)
  // Queries
  const { data, isLoading, error } = useVerifyEmailQuery({ token: verify_token })

  useEffect(() => {
    if (error?.status === 400) {
      navigate('/auth/login')
    }
    if (error) {
      toast.error(error?.data?.message)
    }
    if (data?.status === 'success') {
      toast.success('Email verification successful')
    }
    console.log(data)
    console.log(isLoading)
    console.log(error)
  }, [data, isLoading, error]);

  return (
    <>

      {
        isLoading || error && !data ? <FullPageLoader /> : <AuthModal hideClose={true} open={true} header={"Success"} text={'Email verified successfully'} btnText={'Sign In'} btnAction={() => navigate('/auth/login')} />

      }
    </>
  );
};

export default VerifyEmailConfirm;
