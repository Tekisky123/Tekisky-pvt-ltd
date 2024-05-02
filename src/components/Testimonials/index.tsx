import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    
    name: "Web Development:",
    
    content:
      "Our web development services are tailored to your specific requirements, ensuring that your online presence reflects your brand identity and values. Whether you need a custom website or an e-commerce platform, we have the expertise to bring your vision to life.",
    image: "/images/hero/web-development-coding-programming-internet-technology-business-concept-web-development-coding-programming-internet-technology-121903546.webp",
   
  },
  {
    id: 2,
   
    name: "Mobile App Development:",
    
    content:
      "From native apps to cross-platform solutions, our mobile app development services cover all your needs. We specialize in creating engaging and user-friendly applications that enhance the mobile experience for your customers.",
    image: "/images/hero/gradient-ui-ux-background_23-2149065783.avif",
    
  },
  {
    id: 3,
   
    name: "Software Development:",
    
    content:
      "Our software development services are designed to streamline your business operations and drive efficiency. Whether you need a custom solution or an off-the-shelf product, we have the skills and experience to deliver high-quality software that meets your needs.",
    image: "/images/hero/software-development-button.jpg",
    
  },
  {
    id: 4,
   
    name: "UI/UX Design:",
    
    content:
      "User experience is at the heart of everything we do. Our UI/UX design services focus on creating intuitive and visually appealing interfaces that delight users and drive engagement.",
    image: "/images/hero/gradient-ui-ux-background_23-2149052117.avif",
    
  },
  {
    id: 5,
   
    name: "Data Science:",
    
    content:
      "Unlock the power of your data with our data science services. From data analysis to predictive modeling, we help you turn raw data into actionable insights that drive informed decision-making.",
    image: "/images/blog/960x0.webp",
    
  },
  {
    id: 6,
   
    name: "Startup Tech Partnerships:",
    
    content:
      "Our e-commerce solutions are designed to help you succeed in the competitive online marketplace. From website development to digital marketing, we provide end-to-end solutions that drive sales and maximize ROI.",
    image: "/images/hero/960x0.webp",
    
  },
];

const Testimonials = () => {
  return (
    <section className="relative z-10 bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Services"
          paragraph="At Tekisky Pvt Ltd, we offer a comprehensive range of services to meet your digital needs. From web development to data science, our team of experts is dedicated to delivering innovative solutions that drive results for your business."
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
