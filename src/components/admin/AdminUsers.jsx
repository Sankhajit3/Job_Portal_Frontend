import { useState } from "react";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow
} from "../ui/table"; // Importing necessary components
import Sidebar from "./Sidebar";

// Example user data with profile image URLs
const usersData = [
  {
    id: 1,
    profile: "https://via.placeholder.com/50", // Placeholder image URL
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    role: "Admin",
  },
  {
    id: 2,
    profile: "https://via.placeholder.com/50", // Placeholder image URL
    name: "Jane Smith",
    phone: "234-567-8901",
    email: "jane@example.com",
    role: "User",
  },
  // Add more user data as needed
  // For testing pagination, ensure to add at least 15-20 user entries
];

const ITEMS_PER_PAGE = 8;

const AdminUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(usersData.length / ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log(`Delete user with ID: ${id}`);
  };

  // Calculate the current users to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = usersData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
              <TableRow key={user.id}>
                <TableCell>
                  <img src={user.profile} alt={`${user.name}'s profile`} className="w-12 h-12 rounded-full" />
                </TableCell>
                <TableCell className="break-all">{user.name}</TableCell>
                <TableCell className="break-all">{user.phone}</TableCell>
                <TableCell className="break-all">{user.email}</TableCell>
                <TableCell className="break-all">{user.role}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(user.id)}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="ml-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
