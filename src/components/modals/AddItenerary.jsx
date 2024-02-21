/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import ArrowDrop from "../icons/ArrowDrop";
import CancelArror from "../icons/CancelArror";
import { BigModalLayout } from "./ModalLayout";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  useAddIteneryMutation,
  useUploadTourImagesMutation,
} from "../../redux/api/Services";
import { useParams } from "react-router-dom";

const AddItenerary = ({ open, handleClose }) => {
  const { tour_id } = useParams();

  const { register, handleSubmit, setValue, watch, formState } = useForm({
    // mode: "onChange",
  });
  const { errors } = formState;
  const [images, setImages] = useState([]);
  const [validationError, setValidationError] = useState("");
  const fileInputRef = useRef(null);

  // Select options
  const [options, setOptions] = useState({ type: "", category: "" });
  // if no image is chosen
  const [imgErr, setImgErr] = useState("");

  // Queries
  const [
    addItenery,
    { data: response, isLoading: uploading, error: error_adding_itenery },
  ] = useAddIteneryMutation();
  const [
    uploadTourImages,
    {
      data: image_response,
      isLoading: uploading_image,
      error: error_uploading_image,
    },
  ] = useUploadTourImagesMutation();
  // Handle Image selection

  function selectFiles() {
    fileInputRef.current.click();
    setValidationError("");
  }

  // function onFileSeletion(event) {
  //   const file = event.target.files[0];
  //   if (file.length === 0) return;
  //   if (file.length > 0) {
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     console.log(formData);
  //     uploadTourImages(formData);
  //   }
  //   //fire upload image endpoint here

  //   // setImage to the returned url in useState
  //   // setImages([
  //   //   {
  //   //     name: file.name,
  //   //     url: URL.createObjectURL(file),
  //   //   },
  //   // ]);
  //   setImgErr("");
  // }
  async function onFileSelection(event) {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("tourImages", file);

    try {
      console.log(formData);

      await uploadTourImages({ formData });

      // Handle the response as needed
    } catch (error) {
      // Handle the error
      console.error("Image upload error:", error.message);
    }

    // Reset or update state as needed
    setImgErr("");
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  useEffect(() => {
    console.log(image_response);
    console.log(error_uploading_image);
  }, [image_response, error_uploading_image]);

  const onSubmit = async (data) => {
    try {
      if (images.length === 1) {
        // upload image first and put the returned url here
        data.image = "image url here";
        console.log(data);
        await addItenery({ tour_id });
        setImgErr("");
      } else if (images.length > 1) {
        setImgErr("Only one image can be selected");
      } else {
        setImgErr("Please select at least one image!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(response);
    console.log(error_adding_itenery);
    if (error_adding_itenery) {
      toast.error(error_adding_itenery?.data?.message);
    }
  }, [response, error_adding_itenery]);

  return (
    <>
      <BigModalLayout size="small" open={open} handleClose={handleClose}>
        <div className="px-8 py-6">
          <h2 className="text-[20px] mb-4 font-bold">Add Itenery</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <label className="text-black font-bold text-sm">Day</label>
            <input
              type="number"
              {...register("day", {
                required: "What day of the tour?",
              })}
              placeholder="e.g 1"
              className="h-10 text-sm  outline-none focus:border-primary-800 bg-transparent border rounded-md pl-2"
            />
            <FormHelperText error>{errors?.day?.message}</FormHelperText>

            {/*  */}
            <label className="text-black font-bold text-sm">Title</label>
            <input
              {...register("title", {
                required: "Give the day a title",
              })}
              placeholder="e.g Arrival in Hawaii"
              className="h-10 text-sm  outline-none focus:border-primary-800 bg-transparent border rounded-md pl-2"
            />
            <FormHelperText error>{errors?.title?.message}</FormHelperText>
            {/*  */}
            <label className="text-black font-bold text-sm">Description</label>

            <textarea
              cols="10"
              rows="6"
              {...register("description", {
                required: "Give a description.",
              })}
              placeholder="e.g We'll go immediately to the restaurant"
              className=" text-sm outline-none focus:border-primary-800 bg-transparent border rounded-md pl-2 pt-2"
            />
            <FormHelperText error>
              {errors?.description?.message}
            </FormHelperText>

            {/*IMage container*/}
            <div>
              <label className="text-black leading-5 text-sm font-bold">
                Select an Image Image
              </label>
              <div className="flex flex-col mt-1 justify-center border px-[34px] py-[21.4px]  rounded-lg border-dashed border-grey-400">
                <div className="text-center flex justify-center">
                  {uploading_image ? <ClipLoader /> : <ArrowDrop />}
                </div>
                <div className="flex justify-center">
                  <span className="text-[15] flex flex-col justify-center text-center text-grey-900">
                    Drop files here to upload
                    <p className="text-[15] text-grey-800">
                      Supported formats: png, jpeg.
                    </p>
                    <p className="text-[15] text-grey-800">Maximum size: 5MB</p>
                    <p
                      onClick={selectFiles}
                      className="cursor-pointer text-grey-800 hover:underline "
                    >
                      Browse
                    </p>
                    <input
                      type="file"
                      name="file"
                      // accept="image/jpeg, image/png"
                      // multiple
                      onChange={onFileSelection}
                      className="hidden"
                      ref={fileInputRef}
                    />
                  </span>
                </div>
              </div>
              <FormHelperText error>{validationError || imgErr}</FormHelperText>
              <div className="relative mt-3 grid grid-cols-2 gap-2 ">
                {images.map((images, index) => (
                  <div className="relative flex flex-col " key={index}>
                    <div
                      className="absolute flex justify-end right-0 top-0 p-[3px] cursor-pointer bg-red-100 
                      rounded-full"
                      onClick={() => deleteImage(index)}
                    >
                      <CancelArror />
                    </div>
                    <span className="flex rounded-lg p-1 shadow-card justify-centeritems-center overflow-hidden border ">
                      <img
                        src={images.url}
                        alt={images.name}
                        className=" w-full h-full object-conver rounded-lg"
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/*IMage container*/}

            <div className="flex gap-5 justify-end mt-12 ">
              <input
                type="button"
                value="Cancel"
                onClick={handleClose}
                className="py-2 rounded-full text-sm font-bold w-[120px] text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-opacity"
              />
              <button
                type="submit"
                disabled={uploading}
                className="py-3 rounded-full w-[140px] bg-orange-500 hover:bg-primary-800 font-bold text-sm text-white transition-opacity"
              >
                {uploading ? <ClipLoader size={16} color="#fff" /> : "Add"}
              </button>
            </div>
          </form>
        </div>
      </BigModalLayout>
    </>
  );
};

export default AddItenerary;
