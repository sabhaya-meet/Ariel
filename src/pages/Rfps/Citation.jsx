import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import flagIcon from "../../assets/FlagIcon.svg";
import flagIconActive from "../../assets/flagIconActive.svg";

import DarkPdfPage from "../../assets/DarkPdfPage.svg"; // PDF Icon
import IndividuakDocument from "../../common/IndividuakDocument"; // Custom Document Component
import { getFileExtension } from "../../utils/helper"; // Helper Function
import parse from "html-react-parser";
import { citation_is_flagged, getCitationApi } from "./Data"; // API call function

export default function Citation({
  citationIsOpen,
  citationOnOpen,
  citationOnClose,
  citationOnOpenChange,
  citationData,
  answer_id,
}) {
  const [flaggedItems, setFlaggedItems] = useState({});

  const toggleFlagIcon = (id, currentFlagged) => {
    const newFlaggedItems = { ...flaggedItems, [id]: !currentFlagged };
    setFlaggedItems(newFlaggedItems);

    // API call to update the flagged status
    citation_is_flagged(id, {
      is_flagged: !currentFlagged, // Pass the opposite of the current value
    }).then((res) => {
      getCitationApi(answer_id);
    });
  };

  return (
    <>
      <Modal
        isOpen={citationIsOpen}
        onOpenChange={citationOnOpenChange}
        classNames={{
          base: "flex flex-col relative z-50 w-full box-border outline-none sm:mx-6 sm:my-16 shadow-small max-h-[calc(100%_-_7.5rem)] bg-white max-w-[90vw] rounded-xl m-0 lg:max-w-p[1000px] 2xl:max-h-screen",
          body: "p-0",
        }}
        onOpen={citationOnOpen}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex-initial text-large font-semibold items-start justify-between p-6 pb-[22px]">
                <div className="flex w-full ">
                  <div className="flex flex-col flex-grow gap-1">
                    <div className="flex justify-between w-full">
                      <p className="text-lg font-semibold font-[Raleway] text-ebony leading-[22px]">
                        Sources Referenced
                      </p>
                      <IoClose
                        onClick={() => onClose()}
                        className="w-7 h-7 cursor-pointer text-[#8d9095]"
                      />
                    </div>
                    <p className="text-sm font-normal font-[DM Sans] text-[#475467]">
                      These resources were cited in generating this answer
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <div className="w-full border"></div>
              <ModalBody>
                <div className="flex-1 overflow-y-auto p-0 flex flex-col gap-1 px-2 py-3">
                  {citationData?.map((data) => {
                    const isCurrentlyFlagged = flaggedItems[data?.id] || false;

                    const newData =
                      data?.citation_type === "saved_answers" ? (
                        <div
                          className="p-2.5 pl-3.5 flex gap-2 w-full"
                          key={data.id}
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200">
                            <img src={DarkPdfPage} alt="PDF Document" />
                          </div>
                          <div className="flex flex-col gap-2 w-[calc(100%-40px)]">
                            <div className="flex items-center justify-between gap-2">
                              <div className="w-[calc(100%-34px)] md:w-[calc(100%-48px)]">
                                <p className="text-sm font-medium text-[#101828] font-[DM Sans]">
                                  Saved answer: {data?.title}
                                </p>
                                <p className="text-sm font-[DM Sans] text-[#93A0B4]">
                                  Owned by {data?.owned_by} in Saved Responses
                                </p>
                              </div>
                              <div className="flex items-center justify-center px-2">
                                <img
                                  src={
                                    isCurrentlyFlagged
                                      ? flagIconActive
                                      : flagIcon
                                  }
                                  onClick={() => {
                                    toggleFlagIcon(
                                      data?.id,
                                      isCurrentlyFlagged
                                    );
                                  }}
                                  alt="Flag Icon"
                                  className={`cursor-pointer ${
                                    isCurrentlyFlagged ? "text-orange-400" : ""
                                  }`}
                                  style={{ width: "24px", height: "24px" }}
                                />
                              </div>
                            </div>
                            <p className="text-sm break-words whitespace-pre-wrap text-[#475467] font-[DM Sans]">
                              {data?.source_text
                                ? parse(data?.source_text)
                                : "No additional content"}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="p-2.5 pl-3.5 flex gap-2 w-full"
                          key={data.id}
                        >
                          <IndividuakDocument
                            fileType={getFileExtension(data.title)}
                          />
                          <div className="flex flex-col gap-2 w-[calc(100%-40px)]">
                            <div className="flex items-center justify-between gap-2">
                              <div className="w-[calc(100%-34px)] md:w-[calc(100%-48px)]">
                                <p className="text-sm font-medium text-[#101828] font-[DM Sans]">
                                  Saved answer: {data?.title}
                                </p>
                                <p className="text-sm font-[DM Sans] text-[#93A0B4]">
                                  Owned by {data?.owned_by} in Documents
                                </p>
                              </div>
                              <div className="flex items-center justify-center px-2">
                                <img
                                  src={
                                    isCurrentlyFlagged
                                      ? flagIconActive
                                      : flagIcon
                                  }
                                  onClick={() => {
                                    toggleFlagIcon(
                                      data?.id,
                                      isCurrentlyFlagged
                                    );
                                  }}
                                  alt="Flag Icon"
                                  className={`cursor-pointer ${
                                    isCurrentlyFlagged ? "bg-orange-400" : ""
                                  }`}
                                  style={{ width: "24px", height: "24px" }}
                                />
                              </div>
                            </div>
                            <p className="text-sm break-words text-[#475467] font-[DM Sans]">
                              {data?.source_text
                                ? parse(data?.source_text)
                                : "No additional content"}
                            </p>
                          </div>
                        </div>
                      );

                    return newData;
                  })}
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
