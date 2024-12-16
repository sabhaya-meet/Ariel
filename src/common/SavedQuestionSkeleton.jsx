import React from "react";

const SavedQuestionSkeleton = () => {
  return (
    <div className="relative bg-white rounded-lg flex flex-col gap-4 p-6 max-h-[80vh] break-inside-avoid-column">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2 mb-2">
          <div
            className={`w-5 h-5 rounded-full animate-pulse bg-[#c3c3ef]`}
          ></div>
          <div className="flex flex-col  w-[calc(100%-28px)] gap-1">
            <span className="h-5 rounded bg-[#c3c3ef] animate-pulse"></span>
            <span className="h-5 rounded bg-[#c3c3ef] animate-pulse"></span>
            <span className="h-5 rounded bg-[#c3c3ef] animate-pulse"></span>
            <span className="h-5 rounded bg-[#c3c3ef] animate-pulse"></span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
          <div className="bg-[#c3c3ef] h-[14px] animate-pulse w-full rounded-[4px]"></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-[31%] h-6 px-2 py-1 text-xs font-semibold text-left border rounded-md font-raleway bg-[#c3c3ef] animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SavedQuestionSkeleton;
