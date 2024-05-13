"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import SectionTitle from "@/components/Common/SectionTitle";
import fullStackSkills from "@/components/Consultancy/ConsultancyData";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
    yearsOfExperience: "",
    resume: null,
  });


  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" && value.length > 10) {
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

    // Display the preview of the selected file
    const preview = document.getElementById("file-preview");
    if (preview && file) {
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            preview.innerHTML = `<embed src="${reader.result}" type="application/pdf" width="100%" height="600px" />`;
          }
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = `<p>${file.name}</p>`;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = [
      "fullName",
      "email",
      "mobileNumber",
      "tenthPercentage",
      "yearsOfExperience",
      "yearOfPassing",
      "skills",
      "resume"
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

    // Validate mobile number format
    const mobileNumberPattern = /^\d{10}$/;
    if (!mobileNumberPattern.test(formData.mobileNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    setLoading(true)
    try {
      const formDataToSend = new FormData();
      console.log(formDataToSend);
      for (const key in formData) {
        if (key === "skills") {
          // Convert selectedSkills array to a comma-separated string and append it to formDataToSend
          formDataToSend.append(key, selectedSkills.join(","));
        } else if (key === "resume" && formData[key]) {
          // Append resume file only if it exists
          formDataToSend.append(key, formData[key]);
        } else {
          // For other fields, append values directly
          formDataToSend.append(key, formData[key as keyof typeof formData]);
        }
      }
      await axios.post(
        "https://tekisky-pvt-ltd-backend.onrender.com/consultancy/uploadResume",
        formDataToSend,
      );
      Swal.fire({
        icon: "success",
        title: "Your Form Submitted Successfully!",
        text: "We have received your resume. We will contact you via email.",
        showConfirmButton: false,
        timer: 1500,
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
      setSearchTerm(""); // Clear input text after selecting a skill
      setFilteredSkills([]); // Clear the filtered skills array
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

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
              paragraph="We invite all students seeking exciting career opportunities to
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
                    value={formData.employeeNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5  text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
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
                    placeholder="Enter Your Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black text-gray-900 dark:text-white"
                >
                  Email address <span className="text-red-500">*</span>{" "}
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
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter Your Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
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
                    placeholder="Enter Your 10th Percentage"
                    name="tenthPercentage"
                    value={formData.tenthPercentage}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
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
                    type="number"
                    id="twelthPercentage"
                    name="twelthPercentage"
                    placeholder="Enter Your 12th Percentage"
                    value={formData.twelthPercentage}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
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
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
                  />
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
                type="number"
                id="diplomaPercentage"
                name="diplomaPercentage"
                placeholder="Enter Diploma Percentage"
                value={formData.diplomaPercentage}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
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
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
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
                className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
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
                className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
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
                className="block w-full rounded-md border-0 px-3 py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
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
              <input
                type="text"
                id="yearOfPassing"
                name="yearOfPassing"
                placeholder="Enter Year of Passing"
                value={formData.yearOfPassing}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full mb-10 ">
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
                  className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-black  dark:bg-dark dark:text-white"
                />
              </div>
              <div className="flex flex-wrap">
                {selectedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="selected-skill mb-2 mr-2 flex items-center rounded-md border border-gray-100 px-2 py-1"
                  >
                    <span className="mr-1">{skill}</span>
                    <button
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-1"
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
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3  py-1.5 text-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 dark:bg-dark dark:text-white  sm:text-sm sm:leading-6"
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
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
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
