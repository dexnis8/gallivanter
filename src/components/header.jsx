/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Menu, MenuItem, useMediaQuery } from "@mui/material";
import { Drawer } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaHamburger } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AngleDown } from "./icons/AngleDown";
import { unsetToken } from "../redux/slices/authToken";
import { formatString } from "../utils/Formats";

const GalliHeader = ({
  scrollToHome,
  scrollToWorks,
  scrollToFaqs,
  scrollToSignUp,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [drawer, setDrawer] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuth = useSelector((state) => state.authToken.isAuth);
  const open = Boolean(anchorEl);
  const matchMedia = useMediaQuery("(max-width:767px)");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(isAuth);

  const openDrawer = () => {
    setDrawer(true);
  };

  const onClose = () => {
    setDrawer(false);
  };
  useEffect(() => {
    setUserName(
      `${
        sessionStorage.getItem("role") === "creator"
          ? sessionStorage.getItem("cm_name")
          : sessionStorage.getItem("f_name")
      }`
    );
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white w-full h-[72px] md:h-[88px] shadow-md items-center flex justify-center">
      <div className="flex align-middle items-center justify-between mx-[16px] md:mx-[40px] lg:mx-[100px] w-full max-w-[1920px]">
        <div className="flex items-center gap-3 md:gap-12 ">
          <FaBars color="black" className="hidden" onClick={openDrawer} />

          {/* <img className="h-10" src="/assets/images/icon.png" alt="" /> */}
          <img
            className="h-10"
            src="/assets/images/logo.png"
            alt=""
            onClick={() => {
              navigate("/");
            }}
          />
          <span className="md:flex gap-8 hidden">
            <NavLink to="/">
              {({ isActive }) => {
                return (
                  <h2
                    className={`${
                      isActive
                        ? "text-[#E36A5D] font-semibold"
                        : "text-black font-medium"
                    } cursor-pointer`}
                  >
                    Home
                  </h2>
                );
              }}
            </NavLink>

            <NavLink to="/explore">
              {({ isActive }) => {
                return (
                  <h2
                    className={`${
                      isActive
                        ? "text-[#E36A5D] font-semibold"
                        : "text-black font-medium"
                    } cursor-pointer`}
                  >
                    Explore
                  </h2>
                );
              }}
            </NavLink>

            {isAuth && (
              <NavLink
                to={`${
                  sessionStorage.getItem("role") === "creator"
                    ? "/dashboard/overview"
                    : "/user/joined-tours"
                }`}
              >
                {({ isActive }) => {
                  return (
                    <h2
                      className={`${
                        isActive || location.pathname === "/user"
                          ? "text-[#E36A5D] font-semibold"
                          : "text-black font-medium"
                      } cursor-pointer`}
                    >
                      Dashboard
                    </h2>
                  );
                }}
              </NavLink>
            )}
          </span>
        </div>

        {isAuth ? (
          <div>
            <button
              onClick={handleClick}
              className=" transition-opacity flex gap-2 rounded-lg text-sm text-black-1100 font-normal items-center justify-center sm:px-4 py-[6px] "
            >
              <span className="p-[2px] rounded-full h-[40px] w-[40px]  border-orange-500 border-[1px]">
                {/* <img src={avatar} alt="avatar" /> */}
              </span>
              <span className="hidden sm:block hover:underline text-[16px] font-semibold">
                {/* {formatString(userName, 7)} */}

                {sessionStorage.getItem("role") === "creator"
                  ? sessionStorage.getItem("cm_name")
                  : sessionStorage.getItem("f_name")}
              </span>
              <span
                className={`${
                  open ? "rotate-180" : "rotate-0"
                } transition-transform`}
              >
                <AngleDown />
              </span>
            </button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {/* <MenuItem onClick={handleClose}>
                <span className="text-base text-black-900">
                  Profile Settings
                </span>
              </MenuItem> */}
              {!isAuth && matchMedia ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <NavLink className={`text-base text-primary-800`} to={"/"}>
                      Home
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/explore"}
                    >
                      Explore
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/auth/sign-in/user"}
                    >
                      Sign In
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/auth/sign-up/user"}
                    >
                      Sign Up
                    </NavLink>
                  </MenuItem>
                </>
              ) : null}
              {sessionStorage.getItem("role") === "creator" &&
              isAuth &&
              matchMedia ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <NavLink className={`text-base text-primary-800`} to={"/"}>
                      Home
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/explore"}
                    >
                      Explore
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/dashboard/overview"}
                    >
                      Overview
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/dashboard/created-tours"}
                    >
                      Created Tours
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/dashboard/create-tour"}
                    >
                      Create Tour
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/dashboard/creator/profile"}
                    >
                      Profile
                    </NavLink>
                  </MenuItem>
                </>
              ) : null}
              {sessionStorage.getItem("role") !== "creator" &&
              isAuth &&
              matchMedia ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <NavLink className={`text-base text-primary-800`} to={"/"}>
                      Home
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/explore"}
                    >
                      Explore
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/user/joined-tours"}
                    >
                      Tours Joined
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      className={`text-base text-primary-800`}
                      to={"/user/profile"}
                    >
                      Profile
                    </NavLink>
                  </MenuItem>
                </>
              ) : null}
              <MenuItem onClick={handleClose}>
                <span
                  onClick={() => dispatch(unsetToken())}
                  className="text-base text-red-500 "
                >
                  Logout
                </span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="flex gap-1 sm:gap-3">
            <div
              className="bg-[#F76F59] text-sm sm:text-base hover:opacity-75 cursor-pointer text-white px-6 py-2 rounded-full"
              onClick={() => {
                navigate("/auth/sign-in/user");
              }}
            >
              Sign In
            </div>
            <div
              className="border hidden sm:block cursor-pointer hover:text-white hover:bg-[#F76F59] transition-all duration-300 border-[#F76F59] text-[#F76F59] px-6 py-2 rounded-full"
              onClick={() => {
                navigate("/auth/sign-up/user");
              }}
            >
              Sign Up
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalliHeader;
