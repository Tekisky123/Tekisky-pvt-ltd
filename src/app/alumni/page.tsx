"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Blog } from "@/types/blog";

const Blog = () => {
  const [blogData, setBlogData] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://tekisky-pvt-ltd-backend.onrender.com/selectedStudent/getSelectedStudent",
      )
      .then((response) => {
        const reversedData = response.data.reverse();
        setBlogData(reversedData);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="Selected Candidates"
        description="Tekisky family wishes success and happiness"
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
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
