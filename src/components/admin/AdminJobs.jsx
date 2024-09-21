import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Sidebar from "./Sidebar";
import { removeJob } from "@/redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Input } from "../ui/input";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const ITEMS_PER_PAGE = 8;

const AdminJobs = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job); // Get allRecruiterJobs from Redux store
  const [currentPage, setCurrentPage] = useState(1);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [searchJobByText, setSearchJobByText] = useState(""); // Local state for search input

  useEffect(() => {
    // Filter jobs based on search query
    const filteredJob =
      allJobs.length >= 0 &&
      allJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJob);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [allJobs, searchJobByText]);

  const totalPages = Math.ceil(filterJobs.length / ITEMS_PER_PAGE);

  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // Remove the job from the Redux store
        dispatch(removeJob(jobId));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the job.");
    }
  };

  // Calculate the current jobs to display based on current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentJobs = filterJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
          Jobs Management
        </h1>

        {/* Search Box */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search jobs by title or company"
            value={searchJobByText}
            onChange={(e) => setSearchJobByText(e.target.value)}
            className="w-full md:w-[60%] p-2 border border-gray-300 rounded"
          />
        </div>

        {filterJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <Table className="min-w-full text-sm">
              <TableHeader>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Created Company</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Job Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentJobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell className="whitespace-nowrap">{job._id}</TableCell>
                    <TableCell className="break-all">{job.title}</TableCell>
                    <TableCell className="break-all">{job.company.name}</TableCell>
                    <TableCell className="break-all">{job.salary} LPA</TableCell>
                    <TableCell className="break-all">{job.location}</TableCell>
                    <TableCell className="break-all">{job.jobType}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteJob(job._id)}
                        className="bg-red-500 text-white"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p>No jobs available.</p>
        )}

        {/* Pagination Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="w-full md:w-auto"
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="w-full md:w-auto"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
