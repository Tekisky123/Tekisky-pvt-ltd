import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="hero-section relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[20px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2">
              <div className="mx-auto mt-[100px] max-w-[800px] text-left  md:text-start">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Tekisky Private Limited
                </h1>
                <p className="mb-10 text-justify text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                is a Private incorporated on 27 September 2021 Tekisky, providing elegant business solutions for brands across the globe.
                </p>

                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-start">
                  <Link
                    href="/contact"
                    className=" bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 rounded-lg"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center px-4 md:w-1/2 md:justify-end">
              <div className="hidden md:block">
                <div className=" flex justify-end">
                  <Image
                    src="/images/hero/Coding workshop-amico.svg"
                    alt="Your Image"
                    width={600}
                    className="hero-section-img"
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
