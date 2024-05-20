import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,

    name: "Web Development:",

    content:
      "Our web development services are tailored to your specific requirements, ensuring that your online presence reflects your brand identity and values. Whether you need a custom website or an e-commerce platform, we have the expertise to bring your vision to life.",
    image:
      "/images/hero/web-development-coding-programming-internet-technology-business-concept-web-development-coding-programming-internet-technology-121903546.webp",
  },
  {
    id: 2,
    name: "Corporate Training:",
    content:
      "Enhance your team's skills and productivity with our comprehensive corporate training programs. We offer customized training solutions that address your specific business needs and help your employees stay ahead of the curve.",
    image: "/images/hero/corporeate training.png",
  },
  {
    id: 3,
    name: "Corporate Trainers:",
    content:
      "Our experienced corporate trainers are experts in their respective fields. They provide engaging and impactful training sessions that equip your team with the knowledge and skills they need to excel in their roles.",
    image: "/images/hero/corporate_training.jpg",
  },
  {
    id: 4,
    name: "IT Consultancy:",
    content:
      "Our IT consultancy services help you navigate the complex world of technology. From strategic planning to implementation, we provide expert guidance to ensure your IT infrastructure supports your business goals.",
    image: "/images/hero/industrial-consultancy-services.png",
  },
  {
    id: 5,
    name: "IT Services:",
    content:
      "We offer a wide range of IT services to support your business operations. From network management to cybersecurity, our services are designed to keep your IT systems running smoothly and securely.",
    image: "/images/hero/IT-Support-Services-Detailed-IT-Services.jpg",
  },
  {
    id: 6,

    name: "Mobile App Development:",

    content:
      "From native apps to cross-platform solutions, our mobile app development services cover all your needs. We specialize in creating engaging and user-friendly applications that enhance the mobile experience for your customers.",
    image: "/images/hero/gradient-ui-ux-background_23-2149065783.avif",
  },
  {
    id: 7,

    name: "Software Development:",

    content:
      "Our software development services are designed to streamline your business operations and drive efficiency. Whether you need a custom solution or an off-the-shelf product, we have the skills and experience to deliver high-quality software that meets your needs.",
    image: "/images/hero/software-development-button.jpg",
  },
  {
    id: 8,

    name: "UI/UX Design:",

    content:
      "User experience is at the heart of everything we do. Our UI/UX design services focus on creating intuitive and visually appealing interfaces that delight users and drive engagement.",
    image: "/images/hero/gradient-ui-ux-background_23-2149052117.avif",
  },
  {
    id: 9,

    name: "Data Science:",

    content:
      "Unlock the power of your data with our data science services. From data analysis to predictive modeling, we help you turn raw data into actionable insights that drive informed decision-making.",
    image: "/images/blog/960x0.webp",
  },
  {
    id: 10,

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
