// import React from 'react'

import { NavLink, useLocation } from "react-router-dom";
import { useGetUserProfileQuery } from "../../../redux/api/Services";
import { useEffect } from "react";
import { SyncLoader } from "react-spinners";

export const UserSideBar = () => {
  const location = useLocation();

  const { data: profile, isLoading, error } = useGetUserProfileQuery();
  useEffect(() => {
    sessionStorage.setItem("f_name", profile?.data?.user?.firstName);
    sessionStorage.setItem("role", profile?.data?.user?.role);
  }, [profile]);
  console.log(profile);
  console.log(error);

  return (
    <>
      <div className="shadow-md rounded-lg bg-white overflow-hidden">
        <div className="image relative h-[70px] bg-gray-100 ">
          <span className="h-[100px] w-[100px] overflow-hidden rounded-full absolute xl:translate-x-[100%] translate-x-[80%] translate-y-[30%] bg-gray-200 ">
            <img
              src={profile?.data?.user?.creatorImageUrl}
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
              `${profile?.data?.user?.firstName} ${profile?.data?.user?.lastName}`
            )}
          </h3>
          <span className="text-sm font-medium text-gray-500">
            {profile?.data?.user?.email}
          </span>
        </div>

        <span className="md:flex text-lg flex-col gap-1 mt-5 border-x-0 border px-5 py-3 ">
          <NavLink to="joined-tours">
            {({ isActive }) => {
              return (
                <h2
                  className={`hover:underline py-2 ${
                    isActive || location.pathname === "/user"
                      ? "text-[#E36A5D] font-semibold"
                      : "text-primary-800 "
                  } cursor-pointer`}
                >
                  Tours Joined
                </h2>
              );
            }}
          </NavLink>
          <NavLink to="profile">
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

        {/* <div className="mx-3">
          <button
            onClick={() => navigate("create-tour")}
            className=" py-2 my-3 w-full border bg-orange-500 text-base hover:opacity-75 font-bold rounded-lg text-white"
          >
            Add Tour
          </button>
        </div> */}
      </div>
    </>
  );
};
