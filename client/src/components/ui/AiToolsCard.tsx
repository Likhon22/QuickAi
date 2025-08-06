import { Link } from "react-router-dom";
import type { TAiTools } from "../../assets/assets";

const AiToolsCard = ({ tool }: { tool: TAiTools }) => {
  return (
    <Link to={tool.path}>
      <div className="p-8 m-4 max-w-xs h-[250px] rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:translate-y-1 transition-all duration-300 cursor-pointer">
        <tool.Icon
          className="w-12 h-12 p-3 text-white rounded-xl"
          style={{
            background: `linear-gradient(to bottom right, ${tool.bg.from}, ${tool.bg.to})`,
          }}
        />
        <h2 className="text-lg font-semibold mt-6 mb-3">{tool.title}</h2>
        <p className="text-gray-400 text-sm max-w-[95%]">{tool.description}</p>
      </div>
    </Link>
  );
};

export default AiToolsCard;
