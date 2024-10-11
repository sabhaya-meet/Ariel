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
  useDisclosure,
} from "@nextui-org/react";

export default function UserDetail({ user }) {
  const {
    isOpen,
    onOpen,
    onClose: detailOnClose,
    onOpenChange: detailOnOpenChange,
  } = useDisclosure();
  return (
    <>
      <div onClick={onOpen} className="flex gap-2 cursor-pointer">
        <Avatar
          name={user.teammate.email}
          src={
            user.teammate.image
              ? "https://api.trymarvin.com/" + user.teammate.image
              : null
          }
          className="bg-[#e4e6e7] text-xs"
        />
        <div className="flex items-center">
          {user?.teammate?.first_name || user?.teammate?.last_name ? (
            <p>{user.teammate.first_name + " " + user.teammate.last_name}</p>
          ) : null}
          <p>{user.teammate.email}</p>
        </div>
      </div>
      <Modal
        size={"lg"}
        isOpen={isOpen}
        onOpenChange={detailOnOpenChange}
        onClose={detailOnClose}
        classNames={{ base: "bg-white rounded-lg" }}
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
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                        className="w-20 h-20 text-large"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-[8px]">
                        <label className="font-neutrafaceSemiBold text-lg font-semibold leading-5 text-[#2C2E61]">
                          First Name
                        </label>
                        <Input
                          disabled
                          defaultValue={user?.teammate.first_name}
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
                          defaultValue={user?.teammate.last_name}
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
                          defaultValue={user?.teammate.email}
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
