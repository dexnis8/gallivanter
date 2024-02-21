/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Fade, Modal, Backdrop } from "@mui/material";
import CloseModalIcon from "../icons/CloseModalIcon";

export const BigModalLayout = ({
  open,
  handleClose,
  children,
  size, //big or medium
}) => {
  return (
    <div className="outline-none">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div
            className={`flex flex-col gap-3 absolute translate-x-1/2 w-[95%] shadow-card sm:w-[80%] ${
              size.toLowerCase() == "big"
                ? "lg:w-3/4"
                : size.toLowerCase() == "medium"
                ? "lg:w-1/2"
                : "lg:w-[500px]"
            } translate-y-1/2 top-[-40%] xl:top-[-40%] right-[50%] `}
          >
            <span
              onClick={handleClose}
              className="cursor-pointer self-end rounded-full hover:opacity-75 transition-opacity p-2 bg-white "
            >
              <CloseModalIcon />
            </span>
            <div className="bg-white rounded-lg shadow-card overflow-y-scroll h-[80vh] ">
              {children}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const SmallModalLayout = ({
  open,
  handleOpen,
  handleClose,
  children,
  hideClose,
}) => {
  return (
    <div className="outline-none">
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className="flex flex-col gap-3 absolute translate-x-1/2 w-[95%] sm:w-[80%] lg:w-[388px] translate-y-1/2 md:top-[-10%] lg:top-[-25%] right-[50%] ">
            <span
              onClick={handleClose}
              className={`${
                hideClose ? "hidden" : "block"
              }cursor-pointer self-end rounded-full hover:opacity-75 transition-opacity p-2 bg-white`}
            >
              <CloseModalIcon />
            </span>
            <div className="bg-white rounded-lg shadow-card ">{children}</div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const BottomNavModalLayout = ({
  open,
  handleOpen,
  handleClose,
  children,
}) => {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className="flex outline-none md:hidden flex-col gap-3 absolute translate-x-1/2 w-[100%] sm:w-[80%] bottom-0  right-[50%] ">
            {/* <span
              onClick={handleClose}
              className="cursor-pointer self-end rounded-full hover:opacity-75 transition-opacity p-2 bg-white "
            >
              <CloseModalIcon />
            </span> */}
            <div className="bg-white rounded-t-lg shadow-card ">{children}</div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
