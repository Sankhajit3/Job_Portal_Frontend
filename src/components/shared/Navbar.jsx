import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
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

  // Dynamic style based on current route
  const linkStyles = (path) => {
    return location.pathname === path
      ? "text-[#F83002] font-semibold"
      : "hover:text-[#F83002] transition-all duration-300 ease-in-out";
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4 md:px-8">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/recruiter/companies"
                    className={`pb-1 ${linkStyles("/recruiter/companies")}`}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recruiter/jobs"
                    className={`pb-1 ${linkStyles("/recruiter/jobs")}`}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className={`pb-1 ${linkStyles("/")}`}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className={`pb-1 ${linkStyles("/jobs")}`}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className={`pb-1 ${linkStyles("/browse")}`}>
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/savedJob"
                    className={`pb-1 ${linkStyles("/savedJob")}`}
                  >
                    Saved Job
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="px-4 py-1.5">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="px-4 py-1.5 bg-[#6A38C2] hover:bg-[#3b0696] transition-all duration-300 ease-in-out">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                    }
                    alt="user avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                      }
                      alt="user avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-lg">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  {user && user.role === "admin" && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <User2 />
                      <Button variant="link">
                        <Link to="/admin/home">Admin</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
