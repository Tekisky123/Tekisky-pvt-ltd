import { useState, useEffect } from "react";
import Link from "next/link";
import { Blog } from "@/types/blog";

export const SkeletonLoadingCard = () => {
  return (
    <div
      role="status"
      className="group relative mb-10 animate-pulse overflow-hidden rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 shadow-lg duration-300 dark:from-gray-700 dark:to-gray-800"
    >
      <div className="profile-container relative m-5 block flex aspect-square w-full items-center justify-center">
        <div className="h-full w-full rounded-md bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700"></div>
      </div>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <div className="mb-4 block h-8 w-3/4 rounded-md bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800"></div>
        <div className="border-opacity-10 pb-6 text-base font-medium text-gray-400 dark:border-white dark:border-opacity-10 dark:text-gray-500">
          <div className="mb-2 h-6 w-1/2 rounded-md bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800"></div>
          <div className="h-6 w-3/4 rounded-md bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800"></div>
        </div>
        <div className="border-opacity-10 pb-6 font-medium text-gray-400 dark:border-white dark:border-opacity-10 dark:text-gray-500">
          <div className="h-6 w-2/3 rounded-md bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800"></div>
        </div>
      </div>
    </div>
  );
};

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { name, gender, companyName, education, designation } = blog;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <SkeletonLoadingCard />}
      {!loading && (
        <div className="group relative mb-10 overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
          <Link
            href=""
            className="profile-container relative m-5 block flex aspect-[4/4] w-full items-center justify-center"
          >
            <img
              src={
                gender === "male"
                  ? "/images/blog/boy (2).png"
                  : "/images/blog/woman.png"
              }
              alt="image"
              className="profiles"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Link>
          <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
            <h3>
              <Link
                href=""
                className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
              >
                Name: {name}
              </Link>
            </h3>
            <div className="border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
              Selected in: {companyName}
              <p>Designation: {designation}</p>
            </div>
            <div className="border-opacity-10 pb-6 font-medium text-body-color dark:border-white dark:border-opacity-10">
              Education: {education}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
