import { useUser } from "@clerk/clerk-react";
import { AiToolsData } from "../assets/assets";
import AiToolsCard from "./ui/AiToolsCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AiTools = () => {
  const { user } = useUser();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".ai-card");

    // Set initial state for all cards
    gsap.set(cards, {
      opacity: 0,
      y: 80,
      scale: 0.9,
    });

    // Animate all cards together when container comes into view
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.1, // Small stagger for visual appeal
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="px-4 sm:px-10 xl:px-32 my-24 ">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to create,enhance,optimize your content with
          cutting edge AI technology
        </p>
      </div>
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2   md:grid-cols-3 gap-6 p-6 justify-center items-center"
      >
        {AiToolsData?.map((tool) => (
          <div key={tool.title} className="ai-card">
            <AiToolsCard tool={tool} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
