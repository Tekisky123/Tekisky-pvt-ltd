import Image from "next/image";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader-body">
     <div className="loader-main">
     <span className="bracket">{'{'}</span><span  className="bracket">{'}'}</span>
</div>   </div>
  );
};

export default Loader;
