import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@nextui-org/react";
import TeamCell from "./TeamCell";
import axios from "axios";
import { deleteTeamMember } from "./TeamTableApi";
import { toast } from "react-toastify";

const columns = [
  {
    key: "team",
    label: "Team",
  },
  {
    key: "leader",
    label: "Leader",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "create_date",
    label: "Create date",
  },
  {
    key: "action",
    label: "Action",
  },
];

export function teamMembersApi(setTeamMembers, page, size, setPages) {
  const token = localStorage.getItem("token");
  if (token) {
    axios
      .get(
        `https://api.trymarvin.com/api/v1/teams/?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTeamMembers(response.data.items);
        setPages(response.data.pages);
      });
  }
}

export default function TeamTable({
  teamMembers,
  setTeamMembers,
  page,
  size,
  setPages,
}) {
  useEffect(() => {
    teamMembersApi(setTeamMembers, page, size, setPages);
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteTeamMember(id);
      const updatedTeamMembers = teamMembers.filter(
        (member) => member.id !== id
      );
      setTeamMembers(updatedTeamMembers);
      teamMembersApi(setTeamMembers, page, size, setPages);
      toast.success("team member deleted susccessfully");
    } catch (error) {
      console.error("Failed to delete the team member:", error);
    }
  };

  return (
    <div className="">
      <Table
        aria-label="Controlled table example with dynamic content"
        classNames={{ th: "bg-[#F2F3F4] text-sm min-w-full" }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          // className="overflow-x-auto min-w-[1200px]"
          items={teamMembers}
        >
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  <TeamCell
                    item={item}
                    columnKey={columnKey}
                    onDelete={handleDelete}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
