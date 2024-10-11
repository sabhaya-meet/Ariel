import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import UploadPDF from "../../common/UploadPDF";

export default function PDFUploadModal({
  isOpen,

  onOpenChange,
  onOpen,
  DocumentFile,
  setDocumentFile,
  DocumentUploadedFile,
  setDocumentUploadedFile,
  handleUploadPDF,
  setTitleValue,
}) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: "bg-white rounded-lg min-w-[500px]" }}
        onOpen={onOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 py-4 px-6 flex-initial text-2xl text-[#2C2E61] font-[Neutrafacetext-SemiBold] leading-10">
                Upload Document
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-1 flex-col gap-4 ">
                  <div className="flex flex-col gap-[8px]">
                    <label className="font-neutrafaceSemiBold text-lg font-semibold leading-5 text-[#2C2E61]">
                      Title
                    </label>
                    <div className="flex bg-[#F1F1F8] rounded-lg">
                      <Input
                        type="email"
                        placeholder="Please Enter Document Title"
                        // readOnly
                        // value={SessionId?.title}
                        onChange={(e) => setTitleValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 flex flex-col gap-[8px]">
                    <span className="text-[#232550] font-[Neutrafacetext-SemiBold] not-italic font-semibold text-lg">
                      Upload Document
                    </span>
                    <div className="w-full h-[128px] bg-[#f1f1f8] flex flex-col justify-center items-center p-[1.5rem] cursor-pointer rounded-lg text-lg">
                      <UploadPDF
                        setFile={setDocumentFile}
                        file={DocumentFile}
                        // removeGeneratePDF={removeGeneratePDF}
                        uploadedFile={DocumentUploadedFile}
                        setUploadedFile={setDocumentUploadedFile}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-row gap-2 px-6 py-4 justify-start ">
                <Button
                  //   onClick={() => onDelete(user.id)}
                  onPress={() => {
                    onClose();
                    // handleDeleteQuestion(questionData?.id);
                    handleUploadPDF();
                  }}
                  className="bg-[#5151A6] text-white rounded-lg"
                >
                  Upload
                </Button>
                <Button
                  variant="bordered"
                  className="border border-[#5151A6] rounded-lg text-[#5151A6]"
                  onPress={onClose}
                >
                  Cancle
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
