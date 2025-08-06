import { Link } from "react-router-dom";
import type { TAiTools } from "../../assets/assets";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const AiToolsCard = ({ tool }: { tool: TAiTools }) => {
  useGSAP(() => {
    gsap.set(".ai-tools-card", {
      opacity: 0,
      y: 100,
      scale: 0.8,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ai-tools-card",
        start: "top 85%",
        end: "top 20%",
        scrub: 1,
      },
    });
    tl.to(".ai-tools-card", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
    });
  }, []);
  return (
    <Link to={tool.path}>
      <div className="ai-tools-card p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:translate-y-1 transition-all duration-300 cursor-pointer">
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
