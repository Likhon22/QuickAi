import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import QButton from "./ui/QButton";

const Hero = () => {
  return (
    <div className="px-4  sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-gradient-to-r from-purple-100 via-violet-200 to-blue-200 min-h-screen  ">
      <div className="flex justify-center items-center flex-col text-center gap-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mx-auto leading-[1.2]">
          Create amazing content <br /> with{" "}
          <span className="text-primary">AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Transform your ideas into stunning visuals with our AI-powered
          tools.Write articles, generate images, and much more
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs mt-12">
        <Link to="/ai">
          <QButton className="rounded-lg " text="Start Creating now" />
        </Link>
        <QButton
          className="bg-white !text-gray-600 hover:!bg-gray-100 !hover:text-gray-800 border border-gray-300 rounded-lg"
          text="Watch Demo"
        />
      </div>
      <div className="flex items-center gap-4 mt-8 mx-auto ">
        <img src={assets.user_group} alt="user" className="h-8 " />
        <p className="text-gray-600">Trusted by 10k+ people</p>
      </div>
    </div>
  );
};

export default Hero;
