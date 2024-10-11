import React, { useState } from "react";
import RfpFilter from "./RfpFilter";
import { Button, useDisclosure } from "@nextui-org/react";
import plusIcon from "../../assets/plusIcon.svg";
import RfpsTableContainer from "./RfpsTableContainer";
import RfpCreate from "./RfpCreate";
import DeleteSession from "./DeleteSession";
import UpdateRfpModel from "./UpdateRfpModel";
import RfpUserDetail from "./RfpUserDetail";

export default function RfpMain() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [currentId, setCurrentId] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [currentUser, setCurrentUser] = useState();

  const [pages, setPages] = useState(1);
  const {
    isOpen: deleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: EditIsOpen,
    onOpen: EditOnOpen,
    onClose: EditOnClose,
    onOpenChange: EditOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: UserDetailIsOpen,
    onOpen: UserDetailOnOpen,
    onClose: UserDetailOnClose,
    onOpenChange: UserDetailOnOpenChange,
  } = useDisclosure();

  return (
    <div className="w-full px-12 py-16 flex flex-col gap-8">
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-white font-[Neutrafacetext-Bold] text-[36px] font-bold leading-9">
            My docs
          </h1>
          <h1 className="text-white font-[Raleway] text-[16px] font-normal">
            View your team’s RFP’s
          </h1>
        </div>
        <Button
          className="text-white font-[Raleway] text-base font-bold rounded-lg bg-[#2C2E61] p-4"
          startContent={
            <img className="w-[11.667px] h-[11.667px]" src={plusIcon} />
          }
          onPress={onOpen}
        >
          New RFP
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <RfpFilter />
        <RfpsTableContainer
          setCurrentId={setCurrentId}
          isOpen={deleteModalOpen}
          onOpen={onDeleteModalOpen}
          setPages={setPages}
          page={page}
          pages={pages}
          size={size}
          setPage={setPage}
          editOnOpen={EditOnOpen}
          UserDetailOnOpen={UserDetailOnOpen}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
      </div>
      <RfpCreate
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        setPages={setPages}
        size={size}
        page={page}
      />
      <DeleteSession
        isOpen={deleteModalOpen}
        onClose={onDeleteModalClose}
        onOpenChange={onDeleteModalOpenChange}
        onOpen={onDeleteModalOpen}
        currentId={currentId}
        setPages={setPages}
        size={size}
        page={page}
      />
      <RfpUserDetail
        UserDetailIsOpen={UserDetailIsOpen}
        UserDetailOnOpenChange={UserDetailOnOpenChange}
        UserDetailOnClose={UserDetailOnClose}
        currentUser={currentUser}
      />
      <UpdateRfpModel
        isOpen={EditIsOpen}
        onClose={EditOnClose}
        onOpen={EditOnOpen}
        onOpenChange={EditOnOpenChange}
        currentId={currentId}
        size={size}
        page={page}
      />
    </div>
  );
}
