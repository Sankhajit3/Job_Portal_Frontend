import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { JOB_API_END_POINT } from "@/utils/constant";
import { removeJob } from "@/redux/jobSlice";
import axios from "axios";
import { toast } from "sonner";

const RecruiterJobsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allRecruiterJobs, searchJobByText } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allRecruiterJobs);

  useEffect(() => {
    const filteredJob =
      allRecruiterJobs.length >= 0 &&
      allRecruiterJobs.filter((job) => {
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
  }, [allRecruiterJobs, searchJobByText]);

  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // Remove the job from the Redux store
        dispatch(removeJob(jobId));
        // Update the local state to reflect the deleted job
        setFilterJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the job.");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button aria-label="More options">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => {
                          console.log(job);
                          
                          navigate(`/recruiter/job/${job._id}`);
                        }}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-5" />
                        <span>Edit</span>
                      </div>

                      <div
                        onClick={() =>
                          navigate(`/recruiter/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-5" />
                        <span>Applicants</span>
                      </div>
                      <div  onClick={() => deleteJob(job._id)}  className="flex items-center gap-2 w-fit cursor-pointer mt-2">
                        <Trash2 className="w-5" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecruiterJobsTable;
