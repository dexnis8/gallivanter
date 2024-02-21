// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
export const AngleDown = ({ size = 14, color = "#544F4C" }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M11.6846 5.55953L7.30963 9.93453C7.269 9.97521 7.22075 10.0075 7.16764 10.0295C7.11452 10.0515 7.05759 10.0628 7.0001 10.0628C6.94261 10.0628 6.88568 10.0515 6.83256 10.0295C6.77945 10.0075 6.7312 9.97521 6.69057 9.93453L2.31557 5.55953C2.25431 5.49834 2.21259 5.42036 2.19568 5.33545C2.17877 5.25053 2.18744 5.16251 2.22058 5.08253C2.25372 5.00254 2.30985 4.93419 2.38186 4.88612C2.45387 4.83805 2.53852 4.81243 2.6251 4.8125H11.3751C11.4617 4.81243 11.5463 4.83805 11.6183 4.88612C11.6904 4.93419 11.7465 5.00254 11.7796 5.08253C11.8128 5.16251 11.8214 5.25053 11.8045 5.33545C11.7876 5.42036 11.7459 5.49834 11.6846 5.55953Z"
          fill={color}
        />
      </svg>
    </>
  );
};
