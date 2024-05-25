"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

const SingleApplicationPage = () => {
  const [application, setApplication] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(
          `https://tekisky-pvt-ltd-backend.vercel.app/consultancy/getoneuploadresume/${id}`,
        );
        setApplication(response.data);
      } catch (error) {
        console.error("Error fetching application:", error);
        setError("Failed to fetch application data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        Error: {error}
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex h-screen items-center justify-center">
        No application found
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="mt-20 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Application Details
        </h1>

        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Personal Information
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200">
              <tbody>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 font-semibold">Full Name</td>
                  <td className="px-4 py-2">{application.fullName}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Email</td>
                  <td className="px-4 py-2">{application.email}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 font-semibold">Mobile Number</td>
                  <td className="px-4 py-2">{application.mobileNumber}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Employee Number</td>
                  <td className="px-4 py-2">{application.employeeNumber}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 font-semibold">
                    Years of Experience
                  </td>
                  <td className="px-4 py-2">{application.yearsOfExperience}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Education
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200">
              <tbody>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 font-semibold">Tenth Percentage</td>
                  <td className="px-4 py-2">{application.tenthPercentage}%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">
                    Twelfth Percentage
                  </td>
                  <td className="px-4 py-2">{application.twelthPercentage}%</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 font-semibold">
                    Twelfth College Name
                  </td>
                  <td className="px-4 py-2">{application.twelthCollegeName}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">
                    Diploma Percentage
                  </td>
                  <td className="px-4 py-2">
                    {application.diplomaPercentage}%
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 font-semibold">
                    Diploma College Name
                  </td>
                  <td className="px-4 py-2">
                    {application.diplomaCollegeName}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Degree Name</td>
                  <td className="px-4 py-2">{application.degreeName}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 font-semibold">Degree Percentage</td>
                  <td className="px-4 py-2">{application.degreePercentage}%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">
                    Degree College Name
                  </td>
                  <td className="px-4 py-2">{application.degreeCollegeName}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 font-semibold">Year Of Passing</td>
                  <td className="px-4 py-2">{application.yearOfPassing}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold text-gray-700">Skills</h2>
          <td className="w-full px-4 py-2">
            <div className=" flex flex-wrap gap-1 ">
              {application.skills.map((skillString) =>
                skillString.split(",").map((skill, index) => (
                  <div
                    key={index}
                    className="rounded bg-blue-200 px-2 py-1  text-blue-700"
                  >
                    {skill.trim()}
                  </div>
                )),
              )}
            </div>
          </td>
          <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Additional Details</h2>
          <table className="w-full mb-4">
            <tbody>
              
              <tr>
                <td className="font-semibold">Resume:</td>
                <td><a href={application.resumeUrl} target="_blank" className="text-blue-500 underline">View Resume</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SingleApplicationPage;
