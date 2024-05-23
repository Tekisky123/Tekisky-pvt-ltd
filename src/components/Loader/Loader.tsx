import Image from "next/image";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader-body">
     <img
  src="/images/icons/Loader.svg"
  alt="loader"
  width={600}
  height={500}
  className="loader-img"
  
/>

      <div className="loading-text">Loading... <br /> Sit tight, we&apos;re gathering your details faster than you can say &apos;enroll me&apos;</div>
    </div>
  );
};

export default Loader;
