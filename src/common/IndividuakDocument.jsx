import React from "react";

import PdfPageIcon from "../assets/PDFPage.svg";
import { getColorForFileType } from "../utils/helper";

export default function IndividuakDocument({ fileType }) {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-lg border-1 border-gray-200">
      <div className="relative flex items-center justify-start w-10 h-10">
        <img src={PdfPageIcon} alt="PDF" />
        <div
          style={{ background: getColorForFileType(fileType) }}
          className={`absolute top-[18px] w-[26px] px-[3px] rounded-[2px] right-5 h-4 py-0.5 flex items-center justify-center`}
        >
          <p className="font-bold text-center text-white file-text text-[10px]">
            {fileType}
          </p>
        </div>
      </div>
    </div>
  );
}
