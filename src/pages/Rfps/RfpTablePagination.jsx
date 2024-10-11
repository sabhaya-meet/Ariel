import React, { useState } from "react";
import { Pagination, Button } from "@nextui-org/react";
import ArrowBackIcon from "../../assets/arrow_back.svg";
import ArrowForwardIcon from "../../assets/arrow_forward.svg";

export default function RfpTablePagination({ page, pages, setPage, setPages }) {
  return (
    <div className="flex justify-between items-center px-4 py-2">
      <Button
        className="border rounded-lg text-[12px] text-black hover:text-[#a0a0a0]"
        size="sm"
        variant="flat"
        color="secondary"
        onClick={() => setPage((prev) => (page > 1 ? prev - 1 : prev))}
        startContent={<img className="w-[18px] " src={ArrowBackIcon} />}
      >
        Previous
      </Button>
      <Pagination
        total={pages}
        color="secondary"
        page={page}
        boundaries={2}
        onChange={(e) => setPage(e)}
        classNames={{ base: "overflow-hidden", cursor: "bg-[#faf5ff]" }}
      />
      <Button
        className="border rounded-lg text-[12px] text-black hover:text-[#a0a0a0]"
        size="sm"
        variant="flat"
        color="secondary"
        onClick={() => setPage((prev) => (page >= pages ? prev : prev + 1))}
        endContent={<img className="w-[18px]" src={ArrowForwardIcon} />}
      >
        Next
      </Button>
    </div>
    // </div>
  );
}
