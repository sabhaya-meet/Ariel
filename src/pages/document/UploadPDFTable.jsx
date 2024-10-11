import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import PdfPageIcon from "../../assets/PDFPage.svg";
import TablePagination from "./TablePagination";
import { deleteUploadedPdf, documentGetApi } from "./DocumentApi";
import DeletePdf from "./DeletePdf";
import { toast } from "react-toastify";
import { FaCircle } from "react-icons/fa";

const columns = [
  { name: "Title", uid: "title" },
  { name: "File Name", uid: "fileName" },
  { name: "Embedding Status", uid: "embeddingStatus" },
  { name: "Actions", uid: "actions" },
];

const statusColorMap = {
  Uploaded: "success",
};

export default function UploadPDFTable({ page, pages, setPage, setPages }) {
  const [documentData, setDocumentData] = useState([]);
  const [selectedPdfId, setSelectedPdfId] = useState(null); // Store selected pdfId
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    documentGetApi(page, 7).then((res) => {
      setDocumentData(res?.data?.items || []);
      setPages(res?.data?.pages || 1);
    });
  }, [page]);

  const pdfDelete = async () => {
    try {
      if (selectedPdfId) {
        await deleteUploadedPdf(selectedPdfId).then((res) => {
          documentGetApi(page, 7).then((res) => {
            setDocumentData(res?.data?.items || []);
          });
          toast.success("Document deleted successfully");
        });
      }
    } catch (error) {
      console.error("Failed to delete PDF:", error);
    }
  };

  const handleDeleteClick = (pdfId) => {
    setSelectedPdfId(pdfId);
    onOpen();
  };

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <p className="text-[#2C2E61] font-[Relaway] text-sm font-bold">
            {cellValue}
          </p>
        );
      case "fileName":
        return (
          <div className="flex gap-3">
            <div className="relative flex items-center justify-start w-10 h-10">
              <img src={PdfPageIcon} alt="PDF" />
              <div className="absolute top-[18px] w-[26px] px-[3px] rounded-[2px] right-5 h-4 py-0.5 flex items-center justify-center bg-[#EB5D3E]">
                <p className="font-bold text-center text-white file-text text-[10px]">
                  PDF
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-5 font-[Raleway] w-[200px] sm:w-[280px] md:w-auto md:max-w-[25vh]">
                {item?.file}
              </p>
              <p className="text-sm font-medium leading-5 text-gray-500 font-[DM Sans]">
                {item?.file_size}
              </p>
            </div>
          </div>
        );
      case "embeddingStatus":
        return (
          <div className="bg-[#ECFDF3] text-[#027A48] flex py-0.5 pr-2 pl-1.5 justify-center items-center gap-1.5 w-fit rounded-2xl">
            <FaCircle className="w-2 h-2 text-[#12B76A]" />
            <p className="text-xs leading-5 font-medium font-[DM Sans] text-center">
              {item?.status}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip
              color="danger"
              content="Delete Document"
              classNames={{
                base: [
                  // arrow color
                  "before:bg-red-500 dark:before:bg-red-500",
                ],
                content: [
                  " shadow-xl bg-red-500 rounded text-white text-xs font-bold",
                ],
              }}
              showArrow={true}
            >
              <span
                className="text-lg text-gray-400 cursor-pointer hover:opacity-75"
                onClick={() => handleDeleteClick(item.id)}
              >
                <RiDeleteBin6Line />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center px-6 py-5">
          <p className="text-lg leading-[22px] text-[#2c2e61]">Documents</p>
        </div>
        <Table aria-label="Documents table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                className="bg-gray-100 text-left text-gray-500 text-xs"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={documentData}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          pages={pages}
          setPage={setPage}
          setPages={setPages}
        />
      </div>
      <DeletePdf
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        pdfDelete={pdfDelete}
      />
    </>
  );
}
