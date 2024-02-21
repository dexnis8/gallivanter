/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function RequireAuth({ children }) {
  let isAuth = useSelector((state) => state.authToken.isAuth);
  let location = useLocation();
  // console.log(location);

  if (!isAuth) {
    toast.error("Unauthenticated: please sign in to proceed");
    return <Navigate to={`/auth/sign-in/user`} replace />;
  }

  return <>{children}</>;
}

export default RequireAuth;
