/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
// import React from 'react'

import { FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelArror from "../../../components/icons/CancelArror";
import { useEffect, useRef, useState } from "react";
import ArrowDrop from "../../../components/icons/ArrowDrop";
import { useDispatch, useSelector } from "react-redux";
import {
  nextTourStep,
  refetchItineries,
  setTourId,
} from "../../../redux/slices/authToken";
import {
  useCreateTourMutation,
  useDeleteIteneryMutation,
  useLazyGetAllIteneryQuery,
  useUpdateTourMutation,
} from "../../../redux/api/Services";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import AddItenerary from "../../../components/modals/AddItenerary";
import axios from "axios";
import { IteneryCard } from "./EditTour";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const dispatch = useDispatch();

  const [createTour, { data, isLoading, error }] = useCreateTourMutation();

  const onFormSubmit = (data) => {
    console.log(data);
    createTour(data);
    // dispatch(nextTourStep());
  };
  useEffect(() => {
    if (data?.status === "success") {
      toast.success(data?.message);
      console.log(data?.data?._id);
      // sessionStorage.setItem("tour_id", data?._id);
      dispatch(nextTourStep(2));
      dispatch(setTourId(data?.data?._id));
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [data, error]);
  console.log(data);
  console.log(error);
  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <div className="sm:px-10 py-5 rounded-lg sm:shadow-md sm:border">
          <h3 className="text-xl font-bold mb-2">Tour Details</h3>
          <p className="sm:w-[60%] mb-3 text-gray-500 text-base ">
            Start building your trip by sharing the location, dates, and what’s
            included in the experience.
          </p>
          <section className="flex flex-col gap-y-3 sm:w-[60%] ">
            <div className="flex flex-col gap-y-1">
              <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                Tour name
              </h4>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="e.g Me time"
                  className={`border text-sm py-[12px] text-gray-500 ${
                    errors.title?.message ? "border-red-100" : "border-grey-800"
                  } px-4 rounded-lg outline-none ${
                    errors.title?.message
                      ? "focus:border-red-500 border-1"
                      : "focus:border-primary-800"
                  } `}
                  {...register("title", {
                    required: "Give your tour a name!",
                  })}
                />
                <FormHelperText error>{errors.title?.message}</FormHelperText>
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                Tour destination
              </h4>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="e.g ikeja Lagos"
                  className={`border text-sm py-[12px] text-gray-500 ${
                    errors.location?.message
                      ? "border-red-100"
                      : "border-grey-800"
                  } px-4 rounded-lg outline-none ${
                    errors.location?.message
                      ? "focus:border-red-500 border-1"
                      : "focus:border-primary-800"
                  } `}
                  {...register("location", {
                    required: "Enter tour location!",
                  })}
                />
                <FormHelperText error>
                  {errors.location?.message}
                </FormHelperText>
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                Tour description
              </h4>
              <p className="text-sm text-gray-500">
                In 2-3 sentences, let your guests know what they can expect on
                the trip.
              </p>
              <div className="flex flex-col">
                <textarea
                  placeholder="e.g an excursion to olumo rock"
                  cols="30"
                  rows="3"
                  className={`border text-sm py-[12px] text-gray-500 ${
                    errors.description?.message
                      ? "border-red-100"
                      : "border-grey-800"
                  } px-4 rounded-lg outline-none ${
                    errors.description?.message
                      ? "focus:border-red-500 border-1"
                      : "focus:border-primary-800"
                  } `}
                  {...register("description", {
                    required: "Give your tour a description!",
                  })}
                ></textarea>

                <FormHelperText error>
                  {errors.description?.message}
                </FormHelperText>
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                Number of days
              </h4>
              <div className="flex flex-col">
                <input
                  type="number"
                  placeholder="e.g 5"
                  className={`border text-sm py-[12px] text-gray-500 ${
                    errors.numOfDays?.message
                      ? "border-red-100"
                      : "border-grey-800"
                  } px-4 rounded-lg outline-none ${
                    errors.numOfDays?.message
                      ? "focus:border-red-500 border-1"
                      : "focus:border-primary-800"
                  } `}
                  {...register("numOfDays", {
                    required: "Enter number of days!",
                  })}
                />
                <FormHelperText error>
                  {errors.numOfDays?.message}
                </FormHelperText>
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                Tour date
              </h4>
              <div className="grid grid-cols-2 gap-3 justify-between items-center">
                <div className="flex flex-col">
                  <h5 className="text-sm text-black-ercas ">Start date</h5>
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
                <div className="flex flex-col">
                  <h5 className="text-sm text-black-ercas ">End date</h5>
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
            </div>

            <div className="flex flex-col gap-y-1">
              <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                Price
              </h4>
              <div className="grid grid-cols-2 gap-3 justify-between items-center">
                <div className="flex flex-col">
                  <h5 className="text-sm text-black-ercas ">Currency</h5>
                  <select
                    className={`border text-sm py-[12px] text-gray-500 ${
                      errors.currency?.message
                        ? "border-red-100"
                        : "border-grey-800"
                    } pl-2 rounded-lg outline-none ${
                      errors.currency?.message
                        ? "focus:border-red-500 border-1"
                        : "focus:border-primary-800"
                    } `}
                    {...register("currency", {
                      required: "Select a currency",
                    })}
                  >
                    <option value="">Select</option>
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                  </select>
                  <FormHelperText error>
                    {errors.currency?.message}
                  </FormHelperText>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-sm text-black-ercas ">Value</h5>
                  <input
                    type="number"
                    placeholder="enter price in dollars"
                    className={`border text-sm py-[12px] text-gray-500 ${
                      errors.price?.message
                        ? "border-red-100"
                        : "border-grey-800"
                    } px-4 rounded-lg outline-none ${
                      errors.price?.message
                        ? "focus:border-red-500 border-1"
                        : "focus:border-primary-800"
                    } `}
                    {...register("price", {
                      required: "Enter tour price!",
                    })}
                  />
                  <FormHelperText error>{errors.price?.message}</FormHelperText>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <h4 className="text-sm mb-1 font-semibold mt-3 text-black-ercas ">
                Max Capacity
              </h4>
              <div className="flex flex-col">
                <input
                  type="number"
                  placeholder="maximum users that can join tour"
                  className={`border text-sm py-[12px] text-gray-500 ${
                    errors.maxCapacity?.message
                      ? "border-red-100"
                      : "border-grey-800"
                  } px-4 rounded-lg outline-none ${
                    errors.maxCapacity?.message
                      ? "focus:border-red-500 border-1"
                      : "focus:border-primary-800"
                  } `}
                  {...register("maxCapacity", {
                    required: "Enter tour max capacity!",
                  })}
                />
                <FormHelperText error>
                  {errors.maxCapacity?.message}
                </FormHelperText>
              </div>
            </div>
          </section>
        </div>
        <div className="my-5 flex justify-end">
          <button
            type="submit"
            // disabled
            className={`mt-20 border py-3 rounded-lg text-sm font-bold bg-orange-500 text-white px-10 transition-all duration-300 hover:opacity-75`}
          >
            {isLoading ? (
              <ClipLoader size={12} color="#fff" />
            ) : (
              "Save & continue"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

const Step2 = () => {
  const [images, setImages] = useState([]);
  const [validationError, setValidationError] = useState("");
  const [setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imgErr, setImgErr] = useState("");
  const token = useSelector((state) => state.authToken.token);
  const tour_id = useSelector((state) => state.authToken.tour_id);
  const refetchItenery = useSelector((state) => state.authToken.refetchItinery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Queries
  const [
    updateTour,
    { data: update_response, isLoading: updating, error: update_error },
  ] = useUpdateTourMutation();
  const [
    getAllItenery,
    { data: iteneries, isLoading: loading_iteneries, error: fetch_error },
  ] = useLazyGetAllIteneryQuery();
  const [deleteItenery, { isLoading: deleting }] = useDeleteIteneryMutation();

  function selectFiles() {
    fileInputRef.current.click();
    setValidationError("");
  }
  function onFileSeletion(event) {
    const files = event.target.files;

    if (files.length === 0) return;
    handleImageUpload(files);
  }
  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }
  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }
  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name == files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  useEffect(() => {
    getAllItenery({ tour_id });
  }, [tour_id, refetchItenery]);
  useEffect(() => {
    console.log(update_response);
    console.log(update_error);
    if (update_response?.status === "success") {
      toast.success(update_response?.message);
      navigate("/dashboard/created-tours");
      dispatch(nextTourStep(1));
    }
    if (update_error) {
      toast.error("Unable to publish tour");
    }
  }, [update_response, update_error]);

  async function handleImageUpload(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("tourImages", files[i]);
    }
    setLoading(true);
    const response = await axios.post(
      `https://wild-teal-sawfish-cap.cyclic.app/api/v1/creators/tours/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setLoading(false);
      console.log(response);
      toast.success(response?.data?.message);
      setImages((prev) => [...prev, ...response?.data?.images]);
    }
  }

  function handlePublishTour() {
    if (images.length > 0) {
      const data = {
        tourImagesData: images,
        itinerary: iteneries?.data,
      };
      updateTour({ data, tour_id });
    } else {
      toast.error("Please select at least one image");
    }
  }
  return (
    <>
      <AddItenerary open={open} handleClose={handleClose} id={tour_id} />

      <div className="flex flex-col gap-8">
        {/* Tour Photos */}
        <div className="px-10 py-5 rounded-lg shadow-md border">
          <h3 className="text-xl font-bold mb-3"> Tour photos </h3>
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className="flex flex-col mt-1 justify-center border px-5 sm:px-[34px] py-[21.4px]  rounded-lg border-dashed border-grey-400"
          >
            <div className="text-center flex justify-center">
              {loading ? <ClipLoader /> : <ArrowDrop />}
            </div>
            <div className="flex justify-center">
              <span className="text-[15] flex flex-col justify-center text-center text-grey-500">
                Drop files here to upload
                <p className="text-[15] text-grey-500">
                  Supported formats: png, jpeg.
                </p>
                <p className="text-[15] text-grey-500">Maximum size: 5MB</p>
                <p
                  onClick={selectFiles}
                  className="cursor-pointer text-grey-500 hover:underline "
                >
                  Browse
                </p>
                <input
                  type="file"
                  name="file"
                  accept="image/jpeg, image/png"
                  multiple
                  onChange={onFileSeletion}
                  className="hidden"
                  ref={fileInputRef}
                  // ref={(e) => {
                  //   register("images", {
                  //     // required: "Please select at least one image.",
                  //     // validate: validateImages,
                  //   });
                  //   fileInputRef.current = e;
                  // }}
                />
              </span>
            </div>
          </div>
          <FormHelperText error>{validationError || imgErr}</FormHelperText>
          <div className="relative mt-3 grid md:grid-cols-2  lg:grid-cols-3 gap-2 ">
            {images?.map((image, index) => (
              <div className="relative flex flex-col " key={index}>
                <div
                  className="absolute flex justify-end right-0 top-0 p-[3px] cursor-pointer bg-red-500 
                      rounded-full"
                  onClick={() => deleteImage(index)}
                >
                  <CancelArror />
                </div>
                <span className="flex rounded-lg p-1 shadow-card justify-centeritems-center overflow-hidden  border h-[200px] ">
                  <img
                    src={image.url}
                    alt={image._id}
                    className=" w-full h-full object-fill rounded-lg"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Itenery */}
        <div className="px-2 sm:px-10 py-5 rounded-lg shadow-md border">
          <h3 className="text-xl font-bold mb-3">Trip Itinerary</h3>
          <p className="text-sm text-gray-500 mb-4  sm:w-1/2">
            Show your itinerary to your guests. With this , guests can know what
            to expect and how much fun it'll be.
          </p>

          <div className="iteneries grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Map through iteneries here */}
            {loading_iteneries ? (
              <ClipLoader />
            ) : (
              <>
                {iteneries?.data?.map((item) => (
                  <IteneryCard
                    key={item}
                    data={item}
                    handleDelete={() => {
                      deleteItenery({ tour_id, itenery_id: item._id });
                      dispatch(refetchItineries());
                    }}
                    isDeleting={deleting}
                    showDeleteBtn={true}
                  />
                ))}
              </>
            )}
            <div className="flex justify-center flex-col items-center rounded-lg border border-dashed py-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#808080"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>

              <input
                type="button"
                value="Add"
                onClick={handleOpen}
                className="mt-2 bg-orange-500 text-white hover:opacity-75 px-7 text-sm font-bold  py-2 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="my-5 flex justify-end">
          <button
            type="submit"
            disabled={updating}
            onClick={handlePublishTour}
            className={`mt-20 border py-3 rounded-lg text-sm font-bold bg-orange-500 text-white px-10 transition-all duration-300 hover:opacity-75`}
          >
            {updating ? <ClipLoader size={12} color="#fff" /> : " Publish"}
          </button>
        </div>
      </div>
    </>
  );
};

export const CreateTour = () => {
  const tourStep = useSelector((state) => state.authToken.createTourStep);
  console.log(tourStep);
  return (
    <>
      <div className="flex flex-col gap-8">
        {/* All steps goes here */}

        {tourStep === 1 && <Step1 />}
        {tourStep === 2 && <Step2 />}
      </div>
    </>
  );
};
