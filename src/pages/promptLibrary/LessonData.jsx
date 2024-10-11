import { Button, Textarea, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import Tiptap from "../../common/TipTap";
import {
  libraryLikeQuestion,
  responseGetApi,
  runQuestionPromptPostApi,
} from "./promptApiData";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import FontSize from "tiptap-extension-font-size";
import { useEditor } from "@tiptap/react";
import LibraryAnswer from "./LibraryAnswer";

export default function LessonData() {
  const location = useLocation();
  const { itemData } = location.state || {};
  const [libraryQuestionText, setLibraryQuestionText] = useState("");
  const [libraryQuestionAnswer, setLibraryQuestionAnswer] = useState([]);

  useEffect(() => {
    runQuestionAnswer();
  }, []);

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder:
          "Paste your detailed lesson outline here. Include main topics, subtopics, and key points to be covered. The more comprehensive your outline, the more accurate and relevant the learning outcomes will be.",
      }),
      // content,
      Underline,
      BulletList,
      Paragraph,
      FontSize,
    ],
    // content: content,

    onUpdate: ({ editor: ed }) => {
      const contentLen = ed?.getText()?.length;
      setLibraryQuestionText(ed?.getText());
    },
    // onBlur({ editor, event }) {
    //   onBlurHandler(editor?.getHTML());
    //   // createQuestionAnswer(editor?.getHTML());
    // },
    onCreate: ({ editor: ed }) => {
      // setCallbackFn(() => {
      //   const dataHtml = ed?.getHTML();
      //   const text = ed?.getText();
      // });
    },
  });

  const runQuestionAnswer = async () => {
    const payLoadData = {
      multiple: false,
      question: libraryQuestionText,
    };
    try {
      await runQuestionPromptPostApi(itemData?.id, payLoadData).then((res) => {
        responseGetApi(itemData?.id).then((res) =>
          setLibraryQuestionAnswer(res?.data)
        );
        setLibraryQuestionText("");
      });
    } catch (error) {
      console.log("Failed to invite participant:", error);
    }
  };

  const generateMultiple = async () => {
    const payLoadData = {
      multiple: true,
      question: libraryQuestionText,
    };
    try {
      await runQuestionPromptPostApi(itemData?.id, payLoadData).then((res) => {
        responseGetApi(itemData?.id).then((res) =>
          setLibraryQuestionAnswer(res?.data)
        );
      });
    } catch (error) {
      console.log("Failed to invite participant:", error);
    }
  };

  return (
    <div className="px-[16px]">
      <div className="flex flex-col gap-6 max-w-[565px] mx-auto mt-14">
        <div className="flex flex-col gap-2 md:mb-2.5">
          <p className="text-white text-[48px] leading-[48px] font-bold font-[Neutrafacetext-Bold] ">
            {itemData?.title}
          </p>
          <p className="text-base leading-5 font-medium text-white font-[Raleway] ">
            {itemData?.description}
          </p>
        </div>
        <div className="flex flex-col w-full gap-5  bg-white rounded-xl h-[320px]">
          <div className="h-[288px] overflow-y-auto w-full break-words whitespace-pre-wrap">
            <div className="h-full overflow-auto text-black">
              <Tiptap editor={editor} showToolBar={false} />
            </div>
          </div>
          <div className="flex gap-2 p-6">
            <Button
              onClick={() => runQuestionAnswer()}
              className="bg-[#5151a6] text-white rounded-lg flex items-center justify-center px-4 py-2 text-sm font-medium leading-6 w-fit font-[DM Sans] hover:opacity-90"
            >
              Run
            </Button>
            <Button
              onClick={() => generateMultiple()}
              className="bg-[#f1f1f8] text-[#2c2e61] rounded-lg flex items-center justify-center px-4 py-2 text-sm font-medium leading-6 w-fit font-dmSans hover:opacity-90"
            >
              Generate multiple
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {libraryQuestionAnswer.map((data, index) => (
            <LibraryAnswer
              data={data}
              index={index}
              itemDataId={itemData?.id}
              setLibraryQuestionAnswer={setLibraryQuestionAnswer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
