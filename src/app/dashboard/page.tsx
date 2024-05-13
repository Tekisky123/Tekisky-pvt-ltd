"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AddStudentModal from "./AddStudentModal";
import AddUserModel from "./AddUserModel";
import ConsultancyApplications from "@/components/Consultancy/ConsultancyApplication";
// import AddUserForm from "./AddUserForm";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://tekisky-pvt-ltd-backend.onrender.com/selectedStudent/getSelectedStudent",
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://tekisky-pvt-ltd-backend.onrender.com/user/getAllUsers",
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
        await axios.delete(`https://tekisky-pvt-ltd-backend.onrender.com/user/delete/${id}`, {
          headers: {
            Authorization: token,
          },
        });
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
          `https://tekisky-pvt-ltd-backend.onrender.com/selectedStudent/delete/${id}`,
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
    <div className="container mx-auto mt-40 px-4 py-8 ">
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
      <div className="mb-8 ">
        <h2 className="mb-2 text-xl font-semibold">Selected Students</h2>
        <div className="overflow-x-auto bg-white  dark:bg-dark">
          <table className="min-w-full divide-y divide-gray-200 border-2 bg-white  dark:bg-dark">
            <thead className="bg-gray-50   bg-white  dark:bg-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ">
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
            <tbody className="divide-y divide-gray-200 text-black dark:text-white">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="whitespace-nowrap px-6 py-4 ">
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
                      className="mr-
                      2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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

      <div>
        <h2 className="mb-2 text-xl font-semibold">Users</h2>
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
                  
                  <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
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
        <ConsultancyApplications/>
      </div>
    </div>
  );
};

export default Dashboard;
