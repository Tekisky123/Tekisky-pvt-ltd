"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SectionTitle from "@/components/Common/SectionTitle";
import fullStackSkills from "@/components/Consultancy/ConsultancyData";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const initialFormData =
    typeof localStorage !== "undefined" && localStorage.getItem("formData")
      ? JSON.parse(localStorage.getItem("formData"))
      : {
          employeeNumber: "",
          fullName: "",
          email: "",
          mobileNumber: "",
          tenthPercentage: "",
          twelthPercentage: "",
          twelthCollegeName: "",
          diplomaPercentage: "",
          diplomaCollegeName: "",
          degreePercentage: "",
          degreeName: "",
          degreeCollegeName: "",
          yearOfPassing: "",
          skills: [],
          workStatus: "",
          yearsOfExperience: "",
          referredBy: "",
          resume: "",
          extraInformation: "",
          englishSpeaking: "",
          englishWriting: "",
          mockInterviewDate: "",
          mockInterviewTime: "",
        };
  const [formData, setFormData] = useState(initialFormData);
  console.log(formData);
  console.log(initialFormData);
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    employeeNumber: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    tenthPercentage: "",
    twelthPercentage: "",
    twelthCollegeName: "",
    diplomaPercentage: "",
    diplomaCollegeName: "",
    degreePercentage: "",
    degreeName: "",
    degreeCollegeName: "",
    workStatus: "",
    yearOfPassing: "",
    referredBy: "",
    skills: "",
    yearsOfExperience: "",
    extraInformation: "",
    englishSpeaking: "",
    englishWriting: "",
    mockInterviewDate: "",
    mockInterviewTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    let error = "";

    if (name === "employeeNumber") {
      if (value.length > 5 || isNaN(Number(value))) {
        error = "Employee number must be a 5-digit number.";
      }
    }
    if (
      (name === "tenthPercentage" ||
        name === "twelthPercentage" ||
        name === "diplomaPercentage" ||
        name === "degreePercentage") &&
      (value.length > 5 || isNaN(Number(value)) || Number(value) > 100)
    ) {
      error = "Please enter a valid percentage (up to 100).";
    }

    if (name === "fullName") {
      if (value.length > 50) {
        error = "Full name must be less than 50 characters.";
      }
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = "Full name must contain only letters.";
      }
    }

    if (name === "email") {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        error = "Please enter a valid email address.";
      }
    }

    if (name === "mobileNumber") {
      if (value.length > 10 || isNaN(Number(value))) {
        error = "Mobile number must be a 10-digit number.";
      }
    }

    if (
      ["twelthCollegeName", "diplomaCollegeName", "degreeCollegeName"].includes(
        name,
      )
    ) {
      if (value.length > 50) {
        error = "College name must be less than 35 characters.";
      }
    }

    if (name === "degreeName" && value.length > 8) {
      error = "Degree name must be less than 8 characters.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    if (name === "mobileNumber" && value.length > 10) {
      return;
    }
    if (name === "tenthPercentage" && value.length > 5) {
      return;
    }
    if (name === "employeeNumber" && value.length > 5) {
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevState) => ({
      ...prevState,
      resume: file,
    }));

    const preview = document.getElementById("file-preview");
    if (preview && file) {
      const textNode = document.createTextNode(file.name);
      preview.innerHTML = "";
      preview.appendChild(textNode);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = [
      "fullName",
      "email",
      "mobileNumber",
      "tenthPercentage",
      "workStatus",
      "yearOfPassing",
      "skills",
      "englishSpeaking",
      "englishWriting",
      "mockInterviewDate",
      "mockInterviewTime",
      "resume",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: `Please fill in the following required fields: ${missingFields.join(", ")}.`,
      });
      return;
    }

    const mobileNumberPattern = /^\d{10}$/;
    if (!mobileNumberPattern.test(formData.mobileNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      console.log(formDataToSend);
      for (const key in formData) {
        if (key === "skills") {
          formDataToSend.append(key, selectedSkills.join(","));
        } else if (key === "resume" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key as keyof typeof formData]);
        }
      }
      await axios.post(
        "https://tekisky-pvt-ltd-backend.vercel.app/consultancy/uploadResume",
        formDataToSend,
      );
      localStorage.removeItem("formData");
      Swal.fire({
        icon: "success",
        title: "Your Form Submitted Successfully!",
        text: "We have received your resume. We will contact you via email.",
        showConfirmButton: false,
        timer: 4000,
      }).then(() => {
        router.push("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: " Failed",
        text: "Something Went Wrong !",
      });
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterSkills(value);
  };

  const filterSkills = (value: string) => {
    if (value.trim() === "") {
      setFilteredSkills([]);
    } else {
      const filtered = fullStackSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSkills(filtered);
    }
  };

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchTerm("");
      setFilteredSkills([]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 30; i--) {
      years.push(i.toString());
    }
    return years;
  };
  const years = generateYears();

  return (
    <div className="container flex flex-col justify-center lg:flex-row ">
      <form
        className="container mx-auto mb-5 mt-44  lg:w-1/2 "
        onSubmit={handleSubmit}
      >
        <div className=""></div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <SectionTitle
              title="Upload Your Resume"
              paragraph="We invite all Professionals seeking exciting career opportunities to
                submit their resumes here. Take the first step towards your dream
                job by uploading your resume using the form below. Our dedicated
                team will review your submission and consider you for suitable
                positions within our company. Don't miss out on the chance to
                join a dynamic and innovative team at Tekisky Pvt Ltd. Submit your
                resume now and embark on a rewarding career journey with us!"
              mb="44px"
            />

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="employeeNumber"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Tekisky Employee Number{" "}
                  {/* <span className="text-red-500">*</span>{" "} */}
                  <p className="text-gray-600">
                    (Leave it blank if you are not an Employee of Tekisky)
                  </p>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="employeeNumber"
                    name="employeeNumber"
                    placeholder="Enter Your Emp ID"
                    maxLength={6}
                    min="0"
                    value={formData.employeeNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5  text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {errors.employeeNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.employeeNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Full Name <span className="text-red-500">*</span>{" "}
                  <p className="text-gray-600">(As Per Your Aadhar)</p>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    maxLength={30}
                    placeholder="Enter Your Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Email Address <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Mobile Number <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    maxLength={10}
                    min="0"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter Your Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {errors.mobileNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full mb-10">
                <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
                  Referred By
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="referredBy"
                    name="referredBy"
                    placeholder="Enter the name of the referrer"
                    value={formData.referredBy}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {errors.referredBy && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.referredBy}
                    </p>
                  )}
                </div>
              </div>

              <div className=" col-span-full sm:col-start-1">
                <label
                  htmlFor="10th"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  10th Percentage <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="tenthPercentage"
                    min="0"
                    pattern="\d*"
                    placeholder="Enter Your 10th Percentage"
                    name="tenthPercentage"
                    value={formData.tenthPercentage}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {errors.tenthPercentage && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.tenthPercentage}
                    </p>
                  )}
                </div>
              </div>

              <div className=" col-span-full">
                <label
                  htmlFor="twelthPercentage"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  12th Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="twelthPercentage"
                    name="twelthPercentage"
                    placeholder="Enter Your 12th Percentage"
                    value={formData.twelthPercentage}
                    onChange={handleChange}
                    maxLength={5}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {errors.employeeNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.twelthPercentage}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="twelthCollegeName"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  12th College Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="twelthCollegeName"
                    placeholder="Enter 12th College Name"
                    name="twelthCollegeName"
                    value={formData.twelthCollegeName}
                    onChange={handleChange}
                    maxLength={35}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                  {errors.employeeNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.twelthCollegeName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="consultancy-container  ">
          <div className=" col-span-full  mb-10 ">
            <label
              htmlFor="diplomaPercentage"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Diploma Percentage
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="diplomaPercentage"
                name="diplomaPercentage"
                placeholder="Enter Diploma Percentage"
                value={formData.diplomaPercentage}
                onChange={handleChange}
                maxLength={5}
                className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
              {errors.employeeNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.diplomaPercentage}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full mb-10 ">
            <label
              htmlFor="diplomaCollegeName"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Diploma College Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="diplomaCollegeName"
                name="diplomaCollegeName"
                placeholder="Enter Diploma College Name"
                value={formData.diplomaCollegeName}
                onChange={handleChange}
                maxLength={35}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
              {errors.employeeNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.diplomaCollegeName}
                </p>
              )}
            </div>
          </div>

          <div className=" col-span-full  mb-10 ">
            <label
              htmlFor="degreeName"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Name of Degree
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="degreeName"
                name="degreeName"
                placeholder="Enter Name of Degree"
                value={formData.degreeName}
                onChange={handleChange}
                maxLength={8}
                className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
              {errors.employeeNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.degreeName}</p>
              )}
            </div>
          </div>

          <div className=" col-span-full  mb-10 ">
            <label
              htmlFor="degreePercentage"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Degree Percentage
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="degreePercentage"
                name="degreePercentage"
                placeholder="Enter Degree Percentage"
                value={formData.degreePercentage}
                onChange={handleChange}
                maxLength={8}
                className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
              {errors.employeeNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.degreePercentage}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full mb-10 ">
            <label
              htmlFor="degreeCollegeName"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Degree College/University Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="degreeCollegeName"
                name="degreeCollegeName"
                placeholder="Enter Degree College/University Name"
                value={formData.degreeCollegeName}
                onChange={handleChange}
                maxLength={35}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
              {errors.employeeNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.degreeCollegeName}
                </p>
              )}
            </div>
          </div>
          <div className=" col-span-full  mb-10 ">
            <label
              htmlFor="yearOfPassing"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Year of Passing <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2">
              <select
                id="yearOfPassing"
                name="yearOfPassing"
                value={formData.yearOfPassing}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3  py-2.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.employeeNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.yearOfPassing}
                </p>
              )}
              <datalist id="yearList">
                {years.map((year) => (
                  <option key={year} value={year} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="col-span-full mb-10">
            <div className="flex flex-col">
              <label
                htmlFor="skills"
                className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
              >
                Skills <span className="text-red-500">*</span>{" "}
              </label>
              <div className="mt-2 ">
                <input
                  type="text"
                  placeholder="Search for a skill..."
                  value={searchTerm}
                  onChange={handleSkillChange}
                  className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-black dark:bg-dark dark:text-white"
                />
              </div>
              <div className="flex flex-wrap">
                {selectedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="selected-skill mb-2 mr-2 flex items-center rounded-md border border-gray-100 bg-green-100 px-2 py-1"
                  >
                    <span className="mr-1">{skill}</span>
                    <button
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-1 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <ul className="grid grid-cols-3 gap-4">
                {filteredSkills.map((skill, index) => (
                  <li key={index}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={() => handleSkillSelect(skill)}
                        checked={selectedSkills.includes(skill)}
                        className="mr-2"
                      />
                      {skill}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-full mb-10">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              Work Status <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2 flex">
              {/* Experienced */}
              <div className="mb-4 mr-4">
                <input
                  type="radio"
                  id="experience"
                  name="workStatus"
                  value="Experience"
                  checked={formData.workStatus === "Experience"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="experience"
                  className={`block cursor-pointer rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-transform duration-300 ease-in-out  ${
                    formData.workStatus === "Experience"
                      ? "scale-105 transform border-4 border-green-500"
                      : ""
                  }`}
                >
                  <h3 className="mb-2 text-xl font-semibold">Experienced</h3>
                  <p className="text-sm text-gray-700 ">
                    I have work experience (excluding internships)
                  </p>
                </label>
              </div>

              {/* Fresher */}
              <div className="mb-4 mr-4">
                <input
                  type="radio"
                  id="fresher"
                  name="workStatus"
                  value="Fresher"
                  checked={formData.workStatus === "Fresher"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="fresher"
                  className={`block cursor-pointer rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-transform duration-300 ease-in-out ${
                    formData.workStatus === "Fresher"
                      ? "scale-105 transform border-4 border-green-500"
                      : ""
                  }`}
                >
                  <h4 className="mb-2 text-xl font-semibold">Fresher</h4>
                  <p className="text-sm text-gray-700">
                    I am a student/ Haven&apos;t worked after graduation
                  </p>
                </label>
              </div>
            </div>
            {errors.workStatus && (
              <p className="mt-1 text-sm text-red-500">{errors.workStatus}</p>
            )}
          </div>

          {/* Years of Experience */}
          {formData.workStatus === "Experience" && (
            <div className=" col-span-full  mb-10 ">
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
              >
                Years of Experience <span className="text-red-500">*</span>{" "}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  placeholder="Enter Year of Experience (Ex: 1 Year , 2 Year..) "
                  value={formData.yearsOfExperience}
                  maxLength={10}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                />
                {errors.yearsOfExperience && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.yearsOfExperience}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="col-span-full mb-10">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              Extra Information (any queries and questions)
            </label>
            <div className="mt-2">
              <textarea
                id="extraInformation"
                name="extraInformation"
                placeholder="Enter any queries or questions you have"
                value={formData.extraInformation}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-dark dark:text-white sm:text-sm sm:leading-6"
              />
              {errors.extraInformation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.extraInformation}
                </p>
              )}
            </div>
          </div>

          {/* English Speaking Proficiency */}
          <div className="col-span-full mb-10">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              How good are you with speaking English?
              <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2">
              <select
                id="englishSpeaking"
                name="englishSpeaking"
                value={formData.englishSpeaking}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3  py-2.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  Select your proficiency
                </option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
                <option value="Beginner">Beginner</option>
              </select>
              {errors.englishSpeaking && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.englishSpeaking}
                </p>
              )}
            </div>
          </div>

          {/* English Writing Proficiency */}
          <div className="col-span-full mb-10">
            <label className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white">
              How good are you with writing English?
              <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2">
              <select
                id="englishWriting"
                name="englishWriting"
                value={formData.englishWriting}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3  py-2.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  Select your proficiency
                </option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
                <option value="Beginner">Beginner</option>
              </select>
              {errors.englishWriting && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.englishWriting}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full mb-10">
            <h2 className="mb-4 block text-lg text-black dark:text-white">
              Carrier Discussion
            </h2>
            <div className="text-yellow-700 mb-4 flex items-start space-x-2 rounded-md border-l-4 border-yellow bg-red-100 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="mt-3 h-8 w-8 flex-shrink-0 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium">
                  Please schedule your availability for the mock interview. The
                  mock interview is compulsory for the assessment process.
                </p>
                <p className="text-sm font-medium">
                  We will assess the student&apos;s skills during the mock
                  interview to decide the next steps.
                </p>
              </div>
            </div>
            <div className="col-span-full mb-10">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Mock Interview Date:
                <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="date"
                id="mockInterviewDate"
                name="mockInterviewDate"
                value={formData.mockInterviewDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="h-10 w-full rounded-lg border px-3 outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="col-span-full mb-10">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Mock Interview Time:
                <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="time"
                id="mockInterviewTime"
                name="mockInterviewTime"
                value={formData.mockInterviewTime}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border px-3 outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
            >
              Upload Resume <span className="text-red-500">*</span>{" "}
            </label>
            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-black border-opacity-50  px-6 py-10 text-black dark:border-white">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="resume"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-black text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-dark "
                  >
                    <span className="">Upload a file</span>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PDF , Document up to 10MB
                </p>
                <div id="file-preview"></div>
              </div>
            </div>
          </div>
          <div className="mb-6 mt-6 flex items-center justify-end  gap-x-6">
            <button
              type="button"
              className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
        {loading && <Loader />}
      </form>
    </div>
  );
};

export default Form;
