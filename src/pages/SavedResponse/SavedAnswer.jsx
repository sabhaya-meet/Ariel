import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import QuestionOverview from "./QuestionOverview";

import { RiDeleteBin6Line } from "react-icons/ri";
import SavedQuestionDelete from "./SavedQuestionDelete";
import { QuestionLikedPatchApi } from "../Rfps/Data";
import { likedSessionAIAnswerGetApi } from "./savedAPIData";

export default function SavedAnswer({
  questionData,
  likedQuestionData,
  setLikedQuestionData,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: DeleteIsOpen,
    onOpen: DeleteOnOpen,
    onClose: DeleteOnClose,
    onOpenChange: DeleteOnOpenChange,
  } = useDisclosure();
  const userProfile = useSelector((state) => state.user?.user);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteQuetion = async () => {
    const payLoadData = { is_like: false };

    try {
      await QuestionLikedPatchApi(questionData?.id, payLoadData).then((res) => {
        likedSessionAIAnswerGetApi().then((res) => {
          setLikedQuestionData(res?.data);
        });
      });
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };
  return (
    <>
      <div onClick={() => onOpen()}>
        <div className="relative flex flex-col gap-4 p-6 mb-4 bg-white rounded-lg break-inside-avoid-column ">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-1">
              <span className="text-[#2C2E61] text-lg font-semibold font-[Neutrafacetext-Bold] leading-6 w-[calc(100%-28px)]">
                {questionData?.question?.question}
              </span>
              <div className="w-5 h-5 cursor-pointer">
                {/* <BsThreeDotsVertical size={20} className="cursor-pointer" /> */}
                <div className="relative">
                  <BsThreeDotsVertical
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown();
                    }}
                    className="cursor-pointer"
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg">
                      <div
                        onClick={(e) => {
                          DeleteOnOpen();
                          toggleDropdown();
                          e.stopPropagation();
                        }}
                        className="flex items-center gap-2 p-[12px] shadow-medium ml-[9px]cursor-pointer hover:bg-gray-200 rounded-lg"
                      >
                        <RiDeleteBin6Line size={20} />
                        <span className="font-[Raleway] text-base font-medium leading-6 text-[#2C2E61]">
                          Delete
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="whitespace-pre-wrap font-[Raleway] text-sm font-normal leading-6 text-[#232550] max-h-96 overflow-y-auto">
              {questionData?.answer}
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-left border rounded-md border-slateBlueColor font-[Raleway] text-eastBay w-fit">
                <div className="flex justify-center items-center rounded-full">
                  <img
                    className="w-4 h-4 rounded-full"
                    src={"https://api.trymarvin.com/" + userProfile.image}
                  />
                </div>
                <span>{`${userProfile.first_name} ${userProfile.last_name}`}</span>
              </div>
              {questionData?.tags?.map((el) => (
                <Button
                  size="sm"
                  className="px-2 py-1 text-xs font-semibold text-left border rounded-md border-slateBlueColor font-[Raleway] text-eastBay w-fit"
                >
                  {el}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <QuestionOverview
        saveTagBtn={() =>
          likedSessionAIAnswerGetApi().then((response) => {
            setLikedQuestionData(response?.data);
          })
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        likedQuestionData={likedQuestionData}
        questionData={questionData}
        setLikedQuestionData={setLikedQuestionData}
        questionInput={questionData?.question?.question}
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
      />

      <SavedQuestionDelete
        DeleteIsOpen={DeleteIsOpen}
        DeleteOnOpenChange={DeleteOnOpenChange}
        DeleteOnOpen={DeleteOnOpen}
        handleDeleteQuetion={handleDeleteQuetion}
      />
    </>
  );
}
