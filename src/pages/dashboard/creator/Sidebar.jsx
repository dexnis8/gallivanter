/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useGetCreatorProfileQuery } from "../../../redux/api/Services";
import { SyncLoader } from "react-spinners";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../../../redux/slices/authToken";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: profile, isLoading, error } = useGetCreatorProfileQuery();
  useEffect(() => {
    // sessionStorage.setItem("cm_name", profile?.data?.companyName);
    sessionStorage.setItem("role", profile?.data?.role);
    dispatch(setUserName(profile?.data?.companyName));
  }, [profile, error]);
  console.log(profile);
  console.log(error);

  return (
    <>
      <div className="shadow-md rounded-lg bg-white overflow-hidden">
        <div className="image relative h-[70px] bg-gray-100 ">
          <span className="h-[100px] w-[100px] rounded-full absolute overflow-hidden translate-x-[100%] translate-y-[30%] bg-gray-200 ">
            <img
              src={profile?.data?.creatorImageUrl}
              className="w-full h-full"
              alt=""
            />
          </span>
        </div>
        <div className="mt-[70px] text-center">
          <h3 className="text-base font-semibold text-primary-800">
            {isLoading ? (
              <SyncLoader size={12} />
            ) : (
              `${profile?.data?.firstName} ${profile?.data?.lastName}`
            )}
          </h3>
          <span className="text-sm font-medium text-gray-500">
            {profile?.data?.email}
          </span>
        </div>

        <span className="md:flex text-lg flex-col gap-1 mt-5 border-x-0 border px-5 py-3 ">
          <NavLink to="overview">
            {({ isActive }) => {
              return (
                <h2
                  className={`hover:underline py-2 ${
                    isActive || location.pathname === "/dashboard"
                      ? "text-[#E36A5D] font-semibold"
                      : "text-primary-800 "
                  } cursor-pointer`}
                >
                  Overview
                </h2>
              );
            }}
          </NavLink>
          <NavLink to="created-tours">
            {({ isActive }) => {
              return (
                <h2
                  className={`hover:underline py-2 ${
                    isActive
                      ? "text-[#E36A5D] font-semibold"
                      : "text-primary-800 "
                  } cursor-pointer`}
                >
                  Created Tours
                </h2>
              );
            }}
          </NavLink>
          <NavLink to="creator/profile">
            {({ isActive }) => {
              return (
                <h2
                  className={`hover:underline py-2 ${
                    isActive
                      ? "text-[#E36A5D] font-semibold"
                      : "text-primary-800 "
                  } cursor-pointer`}
                >
                  Profile
                </h2>
              );
            }}
          </NavLink>
        </span>

        <div className="mx-3">
          <button
            onClick={() => navigate("create-tour")}
            className=" py-2 my-3 w-full border bg-orange-500 text-base hover:opacity-75 font-bold rounded-full text-white"
          >
            Add Tour
          </button>
        </div>
      </div>
    </>
  );
};
