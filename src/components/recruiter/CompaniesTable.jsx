import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { deleteCompany } from "@/redux/companySlice";

const Companiestable = () => {
  const navigate = useNavigate();
  const { companies,searchCompanyByText } = useSelector((store) => store.company);
  const companyList = Array.isArray(companies) ? companies : [];
  const [filterCompany,setFilterCompany] = useState(companyList);
  const dispatch = useDispatch();

  useEffect(()=> {
    const filteredCompany = companyList.length >= 0 && companyList.filter((company) => {
      if(!searchCompanyByText){
        return true
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    });
    setFilterCompany(filteredCompany);

  },[companyList,searchCompanyByText])

  const deleteCompanyHandler = async (companyId) => {
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // Remove the job from the Redux store
        dispatch(deleteCompany(companyId));
        // Update the local state to reflect the deleted job
        setFilterCompany((prevJobs) => prevJobs.filter((company) => company._id !== companyId));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the job.");
    }
  };
  

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button aria-label="More options">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/recruiter/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-5" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>deleteCompanyHandler(company._id)} className="flex items-center gap-2 w-fit cursor-pointer my-2">
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

export default Companiestable;
