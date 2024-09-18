import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import SavedJob from "./SavedJob";
import Navbar from "./shared/Navbar";
import { motion } from "framer-motion";
import { setSavedJobs } from "@/redux/jobSlice";

const SavedJobs = () => {
  const { savedJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/saved-jobs`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.savedJobs) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllSavedJobs();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="flex-1 overflow-y-auto pb-5">
        <h1 className="font-bold text-xl my-10">Saved Jobs ({savedJobs?.length || 0})</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {savedJobs && savedJobs.length > 0 ? (
                savedJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <SavedJob job={job} />
                  </motion.div>
                ))
              ) : (
                <p>No saved jobs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
