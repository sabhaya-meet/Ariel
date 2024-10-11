import { Button, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaCommentsDollar, FaUpload } from "react-icons/fa6";
import PDFUploadModal from "./PDFUploadModal";
import UploadPDFTable from "./UploadPDFTable";
import { documentGetApi, postUploadPdf } from "./DocumentApi";
import { toast } from "react-toastify";

export default function DocumentMain() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [DocumentFile, setDocumentFile] = useState(null);
  const [DocumentUploadedFile, setDocumentUploadedFile] = useState(null);
  const [titleValue, setTitleValue] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [pages, setPages] = useState(1);

  // useEffect(() => {
  //   documentGetApi(page, size)?.then((res) => {
  //     console.log(res?.data, "=================");
  //     // dispatch(userSession?.setSessionList(res?.data?.items));
  //     // setPages(res?.data?.pages);
  //   });
  // }, [page]);

  const handleUploadPDF = async () => {
    if (!DocumentUploadedFile || !titleValue) {
      alert("Please upload a file and provide a title before proceeding.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", DocumentUploadedFile);
      formData.append("title", titleValue);

      await postUploadPdf(formData).then((res) => {
        documentGetApi(page, size).then((res) => {
          setPages(res?.data?.pages);
        });
        setDocumentFile(res);
        toast.success("File uploaded successfully");
      });
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <>
      <div className="px-[16px]">
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-[20px] ml-2">
            <div>
              <p className="mb-2 text-4xl font-bold font-[Neutrafacetext-Bold] text-white">
                My Documents
              </p>
              <p className="text-base text-white font-[Raleway]">
                view your documents
              </p>
            </div>
            <Button
              onClick={() => onOpen()}
              className="bg-[#2C2E61] text-white font-[Raleway] text-base font-normal rounded-lg"
              color="danger"
              variant="bordered"
              startContent={<FaUpload />}
            >
              Upload Document
            </Button>
          </div>
        </div>
        <div className="flex bg-white rounded-xl">
          <UploadPDFTable
            page={page}
            pages={pages}
            setPage={setPage}
            setPages={setPages}
            DocumentFile={DocumentFile}
          />
        </div>
      </div>
      <PDFUploadModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        DocumentFile={DocumentFile}
        setDocumentFile={setDocumentFile}
        DocumentUploadedFile={DocumentUploadedFile}
        setDocumentUploadedFile={setDocumentUploadedFile}
        handleUploadPDF={handleUploadPDF}
        setTitleValue={setTitleValue}
      />
    </>
  );
}
