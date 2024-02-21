import React, { useEffect } from "react";
import { useGoogleAuthCallbackQuery } from "../../redux/api/AuthApi";
import { ClipLoader } from "react-spinners";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/authToken";
import { toast } from "react-toastify";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const authUser = queryParams.get("authUser");
  const scope = queryParams.get("scope");
  const prompt = queryParams.get("prompt");

  const [googleAuthCallback, { data, isLoading, error }] =
    useGoogleAuthCallbackQuery();

  console.log(client_id, response_type, redirect_uri, access_type, scope);
  useEffect(async () => {
    try {
      await googleAuthCallback({
        code,
        authUser,
        scope,
        prompt,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(isLoading);
    console.log(error);

    if (data?.status === "success") {
      toast.success("Logged in successfully");
      dispatch(setToken(data?.data?.auth_token));
      dispatch(setUser(data?.data?.user));
      navigate("/store/dashboard/overview");
    }
  }, [data, isLoading, error]);

  return (
    <>
      <ClipLoader />
    </>
  );
};

export default GoogleCallback;
