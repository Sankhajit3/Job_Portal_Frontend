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

// Example company data with logo image URLs
const companiesData = [
  {
    id: 1,
    logo: "https://via.placeholder.com/50", // Placeholder image URL
    name: "Tech Corp",
    location: "New York, NY",
  },
  {
    id: 2,
    logo: "https://via.placeholder.com/50", // Placeholder image URL
    name: "Innovate Inc.",
    location: "San Francisco, CA",
  },
  // Add more company data as needed
  // For testing pagination, ensure to add at least 15-20 company entries
];

const ITEMS_PER_PAGE = 8;

const AdminCompanies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(companiesData.length / ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log(`Delete company with ID: ${id}`);
  };

  // Calculate the current companies to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCompanies = companiesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-20">Company Management</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <img src={company.logo} alt={`${company.name}'s logo`} className="w-12 h-12 rounded-full" />
                </TableCell>
                <TableCell className="break-all">{company.name}</TableCell>
                <TableCell className="break-all">{company.location}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(company.id)}
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

export default AdminCompanies;
