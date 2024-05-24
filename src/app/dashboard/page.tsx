"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import AddStudentModal from "./AddStudentModal";
import AddUserModel from "./AddUserModel";
import ConsultancyApplications from "@/components/Consultancy/ConsultancyApplication";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [token, setToken] = useState("");
  const [displayedStudents, setDisplayedStudents] = useState(5);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      Swal.fire({
        title: "Session Expired",
        text: "Please login again",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/login");
      });
    } else {
      setToken(storedToken);
    }

    // Check if the screen is small
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsSmallScreen(mediaQuery.matches);

    // Listen for screen size changes
    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };
    mediaQuery.addListener(handleResize);

    // Clean up the event listener
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, [router]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://tekisky-pvt-ltd-backend.vercel.app/selectedStudent/getSelectedStudent",
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setStudents(response.data.reverse());
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const loadMoreStudents = () => {
    setDisplayedStudents(displayedStudents + 5);
  };

  const viewLessStudents = () => {
    setDisplayedStudents(5);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://tekisky-pvt-ltd-backend.vercel.app/user/getAllUsers",
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setUsers(response.data.users.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(
          `https://tekisky-pvt-ltd-backend.vercel.app/user/delete/${id}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        // Update users state after deletion
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(
          `https://tekisky-pvt-ltd-backend.vercel.app/selectedStudent/delete/${id}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        // Update students state after deletion
        setStudents(students.filter((student) => student._id !== id));
        Swal.fire("Deleted!", "Student has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting student:", error);
        Swal.fire("Error!", "Failed to delete student.", "error");
      }
    }
  };

  return (
    <>
    <div className="container mx-auto mt-40 px-4 py-8">
      <h2 className="mb-2 w-full border bg-slate-300 p-2 text-center text-xl font-semibold">
        Selected Students
      </h2>

      <button
        onClick={() => setShowStudentModal(true)}
        className="mb-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Add Student
      </button>

      {/* Modal */}
      <AddStudentModal
        showModal={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        fetchStudents={fetchStudents}
      />

      {isSmallScreen ? (
        <div className="mb-8">
          <div className="overflow-x-auto">
            {students.slice(0, displayedStudents).map((student) => (
              <div
                key={student._id}
                className="mb-4 rounded-lg border bg-white p-4 shadow-md"
              >
                <p>
                  <strong>Name:</strong> {student.name}
                </p>
                <p>
                  <strong>Company Name:</strong> {student.companyName}
                </p>
                <p>
                  <strong>Designation:</strong> {student.designation}
                </p>
                <p>
                  <strong>Education:</strong> {student.education}
                </p>
                <button
                  className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={() => handleDeleteStudent(student._id)}
                >
                  Delete
                </button>
              </div>
            ))}
            {students.length > displayedStudents ? (
              <button
                onClick={loadMoreStudents}
                className="mt-5 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Load More
              </button>
            ) : (
              <button
                onClick={viewLessStudents}
                className="mt-5 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                View Less
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-8">
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-2 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Education
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.slice(0, displayedStudents).map((student) => (
                  <tr key={student.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.companyName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.designation}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.education}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        className="mr-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        onClick={() => handleDeleteStudent(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div>
        <h2 className="mb-2 w-full border bg-slate-300 p-2 text-center text-xl font-semibold">
          Users
        </h2>
        <button
          onClick={() => setShowUserModal(true)}
          className="mb-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Add User
        </button>

        {/* Modal */}
        <AddUserModel
          showModal={showUserModal}
          onClose={() => setShowUserModal(false)}
          fetchUsers={fetchUsers}
        />
        {isSmallScreen ? (
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="rounded-lg border bg-white p-4 shadow-md"
              >
                <p>
                  <strong>FUll Name:</strong> {user.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Mobile Number:</strong> {user.mobileNumber}
                </p>
                <button
                  className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-2   bg-white  dark:bg-dark">
              <thead className="bg-gray-50   bg-white  dark:bg-dark ">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    FUll Name
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Mobile Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200  text-black dark:text-white">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.fullName}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.mobileNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        className="mr-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ConsultancyApplications />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
