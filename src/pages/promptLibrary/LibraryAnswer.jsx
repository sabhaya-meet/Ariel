import { Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { libraryLikeQuestion, responseGetApi } from "./promptApiData";
import { TiTick } from "react-icons/ti";

export default function LibraryAnswer({
  data,
  index,
  itemDataId,
  setLibraryQuestionAnswer,
}) {
  const [isLiked, setIsLiked] = useState(data.bookmark);
  const [copySuccess, setCopySuccess] = useState(false);
  const [iconToggle, setIconToggle] = useState(false);

  let questionAnswerId = data?.id;

  useEffect(() => {
    setIsLiked(data.bookmark);
  }, [data.bookmark]);
  const handleLikeClick = async () => {
    // Toggle the like state
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    // Prepare the payload and call the API
    const likedQuestionPayload = { bookmark: newIsLiked };
    try {
      await likedQuestion(likedQuestionPayload);
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  const likedQuestion = async (likedQuestionPayload) => {
    try {
      await libraryLikeQuestion(
        itemDataId,
        questionAnswerId,
        likedQuestionPayload
      ).then((res) => {
        responseGetApi(itemDataId).then((res) =>
          setLibraryQuestionAnswer(res?.data)
        );
      });
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  const handleCopyClick = () => {
    setIconToggle(true);
    if (data?.answer) {
      navigator.clipboard
        .writeText(data.answer)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false), setIconToggle(false);
          }, 500);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-white font-semibold leading-6 font-[Neutrafacetext-SemiBold]">
          {`Output ${index + 1}`}
        </p>
        <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl">
          <div className="max-h-[195px] overflow-y-auto w-full break-words whitespace-pre-wrap">
            <div className="h-full overflow-auto font-[Raleway] text-sm  text-[#232550]">
              <p>{data?.answer}</p>
            </div>
          </div>
          <div className="flex justify-end gap-1">
            <div className="flex items-center justify-center rounded-lg cursor-pointer w-9 h-9 bg-[#f1f1f8]">
              <div className="relative">
                <Tooltip
                  content="Copy answer"
                  color="success"
                  showArrow={true}
                  placement="top"
                  classNames={{
                    base: ["before:bg-[#5151A6] dark:before:bg-[#5151A6]"],
                    content: [
                      " shadow-xl bg-[#5151A6] rounded text-white text-xs font-bold",
                    ],
                  }}
                >
                  <div
                    onClick={handleCopyClick}
                    className="flex items-center justify-center cursor-pointer  h-9 w-9  text-[#5151A6]"
                  >
                    {iconToggle ? (
                      <TiTick color="green" />
                    ) : (
                      <BiCopy size={20} />
                    )}
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-lg cursor-pointer w-9 h-9 bg-[#f1f1f8]">
              <Tooltip
                content="Like Answer"
                color="success"
                showArrow={true}
                placement="top"
                classNames={{
                  base: ["before:bg-[#5151A6] dark:before:bg-[#5151A6]"],
                  content: [
                    " shadow-xl bg-[#5151A6]  text-white text-xs font-bold",
                  ],
                }}
              >
                <div
                  onClick={handleLikeClick}
                  className={`flex items-center justify-center cursor-pointer h-10 w-10  ${
                    isLiked ? "text-red-600" : "text-[#5151A6]"
                  }`}
                >
                  {isLiked ? (
                    <AiFillHeart size={24} />
                  ) : (
                    <AiOutlineHeart size={24} />
                  )}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
