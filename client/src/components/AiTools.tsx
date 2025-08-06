import { useUser } from "@clerk/clerk-react";
import { AiToolsData } from "../assets/assets";
import AiToolsCard from "./ui/AiToolsCard";

const AiTools = () => {
  const { user } = useUser();
  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to create,enhance,optimize your content with
          cutting edge AI technology
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-6">
        {AiToolsData?.map((tool) => (
          <AiToolsCard key={tool.title} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default AiTools;
