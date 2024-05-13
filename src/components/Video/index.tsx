"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";


const Video = () => {

  return (
    <section className=" md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Why Choose Tekisky ?"
          paragraph=""
          center
          mb="80px"
        />
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2 ">
            <div
              className="relative mx-auto mb-12 aspect-[35/24] max-w-[700px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/hero/Coding workshop-bro.svg"
                alt="about image"
                fill
                className="content-image  drop-shadow-three dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Industry Expertise:
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  With experience serving various domains including Ed-Tech,
                  E-commerce, Healthcare, and more, Tekisky brings
                  industry-specific expertise to the table. This enables them to
                  understand the unique challenges and requirements of different
                  sectors and tailor solutions accordingly.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  International Reach:
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Tekisky places great emphasis on building and maintaining
                  partnerships with distinguished international partners. This
                  global network allows them to access cutting-edge technologies
                  and deliver tailored solutions to customers worldwide.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Mission and Vision: 
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We prioritize client satisfaction and work closely with you to
                  understand your unique needs and deliver tailored solutions.
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
