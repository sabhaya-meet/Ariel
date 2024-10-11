import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { BubbleMenu } from "@tiptap/react";
import React, { useState } from "react";
import { FaListOl, FaListUl } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { VscTriangleDown } from "react-icons/vsc";
import starIcon from "../assets/starIcon.svg";

const MenuBar = ({
  editor,
  submitQuestion,
  setChatWithAiModalOpen,

  sessionId,
  questionData,
  SessionConversations,
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["16"]));

  if (!editor) {
    return null;
  }

  const createButton = (
    label,
    onClickHandler,
    isActive,
    icon = null,
    className
  ) => (
    <button
      onClick={onClickHandler}
      disabled={!editor.can().chain().focus().run()}
      className={`${
        isActive
        // ? `bg-[#1C7794] text-white cursor-pointer !font-bold `
        // : `text-dainTree cursor-pointer`
      } ${className}`}
    >
      {icon ? icon : label}
    </button>
  );

  const toggleFormatting = (format) => () =>
    editor.chain().focus().toggleMark(format).run();

  const toggleAlignment = (alignment) => () =>
    editor.chain().focus().setTextAlign(alignment).run();

  const toggleParagraph = () => {
    editor.chain().focus().setParagraph().run();
  };
  const handleFontSizeChange = (e) => {
    setSelectedKeys(e);
    editor.chain().focus().setFontSize(`${e?.currentKey}px`).run();
  };

  return (
    <>
      <div
        id="toolbar"
        className="flex gap-5 bg-[#f1f1f8] items-center justify-between h-[41px]"
      >
        {/* <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="capitalize !gap-[2px] !min-w-fit"
            >
              Aa <VscTriangleDown size={12} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            hideSelectedIcon
            classNames={{
              base: "bg-primary w-fit rounded-lg",
            }}
          >
            <DropdownItem className="p-0">
              <div id="header-toolbar" className="flex-col w-fit">
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                  } grid grid-cols-4 gap-3 items-center w-full font-[400]`}
                >
                  <div className="col-span-1">
                    {editor.isActive("heading", { level: 1 }) ? (
                      <FaCheck />
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="col-span-3 text-start">Title</p>
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`${
                    editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                  } grid grid-cols-4 gap-3 items-center w-full font-[400] `}
                >
                  <div className="col-span-1">
                    {editor.isActive("heading", { level: 2 }) ? (
                      <FaCheck />
                    ) : (
                      ""
                    )}
                  </div>
                  <p
                    className={`${
                      editor.isActive("heading", { level: 2 })
                        ? "font-bold"
                        : ""
                    } col-span-3 text-start`}
                  >
                    Subtitle
                  </p>
                </button>
                <button
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={`${
                    editor.isActive("paragraph") ? "is-active" : ""
                  } grid grid-cols-4 gap-3 items-center w-full font-bold`}
                >
                  <div className="col-span-1">
                    {editor.isActive("paragraph") ? <FaCheck /> : ""}
                  </div>
                  <p
                    className={`${
                      editor.isActive("paragraph") ? "font-bold" : ""
                    } col-span-3 text-start`}
                  >
                    Body
                  </p>
                </button>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <div className="flex pl-4 items-center gap-3.5">
          {createButton(
            "B",
            toggleFormatting("bold"),
            editor.isActive("bold"),
            null,
            "font-bold text-xl"
          )}
          {createButton(
            "i",
            toggleFormatting("italic"),
            editor.isActive("italic"),

            null,
            "italic text-xl"
          )}

          {createButton(
            "U",
            toggleFormatting("underline"),
            editor.isActive("underline"),
            null,
            "underline text-xl"
          )}
          <div className="h-6 w-[1px] bg-[#D5D6EC]"></div>
          <div className="flex items-center gap-3">
            {createButton(
              null,
              () => editor.chain().focus().toggleBulletList("bulletList").run(),
              editor.isActive("bulletList"),
              <FaListUl size={16} />
            )}
            {createButton(
              null,
              () =>
                editor.chain().focus().toggleOrderedList("orderedList").run(),
              editor.isActive("orderedList"),
              <FaListOl size={16} />
            )}
          </div>
        </div>

        <Dropdown className="bg-white rounded-2xl border-spacing-1 drop-shadow-2xl">
          <DropdownTrigger className="z-auto">
            <div className="bg-[#D8D9EE] py-1.5 pl-2.5 pr-2.5 mr-4 flex gap-1.5 items-center rounded-md cursor-pointer">
              <img src={starIcon} alt="" />
              <span className="font-raleway text-sm leading-[14px] font-semibold text-rhino">
                AI
              </span>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              onClick={(e) => {
                submitQuestion();
                e.stopPropagation();
              }}
              key="generate"
              className="hover:bg-[#eaebf1]  rounded-lg hover:border-[1px] border-[#a0a0a5] font-raleway text-[#232550]"
            >
              Generate Answer
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setChatWithAiModalOpen(true);
                SessionConversations();
              }}
              key="chat"
              className="hover:bg-[#eaebf1] rounded-lg hover:border-[1px] border-[#a0a0a5] font-raleway text-[#232550]"
            >
              Chat with AL
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* </BubbleMenu> */}
    </>
  );
};

export default MenuBar;
