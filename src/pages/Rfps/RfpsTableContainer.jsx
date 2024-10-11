import React from "react";
import RfpsTable from "./RfpsTable";

export default function RfpsTableContainer({
  setCurrentId,
  isOpen,
  onOpen,
  setPages,
  page,
  pages,
  setPage,
  size,
  editOnOpen,
  UserDetailOnOpen,
  setCurrentUser,
  currentUser,
}) {
  return (
    <div className="flex w-full flex-col items-start rounded-2xl border border-[#D0D5DD] bg-white">
      <div className="flex items-center gap-[8px] pt-[20px] pl-[24px] pr-[24px] pb-[19px]">
        <p className="text-[#0F172A]">RFP</p>
      </div>
      <div className="overflow-x-auto w-full">
        <RfpsTable
          setCurrentId={setCurrentId}
          isOpen={isOpen}
          onOpen={onOpen}
          setPages={setPages}
          page={page}
          pages={pages}
          setPage={setPage}
          size={size}
          editOnOpen={editOnOpen}
          UserDetailOnOpen={UserDetailOnOpen}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
