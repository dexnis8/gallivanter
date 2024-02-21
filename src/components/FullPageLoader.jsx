// import React from 'react'
import { PropagateLoader } from "react-spinners";

const FullPageLoader = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-primary-200 ">
      <PropagateLoader color="#381914" />
    </div>
  );
};

export default FullPageLoader;
