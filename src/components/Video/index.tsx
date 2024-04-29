"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

import ModalVideo from "react-modal-video";

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Why Choose Tekisky Software?"
          paragraph=""
          center
          mb="80px"
        />
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2 ">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[600px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                 src="/images/hero/Seminar-pana.svg"
                 alt="about image"
                 fill
                 className="drop-shadow-three  dark:drop-shadow-none content-image"
                
               />
              
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Expertise
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our team comprises seasoned professionals with years of
                  experience in their respective fields.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Innovation
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We stay ahead of the curve by constantly exploring new
                  technologies and methodologies to deliver cutting-edge
                  solutions.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Client-Centric Approach:
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We prioritize client satisfaction and work closely with you to
                  understand your unique needs and deliver tailored solutions.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Quality Assurance:
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We adhere to rigorous quality standards to ensure that our
                  solutions meet the highest levels of performance, reliability,
                  and security.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
