import React, { useEffect, useState } from "react";
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
  Chip,
} from "@nextui-org/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoPersonAddOutline } from "react-icons/io5";
import {
  deleteSessionParticipant,
  getsessionById,
  inviteSessionParticipant,
} from "./Data";
import { toast } from "react-toastify";
import AddNewQuestion from "./AddNewQuestion";
import { useParams } from "react-router-dom";

export default function ShareSession({
  isOpen,
  onOpen,
  onOpenChange,

  id,
  participantMember,
  setParticipantMember,
}) {
  const [teamMember, setTeamMember] = useState([]);

  const participantsIds = participantMember?.map((p) =>
    String(p?.participant?.id)
  );
  const [selectedTeamMember, setSelectedTeamMember] = useState(
    participantsIds || []
  );
  const [tempSelectedTeamMember, setTempSelectedTeamMember] = useState([]);

  const [sharedMemberId, setSharedMemberId] = useState();

  const isMobile = useMediaQuery({
    query: "(max-width: 992px)",
  });

  const userProfile = useSelector((state) => state.user?.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`https://api.trymarvin.com/api/v1/teams/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTeamMember(response?.data?.items);
        });
    }
  }, []);

  const inviteMember = async () => {
    // Extract the array of selected member IDs
    const userIdArray = Array.from(sharedMemberId || []).map((id) =>
      parseInt(id)
    );

    const payLoadData = {
      user_ids: userIdArray, // This will now contain multiple user IDs
    };

    // Check if at least one user is selected
    if (userIdArray.length === 0) {
      toast.error("Please select a user to invite.");
      return;
    }

    try {
      await inviteSessionParticipant(payLoadData, id).then((res) => {
        getsessionById(id); // Update the session details
        toast.success("Participants invited successfully");
      });

      // Update the selected team members to include the newly invited ones
      setSelectedTeamMember((prev) => [...prev, ...userIdArray]);

      // Clear the selection after invitation
      setSharedMemberId(null);
    } catch (error) {
      console.error("Failed to invite participant:", error);
      toast.error("Failed to invite participant.");
    }
  };

  const availableTeamMembers = teamMember.filter(
    (member) =>
      !selectedTeamMember.includes(member.teammate_id.toString()) &&
      !participantMember.some(
        (participant) => participant.participant.id === member.teammate_id
      )
  );

  const handleRemoveParticipant = async (participantId) => {
    try {
      await deleteSessionParticipant(id, participantId);

      setSelectedTeamMember((prev) =>
        prev.filter((memberId) => memberId !== participantId.toString())
      );
      setParticipantMember((prev) =>
        prev.filter(
          (participant) => participant.participant.id !== participantId
        )
      );
      toast.success("Participant removed successfully");
    } catch (error) {
      toast.error("Session Participant Not Found:");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "flex flex-col relative z-50 w-full box-border outline-none sm:mx-6 sm:my-16 shadow-small max-h-[calc(100%_-_7.5rem)] bg-white max-w-[90vh] rounded-xl p-6 m-0 lg:w-[400px]",
        }}
        onOpen={onOpen}
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
                    className="w-7  h-7 text-[#9b9ba7]"
                  />
                </div>
              </ModalHeader>
              <ModalBody className="p-0 overflow-y-auto">
                <div className="flex-1 p-0 flex flex-col gap-5 ">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-medium font-dmSans text-portGore leading-[22px]">
                      Share with your team
                    </p>
                    <p className="text-sm font-dmSans text-portGore">
                      The following users have access to this document
                    </p>
                  </div>

                  {participantMember.map((participant) => {
                    return (
                      <div
                        key={participant.participant.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            className="flex-shrink-0 rounded-full bg-[#d6d6db]"
                            size="sm"
                            src={participant?.participant?.image}
                          />
                          <div>
                            <p className="text-sm font-normal font-dmSans text-portGore whitespace-nowrap max-w-[221px] overflow-hidden text-ellipsis">
                              {participant?.participant?.email}
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={() =>
                            handleRemoveParticipant(participant.participant.id)
                          }
                          className="text-sm font-medium cursor-pointer font-dmSans text-[#D24627]"
                        >
                          Remove
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={"https://api.trymarvin.com/" + userProfile.image}
                        className=" text-large  rounded-full"
                      />
                      <div className="text-sm font-medium font-dmSans text-portGore">
                        <p>{`${userProfile.first_name} ${userProfile.last_name} (you)`}</p>
                        <p className="text-sm font-normal font-dmSans text-portGore whitespace-nowrap max-w-[221px] overflow-hidden text-ellipsis">
                          {userProfile.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium cursor-pointer font-dmSans text-[#98A2B3]">
                      Owner
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 h-full">
                    <p className="text-sm font-medium font-dmSans text-portGore">
                      Team member
                    </p>
                    <Select
                      items={availableTeamMembers}
                      startContent={<IoPersonAddOutline />}
                      onSelectionChange={(e) => setSharedMemberId(e)}
                      selectedKeys={sharedMemberId}
                      variant="bordered"
                      isMultiline={true}
                      selectionMode="multiple"
                      placeholder="Select a user"
                      labelPlacement="outside"
                      className="justify-center w-full items-center bg-[#f1f1f8] rounded-lg "
                      classNames={{
                        listbox: "bg-[#FFF] border-[2px] p-0 rounded-lg",
                        trigger: "min-h-12 py-2",
                        base: "w-full",
                      }}
                      renderValue={(items) => {
                        return (
                          <div className="flex flex-wrap gap-2 ">
                            {items.map((item) => {
                              return (
                                <Chip key={item.key} className="bg-[#D4D4D8] ">
                                  {item.data.teammate.email}
                                </Chip>
                              );
                            })}
                          </div>
                        );
                      }}
                    >
                      {(user) => (
                        <SelectItem
                          key={user.teammate_id}
                          classNames={{
                            base: "hover:bg-[#dbdbe5] rounded-lg",
                          }}
                        >
                          <div className="flex gap-2  items-center ">
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
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-row justify-between p-0 gap-3 mt-[17px]">
                <Button
                  variant="bordered"
                  className="border border-[#5151A6] rounded-lg text-[#5151A6]"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    inviteMember();
                    onClose();
                  }}
                  className="bg-[#5151A6] text-white rounded-lg"
                >
                  Invite
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
