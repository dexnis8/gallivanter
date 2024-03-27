/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'

import GalliHeader from "../../components/header";
import Select from "react-select";
// import { AngleDown } from "../../components/icons/AngleDown";
import { FormHelperText, Menu } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Footer from "../../components/footer";
import { useLazyGetAllPublicToursQuery } from "../../redux/api/Services";
import { ClipLoader } from "react-spinners";
import { formatDate, formatPrice } from "../../utils/Formats";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../components/icons/SearchIcon";

export function TourCard({ data }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/explore/tour/${data?._id}`)}
        className="w-full mx-auto bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
      >
        {/* Image */}
        <div className="bg-gray-200">
          <img
            src={data?.tourImagesData[0]?.url}
            alt={data?.tourImagesData[0]?._id}
            className="w-full h-40 object-cover object-center"
          />
        </div>

        {/* Card Body */}
        <div className="p-4">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">{data.title}</h2>

          {/* Date */}
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <svg
              className="h-4 w-4 mr-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              ></path>
            </svg>
            {formatDate(data.startDate)} - {formatDate(data.startDate)}
          </p>

          {/* Location */}
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <svg
              className="h-4 w-4 mr-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 11l5-8L17 11H7zm0 0v9a2 2 0 002 2h6a2 2 0 002-2v-9m-2 0h4"
              ></path>
            </svg>
            Location: {data.location}
          </p>

          {/* Number of Guests */}
          <p className="text-gray-600 text-sm mb-2 flex items-center">
            <svg
              className="h-4 w-4 mr-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7a2 2 0 012-2h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 0a2 2 0 012-2h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm10-4a2 2 0 012-2h1a2 2 0 012 2v13a2 2 0 01-2 2h-1a2 2 0 01-2-2V7zm0 0a2 2 0 012-2h1a2 2 0 012 2v13a2 2 0 01-2 2h-1a2 2 0 01-2-2V7zm0 0a2 2 0 012-2h1a2 2 0 012 2v13a2 2 0 01-2 2h-1a2 2 0 01-2-2V7z"
              ></path>
            </svg>
            Number of Guests: {data.numOfRegMembers}
          </p>

          {/* Price Button */}
          <div className="flex justify-between">
            <button className="text-orange-500 text-lg font-bold  py-2 rounded-full transition-colors">
              Starting at ₦{formatPrice(data.price)}
            </button>
            {/* <button className="py-3 my-5 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white">
              Join
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "8px",
    padding: "5px",
    border: "none",
    color: "rgb(107, 114, 128)",
    // height: "50px",
    // overflow: "scroll",
    // border: state.isFocused ? "1px solid #48BB78" : "1px solid #CBD5E0",
    // boxShadow: state.isFocused ? "0 0 0 2px #48BB78" : "none",
    "&:hover": {
      // border: "1px solid #48BB78",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const DropDown = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 14"
        fill="#666666"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 9.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-.707.293z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};

const Tours = () => {
  const { formState, register, handleSubmit } = useForm();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const [priceRange, setPriceRange] = useState({
    value: [5, 10],
  });

  const [search, setSearch] = useState("");
  const [filteredTours, setFilteredTours] = useState([]);

  const handleSliderChange = (key, value) => {
    setPriceRange((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // console.log(priceRange);
  const { errors } = formState;

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const amusementParks = [
    { value: "disneyland", label: "Disneyland" },
    { value: "universal", label: "Universal Studios" },
    { value: "sixflags", label: "Six Flags" },
    { value: "legoland", label: "Legoland" },
  ];

  const handleSelectChange = (selectedOptions) => {
    console.log("Selected Options:", selectedOptions);
  };
  const onSubmit = (data) => {
    console.log(data);
  };

  // Queries

  const [getAllPublicTours, { data, isLoading, error }] =
    useLazyGetAllPublicToursQuery();

  useEffect(() => {
    getAllPublicTours();
  }, []);
  useEffect(() => {
    // replace mockData with actual response from endpoint
    if (search !== "") {
      const result = data?.data?.tours.filter((tour) => {
        return tour.title.toLowerCase().match(search.toLowerCase());
      });
      setFilteredTours([...result]);
    }

    if (data && search === "") {
      setFilteredTours([...data?.data?.tours]);
    }
  }, [search, data]);
  console.log(data);
  console.log(error);
  console.log(filteredTours);
  return (
    <>
      <div>
        <GalliHeader />
        <div className="max-w-[1100px] sm:mt-10 mx-auto p-5  ">
          <div className="flex justify-between items-center">
            <h1 className=" text-xl capitalize sm:text-2xl font-bold text-black-ercas">
              Trips
            </h1>
            <p className="text-xl font-bold">
              {isLoading ? <ClipLoader size={14} /> : data?.result} trips
              available
            </p>
          </div>
          <div className="relative w-full sm:w-[45%]  mt-4">
            <button className="absolute flex mt-4 justify-center h-full ml-2">
              <SearchIcon />
            </button>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tour name"
              className="h-12  px-3 w-full  leading-6 outline-none text-black-1200 placeholder-black-1200 border-primary-800 text-sm bg-transparent border rounded-md pl-8"
            />
          </div>
          <div className="hidden  grid-cols-3 lg:grid-cols-4 w-full items-center gap-2 sm:gap-6 ">
            <Select
              // isMulti
              options={amusementParks}
              className="shadow-sm border rounded-lg"
              styles={customStyles}
              onChange={handleSelectChange}
              placeholder="Select Amusement Parks"
            />

            {/* Trips Date */}

            <div>
              <button
                onClick={handleClick2}
                className="flex items-center justify-between w-full border p-[10px] text-gray-500 pl-5 text-lg rounded-lg bg-white shadow-sm"
              >
                <span>Trip dates</span>
                <span
                  className={`${
                    open2 ? "rotate-180" : "rotate-0"
                  } transition-transform opacity-50`}
                >
                  <DropDown />
                </span>
              </button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div className="w-[350px] px-3 py-3 flex flex-col gap-5">
                  {/* <h4 className="mb-3 text-base font-medium text-black-900  ">
                    Hello
                  </h4> */}
                  {/* dates */}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-3 justify-between items-center">
                      <div className="flex flex-col gap-2">
                        <h5 className="text-sm text-black-ercas font-bold ">
                          Trip start date
                        </h5>
                        <input
                          type="date"
                          className={`border text-sm py-[12px] text-gray-500 ${
                            errors.startDate?.message
                              ? "border-red-100"
                              : "border-grey-800"
                          } px-4 rounded-lg outline-none ${
                            errors.startDate?.message
                              ? "focus:border-red-500 border-1"
                              : "focus:border-primary-800"
                          } `}
                          {...register("startDate", {
                            required: "start date!",
                          })}
                        />
                        <FormHelperText error>
                          {errors.startDate?.message}
                        </FormHelperText>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h5 className="text-sm text-black-ercas font-bold ">
                          Trip end date
                        </h5>
                        <input
                          type="date"
                          placeholder="Lagos ibadan"
                          className={`border text-sm py-[12px] text-gray-500 ${
                            errors.endDate?.message
                              ? "border-red-100"
                              : "border-grey-800"
                          } px-4 rounded-lg outline-none ${
                            errors.endDate?.message
                              ? "focus:border-red-500 border-1"
                              : "focus:border-primary-800"
                          } `}
                          {...register("endDate", {
                            required: "end date!",
                          })}
                        />
                        <FormHelperText error>
                          {errors.endDate?.message}
                        </FormHelperText>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end mt-2">
                      <input
                        type="button"
                        value={"Cancel"}
                        onClick={handleClose2}
                        className=" py-2 px-6 border text-sm rounded-lg hover:opacity-75 transition-opacity text-orange-500 font-bold border-red-500"
                      />

                      <button
                        // onClick={setbrandOnchange}
                        className=" py-2 px-6 text-sm rounded-lg hover:opacity-75 transition-opacity text-white font-bold bg-orange-500"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              </Menu>
            </div>

            {/* Trip price */}

            <div>
              <button
                onClick={handleClick3}
                className="flex items-center justify-between w-full border p-[10px] text-gray-500 pl-5 text-lg rounded-lg bg-white shadow-sm"
              >
                <span>Trip price</span>
                <span
                  className={`${
                    open3 ? "rotate-180" : "rotate-0"
                  } transition-transform opacity-50`}
                >
                  <DropDown />
                </span>
              </button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl3}
                open={open3}
                onClose={handleClose3}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div className="w-[300px] px-3 py-3 flex flex-col">
                  <h4 className="mb-3 text-base font-bold text-black  ">
                    Price per person
                  </h4>
                  <div className="flex flex-col mb-6">
                    <Slider
                      min={100}
                      max={10000}
                      step={10}
                      range
                      value={priceRange.value}
                      onChange={(value) => handleSliderChange("value", value)}
                    />
                  </div>
                  <div className="grid text-gray-500 grid-cols-2 gap-3">
                    <span className="border rounded-lg px-3 py-2 font-bold text-lg">
                      $ {Math.trunc(priceRange.value[0])}
                    </span>
                    <span className="border rounded-lg px-3 py-2 font-bold text-lg">
                      $ {Math.trunc(priceRange.value[1])}
                    </span>
                  </div>
                </div>
              </Menu>
            </div>
          </div>

          <div className="tour-cards mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {isLoading ? (
              <ClipLoader />
            ) : (
              <>
                {filteredTours.length > 0 ? (
                  filteredTours?.map((tour) => (
                    <TourCard key={tour._id} data={tour} />
                  ))
                ) : (
                  <p className="text-center sm:text-left">Tour not found</p>
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Tours;
