import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Input,
} from "@nextui-org/react";

export default function RfpUserDetail({
  UserDetailIsOpen,
  UserDetailOnOpenChange,
  UserDetailOnClose,
  currentUser,
}) {
  return (
    <>
      <Modal
        size={"lg"}
        isOpen={UserDetailIsOpen}
        onOpenChange={UserDetailOnOpenChange}
        onClose={UserDetailOnClose}
        classNames={{ base: "bg-white rounded-lg" }}
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 py-4 px-6 flex-initial text-2xl text-[#2C2E61] font-neutrafaceSemiBold leading-10">
                User Detail
              </ModalHeader>
              <ModalBody>
                <div className="flex-1  py-2 flex flex-col gap-[16px]">
                  <div className="flex flex-col gap-5 pt-0 rounded-2xl">
                    <div className="flex justify-center">
                      <Avatar
                        name={currentUser?.user?.first_name}
                        className="w-20 h-20 text-large bg-[#bbbbba]"
                        style={{ border: "3px solid #6941C6" }}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-[8px]">
                        <label className="font-neutrafaceSemiBold text-lg font-semibold leading-5 text-[#2C2E61]">
                          First Name
                        </label>
                        <Input
                          disabled
                          //   defaultValue={user?.teammate.first_name}
                          value={currentUser?.user?.first_name}
                          type="text"
                          className="bg-[#F1F1F8] rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-[8px]">
                        <label className="font-neutrafaceSemiBold text-lg font-semibold leading-5 text-[#2C2E61]">
                          Last Name
                        </label>
                        <Input
                          disabled
                          //   defaultValue={user?.teammate.last_name}
                          value={currentUser?.user?.last_name}
                          type="text"
                          className="bg-[#F1F1F8] rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-[8px]">
                        <label className="font-neutrafaceSemiBold text-lg font-semibold leading-5 text-[#2C2E61]">
                          Email
                        </label>
                        <Input
                          disabled
                          //   defaultValue={user?.teammate.email}
                          value={currentUser?.user?.email}
                          type="email"
                          className="bg-[#F1F1F8] rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  className="border border-[#5151A6] rounded-lg text-[#5151A6]"
                  onPress={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
