import Image from "next/image";
import Link from "next/link";

const RelatedPost = ({
  image,
  title,

}: {
  image: string;
  title: string;
 
}) => {
  return (
    <div className="flex items-center lg:block xl:flex">
      <div className="mr-5 lg:mb-3 xl:mb-0">
        <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
        <img
  src={image}
  alt={title}
  className="social-logo"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
        </div>
      </div>
      <div className="w-full">
        <h5>
          
            {title}
        </h5>
        
      </div>
    </div>
  );
};

export default RelatedPost;
