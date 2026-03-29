import React from "react";
import Logo from "./Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { LogOut, Plus, User } from "lucide-react";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      className="border-b bg-white border-gray-100 py-3 mx-auto sticky top-0"
      style={{ zIndex: 1000 }}
    >
      <div className="container px-4 h-11 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/CreateBlog">
                <Button color="primary" rounded="full" className="flex items-center gap-2 px-4 py-2">
                  <Plus size={18} />
                  <span className="hidden sm:inline">Write</span>
                </Button>
              </Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l">
                <div className="flex items-center gap-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full object-cover border" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={16} />
                    </div>
                  )}
                  <span className="hidden lg:inline text-sm font-medium text-gray-700">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="ghost" className="text-sm font-medium">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button color="primary" rounded="full" className="text-sm font-medium px-5">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

