/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
// import React from 'react'

import { FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelArror from "../../../components/icons/CancelArror";
import { useEffect, useRef, useState } from "react";
import ArrowDrop from "../../../components/icons/ArrowDrop";
import { useDispatch, useSelector } from "react-redux";
import { nextTourStep } from "../../../redux/slices/authToken";
import {
  useCreateTourMutation,
  useUploadTourImagesMutation,
} from "../../../redux/api/Services";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import AddItenerary from "../../../components/modals/AddItenerary";

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
      dispatch(nextTourStep());
      toast.success(data?.message);
      sessionStorage.setItem("tour_id", data?._id);
    }

    if (error) {
      toast.error("Error creating tour");
    }
  }, [data, error]);
  console.log(data);
  console.log(error);
  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <div className="px-10 py-5 rounded-lg shadow-md border">
          <h3 className="text-xl font-bold mb-2">Tour Details</h3>
          <p className="w-[60%] mb-3 text-gray-500 text-base ">
            Start building your trip by sharing the location, dates, and what’s
            included in the experience.
          </p>
          <section className="flex flex-col gap-y-3 w-[60%] ">
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
              <div className="flex flex-col">
                <input
                  type="number"
                  placeholder="enter price in dollars"
                  className={`border text-sm py-[12px] text-gray-500 ${
                    errors.price?.message ? "border-red-100" : "border-grey-800"
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
            {isLoading ? <ClipLoader /> : "Save & continue"}
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [imgErr, setImgErr] = useState("");
  const imgErr = "";

  // Queries

  const [uploadTourImages, { data, isLoading, error }] =
    useUploadTourImagesMutation();

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  function selectFiles() {
    fileInputRef.current.click();
    setValidationError("");
  }
  function onFileSeletion(event) {
    const files = event.target.files;
    const formData = new FormData();
    if (files.length === 0) return;

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] !== "image") continue;
        if (!images.some((e) => e.name == files[i].name)) {
          // Validate the selected images
          // totalSize += files?.size;
          const validationErrorMessage = validateImages(files);

          if (validationErrorMessage) {
            // alert(validationError);
            setValidationError(validationErrorMessage);
            // e.target.value = null; // Clear the input field
          }
          if (!validationErrorMessage) {
            // setImages((prevImages) => [
            //   ...prevImages,
            //   {
            //     name: files[i].name,
            //     url: URL.createObjectURL(files[i]),
            //   },
            // ]);
            setValidationError("");
            formData.append("tourImages", files[i]);
          }
        }
      }

      // upload image endpoint here
      uploadTourImages(formData);
    }
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

  // console.log(selectedImages);
  function validateImages(files) {
    const acceptedTypes = ["image/jpeg", "image/png"];

    for (const file of files) {
      if (!acceptedTypes.includes(file.type)) {
        return "Please upload only JPEG or PNG images.";
      }
      if (file.size > maxFileSize) {
        return "Maximum file size is 5MB.";
      } else {
        return null;
      }
    }

    return true;
  }
  // image selection ends here

  useEffect(() => {
    console.log(data);
    console.log(error);
    console.log(isLoading);
  }, [data, error]);

  return (
    <>
      <AddItenerary open={open} handleClose={handleClose} />

      <div className="flex flex-col gap-8">
        {/* Tour Photos */}
        <div className="px-10 py-5 rounded-lg shadow-md border">
          <h3 className="text-xl font-bold mb-3"> Tour photos </h3>
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className="flex flex-col mt-1 justify-center border px-[34px] py-[21.4px]  rounded-lg border-dashed border-grey-400"
          >
            <div className="text-center flex justify-center">
              <ArrowDrop />
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
          <div className="relative mt-3 grid grid-cols-3 gap-2 ">
            {images.map((images, index) => (
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
                    src={images.url}
                    alt={images.name}
                    className=" w-full h-full object-fill rounded-lg"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Itenery */}
        <div className="px-10 py-5 rounded-lg shadow-md border">
          <h3 className="text-xl font-bold mb-3">Trip Itinerary</h3>
          <p className="text-sm text-gray-500 mb-4  sm:w-1/2">
            Show your itinerary to your guests. With this , guests can know what
            to expect and how much fun it'll be.
          </p>

          <div className="iteneries grid grid-cols-3">
            {/* Map through iteneries here */}
            {/* {[1, 2, 3, 4].map((item) => (
                <div key={item}>{item}</div>
              ))} */}

            <div className="flex flex-col items-center rounded-lg border border-dashed py-5">
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
              {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-16 h-16 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg> */}

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
            // disabled
            className={`mt-20 border py-3 rounded-lg text-sm font-bold bg-orange-500 text-white px-10 transition-all duration-300 hover:opacity-75`}
          >
            Publish
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
