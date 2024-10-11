import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import Skeleton from "./Skeleton";
import MenuBar from "../components/Menubar";
import "../styles/tiptap.css";

const Tiptap = ({
  submitQuestion,
  content,
  setChatWithAiModalOpen,
  sessionId,
  questionData,
  SessionConversations,
  editor,
  showToolBar = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(content);

  if (!editor) {
    return null;
  }

  const handleGenerateAnswer = async () => {
    setLoading(true);

    try {
      const answer = await submitQuestion();

      setGeneratedContent(answer);
    } catch (error) {
      console.error("Error generating answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-full border-[2px] ${
        !showToolBar ? "border-none" : "border-periWinkleGray rounded-lg"
      }`}
    >
      {showToolBar && (
        <MenuBar
          editor={editor}
          submitQuestion={handleGenerateAnswer}
          setChatWithAiModalOpen={setChatWithAiModalOpen}
          sessionId={sessionId}
          questionData={questionData}
          SessionConversations={SessionConversations}
        />
      )}

      <Skeleton
        show={loading}
        content={
          <div className="flex flex-col px-4 pt-3 gap-2 w-full h-[190px]">
            <Skeleton radiusClass="rounded-[4px]" count={5} bg="[#D6D6EB]" />
          </div>
        }
      >
        {!loading && (
          <EditorContent
            value={generatedContent}
            autoFocus
            editor={editor}
            className={`w-full p-5 ${
              !showToolBar ? "h-[210px]" : "h-[270px]"
            }  overflow-auto`}
          />
        )}
      </Skeleton>
    </div>
  );
};

export default Tiptap;
