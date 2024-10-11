import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function SavedQuestionDelete({
  DeleteIsOpen,
  DeleteOnOpenChange,
  DeleteOnOpen,
  handleDeleteQuetion,
}) {
  return (
    <>
      <Modal
        isOpen={DeleteIsOpen}
        onOpenChange={DeleteOnOpenChange}
        classNames={{ base: "bg-white rounded-lg min-w-[500px]" }}
        onOpen={DeleteOnOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 py-4 px-6 flex-initial text-2xl text-[#2C2E61] font-neutrafaceSemiBold leading-10">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-1 flex-col gap-3 ">
                  <p className="text-lg leading-5 font-neutraface text-[#2C2E61]">
                    Are you sure you want to delete this RFP Question?
                    <p className="text-lg leading-5 font-neutraface text-[#2C2E61]">
                      This can't be reversed
                    </p>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  className="border border-[#5151A6] rounded-lg text-[#5151A6]"
                  onPress={onClose}
                >
                  Cancle
                </Button>
                <Button
                  //   onClick={() => onDelete(user.id)}
                  onPress={() => {
                    onClose();
                    handleDeleteQuetion();
                  }}
                  className="bg-[#5151A6] text-white rounded-lg"
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
