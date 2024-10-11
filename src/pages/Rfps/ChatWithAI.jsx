import React from "react";
import { IoIosClose } from "react-icons/io";
import ArailLogo from "../../assets/ArialLogo.svg";
import sendIcon from "../../assets/sendIcon.svg";
import { Textarea } from "@nextui-org/react";

export default function ChatWithAI({
  setChatWithAiModalOpen,
  text,
  handleTextarea,
  submitChatAIQuestion,
  conversationsQuestionText,
  submittedText,

  conversations,
}) {
  return (
    <div className="xl:absolute xl:mt-0 mt-6 xl:top-0 xl:right-0 xl:translate-x-full flex flex-col justify-between col-span-4 bg-[#f1f1f8] rounded-2xl xl:rounded-l-none w-full xl-w-[370px] xl:h-full h-[75vh]">
      <div className="flex justify-between px-6 pt-6 pb-4">
        <p className="text-xl font-semibold leading-6 font-raleway text-ebony">
          Arial AI Help
        </p>
        <IoIosClose
          onClick={() => setChatWithAiModalOpen(false)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
      <hr />
      <div className="p-3 mt-auto">
        <div className="flex flex-1 flex-col overflow-y-auto max-h-[50vh] ">
          <div className="flex flex-1 mt-[25px] items-start pl-[22px] gap-3">
            <img src={ArailLogo} />
            <div className="py-2.5 px-3.5 font-base font-[Raleway] text-ebony bg-white rounded-r-lg rounded-bl-lg mr-5">
              {`Hey How can I help you with this question about${text}`}
            </div>
          </div>
          {conversations.map((item) => {
            return (
              <div>
                <div className="ml-5 mt-4">
                  <div className="ml-auto w-fit py-2.5 px-3.5 font-base font-[Raleway] text-white bg-[#5151A6] mr-6 rounded-l-lg rounded-br-lg">
                    {item.question}
                  </div>
                </div>
                <div className="flex flex-1 mt-[25px] items-start pl-[22px] gap-3">
                  <img src={ArailLogo} />
                  <div className="py-2.5 px-3.5 font-base font-[Raleway] text-ebony bg-white rounded-r-lg rounded-bl-lg mr-5">
                    {item?.answer}
                  </div>
                </div>
              </div>
            );
          })}

          {submittedText && (
            <div className="ml-5 mt-4">
              <div className="ml-auto w-fit py-2.5 px-3.5 font-base font-[Raleway] text-white bg-[#5151A6] mr-6 rounded-l-lg rounded-br-lg">
                {submittedText}
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="flex justify-between gap-3 p-[21px] pl-[19px] pr-[70px] w-full flex-row">
        <div className="flex items-center justify-center w-full">
          <Textarea
            value={conversationsQuestionText}
            onChange={handleTextarea}
            labelPlacement="outside"
            placeholder="Message"
            className="bg-white rounded-lg  max-h-15 hover:bg-[#] font-[Raleway] text-base leading-6"
            minRows={1}
            classNames={{
              innerWrapper: "items-center ",
              base: "border border-2-#232550",
            }}
          />
        </div>
        <div
          onClick={() => submitChatAIQuestion()}
          className="bg-[#5151A6] p-3 rounded-lg flex max-h-12 cursor-pointer"
        >
          <img src={sendIcon} alt="send icon" className="w-5 h-5 " />
        </div>
      </div>
    </div>
  );
}
