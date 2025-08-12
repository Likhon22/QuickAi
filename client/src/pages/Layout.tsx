import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import { useUser, SignIn } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();
  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <Link to="/">
          <img src={assets.logo} alt="logo" />
        </Link>
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>
      <div className="flex  flex-1 w-full bg-gray-100">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1  w-full">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
