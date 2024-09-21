import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Building, Home, LayoutDashboardIcon, LogOut, Menu, Users2Icon } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false); // State for toggling sidebar
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      {/* Hamburger menu for mobile */}
      <div className="absolute top-4 left-4 md:hidden z-50">
        <Menu
          className="text-gray-800 h-6 w-6 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`${
          expanded ? "left-0" : "-left-full"
        } fixed top-0 z-40 w-64 h-screen bg-gray-800 text-white p-6 transition-all duration-300 md:relative md:left-0 md:w-64`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold mb-6">
          Job<span className="text-red-500"> Portal</span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-4">
          <Link
            to="/"
            className="block mt-20 p-5 text-lg hover:bg-blue-500 rounded-md transition-colors"
            onClick={() => setExpanded(false)} // Close sidebar on click
          >
            <Home className="inline-block mr-2" /> Home
          </Link>
          <Link
            to="/admin/home"
            className="block mt-20 p-5 text-lg hover:bg-blue-500 rounded-md transition-colors"
            onClick={() => setExpanded(false)} // Close sidebar on click
          >
            <LayoutDashboardIcon className="inline-block mr-2" /> Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="block p-5 text-lg hover:bg-blue-500 rounded-md transition-colors"
            onClick={() => setExpanded(false)} // Close sidebar on click
          >
            <Users2Icon className="inline-block mr-2" /> Users
          </Link>
          <Link
            to="/admin/jobs"
            className="block p-5 text-lg hover:bg-blue-500 rounded-md transition-colors"
            onClick={() => setExpanded(false)} // Close sidebar on click
          >
            <Briefcase className="inline-block mr-2" /> Jobs
          </Link>
          <Link
            to="/admin/company"
            className="block p-5 text-lg hover:bg-blue-500 rounded-md transition-colors"
            onClick={() => setExpanded(false)} // Close sidebar on click
          >
            <Building className="inline-block mr-2" /> Company
          </Link>
        </nav>

        {/* Sign Out Option */}
        <div onClick={logoutHandler} className="mt-20 cursor-pointer hover:bg-red-500 p-2 rounded-md transition-colors">
          <LogOut className="inline-block w-6 h-6 mr-2" />
          <span>Sign Out</span>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          expanded ? "md:ml-64" : ""
        }`}
      >
       
      </div>

      {/* Background overlay when the sidebar is open on mobile */}
      {expanded && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setExpanded(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
