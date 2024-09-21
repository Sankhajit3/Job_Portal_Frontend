import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Sidebar from "./Sidebar";
import { USER_API_END_POINT, COMPANY_API_END_POINT } from "@/utils/constant"; // Add company API endpoint
import { toast } from "sonner"; // Notification system for success/error

// Pagination items per page
const ITEMS_PER_PAGE = 8;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${USER_API_END_POINT}/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch users.");
        }
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete( `${USER_API_END_POINT}/delete/${userId}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // Remove the deleted user from the users array
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        }
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete user.");
      }
    }
  };

  // Calculate the current users to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-20">User Management</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <img
                    src={
                      user?.profile?.profilePhoto ||
                      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                    }
                    alt={`${user.fullname}'s profile`}
                    className="w-12 h-12 rounded-full"
                  />
                </TableCell>
                <TableCell className="break-all">{user.fullname}</TableCell>
                <TableCell className="break-all">{user.phoneNumber}</TableCell>
                <TableCell className="break-all">{user.email}</TableCell>
                <TableCell className="break-all">{user.role}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {users.length > ITEMS_PER_PAGE && (
          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="mr-2"
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="ml-2"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
