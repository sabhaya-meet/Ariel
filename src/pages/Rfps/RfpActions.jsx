import { Tooltip, useDisclosure } from "@nextui-org/react";
import React from "react";
import editIcon from "../../assets/editIcon.svg";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

export default function RfpActions({
  id,
  setCurrentId,
  onOpen,
  editOnOpen,
  user,
}) {
  const navigate = useNavigate();

  const navigateSession = (id, title) => {
    navigate(`/session/${id}?title=${title}`);
  };

  return (
    <>
      <div className="flex flex-row justify-end gap-5">
        <Tooltip
          content="view RFP"
          color="success"
          // classNames={{ base: "bg-[#2e8b57] rounded text-white" }}
          classNames={{
            base: [
              // arrow color
              "before:bg-[#2e8b57] dark:before:bg-[#2e8b57]",
            ],
            content: [
              " shadow-xl bg-[#2e8b57] font-[Raleway] rounded-lg text-white text-xs font-bold",
            ],
          }}
          showArrow={true}
        >
          <span className="text-lg text-gray-400 cursor-pointer hover:opacity-75">
            <FaEye
              onClick={() => {
                navigateSession(user?.id, user?.title);
              }}
            />
          </span>
        </Tooltip>
        <Tooltip
          content="Edit user"
          color="success"
          // classNames={{ base: "bg-[#00BFFB] rounded text-white" }}
          // showArrow={true}
          classNames={{
            base: [
              // arrow color
              "before:bg-[#6293b4] dark:before:bg-[#6293b4]",
            ],
            content: [
              " shadow-xl bg-[#6293b4] font-[Raleway] rounded-lg text-white text-xs font-bold",
            ],
          }}
          showArrow={true}
        >
          <span className="text-lg text-gray-400 cursor-pointer w-4 hover:opacity-75">
            <img
              src={editIcon}
              onClick={() => {
                editOnOpen();
                setCurrentId(id);
              }}
              alt="edit"
            />
          </span>
        </Tooltip>
        <Tooltip
          content="Delete RFP"
          color="success"
          // classNames={{ base: "bg-red-600 rounded text-white" }}

          classNames={{
            base: [
              // arrow color
              "before:bg-[#cf3414] dark:before:bg-[#cf3414]",
            ],
            content: [
              " shadow-xl bg-[#cf3414] font-[Raleway] rounded-lg text-white text-xs font-bold",
            ],
          }}
          showArrow={true}
        >
          <span className="text-lg text-gray-400 cursor-pointer hover:opacity-75">
            <RiDeleteBin6Line
              onClick={() => {
                onOpen();
                setCurrentId(id);
              }}
            />
          </span>
        </Tooltip>
      </div>
    </>
  );
}
