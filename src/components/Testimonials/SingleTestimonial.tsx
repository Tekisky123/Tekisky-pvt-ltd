import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { name, image, content } = testimonial;

  return (
    <div className="w-full">
      <div className="h-auto rounded-sm bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
        <div className="relative mr-4 h-[200px] w-full max-w-[350px] overflow-hidden">
          <Image src={image} alt={name} fill />
        </div>
        <h1 className="mb-5 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg mt-5 ">
          {name}
        </h1>

        <p className=" h-40 overflow-hidden pb-8 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
          {" "}
          “{content}
        </p>
      </div>
    </div>
  );
};

export default SingleTestimonial;
