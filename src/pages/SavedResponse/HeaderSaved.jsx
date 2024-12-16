import {
  Button,
  Dropdown,
  DropdownMenu,
  Input,
  DropdownTrigger,
  DropdownItem,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerIcon from "../../assets/DatePickerIcon.svg";
import FilterIcon from "../../assets/Filter.svg";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format } from "date-fns"; // import format from date-fns
import { DateRange } from "react-date-range";
import { Select, SelectItem } from "@nextui-org/react";
import { renderFormatDate } from "../../utils/helper";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { likedSessionAIAnswerGetApi, teamMembersGetApi } from "./savedAPIData";
import TagsIcon from "../../assets/tagsIcon.svg";
import DocumentIcon from "../../assets/DocumentIcon";
import { PiCoinsBold } from "react-icons/pi";

// export const tagList = [
//   {
//     key: "process-client-project-delivery",
//     label: "Process-Client-Project-Delivery",
//   },
//   {
//     key: "company-capabilities-clients-reach",
//     label: "Company-Capabilities-Clients-Reach",
//   },
//   { key: "offerings-coaching", label: "Offerings-Coaching" },
//   { key: "affiliates-coaches", label: "Affiliates-Coaches" },
//   { key: "delivery-models", label: "Delivery-Models" },
// ];

export const contractTypeList = [
  {
    key: "coaching",
    label: "Coaching",
  },
  {
    key: "training",
    label: "Training",
  },
  {
    key: "coaching & training",
    label: "Coaching & Training",
  },
  {
    key: "security questionnaire",
    label: "Security Questionnaire",
  },
];

export default function HeaderSaved({
  peopleSelectedKeys,
  setPeopleSelectedKeys,
  tagSelectedKeys,
  setTagSelectedKeys,
  setLikedQuestionData,
  // StaticStartdate,
  // Staticenddate,
  allFilterData,
  contractTypeListData,
  setContractTypeListData,
  totalTags,
  searchQuery,
  // setSearchQuery,
  handleSearchInputChange,
  setPeopleName,
  dateSet,
  setDateSet,
  isLoading,
}) {
  const [teamMemberData, setTeamMember] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [state, setState] = useState([dateSet]);

  const tagList = totalTags.map((item) => ({
    key: item.toLowerCase(),
    label: item,
  }));

  useEffect(() => {
    teamMembersGetApi(setTeamMember);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap md:flex-nowrap gap-4 w-full py-3  scroll-py-3 scroll-px-4 justify-between items-start rounded-xl">
        <Input
          value={searchQuery}
          onChange={handleSearchInputChange}
          type="text"
          placeholder="Search thorough saved responses"
          labelPlacement="outside"
          endContent={
            <IoSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          classNames={{
            inputWrapper: "h-[49px]",
            mainWrapper: "h-15",
            base: "rounded-lg border border-[#D0D5DD] bg-[#F4F4F5]",
          }}
        />
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <div className="flex min-w-[15rem] h-[49px] items-center gap-[8px] self-stretch rounded-lg border py-2.5 px-4 border-[#D0D5DD] bg-white">
            <Dropdown isOpen={isOpen}>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="text-[14px] font-bold font-[Raleway]"
                  startContent={<img src={DatePickerIcon} />}
                  onClick={() => setIsOpen(true)}
                  onClose={() => setIsOpen(false)}
                >
                  {renderFormatDate(state?.[0]?.startDate, state?.[0]?.endDate)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="bg-white rounded-lg"
                aria-label="Static Actions"
              >
                <DropdownItem isReadOnly={true} textValue="date-picker">
                  <DateRange
                    onChange={(item) => {
                      console.log(item?.selection);
                      setDateSet(item?.selection);
                      setState([item?.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    showSelectionPreview={true}
                    color="#1C7794"
                  />
                  <div className="flex gap-2 justify-end py-5">
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="border-2  border-[#9a999e] rounded-lg"
                    >
                      cancle
                    </Button>
                    <Button
                      onClick={() => {
                        // selectedDateData();

                        // const startDate = format(
                        //   state?.[0]?.startDate || StaticStartdate,
                        //   "yyyy-MM-dd 00:00:00"
                        // );

                        // const endDate = format(
                        //   state?.[0]?.endDate || Staticenddate,
                        //   "yyyy-MM-dd 23:59:59"
                        // );
                        allFilterData({
                          startDate: dateSet?.startDate,
                          endDate: dateSet?.endDate,
                        });
                        setIsOpen(false);
                      }}
                      className="bg-[#5151A6] text-white rounded-lg"
                    >
                      Done
                    </Button>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <Dropdown
            shouldCloseOnBlur={true}
            className="filter-dropdown"
            classNames={{
              dropDown: "p-0",
              base: "p-0",
              content: "p-0",
            }}
          >
            <DropdownTrigger>
              <Button
                className="bg-white z-0 rounded-lg border-[1px] border-brandLight shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] px-[0.88rem] py-[0.62rem] text-sm font-medium font-raleway text-brandLight h-12"
                variant="bordered"
                // onClick={() => setShow(true)}
                startContent={
                  <img src={FilterIcon} className="mr-1" alt="calender icon" />
                }
              >
                Filters
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="w-[240px]"
              aria-label="main-filter"
              variant="flat"
              onClose={() => !show}
              disallowEmptySelection
              selectionMode="multiple"
              itemClasses={{
                base: [
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-transparent",
                  "dark:data-[hover=true]:bg-transparent",
                  "data-[selectable=true]:focus:bg-transparent",
                  "data-[pressed=true]:opacity-70",
                  "p-0",
                ],
                content: "p-0",
              }}
            >
              <DropdownItem
                isReadOnly
                selectedIcon
                textValue="date-picker"
                aria-label="date-picker peopleFilterList"
                className="w-[240px] p-0"
                classNames={{
                  base: "p-0",
                  content: "p-0",
                }}
              >
                <div className="flex flex-col bg-white rounded-lg">
                  <p className="px-4 py-3 text-sm font-semibold text-oxfordBlue font-raleway">
                    Filter by:
                  </p>
                  <hr className="w-full border-t-2 border-[#F2F4F7]" />
                  <Dropdown
                    classNames={{
                      base: "p-0",
                      content: "p-0",
                    }}
                  >
                    <DropdownTrigger>
                      <div className="flex justify-between items-center w-full px-4 py-[0.62rem]">
                        <div className="flex gap-3">
                          <IoPersonAddOutline
                            size={20}
                            alt="people icon"
                            className="flex items-center"
                          />
                          <p className="text-sm font-medium text-[#344054] font-[Raleway]">
                            Select Team Member
                          </p>
                        </div>
                        <FaAngleDown size={15} color="#344054" />
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu
                      closeOnSelect={false}
                      aria-label="people"
                      variant="flat"
                      selectionMode="multiple"
                      className="bg-white border-[1px]  border-[#EAECF0] rounded-lg max-h-[17.75rem] overflow-auto min-w-[16.5rem] flex flex-col gap-3"
                      selectedKeys={peopleSelectedKeys}
                      onSelectionChange={(teamData) => {
                        setPeopleSelectedKeys([...teamData]);
                      }}
                    >
                      {teamMemberData?.map((el, i) => {
                        return (
                          <DropdownItem
                            className="text-[#101828] hover:bg-[#e2dee6] rounded-lg"
                            key={el?.teammate_id}
                            onClick={() => {
                              setPeopleName((prev) => {
                                if (prev.includes(el?.teammate?.email)) {
                                  return prev.filter(
                                    (user) => user?.id !== el?.teammate_id
                                  );
                                } else {
                                  return [
                                    ...prev,
                                    {
                                      email: el?.teammate?.email,
                                      id: el?.teammate_id,
                                    },
                                  ];
                                }
                              });
                              allFilterData({
                                teammate_id: peopleSelectedKeys,
                              });
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Avatar
                                // src={generateImageUrl(el?.teammate?.image)}
                                className="w-6 h-6"
                              />
                              <p className="text-sm text-[#101828] font-dmSans max-w-[175px] overflow-hidden text-ellipsis">
                                {el?.teammate?.email}
                              </p>
                            </div>
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown
                    className="w-[240px]"
                    classNames={{
                      base: "p-0",
                      content: "p-0",
                    }}
                  >
                    <DropdownTrigger>
                      <div className="flex justify-between items-center w-full px-4 py-2.5">
                        <div className="flex gap-3">
                          <img src={TagsIcon} alt="tag icon" />
                          <p className="text-sm font-medium  text-[#344054] font-[Relaway]">
                            Tags
                          </p>
                        </div>
                        <FaAngleDown size={15} color="#344054" />
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu
                      closeOnSelect={false}
                      aria-label="tags"
                      variant="flat"
                      selectionMode="multiple"
                      className="bg-white border-[1px] border-[#EAECF0] rounded-lg max-h-[17.75rem] overflow-auto max-w-[15rem] flex flex-col gap-5"
                      selectedKeys={tagSelectedKeys}
                      onSelectionChange={(tagData) =>
                        setTagSelectedKeys([...tagData])
                      }
                      classNames={{
                        base: "p-0",
                        content: "p-0",
                      }}
                    >
                      <DropdownItem
                        showDivider={false}
                        isReadOnly
                        className={`rounded-[1.25rem] px-4 py-3 w-full`}
                        textValue="tags"
                      >
                        <span className="text-sm font-semibold text-oxfordBlue ">
                          Select tags to filter by
                        </span>
                      </DropdownItem>
                      <DropdownItem
                        hideSelectedIcon
                        isReadOnly
                        className="w-full p-0 "
                        textValue="divider"
                      >
                        <hr className="border-gray300" />
                      </DropdownItem>
                      {tagList?.map((el) => {
                        return (
                          <DropdownItem
                            className={`text-sm text-[#101828] font-raleway my-0 w-full max-w-[12rem] mx-3 hover:bg-[#efefec] rounded-lg`}
                            key={el?.key}
                            textValue={el?.label}
                            onClick={() =>
                              allFilterData({
                                tags: tagSelectedKeys,
                              })
                            }
                          >
                            <Tooltip
                              content={el?.label}
                              placement="top"
                              bgClass="bg-slateBlueColor"
                              classNames={{
                                base: [
                                  // arrow color
                                  "before:bg-[#5151A6] dark:before:bg-[#5151A6]",
                                ],
                                content: [
                                  " shadow-xl bg-[#5151A6] rounded text-white text-xs font-bold",
                                ],
                              }}
                              showArrow={true}
                            >
                              <div
                                className={`overflow-hidden w-fit max-w-full px-2 py-1 bg-[#C0F0EE] rounded-[1.25rem] text-ellipsis`}
                              >
                                {el?.label}
                              </div>
                            </Tooltip>
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown
                    className="w-[240px]"
                    classNames={{
                      base: "p-0",
                      content: "p-0",
                    }}
                  >
                    <DropdownTrigger>
                      <div className="flex justify-between items-center w-full px-4 py-2.5">
                        <div className="flex gap-3">
                          {/* <img src={TagIcon} alt="tag icon" /> */}
                          <DocumentIcon
                            width="16"
                            height="20"
                            stroke="#344054"
                          />
                          <p className="text-sm font-medium text-[#344054] font-[Relaway]">
                            Contract Type
                          </p>
                        </div>
                        <FaAngleDown size={15} color="#344054" />
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu
                      closeOnSelect={false}
                      aria-label="tags"
                      variant="flat"
                      selectionMode="multiple"
                      className="bg-white border-[1px] border-[#EAECF0] rounded-lg max-h-[17.75rem] overflow-auto max-w-[15rem] flex flex-col gap-5"
                      selectedKeys={contractTypeListData}
                      onSelectionChange={(contractData) =>
                        setContractTypeListData([...contractData])
                      }
                      classNames={{
                        base: "p-0",
                        content: "p-0",
                      }}
                    >
                      <DropdownItem
                        showDivider={false}
                        isReadOnly
                        className={`rounded-[1.25rem] px-4 py-3 w-full`}
                        textValue="tags"
                      >
                        <span className="text-sm font-semibold text-oxfordBlue">
                          Select contact type
                        </span>
                      </DropdownItem>
                      <DropdownItem
                        hideSelectedIcon
                        isReadOnly
                        className="w-full p-0 "
                        textValue="divider"
                      >
                        <hr className="border-gray300" />
                      </DropdownItem>
                      {contractTypeList?.map((el) => {
                        return (
                          <DropdownItem
                            className={`text-sm text-[#101828] font-raleway my-0 w-full max-w-[12rem] mx-3 hover:bg-[#efefec] rounded-lg`}
                            key={el?.key}
                            textValue={el?.label}
                            onClick={() =>
                              allFilterData({
                                contractTypeListData,
                              })
                            }
                          >
                            <Tooltip
                              content={el?.label}
                              placement="top"
                              bgClass="bg-slateBlueColor"
                              classNames={{
                                base: [
                                  // arrow color
                                  "before:bg-[#5151A6] dark:before:bg-[#5151A6]",
                                ],
                                content: [
                                  " shadow-xl bg-[#5151A6] rounded text-white text-xs font-bold",
                                ],
                              }}
                              showArrow={true}
                            >
                              <div
                                className={`overflow-hidden w-fit max-w-full px-2 py-1 bg-[#C0F0EE] rounded-[1.25rem] text-ellipsis`}
                              >
                                {el?.label}
                              </div>
                            </Tooltip>
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
