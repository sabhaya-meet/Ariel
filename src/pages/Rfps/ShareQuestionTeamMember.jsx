import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { IoPersonAddOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import {
  getsessionById,
  inviteQuestionParticipant,
  participantDeleteApi,
} from "./Data"; // Make sure to import the new API function

export default function ShareQuestionTeamMember({
  ShareIsOpen,
  ShareOnOpen,
  ShareOnClose,
  ShareOnOpenChange,
  sesstionId,
  questionId,
  teamMember,
  participants,
}) {
  const isMobile = useMediaQuery({
    query: "(max-width: 992px)",
  });

  const participantsIds = participants?.map((p) => String(p?.participant?.id));
  const [textValueInvite, setTextValueInvite] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState(
    participantsIds || []
  );
  const [sharedMemberId, setSharedMemberId] = useState();

  const [tempSelectedTeamMember, setTempSelectedTeamMember] = useState(null);

  const inviteQestionMember = async () => {
    if (!sharedMemberId) {
      toast.error("Please select a team member to invite.");
      return;
    }

    const payLoadData = {
      user_id: parseInt(sharedMemberId?.currentKey),
      invite_message: textValueInvite,
    };

    try {
      await inviteQuestionParticipant(sesstionId, questionId, payLoadData).then(
        (res) => {
          toast.success("Participant invited successfully");
          getsessionById(sesstionId);
        }
      );

      setSelectedTeamMember([
        ...selectedTeamMember,
        sharedMemberId?.currentKey,
      ]);

      // setTempSelectedTeamMember(null);
      setTextValueInvite("");
      setSharedMemberId();
    } catch (error) {
      console.error("Failed to invite participant:", error);
      toast.error("Failed to invite participant.");
    }
  };

  const handleRemoveParticipant = async (participantId) => {
    try {
      await participantDeleteApi(sesstionId, questionId, participantId);
      setSelectedTeamMember((prev) =>
        prev.filter((memberId) => memberId !== participantId.toString())
      );
      toast.success("Participant removed successfully");
    } catch (error) {
      console.error("Failed to remove participant:", error);
      toast.error("Failed to remove participant.");
    }
  };

  const availableTeamMembers = (teamMember || []).filter(
    (member) =>
      !selectedTeamMember.includes(member.teammate_id.toString()) &&
      sharedMemberId !== member.teammate_id.toString()
  );

  return (
    <>
      <Modal
        isOpen={ShareIsOpen}
        onOpenChange={ShareOnOpenChange}
        classNames={{
          base: "flex flex-col relative z-50 w-full box-border outline-none sm:mx-6 sm:my-16 shadow-small max-h-[calc(100%_-_7.5rem)] bg-white max-w-[90vh] rounded-xl p-6 m-0 lg:w-[400px]",
        }}
        onOpen={ShareOnOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex-initial text-large font-semibold p-0 flex items-start justify-between mb-4">
                <div className="w-12 h-12 p-3 border border-skyblue rounded-[10px]">
                  <AiOutlineUsergroupAdd />
                </div>

                <div className="cursor-pointer">
                  <IoMdClose
                    onClick={onClose}
                    className="w-6  h-6 text-[#A1A1AA]"
                  />
                </div>
              </ModalHeader>
              <ModalBody className="p-0 overflow-y-auto ">
                <div className="flex-1  p-0 flex flex-col gap-5 mb-8">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-medium font-dmSans text-[#232550] leading-[22px]">
                      Assign to team member
                    </p>
                    <p className="text-sm font-dmSans text-[#232550]">
                      The following users have access to this document
                    </p>
                  </div>

                  {selectedTeamMember?.map((memberId) => {
                    const user = teamMember.find(
                      (member) => member?.teammate_id == memberId
                    );
                    return (
                      <div
                        key={memberId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            className="flex-shrink-0 rounded-full bg-[#d6d6db]"
                            size="sm"
                          />
                          <div>
                            <p className="text-sm font-normal font-dmSans text-portGore whitespace-nowrap max-w-[221px] overflow-hidden text-ellipsis">
                              {user?.teammate?.email}
                            </p>
                          </div>
                        </div>
                        <div
                          className="text-sm font-medium cursor-pointer font-dmSans text-[#D24627]"
                          onClick={() => handleRemoveParticipant(memberId)}
                        >
                          Remove
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex flex-col gap-1.5 h-full">
                    <p className="text-sm font-medium font-dmSans text-portGore">
                      Team member
                    </p>

                    <Select
                      items={availableTeamMembers}
                      startContent={<IoPersonAddOutline />}
                      onSelectionChange={(e) => {
                        setSharedMemberId(e);
                      }}
                      selectedKeys={sharedMemberId}
                      variant="bordered"
                      selectionMode="single"
                      placeholder="Select a user"
                      labelPlacement="outside"
                      className="justify-center w-full items-center bg-[#f1f1f8] rounded-lg "
                      classNames={{
                        listbox: "bg-[#FFF] border-[2px] p-0 rounded-lg",
                        trigger: "min-h-12 py-2",
                        base: "w-full",
                      }}
                      renderValue={(items) => {
                        return items?.map((item) => {
                          return (
                            <div
                              key={item.key}
                              className="flex items-center gap-2"
                            >
                              <div className="flex flex-col p-1">
                                <span>{item.data.teammate?.first_name}</span>
                                <span className="text-default-500 text-tiny bg-[#D4D4D8] rounded-xl px-2">
                                  {item?.data?.teammate?.email}
                                </span>
                              </div>
                            </div>
                          );
                        });
                      }}
                    >
                      {(user) => (
                        <SelectItem
                          key={user.teammate_id}
                          textValue={user.teammate.email}
                          classNames={{
                            base: "hover:bg-[#dbdbe5] rounded-lg",
                          }}
                        >
                          <div className="flex gap-2 items-center ">
                            <Avatar
                              alt={user.name}
                              className="flex-shrink-0 rounded-full bg-[#d6d6db]"
                              size="sm"
                              src={user.avatar}
                            />
                            <div className="flex flex-col">
                              <span className="text-small">{user.name}</span>
                              <span className="font-dmSans text-[#A1A1AA] text-xs">
                                {user.teammate.email}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium font-dmSans text-portGore">
                      Invite Message (optional)
                    </p>
                    <div className="flex flex-col gap-[8px]">
                      <Textarea
                        value={textValueInvite}
                        onChange={(e) => setTextValueInvite(e.target.value)}
                        labelPlacement="outside"
                        placeholder="Message"
                        className="bg-[#F1F1F8] rounded-lg  max-h-15 hover:bg-[#] font-[Raleway] text-base leading-6"
                        classNames={{
                          innerWrapper: "items-center ",
                          base: "border border-2-#232550",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-row justify-between p-0 gap-3 ">
                <Button
                  variant="bordered"
                  className="border border-[#5151A6] rounded-lg text-[#5151A6]"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    onClose();
                    inviteQestionMember();
                  }}
                  className="bg-[#5151A6] text-white font-[DM Sans] text-base rounded-lg"
                >
                  Assign
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
