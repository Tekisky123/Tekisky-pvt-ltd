import Image from "next/image";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader-body">
      <Image
        src="/images/icons/Loader.svg"
        alt="loader "
        width={600}
        className="loader-img"
        height={500}
      />
      <div className="loading-text">Loading... <br /> Sit tight, we&apos;re gathering your details faster than you can say &apos;enroll me&apos;</div>
    </div>
  );
};

export default Loader;
