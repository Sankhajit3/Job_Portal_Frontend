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

// Example job data
const jobsData = [
  { id: 1, title: "Software Engineer", salary: "$100,000", location: "New York", jobType: "Full-time" },
  { id: 2, title: "Product Manager", salary: "$120,000", location: "San Francisco", jobType: "Full-time" },
  { id: 3, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  { id: 4, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  { id: 5, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  { id: 6, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  { id: 7, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  { id: 8, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  { id: 9, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  { id: 10, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  { id: 11, title: "Data Scientist", salary: "$110,000", location: "Chicago", jobType: "Contract" },
  // Add more job data as needed
];

const ITEMS_PER_PAGE = 8;

const AdminJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobsData.length / ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log(`Delete job with ID: ${id}`);
  };

  // Calculate the current jobs to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentJobs = jobsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-20">Jobs Management</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Job Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell className="break-all">{job.title}</TableCell>
                <TableCell className="break-all">{job.salary}</TableCell>
                <TableCell className="break-all">{job.location}</TableCell>
                <TableCell className="break-all">{job.jobType}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(job.id)}
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

export default AdminJobs;
