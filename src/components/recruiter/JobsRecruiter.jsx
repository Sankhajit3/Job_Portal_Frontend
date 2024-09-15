import useGetAllRecruiterJobs from "@/hooks/useGetAllRecruiterJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import RecruiterJobsTable from "./RecruiterJobsTable";

const JobsRecruiter = () => {
  useGetAllRecruiterJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5 ">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filter by name, role"
          />
          <Button onClick={() => navigate("/recruiter/jobs/create")}>
            New Job
          </Button>
        </div>

        <RecruiterJobsTable />
      </div>
    </div>
  );
};

export default JobsRecruiter;
