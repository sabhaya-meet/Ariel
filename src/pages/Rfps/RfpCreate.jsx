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
import { createRfpSession } from "./Data";
import { useDispatch } from "react-redux";
import { getsessionsApi } from "./Data";
import { userSession } from "../../store/sessionReducer";
import { toast } from "react-toastify";

export default function RfpCreate({
  isOpen,
  onClose,
  onOpenChange,
  setPages,
  size,
  page,
}) {
  const [sizes, setSize] = React.useState("lg");
  const [titleText, setTitleText] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const getSession = () => {
    getsessionsApi(page, size)?.then((res) => {
      dispatch(userSession?.setSessionList(res?.data?.items));
      setPages(res?.data?.pages);
    });
  };
  const handleSubmit = async () => {
    const data = { title: titleText, description: description };

    try {
      await createRfpSession(data, getSession).then((res) => {
        toast.success("new session created");
      });

      setTitleText("");
      setDescription("");
      onClose();
    } catch (error) {
      console.log("Failed to session:", error);
      toast.error("session already exists");
    }
  };

  const handleCreateSession = () => {
    handleSubmit();
  };

  return (
    <Modal
      sizes={sizes}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      classNames={{ base: "bg-white rounded-lg" }}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 py-4 px-6 flex-initial text-2xl text-[#2C2E61] font-neutrafaceSemiBold leading-10">
            Create New RFP
          </ModalHeader>
          <ModalBody>
            <div className="flex-1 py-2 flex flex-col gap-5">
              <div className="flex flex-col gap-[8px]">
                <label className="font-neutrafaceSemiBold text-lg font-semibold leading-5 text-[#2C2E61]">
                  Title
                </label>
                <div className="flex bg-[#F1F1F8] rounded-lg">
                  <Input
                    type="text"
                    placeholder="Please Enter Session Title"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}
                  />
                </div>
                {error && (
                  <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
                )}
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
                  handleCreateSession();
                  onClose();
                }}
                className="bg-[#5151A6] text-white rounded-lg"
              >
                Create New RFP
              </Button>
              <Button
                className="border border-[#5151A6] rounded-lg text-[#5151A6]"
                variant="bordered"
                onPress={onClose}
              >
                Cancel
              </Button>
            </div>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
