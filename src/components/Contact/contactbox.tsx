"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const ContactBox = () => {
  const { theme } = useTheme();

  return (
    <div className="relative z-10 rounded-sm bg-white shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11">
      <img
  src="/images/about/Contact us-bro.svg"
  alt="contact-us image"
  width={300}
  height={500}
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>

    </div>
  );
};

export default ContactBox;
