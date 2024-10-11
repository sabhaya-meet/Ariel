import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  user,
} from "@nextui-org/react";

import { columns, getsessionsApi, users } from "./Data.js";
import { useDispatch, useSelector } from "react-redux";
import { userSession } from "../../store/sessionReducer.jsx";
import { formatDate } from "../../utils/helper.js";
import RfpActions from "./RfpActions.jsx";
import RfpTablePagination from "./RfpTablePagination.jsx";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const statusColorMap = {
  active: "bg-green-500 text-white",
  paused: "bg-red-500 text-white",
  vacation: "bg-yellow-500 text-white",
  pending: "bg-[#FDF1EC] text-xs font-[DM Sans] text-[#F17A0C]",
  completed: "bg-[#3440541A] font-[DM Sans] text-xs",
};

export default function RfpsTable({
  onOpen,
  setCurrentId,
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
  const sessionListItems =
    useSelector((state) => state?.session?.sessionList) || [];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateSession = (id, title) => {
    navigate(`/session/${id}?title=${title}`);
  };

  useEffect(() => {
    getsessionsApi(page, size)?.then((res) => {
      dispatch(userSession?.setSessionList(res?.data?.items));
      setPages(res?.data?.pages);
    });
  }, [dispatch, page]);

  const renderCell = React.useCallback((user, columnKey) => {
    const userSessionData = user[columnKey];

    const userDetails = () => {
      UserDetailOnOpen();
      setCurrentUser(user);
    };

    switch (columnKey) {
      case "title":
        return (
          <p
            onClick={() => {
              navigateSession(user?.id, user?.title);
            }}
            className="text-gray-800 font-bold cursor-pointer"
          >
            {userSessionData}
          </p>
        );
      case "start_ts":
      case "startdate":
        return <p className="text-gray-800">{formatDate(userSessionData)}</p>;
      case "leadWriter":
        return (
          <User
            className="cursor-pointer"
            onClick={() => userDetails()}
            avatarProps={{
              radius: "100%",
              src: user.user.image
                ? "https://api.trymarvin.com/" + user.user.image
                : null,
            }}
            description={user.user.email}
            name={`${user.user.first_name} ${user.user.last_name}`}
            classNames={{ name: "font-medium" }}
          >
            {user.email}
          </User>
        );
      case "pending":
        return <p className="text-gray-800">{userSessionData}</p>;
      case "inprogress":
        return <p className="text-gray-800">{userSessionData}</p>;
      case "completed":
        return <p className="text-gray-800">{userSessionData}</p>;
      case "status":
        return (
          <Chip
            startContent={<GoDotFill />}
            className={`capitalize ${
              statusColorMap[user.status]
            } px-2 py-1 rounded-full`}
            size="sm"
            variant="flat"
          >
            {userSessionData}
          </Chip>
        );
      case "actions":
        return (
          <RfpActions
            id={user?.id}
            setCurrentId={setCurrentId}
            onOpen={onOpen}
            editOnOpen={editOnOpen}
            user={user}
          />
        );
      default:
        return userSessionData;
    }
  }, []);

  return (
    <>
      <Table
        isCompact
        removeWrapper
        classNames={{ th: "text-[12px]" }}
        aria-label="Example table with custom cells"
        // className="w-full"
      >
        <TableHeader columns={columns}>
          {(column) => {
            return (
              <TableColumn
                key={column.uid}
                className={`p-2 border-b-2 border-gray-200 ${
                  column.uid === "actions" ? "text-center" : "text-left"
                } bg-gray-100 text-gray-700 font-semibold`}
              >
                {column.name}
              </TableColumn>
            );
          }}
        </TableHeader>

        <TableBody items={sessionListItems}>
          {(item) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              {(columnKey) => (
                <TableCell className="p-2 border-b border-gray-200">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <RfpTablePagination page={page} pages={pages} setPage={setPage} />
    </>
  );
}
