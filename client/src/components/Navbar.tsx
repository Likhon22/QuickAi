import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import QButton from "./ui/QButton";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed z-5 w-full">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
      </Link>
      <QButton text="Get Started" icon={<ArrowRight className="w-4 h-4" />} />
    </div>
  );
};

export default Navbar;
