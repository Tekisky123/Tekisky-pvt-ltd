"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loader from "@/components/Common/LoaderSmall";

const SigninPage = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      const response = await axios.post(
        "https://tekisky-pvt-ltd-backend.onrender.com/user/login",
        { mobileNumber, password },
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });
      // Redirect to dashboard or home page after successful login
      router.push("/dashboard"); // Replace '/dashboard' with the desired destination after login
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
    setShowLoader(false);
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        {showLoader && <Loader />}
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Login
                </h3>

                <form onSubmit={handleLogin}>
                  <div className="mb-8">
                    <label
                      htmlFor="mobileNumber"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Mobile Number
                    </label>
                    <input
                      type="number"
                      name="mobileNumber"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter your Mobile Number"
                      className="border-stroke w-full rounded-lg border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      className="border-stroke w-full rounded-lg border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
