import React, { useEffect, useState } from "react";
import PromptsData from "./PromptsData";
import { promptGetData } from "./promptApiData";

export default function PromptLibraryMain() {
  const [promptData, setPromptData] = useState([]);

  useEffect(() => {
    promptGetData().then((res) => {
      setPromptData(res?.data);
    });
  }, []);
  return (
    <div className="px-6">
      <div className="flex flex-col gap-6 isAboveMobile:gap-8 max-w-[948px] mx-auto mt-14">
        <div className="flex flex-col gap-3">
          <p className="text-white text-[48px] leading-10 font-bold font-[Neutrafacetext-Bold]">
            Ariel AI Library
          </p>
          <p className="text-base leading-5 font-medium text-white font-[Raleway]">
            Explore optimized AI Agents that can support your content generation
            workflows.
          </p>
        </div>
        <PromptsData promptData={promptData} />
      </div>
    </div>
  );
}
