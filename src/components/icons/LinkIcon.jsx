import React from "react";

const LinkIcon = ({ size = 16, color = "#7E7772" }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8.66655 7.83341C8.53988 7.83341 8.41321 7.78674 8.31321 7.68674C8.11988 7.49341 8.11988 7.17341 8.31321 6.98008L13.7799 1.51341C13.9732 1.32007 14.2932 1.32007 14.4865 1.51341C14.6799 1.70674 14.6799 2.02674 14.4865 2.22007L9.01988 7.68674C8.91988 7.78674 8.79321 7.83341 8.66655 7.83341Z"
          fill={color}
        />
        <path
          d="M14.6666 5.03325C14.3932 5.03325 14.1666 4.80659 14.1666 4.53325V1.83325H11.4666C11.1932 1.83325 10.9666 1.60659 10.9666 1.33325C10.9666 1.05992 11.1932 0.833252 11.4666 0.833252H14.6666C14.9399 0.833252 15.1666 1.05992 15.1666 1.33325V4.53325C15.1666 4.80659 14.9399 5.03325 14.6666 5.03325Z"
          fill={color}
        />
        <path
          d="M9.99992 15.1666H5.99992C2.37992 15.1666 0.833252 13.6199 0.833252 9.99992V5.99992C0.833252 2.37992 2.37992 0.833252 5.99992 0.833252H7.33325C7.60659 0.833252 7.83325 1.05992 7.83325 1.33325C7.83325 1.60659 7.60659 1.83325 7.33325 1.83325H5.99992C2.92658 1.83325 1.83325 2.92658 1.83325 5.99992V9.99992C1.83325 13.0733 2.92658 14.1666 5.99992 14.1666H9.99992C13.0733 14.1666 14.1666 13.0733 14.1666 9.99992V8.66658C14.1666 8.39325 14.3933 8.16658 14.6666 8.16658C14.9399 8.16658 15.1666 8.39325 15.1666 8.66658V9.99992C15.1666 13.6199 13.6199 15.1666 9.99992 15.1666Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default LinkIcon;