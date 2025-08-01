import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import QButton from "./ui/QButton";
import { ArrowRight } from "lucide-react";
import { useUser, UserButton, useClerk } from "@clerk/clerk-react";
const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  console.log(user);

  return (
    <div className="fixed z-5 w-full flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 backdrop-blur-2xl ">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
      </Link>
      {user ? (
        <UserButton />
      ) : (
        <QButton
          onClick={() => openSignIn()}
          text="Get Started"
          icon={<ArrowRight className="w-4 h-4" />}
        />
      )}
    </div>
  );
};

export default Navbar;
