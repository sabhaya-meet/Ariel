import React from "react";
import { Link } from "react-router-dom";
import arrowUpRight from "../../assets/arrowUpRightIcon.svg";

export default function PromptsData({ promptData }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {promptData.map((itemData) => (
          <Link
            state={{ itemData }}
            to="/library/lesson"
            className="min-h-[116px] rounded-2xl bg-white p-5 flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between gap-1">
              <p className="text-[18px] leading-[22px] font-medium text-[#2c2e61] font-[Raleway]">
                {itemData?.title}
              </p>
              <img src={arrowUpRight} />
            </div>
            <p className="text-sm font-medium leading-6 font-[Raleway] text-[#2c2e61] w-[calc(100%-24px)]">
              {itemData?.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
