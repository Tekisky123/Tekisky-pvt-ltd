import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
      console.log("Fetched applicant details:", data); // Log the fetched data
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
    const searchTermLower = searchTerm ? searchTerm.toLowerCase() : ""; // Ensure searchTerm is not undefined

    // Check if fullName is defined before converting to lowercase
    const fullNameMatch =
      applicant.fullName &&
      applicant.fullName.toLowerCase().includes(searchTermLower);

    // Check if yearsOfExperience is defined before converting to string and searching
    const experienceMatch =
      applicant.yearsOfExperience &&
      applicant.yearsOfExperience.toString().includes(searchTermLower);

    // Check if any skill matches the search term
    const skillMatch = applicant.skills.some((skill) =>
      skill.toLowerCase().includes(searchTermLower),
    );

    // Check if the status matches the filter
    const statusMatch = statusFilter
      ? applicant.status === statusFilter
      : true;

    return (fullNameMatch || experienceMatch || skillMatch) && statusMatch;
  });


  const getStatusClassName = (status: string) => {
    switch (status) {
      case "Verified":
        return "rounded bg-green-500 px-2 py-1 text-md text-center";
      case "New":
        return "rounded bg-orange-500 px-2 py-1 text-md text-center";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Consultancy Applications</h1>
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
              <th className="border px-4 py-2  text-body-color  text-gray-700 dark:text-body-color-dark">
                Resume
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
                    {applicant.skills.map((skillString) =>
                      skillString.split(",").map((skill, index) => (
                        <div
                          key={index}
                          className="rounded bg-blue-200 px-2 py-1 text-sm text-blue-700"
                        >
                          {skill.trim()}
                        </div>
                      )),
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
                  <a className="resume-download " href={applicant.resumeUrl}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="size-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                      />
                    </svg>
                  </a>
                </td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleViewMore(applicant)}
                    className=" mb-4  rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
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
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
