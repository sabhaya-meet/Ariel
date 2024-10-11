import React, { useEffect, useState } from "react";
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
import { getsessionsApi, updateSessionApi } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import { userSession } from "../../store/sessionReducer";
import { toast } from "react-toastify";

export default function UpdateRfpModel({
  isOpen,
  onClose,
  onOpenChange,
  currentId,
  size,
  page,
}) {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const sessionListItems =
    useSelector((state) => state?.session?.sessionList) || [];

  const SessionId = sessionListItems.find(
    (session) => session.id === currentId
  );

  useEffect(() => {
    if (isOpen && SessionId) {
      setDescription(SessionId.description || "");
    }
  }, [isOpen, SessionId]);

  const handleUpdateSession = (id) => {
    const updatedData = {
      title: SessionId?.title,
      description,
    };

    updateSessionApi(currentId, updatedData).then((res) => {
      getsessionsApi(page, size)?.then((res) => {
        dispatch(userSession?.setSessionList(res?.data?.items));
        toast.success("update session susccessfully");
      });
    });
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      classNames={{ base: "bg-white rounded-[18px]" }}
      style={{ maxWidth: "600px", width: "100%" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 py-4 px-6 flex-initial text-2xl text-[#2C2E61] font-neutrafaceSemiBold leading-10">
              Update RFP
            </ModalHeader>
            <ModalBody>
              <div className="flex-1 py-2 flex flex-col gap-5">
                <div className="flex flex-col gap-[8px]">
                  <label className="font-neutrafaceSemiBold text-lg font-semibold leading-5 text-[#2C2E61]">
                    Title
                  </label>
                  <div className="flex bg-[#F1F1F8] rounded-lg">
                    <Input
                      type="email"
                      placeholder="Please Enter Email"
                      readOnly
                      value={SessionId?.title}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[#2C2E61] font-neutrafaceSemiBold text-lg font-semibold leading-5">
                    Description (optional)
                  </label>
                  <div className="group flex flex-col bg-[#F1F1F8] w-full input-box font-raleway rounded-[10px] text-sm font-normal hover:bg-[#F1F1F8] leading-5 text-[#677174]">
                    <Textarea
                      className="max-w-xs"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-row justify-start gap-2 px-4 py-2">
              <div className="flex flex-row justify-start gap-2 px-2.5 py-4">
                <Button
                  onPress={() => {
                    onClose();
                    handleUpdateSession();
                  }}
                  className="bg-[#5151A6] text-white rounded-lg"
                >
                  Update RFP
                </Button>
                <Button
                  className="border-2 border-[#5151A6] rounded-lg text-[#5151A6]"
                  variant="bordered"
                  onPress={onClose}
                >
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
