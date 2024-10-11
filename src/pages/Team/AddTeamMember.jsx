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
import { addTeamMember } from "./TeamTableApi.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function AddTeamMember({
  isOpen,
  onClose,
  onOpenChange,
  setTeamMembers,
}) {
  const dispatch = useDispatch();
  const [size, setSize] = React.useState("lg");
  const [email, setEmail] = useState("");
  const [inviteText, setInviteText] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    if (!email) {
      setError("Email is required.");
      return false;
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSubmit = async () => {
    const data = { email: email, invite_text: inviteText };

    try {
      const newMember = await addTeamMember(data);
      setTeamMembers((teamMembers) => [...teamMembers, newMember]);
      // dispatch(teamMember.setTeamMemberList())
      setEmail("");
      setInviteText("");
      onClose();
    } catch (error) {
      console.log("Failed to add team member:", error);
    }
  };

  const handleAddMemberClick = () => {
    if (validateEmail(email)) {
      handleSubmit();
      toast.success("team member added susccessfully");
    }
  };

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      classNames={{ base: "bg-white rounded-lg" }}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 py-4 px-6 flex-initial text-2xl text-[#2C2E61] font-neutrafaceSemiBold leading-10">
            Add New Member
          </ModalHeader>
          <ModalBody>
            <div className="flex-1 py-2 flex flex-col gap-5">
              <div className="flex flex-col gap-[8px]">
                <label className="font-neutrafaceSemiBold text-lg font-semibold leading-5 text-[#2C2E61]">
                  Member Email
                </label>
                <div className="flex bg-[#F1F1F8] rounded-lg">
                  <Input
                    type="email"
                    placeholder="Please Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && (
                  <p style={{ color: "red", marginTop: "8px" }}>{error}</p>
                )}
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#2C2E61] font-neutrafaceSemiBold text-lg font-semibold leading-5">
                  Invite Message (optional)
                </label>
                <div className="group flex flex-col bg-[#F1F1F8] w-full input-box font-raleway rounded-[10px] text-sm font-normal hover:bg-[#F1F1F8] leading-5 text-[#677174]">
                  <Textarea
                    className="max-w-xs"
                    value={inviteText}
                    onChange={(e) => setInviteText(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-row justify-start gap-2 px-4 py-2">
            <div className="flex flex-row justify-start gap-2 px-2.5 py-4">
              <Button
                onPress={handleAddMemberClick}
                className="bg-[#5151A6] text-white rounded-lg"
              >
                Add Member
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
