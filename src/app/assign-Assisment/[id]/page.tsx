"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import assignmentsData from "./assignmentsData.json";
import { useParams, useRouter } from "next/navigation"; // Import useRouter

interface Assignment {
  title: string;
  description: string;
}

interface FormState {
  assessmentTask: string;
  assessmentDeadline: string;
  customTask: string;
  assessmentDescription: string;
  assessmentNote: string;
  selectedAssessmentCategory: string | null;
}

const AssignmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    customTask: "",
    assessmentTask: "",
    assessmentDeadline: "",
    assessmentDescription: "",
    assessmentNote: "",
    selectedAssessmentCategory: null,
  });

  const handleCheckboxChange = (category: string) => {
    setFormData({
      ...formData,
      selectedAssessmentCategory:
        category === formData.selectedAssessmentCategory ? null : category,
    });
  };

  const [token, setToken] = useState("");
  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const [existingDescription, setExistingDescription] = useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "customTask") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      let selectedDescription = existingDescription;

      if (name === "assessmentTask" && value) {
        const selectedAssignments =
          assignmentsData[
            formData.selectedAssessmentCategory as keyof typeof assignmentsData
          ];
        const selectedAssignment = selectedAssignments.find(
          (assignment: Assignment) => assignment.title === value,
        );
        selectedDescription = selectedAssignment
          ? selectedAssignment.description
          : "";
      }

      setFormData({
        ...formData,
        [name]: value,
        assessmentDescription: selectedDescription,
      });
    }
  };

  const { id } = useParams();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    console.log('ID:', id);
  }, [id]);

  useEffect(() => {
    const selectedAssignments =
      assignmentsData[
        formData.selectedAssessmentCategory as keyof typeof assignmentsData
      ];
    const selectedAssignment = selectedAssignments?.find(
      (assignment: Assignment) => assignment.title === formData.assessmentTask,
    );
    const newDescription = selectedAssignment?.description || "";
    setExistingDescription(newDescription);
  }, [formData.selectedAssessmentCategory, formData.assessmentTask]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading",
      text: "Assigning assignment...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(
        `https://tekisky-pvt-ltd-backend.vercel.app/consultancy/assignAssessment/${id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
  

      Swal.fire("Success", response.data.message, "success").then(() => {
        router.push("/dashboard"); 
      });
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "An error occurred",
        "error",
      );
    }
  };

  return (
    <div className="container mx-auto mb-20 mt-40 p-4">
      <h1 className="mb-4 text-2xl font-bold">Assessment</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Object.keys(assignmentsData).map((category) => (
          <div
            key={category}
            className={`duration-400 relative cursor-pointer rounded-lg bg-white p-4 shadow transition-all ${
              category === formData.selectedAssessmentCategory
                ? "border-2 border-green-500"
                : "border-2 border-transparent"
            }`}
            onClick={() => handleCheckboxChange(category)}
            style={{ minWidth: "0", flexBasis: "0" }}
          >
            {category === formData.selectedAssessmentCategory && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="absolute right-2 top-2 h-6 w-6 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
            <label className="ml-2" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-md">
        <div className="mb-4">
          <label htmlFor="assessmentTask" className="mb-2 block">
            Assessment Task:
          </label>
          <div className="flex">
            <select
              id="assessmentTask"
              name="assessmentTask"
              className="mb-5 w-full border p-2 "
              value={formData.assessmentTask}
              onChange={handleChange}
            >
              <option value="">Select Task</option>
              {formData.selectedAssessmentCategory &&
                assignmentsData[
                  formData.selectedAssessmentCategory as keyof typeof assignmentsData
                ].map((assignment: Assignment, index: number) => (
                  <option
                    key={index}
                    value={assignment.title}
                    className="m-5 py-5 "
                  >
                    {assignment.title}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            id="assessmentDescription"
            name="assessmentDescription"
            className="w-full border p-2"
            placeholder="Assessment Description"
            onChange={handleChange}
            style={{ height: "200px" }}
            value={formData.assessmentDescription}
          />
          <input
            type="text"
            id="customTask"
            name="customTask"
            className="w-full border p-2"
            placeholder="Custom Task"
            value={formData.customTask}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="assessmentDeadline" className="mb-2 block">
            Assessment Deadline:
          </label>
          <input
            type="date"
            id="assessmentDeadline"
            name="assessmentDeadline"
            className="w-full border p-2"
            min={new Date().toISOString().split("T")[0]}
            value={formData.assessmentDeadline}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="assessmentNote"
            name="assessmentNote"
            className="w-full border p-2"
            placeholder="Assessment Note"
            value={formData.assessmentNote}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AssignmentForm;
