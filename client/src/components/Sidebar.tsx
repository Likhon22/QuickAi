import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type TNavItem = {
  to: string;
  label: string;
  Icon: React.ElementType;
};
type TSidebarProps = {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ sidebar, setSidebar }: TSidebarProps) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const navItems: TNavItem[] = [
    {
      to: "/ai",
      label: "Dashboard",
      Icon: House,
    },
    {
      to: "/ai/write-article",
      label: "Write Article",
      Icon: SquarePen,
    },
    {
      to: "/ai/blog-titles",
      label: "Blog Titles",
      Icon: Hash,
    },
    {
      to: "/ai/generate-images",
      label: "Generate Images",
      Icon: Image,
    },
    {
      to: "/ai/remove-background",
      label: "Remove Background",
      Icon: Eraser,
    },
    {
      to: "/ai/remove-object",
      label: "Remove Object",
      Icon: Scissors,
    },
    {
      to: "/ai/review-resume",
      label: "Review Resume",
      Icon: FileText,
    },
    {
      to: "/ai/community",
      label: "Community",
      Icon: Users,
    },
  ];
  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col items-center justify-between max-sm:absolute top-14 bottom-0 
        ${
          sidebar ? "translate-x-0" : "max-sm:translate-x-full"
        }  transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <img
          className="w-13 rounded-full mx-auto"
          src={user?.imageUrl}
          alt="user"
        />
        <h2 className="mt-1 text-center">{user?.fullName}</h2>
      </div>
      <div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center p-2 text-gray-600 hover:bg-gray-100 ${
                isActive
                  ? "bg-gradient-to-r from-[#3C81F6]  to-[#9234EA] text-white"
                  : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.Icon
                  className={`w-5 h-5 mr-2 ${isActive ? "text-white" : ""}`}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={() => openUserProfile()}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img src={user?.imageUrl} className="w-8 h-8 rounded-full" alt="" />
          <div>
            <h1 className="font-medium text-sm">{user?.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
              Plan
            </p>
          </div>
        </div>
        <LogOut
          className="w-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default Sidebar;
