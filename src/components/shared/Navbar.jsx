import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#3b0696]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                {/* Wrap Avatar with a fragment to ensure a single child */}

                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">joy mahata</h4>
                      <p className="text-sm text-muted-foreground">
                        hey whatsapp
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-4 text-grey-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />

                      <Button variant="link">view prifile</Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link">log out</Button>
                    </div>
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
