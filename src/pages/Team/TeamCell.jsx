import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  TableCell,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import UserDetail from "./UserDetail";
import DeleteModal from "./Deletemodal";
import { formatDate } from "../../utils/helper";

export default function TeamCell({ columnKey, item, onDelete }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderCell = useCallback((user, columnKey) => {
    switch (columnKey) {
      case "team":
        return <UserDetail user={user} />;
      case "leader":
        return <p>{user.leader.email}</p>;
      case "name":
        return <p>{user.teammate.first_name}-</p>;
      case "create_date":
        return <p>{formatDate(user.teammate.creation_date)}</p>;
      case "action":
        return (
          <Tooltip
            content="Delete Team Member"
            color="success"
            classNames={{ base: "bg-red-600 rounded text-white" }}
            showArrow={true}
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className="ml-2 text-slate-400 cursor-pointer"
              size="lg"
              // onClick={() => onDelete(user.id)}
              onClick={onOpen}
            />
          </Tooltip>
        );

      default:
        return <p>default</p>;
    }
  }, []);
  return (
    <>
      {renderCell(item, columnKey)}
      <DeleteModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onDelete={onDelete}
        user={item}
      />
    </>
  );
}
