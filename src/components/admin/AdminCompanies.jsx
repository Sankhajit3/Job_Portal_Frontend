import useGetAllCompany from "@/hooks/useGetAllCompany";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Sidebar from "./Sidebar";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { deleteCompany } from "@/redux/companySlice"; // Assuming this action is for deleting a company

const ITEMS_PER_PAGE = 8;

const AdminAllCompanies = () => {
  useGetAllCompany(); // Fetch all companies when component mounts

  const { allCompanies = [] } = useSelector((store) => store.company); // Get companies from the Redux store
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredCompanies, setFilteredCompanies] = useState(allCompanies); // State for filtered companies

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Filter companies based on search query
    const filtered = allCompanies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1); // Reset to page 1 when the search query changes
  }, [searchQuery, allCompanies]);

  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

  const deleteCompanyHandler = async (companyId) => {
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(deleteCompany(companyId)); // Update the Redux store
        // Also update the filteredCompanies state
        setFilteredCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company._id !== companyId)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the company.");
    }
  };

  // Calculate the companies to display for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCompanies = filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-6">Company Management</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
          />
        </div>

        {filteredCompanies.length > 0 ? (
          <>
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
                  <TableRow key={company._id}>
                    <TableCell>
                      <img
                        src={company.logo || "default-logo-url.png"}
                        alt={`${company.name}'s logo`}
                        className="w-12 h-12 rounded-full"
                      />
                    </TableCell>
                    <TableCell className="break-all">{company.name}</TableCell>
                    <TableCell className="break-all">{company.location}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteCompanyHandler(company._id)}
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
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <p>No companies available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAllCompanies;
