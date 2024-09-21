import { setAllCompanies, setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/companies`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data);
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompany;
