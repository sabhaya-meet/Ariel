import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import PlusIcon from "../../assets/plusIcon.svg";
import TeamTable from "./TeamTable";
import AddTeamMember from "./AddTeamMember";
import UserDetail from "./UserDetail";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Button,
  useDisclosure,
} from "@nextui-org/react";
import TablePaginations from "./Paginations";

export default function TeamMain() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [teamMembers, setTeamMembers] = useState([]);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [pages, setPages] = useState(1);

  return (
    <div className="px-[16px] overflow  ">
      <div className="flex flex-wrap justify-between mx-2 my-5">
        <div>
          <p className="mt-2 text-4xl font-bold text-white font-neutrafaceBold">
            My Team
          </p>

          <p className="text-base text-white font-[Releway]">View your team</p>
        </div>
        <Button
          className="text-white font-[Raleway] text-base font-bold bg-[#2c2e61] rounded-lg"
          startContent={
            <img className="w-[11.667px] h-[11.667px]" src={PlusIcon} />
          }
          onPress={onOpen}
        >
          Add Member
        </Button>
      </div>
      <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 shadow-md w-full lg-:ml-3 rounded-2xl">
        <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-white text-gray-700">
          <div className="flex px-4 py-0 text-lg text-slate-900 ">
            <p>Team Member</p>
          </div>
        </div>
        <div className="px-0 pb-2 overflow-x-auto ">
          <div className="flex flex-col gap-3 min-w-max">
            <div className="flex flex-col relative gap-4 w-full">
              <TeamTable
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers}
                page={page}
                size={size}
                setPages={setPages}
                // detailOnOpen={detailOnOpen}
              />
            </div>
            <hr />
            <TablePaginations
              setPage={setPage}
              pages={pages}
              page={page}
              setPages={setPages}
            />
          </div>
        </div>
      </div>
      <AddTeamMember
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
