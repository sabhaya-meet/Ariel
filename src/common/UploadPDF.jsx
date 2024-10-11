import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "../assets/uploadDocIcon.svg";
import { FaRegFilePdf } from "react-icons/fa6";
import pdfCancelIcon from "../assets/pdfCancel.svg";
import { Tooltip } from "@nextui-org/react";
export default function UploadPDF({
  setFile,
  file,
  removeGeneratePDF,
  uploadedFile,
  setUploadedFile,
}) {
  const [isHover, setIsHover] = useState(false);
  const onDropHandler = (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size <= 10 * 1024 * 1024) {
        setUploadedFile(selectedFile);
      } else {
        console.error("File size exceeds the limit of 10 MB");
      }
    } else {
      console.error("Please upload only one file");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropHandler,
    multiple: false,
  });

  const handleRemoveFile = (e) => {
    setFile(null);
    setUploadedFile(null);
    removeGeneratePDF();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div>
        {!uploadedFile && !file ? (
          <div
            {...getRootProps()}
            className="relative shadow-black/5 shadow-none rounded-large"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col justify-center items-center">
              <img
                src={UploadFileIcon}
                alt="Upload File Icon"
                className="w-[50px]"
              />
              <p className="text-[#6969B4] font-raleway font-normal text-xs leading-5">
                <span className="text-[#6969B4] font-raleway font-bold text-xs leading-5 pr-1">
                  Choose file
                </span>
                or
                <span className="text-[#232550] font-raleway font-bold text-xs leading-5 pr-1">
                  drag here
                </span>
              </p>
              <p className="text-[#232550] font-raleway font-normal text-xs leading-5">
                Size limit: 10MB
              </p>
            </div>
          </div>
        ) : (
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`${
              file || uploadedFile?.name
            } bg-[#F1F1F8] flex flex-row items-center justify-center gap-2 border-dashed border-2 border-slate-400 p-2`}
          >
            <FaRegFilePdf size={25} className="" />
            <Tooltip
              content={file || uploadedFile?.name}
              color="success"
              placement="top"
              classNames={{
                base: [
                  // arrow color
                  "bg-white text-black rounded-2xl mb-1",
                ],
              }}
            >
              <span className="text-[#2C2E61] font-[Raleway] text-[0.9rem] leading-5 font-bold text-left truncate">
                {file || uploadedFile?.name}
              </span>
            </Tooltip>
            <div className="w-7 h-7 items-center">
              {isHover && (
                <img
                  src={pdfCancelIcon}
                  alt="Remove PDF"
                  className="h-[28px] cursor-pointer"
                  onClick={() => handleRemoveFile()}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
