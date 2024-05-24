import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ToastNotification from "../Loader/ToastNotification";

interface Skill {
  _id: string;
  name: string;
}

interface Applicant {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  employeeNumber: string;
  tenthPercentage: number | null;
  twelthPercentage: number | null;
  twelthCollegeName: string;
  diplomaPercentage: number | null;
  degreePercentage: number | null;
  diplomaCollegeName: string;
  degreeName: string;
  degreeCollegeName: string;
  yearOfPassing: number | null;
  skills: string[];
  yearsOfExperience: string;
  resumeUrl: string;
  interestedInMockInterview?: boolean;
  rating?: number;
  status?: string;
  comments?: string;
  mockInterviewFeedback?: string;
}

const ConsultancyApplications: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchApplicants = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const response = await axios.get(
          "https://tekisky-pvt-ltd-backend.vercel.app/consultancy/getAllUploadResume",
          {
            headers: {
              Authorization: storedToken,
            },
          },
        );
        setApplicants(response.data);
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching applicants...");
    fetchApplicants();
  }, []);

  const handleViewMore = async (applicant: Applicant) => {
    try {
      const response = await axios.get(
        `https://tekisky-pvt-ltd-backend.vercel.app/consultancy/getoneuploadresume/${applicant._id}`,
      );
      const data = response.data;
      console.log("Fetched applicant details:", data);
      setSelectedApplicant({ ...applicant, ...data });
    } catch (error) {
      console.error("Error fetching applicant details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedApplicant(null);
  };

  const handleSaveChanges = async () => {
    if (!selectedApplicant) return;

    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        Swal.fire({
          title: "Saving changes...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await axios.post(
          `https://tekisky-pvt-ltd-backend.vercel.app/consultancy/getoneuploadresumeandupdate/${selectedApplicant._id}`,
          {
            rating: selectedApplicant.rating,
            status: selectedApplicant.status,
            comments: selectedApplicant.comments,
            mockInterviewFeedback: selectedApplicant.mockInterviewFeedback,
          },
          {
            headers: {
              Authorization: storedToken,
            },
          },
        );

        Swal.fire({
          title: "Success",
          text: "Changes saved successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        fetchApplicants();
        handleCloseModal();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to save changes",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error saving changes:", error);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    if (!selectedApplicant) return;

    setSelectedApplicant((prevApplicant) => ({
      ...prevApplicant!,
      [field]: value,
    }));
  };

  const filteredApplicants = applicants.filter((applicant) => {
    const searchTermLower = searchTerm ? searchTerm.toLowerCase() : "";

    const fullNameMatch =
      applicant.fullName &&
      applicant.fullName.toLowerCase().includes(searchTermLower);

    const experienceMatch =
      applicant.yearsOfExperience &&
      applicant.yearsOfExperience.toString().includes(searchTermLower);

    const skillMatch = applicant.skills.some((skill) =>
      skill.toLowerCase().includes(searchTermLower),
    );

    const statusMatch = statusFilter ? applicant.status === statusFilter : true;

    return (fullNameMatch || experienceMatch || skillMatch) && statusMatch;
  });

  const getStatusClassName = (status: string) => {
    switch (status) {
      case "Verified":
        return "rounded bg-green-500 px-2 py-1 text-md text-center";
      case "New":
        return "rounded bg-orange-400 px-2 py-1 text-md text-center";
      case "Rejected":
        return "rounded bg-red-500 px-2 py-1 text-md text-center";
      case "Mock Interview Done":
        return "rounded bg-blue-300 px-2 py-1 text-md text-center";
      default:
        return "";
    }
  };

  const handleDeleteApplicant = async (applicantId: string) => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const confirmResult = await Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to delete this applicant?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
        });

        if (confirmResult.isConfirmed) {
          Swal.fire({
            title: "Deleting...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          await axios.delete(
            `https://tekisky-pvt-ltd-backend.vercel.app/consultancy/deleteoneuploadresume/${applicantId}`,
            {
              headers: {
                Authorization: storedToken,
              },
            },
          );

          Swal.fire({
            title: "Deleted!",
            text: "The applicant has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          });

          fetchApplicants();
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete the applicant",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error deleting applicant:", error);
    }
  };
  const handleShare = (applicantId: string) => {
    const applicationUrl = `${window.location.origin}/singleApplication/${applicantId}`;
    navigator.clipboard.writeText(applicationUrl).then(() => {
      setToastMessage("Application link copied to clipboard!");
      setShowToast(true);
    });
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const applicantsPerPage = 4;

  const totalPages = Math.ceil(filteredApplicants.length / applicantsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * applicantsPerPage;
  const endIndex = startIndex + applicantsPerPage;

  const visibleApplicants = filteredApplicants
    .reverse()
    .slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" mx-auto contents px-4 py-8">
      {showToast && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      <h1 className="mb-10 mt-10 w-full border bg-slate-300 p-2 text-center text-xl font-semibold">
        Consultancy Applications
      </h1>
      <input
        type="text"
        placeholder="Search by name, Skills or experience"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input mb-4 rounded-md border border-gray-300 px-4 py-2"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="mb-4 rounded-md border border-gray-300 px-4 py-2"
      >
        <option value="">All Statuses</option>
        <option value="Verified">Verified</option>
        <option value="New">New</option>
        <option value="Rejected">Rejected</option>
        <option value="Mock Interview Done">Mock Interview Done</option>
      </select>

      {isSmallScreen ? (
        <div>
          <div className="">
            {visibleApplicants.map((applicant) => (
              <div
                key={applicant._id}
                className="mb-6 transform overflow-hidden rounded-lg bg-white p-6 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="mb-4">
                  <p className="mb-2 text-gray-800">
                    <strong>Full Name:</strong> {applicant.fullName}
                  </p>
                  <p className="mb-1 text-gray-700">
                    <strong>Email:</strong> {applicant.email}
                  </p>
                  <p className="mb-1 text-gray-700">
                    <strong>Mobile Number:</strong> {applicant.mobileNumber}
                  </p>
                  <p className="mb-1 text-gray-700">
                    <strong>Years of Experience:</strong>{" "}
                    {applicant.yearsOfExperience}
                  </p>
                  <p className="mb-1 text-gray-700">
                    <strong>Skills:</strong>{" "}
                    <div className="w-75 flex flex-wrap gap-1 ">
                      {applicant.skills[0]
                        .split(",")
                        .slice(0, 5)
                        .map((skill, index) => (
                          <div
                            key={index}
                            className="rounded bg-blue-200 px-2 py-1 text-sm text-blue-700"
                          >
                            {skill.trim()}
                          </div>
                        ))}
                      {applicant.skills[0].split(",").length > 5 && (
                        <span className="ml-1 text-gray-500">
                          +{applicant.skills[0].split(",").slice(5).length}
                        </span>
                      )}
                    </div>
                  </p>

                  <p className="mb-4 text-gray-700">
                    <strong>Application Status:</strong>{" "}
                    <div
                      className={`w-40 border ${getStatusClassName(applicant.status)}`}
                    >
                      {applicant.status}
                    </div>
                  </p>
                  <a
                    className="mb-4 block text-blue-500 hover:underline"
                    href={applicant.resumeUrl}
                  >
                    Download Resume
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewMore(applicant)}
                    className="transform rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-blue-600"
                  >
                    View More
                  </button>
                  <button
                    className="transform rounded bg-red-500 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-red-600"
                    onClick={() => handleDeleteApplicant(applicant._id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleShare(applicant._id)}
                    className="transform rounded bg-teal-500 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-teal-600"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <button
              className="rounded bg-gray-200 px-3 py-1"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded px-3 py-1`}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="rounded bg-gray-200 px-3 py-1"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2   text-body-color  text-gray-700 dark:text-body-color-dark">
                  Name
                </th>
                <th className="border px-4 py-2  text-body-color  text-gray-700 dark:text-body-color-dark">
                  Email
                </th>
                <th className="border px-4 py-2  text-body-color  text-gray-700 dark:text-body-color-dark">
                  Mobile Number
                </th>
                <th className="border px-4 py-2  text-body-color  text-gray-700 dark:text-body-color-dark">
                  Year Of Experience
                </th>
                <th className="border px-4 py-2  text-body-color  text-gray-700 dark:text-body-color-dark">
                  Skills
                </th>
                <th className="border px-4 py-2  text-body-color  text-gray-700 dark:text-body-color-dark">
                  Application Status
                </th>
                <th className="border   text-body-color  text-gray-700 dark:text-body-color-dark">
                  Download Resume
                </th>
                <th className="border px-4 py-2  text-body-color  text-gray-700 dark:text-body-color-dark">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr key={applicant._id}>
                  <td className="border px-4 py-2">{applicant.fullName}</td>
                  <td className="border px-4 py-2">{applicant.email}</td>
                  <td className="border px-4 py-2">{applicant.mobileNumber}</td>

                  <td className="border px-4 py-2">
                    {applicant.yearsOfExperience}
                  </td>
                  <td className="w-80 border px-4 py-2">
                    <div className="w-75 flex flex-wrap gap-1 ">
                      {applicant.skills[0]
                        .split(",")
                        .slice(0, 5)
                        .map((skill, index) => (
                          <div
                            key={index}
                            className="rounded bg-blue-200 px-2 py-1 text-sm text-blue-700"
                          >
                            {skill.trim()}
                          </div>
                        ))}
                      {applicant.skills[0].split(",").length > 5 && (
                        <span className="ml-1 text-gray-500">
                          +{applicant.skills[0].split(",").slice(5).length}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="w-10 border px-2 py-2">
                    <div
                      className={`border ${getStatusClassName(applicant.status)}`}
                    >
                      {applicant.status}
                    </div>
                  </td>
                  <td className="border px-8 py-2 ">
                    <a className="resume-download" href={applicant.resumeUrl}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-10 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                          clipRule="evenodd"
                        />
                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                      </svg>
                    </a>
                  </td>

                  <td className="d-flex w-20 border px-4 py-2 ">
                    <button
                      onClick={() => handleViewMore(applicant)}
                      className=" m-1   rounded-md bg-green-500 px-2 py-2 text-white hover:bg-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 0 1-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 0 1 6.126 3.537ZM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 0 1 0 .75l-1.732 3c-.229.397-.76.5-1.067.161A5.23 5.23 0 0 1 6.75 12a5.23 5.23 0 0 1 1.37-3.536ZM10.878 17.13c-.447-.098-.623-.608-.394-1.004l1.733-3.002a.75.75 0 0 1 .65-.375h3.465c.457 0 .81.407.672.842a5.252 5.252 0 0 1-6.126 3.539Z" />
                        <path
                          fillRule="evenodd"
                          d="M21 12.75a.75.75 0 1 0 0-1.5h-.783a8.22 8.22 0 0 0-.237-1.357l.734-.267a.75.75 0 1 0-.513-1.41l-.735.268a8.24 8.24 0 0 0-.689-1.192l.6-.503a.75.75 0 1 0-.964-1.149l-.6.504a8.3 8.3 0 0 0-1.054-.885l.391-.678a.75.75 0 1 0-1.299-.75l-.39.676a8.188 8.188 0 0 0-1.295-.47l.136-.77a.75.75 0 0 0-1.477-.26l-.136.77a8.36 8.36 0 0 0-1.377 0l-.136-.77a.75.75 0 1 0-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 0 0-1.3.75l.392.678a8.29 8.29 0 0 0-1.054.885l-.6-.504a.75.75 0 1 0-.965 1.149l.6.503a8.243 8.243 0 0 0-.689 1.192L3.8 8.216a.75.75 0 1 0-.513 1.41l.735.267a8.222 8.222 0 0 0-.238 1.356h-.783a.75.75 0 0 0 0 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 0 0 .513 1.41l.735-.268c.197.417.428.816.69 1.191l-.6.504a.75.75 0 0 0 .963 1.15l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 0 0 1.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.77a.75.75 0 0 0 1.477.261l.137-.772a8.332 8.332 0 0 0 1.376 0l.136.772a.75.75 0 1 0 1.477-.26l-.136-.771a8.19 8.19 0 0 0 1.294-.47l.391.677a.75.75 0 0 0 1.3-.75l-.393-.679a8.29 8.29 0 0 0 1.054-.885l.601.504a.75.75 0 0 0 .964-1.15l-.6-.503c.261-.375.492-.774.69-1.191l.735.267a.75.75 0 1 0 .512-1.41l-.734-.267c.115-.439.195-.892.237-1.356h.784Zm-2.657-3.06a6.744 6.744 0 0 0-1.19-2.053 6.784 6.784 0 0 0-1.82-1.51A6.705 6.705 0 0 0 12 5.25a6.8 6.8 0 0 0-1.225.11 6.7 6.7 0 0 0-2.15.793 6.784 6.784 0 0 0-2.952 3.489.76.76 0 0 1-.036.098A6.74 6.74 0 0 0 5.251 12a6.74 6.74 0 0 0 3.366 5.842l.009.005a6.704 6.704 0 0 0 2.18.798l.022.003a6.792 6.792 0 0 0 2.368-.004 6.704 6.704 0 0 0 2.205-.811 6.785 6.785 0 0 0 1.762-1.484l.009-.01.009-.01a6.743 6.743 0 0 0 1.18-2.066c.253-.707.39-1.469.39-2.263a6.74 6.74 0 0 0-.408-2.309Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      className="m-1 rounded  bg-red-500 px-2 py-2 text-white hover:bg-red-700"
                      onClick={() => handleDeleteApplicant(applicant._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare(applicant._id)}
                      className="m-1 rounded-md bg-blue-500 px-2 py-2 text-white hover:bg-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedApplicant && (
        <div className="model-body fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8">
            <h2 className="mb-4 text-2xl font-bold">
              {selectedApplicant.fullName}
            </h2>
            <div className="mb-6">
              <table className="w-full border-collapse border border-gray-800">
                <tbody>
                  <tr className="bg-gray-200">
                    <td className="border border-gray-800 px-4 py-2 font-bold">
                      Field
                    </td>
                    <td className="border border-gray-800 px-4 py-2 font-bold">
                      Value
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">Email</td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Mobile Number
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.mobileNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Employee Number
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.employeeNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Tenth Percentage
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.tenthPercentage}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Twelth Percentage
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.twelthPercentage}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Twelth College Name
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.twelthCollegeName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Diploma Percentage
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.diplomaPercentage}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Diploma College Name
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.diplomaCollegeName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Degree Name
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.degreeName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Degree Percentage
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.degreePercentage}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Degree College Name
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.degreeCollegeName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Year Of Passing
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.yearOfPassing}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-4 py-2">
                      Interested In Mock Interview
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {selectedApplicant.interestedInMockInterview
                        ? "Yes"
                        : "No"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="rating">
                Rating:
              </label>
              <select
                id="rating"
                value={selectedApplicant.rating ?? ""}
                onChange={(e) =>
                  handleFieldChange("rating", parseInt(e.target.value))
                }
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="" disabled>
                  Select rating
                </option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="comments">
                Comments:
              </label>
              <textarea
                id="comments"
                value={selectedApplicant.comments || ""}
                onChange={(e) => handleFieldChange("comments", e.target.value)}
                className="w-full rounded border px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="status">
                Status:
              </label>
              <select
                id="status"
                value={selectedApplicant.status ?? ""}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="" disabled>
                  Select status
                </option>
                {["Verified", "New", "Rejected", "Mock Interview Done"].map(
                  (status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ),
                )}
              </select>
            </div>

            {selectedApplicant.status === "Mock Interview Done" && (
              <div className="mb-4">
                <label
                  className="mb-2 block font-bold"
                  htmlFor="mockInterviewFeedback"
                >
                  Mock Interview Feedback:
                </label>
                <textarea
                  id="mockInterviewFeedback"
                  value={selectedApplicant.mockInterviewFeedback || ""}
                  onChange={(e) =>
                    handleFieldChange("mockInterviewFeedback", e.target.value)
                  }
                  className="w-full rounded border px-4 py-2"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultancyApplications;
