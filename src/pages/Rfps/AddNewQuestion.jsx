import React, { useEffect, useRef, useState } from "react";
import Tiptap from "../../common/TipTap";
import {
  Avatar,
  Input,
  Modal,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { IoMdTrash } from "react-icons/io";
import { useParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import {
  AiQuestionAnswerUpdateApi,
  AiQuestionUpdateApi,
  createQuestionAnswerApi,
  createSessionAiQuestion,
  createSessionQuestion,
  deleteQuestionApi,
  getCitationApi,
  getsessionById,
  getSessionConversations,
  getUserActivity,
  postSessionConversations,
  QuestionLikedPatchApi,
} from "./Data";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiCloudSnowLight, PiDotsSixBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionList } from "../../store/questionReducer";
import { FaCheckCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import DeleteQuestion from "./DeleteQuestion";
import ChatWithAI from "./ChatWithAI";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import ShareQuestionTeamMember from "./ShareQuestionTeamMember";
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
import CitationIcon from "../../assets/66icon.svg";
import Citation from "./Citation";
import QuestionOverview from "../SavedResponse/QuestionOverview";
import { likedSessionAIAnswerGetApi } from "../SavedResponse/savedAPIData";
import { RxActivityLog } from "react-icons/rx";
import axios from "axios";
import UserActivityModal from "./UserActivityModal";
import { GrStatusGood } from "react-icons/gr";
const status = [
  {
    key: "completed",
    label: "Completed",
    icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
    selectedValue: "bg-red-700",
  },
  {
    key: "pending",
    label: "In-progress",
    icon: <GoPencil className="w-5 h-5 text-orange-500" />,
    selectedValue: "bg-green-700",
  },
];
export default function AddNewQuestion({
  isNewQuestion,
  setIsNewQuestion,
  questionData,
  setShowQuestion,
  dragHandleProps,
  // id,
  // setQuestionsList = () => {},
}) {
  let { id } = useParams();
  console.log(questionData);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [feedback, setFeedBack] = useState("");

  const [value, setValue] = useState("");

  const [chatWithAiModalOpen, setChatWithAiModalOpen] = useState(false);
  const [conversations, setConversation] = useState([]);
  const [conversationsQuestionText, setconversationsQuestionText] =
    useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [error, setError] = useState("");
  const [iconToggle, setIconToggle] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectStatus, setSelectStatus] = useState("pending");

  const [citationData, setCitationData] = useState([]);
  const [likedAnswer, setLikedAnswer] = useState(null);
  const [likedQuestionData, setLikedQuestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamMember, setTeamMember] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [userActivityData, setUserActivityData] = useState([]);
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
        placeholder: "Start typing here...",
      }),
      Underline,
      BulletList,
      Paragraph,
      FontSize,
    ],

    onUpdate: ({ editor: ed }) => {
      const contentLen = ed?.getText()?.length;
      setFeedBack(ed?.getText());
    },
    onBlur({ editor, event }) {
      onBlurHandler(editor?.getHTML());
      // createQuestionAnswer(editor?.getHTML());
    },
    onCreate: ({ editor: ed }) => {
      // setCallbackFn(() => {
      //   const dataHtml = ed?.getHTML();
      //   const text = ed?.getText();
      // });
    },
  });
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: ShareIsOpen,
    onOpen: ShareOnOpen,
    onClose: ShareOnClose,
    onOpenChange: ShareOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: citationIsOpen,
    onOpen: citationOnOpen,
    onClose: citationOnClose,
    onOpenChange: citationOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: likeIsOpen,
    onOpen: likeOnOpen,
    onClose: likeOnClose,
    onOpenChange: likeOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: activitIsOpen,
    onOpen: activityOnOpen,
    // onClose: likeOnClose,
    onOpenChange: activityOnOpenChange,
  } = useDisclosure();
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const isLike = questionData?.answers?.[0]?.is_like;
    setIsLiked(isLike);
  }, [questionData?.answers]);

  useEffect(() => {
    if (questionData?.status) {
      setSelectStatus(questionData.status);
    }
  }, [questionData?.status]);

  useEffect(() => {
    editor.commands.setContent(
      questionData?.answers[questionData?.answers?.length - 1]?.answer
    );
  }, [questionData?.answers]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`https://api.trymarvin.com/api/v1/teams/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTeamMember(response?.data?.items);
        });
    }
  }, []);
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    if (!isNewQuestion) {
      setIsEditing(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCopyClick = () => {
    setIconToggle(true);
    if (questionData?.answers[questionData?.answers?.length - 1]?.answer) {
      navigator.clipboard
        .writeText(
          questionData?.answers[questionData?.answers?.length - 1]?.answer
        )
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

  const submitQuestion = async () => {
    const payLoadData = questionData?.id
      ? {
          feedback: feedback,
          question_id: questionData?.id,
        }
      : {
          feedback: feedback,
        };

    try {
      if (text) {
        await createSessionAiQuestion(payLoadData, id).then((res) => {
          getsessionById(id).then((response) => {
            dispatch(setQuestionList(response.data.questions));

            editor.commands.setContent(
              res?.data?.answers?.[res?.data?.answers?.length - 1]?.answer
            );
          });
        });
      } else {
        setError("Question is required.");
      }
    } catch (error) {
      console.log("Failed to create Session Ai Question", error);
    } finally {
      if (text) setShowQuestion(false);
    }
  };
  useEffect(() => {
    if (questionData?.question) {
      setText(questionData?.question);
    }
  }, [questionData?.question]);

  const removeQuestion = () => {
    setShowQuestion(false);
  };

  const handleDeleteQuestion = async (question_id) => {
    try {
      await deleteQuestionApi(id, question_id).then((res) => {
        getsessionById(id).then((res) => {
          dispatch(setQuestionList(res.data.questions));
          // setQuestionsList(response.data.questions);
        });
      });
      toast.success("Question removed successfully");
    } catch (error) {
      console.error("Failed to remove quetion:", error);
    }
  };

  const updateQuestion = {
    question: text,
  };

  const answer_id = questionData?.answers[0]?.id;

  const question_id = questionData?.id;

  const updateQuestionAnswer = async (updateQuestionAnswerPayLoad) => {
    const payLoadData = { answer: updateQuestionAnswerPayLoad };
    try {
      await AiQuestionAnswerUpdateApi(
        id,
        question_id,
        answer_id,
        payLoadData
      ).then((res) => {
        getsessionById(id).then((res) => {
          dispatch(setQuestionList(res.data.questions));
          // setQuestionsList(res.data.questions);
        });
      });
    } catch (error) {
      console.error("Failed to remove quetion:", error);
    }
  };

  const createQuestionAnswer = () => {
    const payloadData = {
      answer: feedback,
    };
    if (feedback) {
      createQuestionAnswerApi(id, question_id, payloadData).then((res) => {
        getsessionById(id).then((res) => {
          dispatch(setQuestionList(res.data.questions));
          // setQuestionsList(res.data.questions);
        });
      });
    } else {
      return null;
    }
  };

  const onBlurHandler = (updateQuestionAnswerPayLoad) => {
    if (questionData?.answers[questionData?.answers?.length - 1]?.answer) {
      updateQuestionAnswer(updateQuestionAnswerPayLoad);
    } else {
      createQuestionAnswer();
    }
  };

  const SessionConversations = () => {
    getSessionConversations(id, question_id).then((res) => {
      setConversation(res?.data?.conversations);
    });
  };

  const handleTextarea = (e) => {
    setconversationsQuestionText(e.target.value);
  };

  const submitChatAIQuestion = async () => {
    const payloadData = {
      question: conversationsQuestionText,
      updated_answer: "",
    };

    if (conversationsQuestionText) {
      setSubmittedText(conversationsQuestionText);
      setconversationsQuestionText("");

      try {
        const response = await postSessionConversations(
          id,
          question_id,
          payloadData
        );

        setConversation(response?.data?.conversations);
        setSubmittedText("");
      } catch (error) {
        console.error("Error submitting question:", error);
      }
    } else {
      return null;
    }
  };

  const handleLikeClick = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    const likedQuestionPayload = { is_like: newIsLiked };
    setIsLoading(true);
    try {
      await likedQuestion(likedQuestionPayload);
    } catch (error) {
      console.error("Failed to update like status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const likedQuestion = async (likedQuestionPayload) => {
    try {
      await QuestionLikedPatchApi(answer_id, likedQuestionPayload).then(
        (res) => {
          getsessionById(id).then((res) => {
            if (!isLiked) {
              // likedSessionAIAnswerGetApi().then((res) => {
              //   setLikedQuestionData(res?.data);
              //   const findAnswer = res?.data.find(
              //     (item) => item?.id === answer_id
              //   );
              //   setLikedAnswer(findAnswer);
              // });
            }
            dispatch(setQuestionList(res.data.questions));
          });
        }
      );
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  const createQuestion = async () => {
    const payLoadData = {
      question: text,
    };

    try {
      if (text) {
        await createSessionQuestion(id, payLoadData).then((res) => {
          getsessionById(id).then((response) => {
            dispatch(setQuestionList(response.data.questions));
          });
        });
      } else {
        setError("Question is required.");
      }
    } catch (error) {
      console.log("Failed to create Session Ai Question", error);
    } finally {
      if (text) setShowQuestion(false);
    }
  };

  const getCitation = () => {
    getCitationApi(answer_id).then((response) => {
      setCitationData(response?.data);
    });
  };

  const handleSelectStatus = async (newStatus) => {
    const payLoadData = { status: newStatus };

    try {
      await AiQuestionUpdateApi(id, question_id, payLoadData).then();
      const response = await getsessionById(id);

      setSelectStatus(newStatus);

      dispatch(setQuestionList(response.data.questions));
    } catch (error) {
      console.error("Failed to update question status:", error);
    }
  };

  const userActivityFn = () => {
    getUserActivity(id, question_id).then((response) => {
      setUserActivityData(response?.data);
    });
  };

  return (
    <>
      <div
        className={`w-full mt-4 bg-white p-6 rounded-xl relative ${
          chatWithAiModalOpen ? "xl:rounded-r-none" : ""
        }`}
      >
        <div className="rounded-2xl">
          <div className="flex items-center justify-center cursor-pointer text-[#5151A6]">
            <Tooltip
              content="Reorder question"
              color="success"
              placement="top"
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
              <div {...dragHandleProps}>
                <PiDotsSixBold className="h-8 w-8" />
              </div>
            </Tooltip>
          </div>
          <hr className="top-3 w-full right-0" />
          <div className="flex flex-col gap-4 mt-6 bg-white relative rounded-2xl cursor-auto">
            <div className="flex justify-between items-start gap-4">
              {!isEditing && !isNewQuestion ? (
                <div className="flex gap-2 flex-wrap items-center">
                  <span className="text-xl font-semibold font-[Neutrafacetext-SemiBold] text-[#2C2E61] cursor-text">
                    {questionData?.question}
                  </span>
                  <FiEdit2
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer "
                  />
                </div>
              ) : (
                <Input
                  placeholder="write Question..."
                  type="text"
                  value={text}
                  onChange={handleInputChange}
                  // onBlur={handleBlur}

                  onBlur={() => {
                    if (questionData?.id) {
                      AiQuestionUpdateApi(
                        id,
                        questionData?.id,
                        updateQuestion
                      ).then((res) => {
                        getsessionById(id).then((response) => {
                          dispatch(setQuestionList(response.data.questions));
                          // setQuestionsList(response.data.questions);
                        });
                        setIsEditing(false);
                      });
                    } else {
                      createQuestion();
                    }
                  }}
                  ref={inputRef}
                  autoFocus
                  className="rounded-lg outline-none w-full  h-11 bg-[#f1f1f8] text-xl font-semibold font-neutrafaceSemiBold text-[#2C2E61] cursor-text"
                />
              )}

              {isNewQuestion ? (
                <Tooltip
                  content="Remove question"
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
                  <div className="border rounded-lg cursor-pointer">
                    <RxCross2 onClick={removeQuestion} className="h-6 w-6" />
                  </div>
                </Tooltip>
              ) : (
                <div className="relative">
                  <BsThreeDotsVertical
                    size={20}
                    onClick={toggleDropdown}
                    className="cursor-pointer"
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg">
                      <div
                        onClick={() => {
                          onOpen();
                          toggleDropdown();
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
              )}
            </div>
            {error && (
              <p className="text-[1rem] text-red-500 font-[Raleway]">{error}</p>
            )}

            <Tiptap
              editor={editor}
              submitQuestion={submitQuestion}
              setFeedBack={setFeedBack}
              content={
                questionData?.answers[questionData?.answers?.length - 1]?.answer
              }
              setChatWithAiModalOpen={setChatWithAiModalOpen}
              updateQuestionAnswer={updateQuestionAnswer}
              sessionId={id}
              questionData={questionData}
              createQuestionAnswer={createQuestionAnswer}
              onBlurHandler={onBlurHandler}
              SessionConversations={SessionConversations}
            />
          </div>
        </div>
        <div className="flex justify-between xl:relative mt-8">
          <div className="w-60">
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Select
                variant="bordered"
                selectedKeys={selectStatus ? [selectStatus] : []}
                onSelectionChange={(el) => {
                  const newStatus = el?.currentKey;
                  handleSelectStatus(newStatus);
                }}
                classNames={{
                  base: `w-full rounded-lg ${
                    selectStatus === "completed"
                      ? "bg-[#32B17A] text-white font-[Raleway]  font-semibold"
                      : selectStatus === "pending"
                      ? "bg-[#E67434] text-white font-[Raleway] font-semibold"
                      : "bg-[#E67434] text-white font-[Raleway] font-semibold"
                  }`,
                  listbox:
                    "bg-[#FFF] border-[2px] p-[6px] border-solid rounded-xl",
                }}
                placeholder="Select status"
                startContent={
                  selectStatus ? (
                    selectStatus === "completed" ? (
                      <FaCheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <GoPencil className="w-6 h-6 text-white" />
                    )
                  ) : (
                    <GrStatusGood className="w-6 h-6 text-white" />
                  )
                }
              >
                {status.map((item) => (
                  <SelectItem
                    value={item.key}
                    key={item.key}
                    classNames={{
                      base: "hover:bg-[#dbdbe5] rounded-lg text-[14px] font-[Raleway]",
                    }}
                    startContent={item.icon}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex justify-between gap-1">
            <Tooltip
              content="Activities"
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
                onClick={() => {
                  activityOnOpen();
                  userActivityFn();
                }}
                className="flex items-center justify-center cursor-pointer rounded-full h-10 w-10 bg-[#D6D6EB] text-[#5151A6]"
              >
                <RxActivityLog className="h-4 w-4 " />
              </div>
            </Tooltip>
            <Tooltip
              content="citation"
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
                onClick={() => {
                  if (
                    questionData?.answers[questionData?.answers?.length - 1]
                      ?.answer
                  ) {
                    citationOnOpen();
                    getCitation();
                  }
                }}
                className="flex items-center justify-center cursor-pointer rounded-full h-10 w-10 bg-[#D6D6EB] text-[#5151A6]"
              >
                <img src={CitationIcon} />
              </div>
            </Tooltip>
            <Tooltip
              content="Like Answer"
              color="success"
              showArrow={true}
              placement="top"
              classNames={{
                base: ["before:bg-[#5151A6] dark:before:bg-[#5151A6]"],
                content: [
                  "shadow-xl bg-[#5151A6] rounded text-white text-xs font-bold",
                ],
              }}
            >
              <div
                onClick={() => {
                  if (answer_id) {
                    handleLikeClick();
                    if (!isLiked) {
                      likeOnOpen();
                    }
                  }
                }}
                className={`relative flex items-center justify-center cursor-pointer rounded-full h-10 w-10 bg-[#D6D6EB] ${
                  isLiked ? "text-red-600" : "text-[#5151A6]"
                }`}
              >
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="spinner border-t-transparent border-solid border-2 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                  </div>
                ) : isLiked ? (
                  <AiFillHeart size={24} />
                ) : (
                  <AiOutlineHeart size={24} />
                )}
              </div>
            </Tooltip>

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
                onClick={() => {
                  if (
                    questionData?.answers[questionData?.answers?.length - 1]
                      ?.answer
                  ) {
                    handleCopyClick();
                  }
                }}
                className="flex items-center justify-center cursor-pointer rounded-full h-10 w-10 bg-[#D6D6EB] text-[#5151A6]"
              >
                {iconToggle ? <TiTick color="green" /> : <BiCopy size={20} />}
              </div>
            </Tooltip>

            <Tooltip
              content="Share question"
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
                onClick={() => {
                  if (text) {
                    ShareOnOpen();
                  }
                }}
                className="flex items-center justify-center cursor-pointer rounded-full h-10 w-10 bg-[#D6D6EB] text-[#5151A6]"
              >
                <RiUserAddLine size={24} />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* <p>chat with ai</p> */}

        {chatWithAiModalOpen && (
          <ChatWithAI
            setChatWithAiModalOpen={setChatWithAiModalOpen}
            text={text}
            handleTextarea={handleTextarea}
            submitChatAIQuestion={submitChatAIQuestion}
            conversationsQuestionText={conversationsQuestionText}
            submittedText={submittedText}
            conversations={conversations}
          />
        )}
      </div>
      <DeleteQuestion
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        handleDeleteQuestion={handleDeleteQuestion}
        questionData={questionData}
      />
      <ShareQuestionTeamMember
        ShareIsOpen={ShareIsOpen}
        ShareOnOpen={ShareOnOpen}
        ShareOnClose={ShareOnClose}
        ShareOnOpenChange={ShareOnOpenChange}
        sesstionId={id}
        questionId={question_id}
        teamMember={teamMember}
        participants={questionData?.participants}
      />
      <Citation
        citationIsOpen={citationIsOpen}
        citationOnOpen={citationOnOpen}
        citationOnClose={citationOnClose}
        citationOnOpenChange={citationOnOpenChange}
        citationData={citationData}
        answer_id={answer_id}
      />

      <QuestionOverview
        openFromSaveNewQuestion={true}
        isOpen={likeIsOpen}
        onOpen={likeOnOpen}
        onOpenChange={likeOnOpenChange}
        questionData={
          questionData?.answers?.[questionData?.answers?.length - 1]
        }
        likedQuestionData={likedQuestionData}
        setLikedQuestionData={setLikedQuestionData}
        callGetApi={true}
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        questionInput={questionData?.question}
        saveTagBtn={() =>
          getsessionById(id)?.then((res) => {
            dispatch(setQuestionList(res.data));
          })
        }
        rfpsessionId={id}
        rfpQuestionId={questionData?.id}
      />
      <UserActivityModal
        activitIsOpen={activitIsOpen}
        activityOnOpen={activityOnOpen}
        activityOnOpenChange={activityOnOpenChange}
        userActivityData={userActivityData}
      />
    </>
  );
}
