import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Musharof Chy",
    designation: "Founder @TailGrids",
    content:
      " Their team's expertise and dedication to excellence helped us achieve our goals faster than we ever thought possible From the initial consultation to the final implementation",
    image: "",
    star: 5,
  },
  {
    id: 2,
    name: "Devid Weilium",
    designation: "Founder @UIdeck",
    content:
      "Tekisky Software truly understands our vision and delivers solutions that exceed our expectations every time. Their collaborative approach and commitment to quality make them a valuable partner for our organization",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Lethium Frenci",
    designation: "Founder @Lineicons",
    content:
      "I can't recommend Tekisky Software highly enough. Their agility and responsiveness have been crucial in helping us navigate the ever-changing digital landscape. Partnering with them has been a game-changer",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative z-10 bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="What Our Users Says"
          paragraph="we pride ourselves on delivering exceptional experiences to our clients. Here's what some of them have to say about working with us:"
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
