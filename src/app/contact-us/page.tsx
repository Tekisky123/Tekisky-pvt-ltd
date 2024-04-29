import RelatedPost from "@/components/Blog/RelatedPost";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "This is Contact Us Page Of Tekisky Software",
  // other metadata
};

const BlogSidebarPage = () => {
  return (
    <>
      <section className="overflow-hidden pb-[120px] pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Welcome to Tekisky Software
                </h1>
              
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    At Tekisky Software, we&#39;re not just another tech
                    company. We&#39;re a dynamic team of digital architects,
                    dreamers, and doers, passionate about crafting innovative
                    solutions that redefine possibilities. Nestled in the
                    vibrant heart of Australia, our mission is simple: to
                    empower businesses with transformative technology.
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12620.934558199717!2d144.7402721296486!3d-37.73766266605428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6f4dfee4cd913%3A0x7519fcd549b136e9!2s22%20Jolimont%20St%2C%20Caroline%20Springs%20VIC%203023%2C%20Australia!5e0!3m2!1sen!2sin!4v1713851480205!5m2!1sen!2sin"
                        width="800"
                        height="450"
                        className="google-map"
                        style={{ border: "0" }}
                        dir="off"
                        allowFullScreen={true}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Visit Us
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    <i>
                      Discover the magic behind Tekisky Software at our
                      headquarters:
                    </i>
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    <b>Address:</b> 22 Jolimont Street, Caroline Springs, Victoria 3023
                    
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Located in the bustling heart of Caroline Springs, Victoria,
                    our office is where innovation meets collaboration. Drop by
                    for a coffee and let &apos;s discuss how we can turn your
                    digital dreams into reality.
                    
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
            
              <div className="mb-10 rounded-sm bg-white shadow-three dark:bg-gray-dark dark:shadow-none">
                <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Follow Us
                </h3>
                <ul className="p-8">
                  
                  <li className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <RelatedPost
                      title="Twitter"
                      image="/images/blog/4fd07cea5c3e3c0d810000db.format-webp.width-1440_0ygTbhgMQscB5N8u.webp"
                      slug="#"
                     
                    />
                  </li>
                  <li>
                    <RelatedPost
                      title="Linkedin"
                      image="/images/blog/free-linkedin-logo-vector-r3cq0.webp"
                      slug="#"
                      
                    />
                  </li>
                </ul>
              </div>
             
             
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSidebarPage;
