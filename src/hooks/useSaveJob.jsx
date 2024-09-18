import { setSavedJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const useSaveJob = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  const saveJob = async (jobId, onSaveSuccess) => {
    if (!user) return;

    try {
  
      const res = await axios.post(`${JOB_API_END_POINT}/save-job/${jobId}`, {}, { withCredentials: true });

      if (res.data.success) {
        dispatch(setSavedJobs(res.data.savedJobs)); // Assuming 'savedJobs' in response
        if (onSaveSuccess) onSaveSuccess(); // Navigate on successful save
      }
    } catch (error) {
      console.log(error);
    }
  };

  return saveJob;
};

export default useSaveJob;
