/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const DeleteIcon = ({ size = 48 }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M40.5 9H33V7.5C33 6.30653 32.5259 5.16193 31.682 4.31802C30.8381 3.47411 29.6935 3 28.5 3H19.5C18.3065 3 17.1619 3.47411 16.318 4.31802C15.4741 5.16193 15 6.30653 15 7.5V9H7.5C7.10218 9 6.72064 9.15804 6.43934 9.43934C6.15804 9.72064 6 10.1022 6 10.5C6 10.8978 6.15804 11.2794 6.43934 11.5607C6.72064 11.842 7.10218 12 7.5 12H9V39C9 39.7957 9.31607 40.5587 9.87868 41.1213C10.4413 41.6839 11.2044 42 12 42H36C36.7956 42 37.5587 41.6839 38.1213 41.1213C38.6839 40.5587 39 39.7957 39 39V12H40.5C40.8978 12 41.2794 11.842 41.5607 11.5607C41.842 11.2794 42 10.8978 42 10.5C42 10.1022 41.842 9.72064 41.5607 9.43934C41.2794 9.15804 40.8978 9 40.5 9ZM18 7.5C18 7.10218 18.158 6.72064 18.4393 6.43934C18.7206 6.15804 19.1022 6 19.5 6H28.5C28.8978 6 29.2794 6.15804 29.5607 6.43934C29.842 6.72064 30 7.10218 30 7.5V9H18V7.5ZM36 39H12V12H36V39ZM21 19.5V31.5C21 31.8978 20.842 32.2794 20.5607 32.5607C20.2794 32.842 19.8978 33 19.5 33C19.1022 33 18.7206 32.842 18.4393 32.5607C18.158 32.2794 18 31.8978 18 31.5V19.5C18 19.1022 18.158 18.7206 18.4393 18.4393C18.7206 18.158 19.1022 18 19.5 18C19.8978 18 20.2794 18.158 20.5607 18.4393C20.842 18.7206 21 19.1022 21 19.5ZM30 19.5V31.5C30 31.8978 29.842 32.2794 29.5607 32.5607C29.2794 32.842 28.8978 33 28.5 33C28.1022 33 27.7206 32.842 27.4393 32.5607C27.158 32.2794 27 31.8978 27 31.5V19.5C27 19.1022 27.158 18.7206 27.4393 18.4393C27.7206 18.158 28.1022 18 28.5 18C28.8978 18 29.2794 18.158 29.5607 18.4393C29.842 18.7206 30 19.1022 30 19.5Z"
          fill="#E24742"
        />
      </svg>
    </div>
  );
};

export default DeleteIcon;
