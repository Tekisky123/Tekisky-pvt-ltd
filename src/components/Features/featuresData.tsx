import { Feature } from "@/types/feature";
import Image from "next/image";
const featuresData: Feature[] = [
  {
    id: 1,
    image: (
      <Image
        src="/images/blog/mern.png"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "MERN Full Stack Development ",
    paragraph: `Learn the MERN stack: MongoDB, Express, React, and Node.js, to build powerful and modern web applications, Syllabus includes HTML, CSS, JavaScript, React.js, and Node.js.Ideal for aspiring full-stack developers looking to master the latest technologies in web development.`,
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/blog/960x0.webp"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "Data Science ",
    paragraph: `Dive into the multidisciplinary field of data science, mastering techniques and tools to extract meaningful insights from data.
Topics cover artificial intelligence and machine learning.
Perfect for individuals interested in analyzing and interpreting data to drive business decisions.`,
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/blog/1679683081898.png"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "Front-end Developer",
    paragraph: `Learn the essentials of frontend development, focusing on HTML, CSS, and JavaScript.
         Develop skills in creating user interfaces and interactive web experiences.
         Suitable for beginners aiming to kickstart their career in web development.`,
  },
  {
    id: 1,
    image: (
      <Image
        src="/images/blog/0_TrneyH4gnbEHvgGM.png"
        alt="Your Image"
        className="service-img"
        width={600}
        height={500}
      />
    ),
    title: "Node.js Developer",
    paragraph: `Become proficient in backend development using Node.js.
      Topics include JavaScript, MongoDB, NPM, REST API, and Node.js.
      Designed for developers interested in building scalable and efficient backend systems for web applications.`,
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
