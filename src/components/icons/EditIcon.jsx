/* eslint-disable react/prop-types */
// import React from "react";

const EditIcon = ({ width = 17, height = 16 }) => {
  return (
    <div className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 21 20"
        fill="none"
      >
        <path
          d="M10.0317 3.33325H4.19834C3.75632 3.33325 3.33239 3.50885 3.01983 3.82141C2.70727 4.13397 2.53168 4.55789 2.53168 4.99992V16.6666C2.53168 17.1086 2.70727 17.5325 3.01983 17.8451C3.33239 18.1577 3.75632 18.3333 4.19834 18.3333H15.865C16.307 18.3333 16.731 18.1577 17.0435 17.8451C17.3561 17.5325 17.5317 17.1086 17.5317 16.6666V10.8333"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2817 2.08344C16.6132 1.75192 17.0628 1.56567 17.5317 1.56567C18.0005 1.56567 18.4502 1.75192 18.7817 2.08344C19.1132 2.41496 19.2994 2.8646 19.2994 3.33344C19.2994 3.80228 19.1132 4.25192 18.7817 4.58344L10.865 12.5001L7.53168 13.3334L8.36501 10.0001L16.2817 2.08344Z"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default EditIcon;
