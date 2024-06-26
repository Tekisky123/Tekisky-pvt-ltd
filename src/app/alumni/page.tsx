"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleBlog, { SkeletonLoadingCard } from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import type { Blog } from "@/types/blog";

const Blog = () => {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://tekisky-pvt-ltd-backend.vercel.app/selectedStudent/getSelectedStudent")
      .then((response) => {
        const reversedData = response.data.reverse();
        setBlogData(reversedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="">
        <Breadcrumb pageName="Alumini" description="" />
      </div>

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <SkeletonLoadingCard />
                  </div>
                ))
              : blogData.map((blog) => (
                  <div key={blog.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <SingleBlog blog={blog} />
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
