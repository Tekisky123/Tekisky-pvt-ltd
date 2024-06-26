import { Feature } from "@/types/feature";
import Image from "next/image";
const featuresData: Feature[] = [
  {
    id: 1,
    image: (
      <img
      src="/images/blog/mern.png"
      alt="Your Image"
      className="service-img"
      width={600}
      height={500}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    
    ),
    title: "MERN Full Stack Development ",
    paragraph: `Learn the MERN stack: MongoDB, Express, React, and Node.js, to build powerful and modern web applications, Syllabus includes HTML, CSS, JavaScript, React.js, and Node.js.Ideal for aspiring full-stack developers looking to master the latest technologies in web development.`,
  },
  {
    id: 2, 
    image: (
      <img
      src="/images/blog/mernwithPy&DSA.png"
      alt="MERN Full Stack with Python and DSA"
      className="service-img"
      width={600}
      height={500}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    
    ),
    title: "MERN Full Stack with Python and DSA",
    paragraph: `Combine the power of the MERN stack with Python and Data Structures & Algorithms (DSA). Learn to build full-stack applications while mastering Python for backend development and DSA for optimizing code performance. Ideal for developers aiming to enhance their skill set with versatile technologies.`,
  },
  {
    id: 3,
    image: (
      <img
  src="/images/blog/960x0.webp"
  alt="Your Image"
  className="service-img"
  width={600}
  height={500}
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>

    ),
    title: "Data Science ",
    paragraph: `Dive into the multidisciplinary field of data science, mastering techniques and tools to extract meaningful insights from data.
Topics cover artificial intelligence and machine learning.
Perfect for individuals interested in analyzing and interpreting data to drive business decisions.`,
  },
  {
    id: 4,
    image: (
      <img
      src="/images/blog/1679683081898.png"
      alt="Your Image"
      className="service-img"
      width={600}
      height={500}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    
    ),
    title: "Front-end Developer",
    paragraph: `Learn the essentials of frontend development, focusing on HTML, CSS, and JavaScript.
         Develop skills in creating user interfaces and interactive web experiences.
         Suitable for beginners aiming to kickstart their career in web development.`,
  },
  {
    id: 5,
    image: (
      <img
      src="/images/blog/0_TrneyH4gnbEHvgGM.png"
      alt="Your Image"
      className="service-img"
      width={600}
      height={500}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    
    ),
    title: "Node.js Developer",
    paragraph: `Become proficient in backend development using Node.js.
      Topics include JavaScript, MongoDB, NPM, REST API, and Node.js.
      Designed for developers interested in building scalable and efficient backend systems for web applications.`,
  },
  
];
export default featuresData;
