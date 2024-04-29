import { Feature } from "@/types/feature";
import Image from "next/image";
const featuresData: Feature[] = [
  {
    id: 1,
    image: (
      <Image
        src="/images/hero/960x0.webp"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "Data Science Solutions",
    paragraph:
      "Unleash the power of your data with our advanced data science services. From predictive analytics to data visualization, we offer comprehensive solutions to help you extract actionable insights and drive informed decision-making.",
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/hero/web-development-coding-programming-internet-technology-business-concept-web-development-coding-programming-internet-technology-121903546.webp"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "Web Development Services",
    paragraph:
      "Elevate your online presence with our bespoke web development services. Whether you need a stunning website, a powerful web application, or an intuitive e-commerce platform, our team has the expertise to bring your vision to life.",
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/hero/software-development-button.jpg"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "Software Development Solutions",
    paragraph:
      "From concept to deployment, we specialize in developing custom software solutions tailored to your specific requirements. Whether you're a startup or a large enterprise, we have the skills and experience to deliver robust and scalable software solutions.",
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/hero/preview-image.jpg"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "AI & Machine Learning Solutions",
    paragraph:
      "Harness the potential of artificial intelligence with our machine learning services. Whether you need predictive modeling, natural language processing, or computer vision solutions, our team can help you leverage the latest advancements in AI to drive innovation and efficiency.",
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/hero/gradient-ui-ux-background_23-2149065783.avif"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "Mobile Development",
    paragraph:
      "Stay connected with your audience on the go with our mobile development services. Whether you need a native iOS or Android app, a cross-platform solution, or a mobile-friendly website, we can help you reach your customers wherever they are.",
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/hero/sapce-1140x641.jpg"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "Geospatial Solutions",
    paragraph:
      "Leverage the power of location-based data with our geospatial solutions. From mapping and spatial analysis to geographic information systems (GIS), we offer tailored solutions to help you make informed decisions and optimize your operations.",
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/hero/devops-engineer-and-cloud-engineer.png"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "DevOps & Cloud Services",
    paragraph:
      "Streamline your development process and scale with confidence with our DevOps and cloud services. From continuous integration and deployment (CI/CD) to cloud infrastructure management and optimization, we help you leverage the agility and scalability of the cloud while ensuring security and reliability.",
  },
];
export default featuresData;
