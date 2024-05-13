import React, { useEffect, useState } from "react";
import axios from "axios";

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
  skills: Skill[];
  yearsOfExperience: string;
  resumeUrl: string;
}

const ConsultancyApplications: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(
        "https://tekisky-pvt-ltd-backend.onrender.com/consultancy/getAllUploadResume",
      );
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleViewMore = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleCloseModal = () => {
    setSelectedApplicant(null);
  };
  useEffect(() => {
    console.log("Fetching applicants...");
    fetchApplicants();
  }, []);

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

    return fullNameMatch || experienceMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Consultancy Applications</h1>
      <input
        type="text"
        placeholder="Search by name, or  experience"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input mb-4 rounded-md border border-gray-300 px-4 py-2"
      />
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
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleViewMore(applicant)}
                    className="mb-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApplicant && (
        <div className="model-body fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
          <div className="w-full max-w-md rounded-lg bg-white p-8  dark:bg-dark dark:text-white">
            <h2 className="mb-4 text-2xl font-bold ">
              {selectedApplicant.fullName}
            </h2>
            <table className="w-full border-collapse border border-gray-800">
              <tbody>
                <tr className="bg-gray-200  dark:bg-dark dark:text-white">
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
                    Degree Percentage
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {selectedApplicant.degreePercentage}
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
                    Degree College Name
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {selectedApplicant.degreeCollegeName}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-4 py-2">
                    Year of Passing
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {selectedApplicant.yearOfPassing}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-4 py-2">Skills</td>
                  <td className="border border-gray-800 px-4 py-2">
                    {selectedApplicant.skills.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-4 py-2">
                    Experience
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {selectedApplicant.yearsOfExperience}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-4 py-2">
                    Resume URL
                  </td>
                  <td>
                    <a
                      href={selectedApplicant.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Download Resume
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={handleCloseModal}
              className="mt-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultancyApplications;
