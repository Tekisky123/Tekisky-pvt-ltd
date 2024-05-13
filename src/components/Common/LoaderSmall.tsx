import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
