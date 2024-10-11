import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { AiQuestionUpdateApi, getsessionById } from "../Rfps/Data";
import {
  likedSessionAIAnswerGetApi,
  removeTagPostApi,
  savedQuestionAnswerUpdateApi,
} from "./savedAPIData";
import { IoMdCheckmark } from "react-icons/io";
import { addTagsPostApi, getSessionTag } from "../document/DocumentApi";
import { FaPlus } from "react-icons/fa6";
import { formatDate } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { setQuestionList } from "../../store/questionReducer";
const contract_typeData = [
  { key: "coaching", label: "Coaching" },
  { key: "training", label: "Training" },
  { key: "coaching&training", label: "Coaching & Training" },
  { key: "securityQuestionnaire", label: "Security Questionnaire" },
];

export default function QuestionOverview({
  isOpen,
  onOpenChange,
  onOpen,
  likedQuestionData,
  questionData,
  setLikedQuestionData = () => {},
  callGetApi = false,
  textAreaValue = "",
  setTextAreaValue = () => {},
  saveTagBtn = () => {},
  questionInput = "",
  rfpsessionId,
  rfpQuestionId,
}) {
  const [inputValue, setInputValue] = useState("");
  // const [textAreaValue, setTextAreaValue] = useState("");
  const [tagInputValue, setTagInputValue] = useState("");
  const [inputToggle, setInputToggle] = useState(false);
  const [contractType, setContractType] = useState(new Set(["coaching"]));

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.user?.user);
  const sessionId = questionData?.question?.session?.id || rfpsessionId;

  const questionId = questionData?.question?.id || rfpQuestionId;

  const answerId = questionData?.id;
  useEffect(() => {
    if (questionInput) {
      setInputValue(questionInput);
      setTextAreaValue(questionData?.answer);
      // setContractType(contractType?.currentKey);

      if (questionData?.contract_type) {
        setContractType(new Set([questionData?.contract_type]));
      } else {
        setContractType(new Set(["coaching"]));
      }
    }
  }, [questionInput]);

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleTextarea = (e) => {
    setTextAreaValue(e.target.value);
  };

  const updateQuestion = () => {
    const questionUpdatePayload = {
      answer_id: answerId,
      embedding_status: "Embedding",
      question: inputValue,
    };

    try {
      AiQuestionUpdateApi(sessionId, questionId, questionUpdatePayload).then(
        () => {
          likedSessionAIAnswerGetApi().then((res) => {
            if (callGetApi) {
              getsessionById(sessionId).then((res) => {
                dispatch(setQuestionList(res?.data?.questions));
              });
            }
            setLikedQuestionData(res?.data);
          });
        }
      );
    } catch {
      console.log("");
    }
  };

  const updateQuestionAnswer = () => {
    const answerUpdatePayload = {
      answer: textAreaValue,
      contract_type: contractType?.currentKey,
    };

    try {
      savedQuestionAnswerUpdateApi(
        sessionId,
        questionId,
        answerId,
        answerUpdatePayload
      ).then(() => {
        likedSessionAIAnswerGetApi().then((res) => {
          if (callGetApi) {
            getsessionById(sessionId).then((res) => {
              dispatch(setQuestionList(res?.data?.questions));
            });
          }
          setLikedQuestionData(res?.data);
        });
      });
    } catch {
      console.log("sesstion not found");
    }
  };

  const handleAddTag = () => {
    const tagData = {
      tag: tagInputValue,
    };

    try {
      addTagsPostApi(answerId, tagData).then((res) => {
        saveTagBtn();
        setTagInputValue("");
      });
    } catch {
      console.log("");
    }
  };

  const removeTags = (el) => {
    const removeTag = {
      tag: el,
    };

    try {
      removeTagPostApi(answerId, removeTag).then((res) => {
        getSessionTag().then((res) => {});
        likedSessionAIAnswerGetApi().then((res) => {
          setLikedQuestionData(res?.data);
        });
      });
    } catch {
      console.log("dsdsds");
    }
  };

  const shouldUpdateQuestn = () => {
    return inputValue !== questionData?.question?.question;
  };

  const shouldUpdateAnswer = () => {
    return (
      textAreaValue !== questionData?.answer ||
      contractType.values().next().value !== questionData?.contract_type
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: "bg-white rounded-lg min-w-[700px]", body: "p-0" }}
        onOpen={onOpen}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=" text-large font-semibold flex items-start justify-between p-6 pb-[22px]">
                <div className="flex w-full ">
                  <div className="flex flex-col flex-grow gap-1">
                    <div className="flex justify-between w-full">
                      <p className="text-lg font-semibold font-[Raleway] text-ebony leading-[22px]">
                        Question Overview
                      </p>
                      <IoClose
                        onClick={() => onClose()}
                        className="w-7 h-7 cursor-pointer text-[#8d9095]"
                      />
                    </div>
                    <p className="text-sm font-normal font-[DM Sans] text-[#475467]">
                      Review the question details below
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <div className="w-full border"></div>
              <ModalBody>
                <div className="flex-1 overflow-y-auto p-0 flex flex-col gap-4 px-6 py-3">
                  <div className="flex flex-col gap-1.5 ">
                    <p className="text-sm font-medium font-[DM Sans] text-[#344054]">
                      Question
                    </p>
                    <div className="flex flex-cal gap-[8px]">
                      <div className="group flex flex-col w-full font-[Ralaway] text-base font-medium leading-6 text-[#232550]">
                        <Input
                          value={inputValue}
                          onChange={changeInputValue}
                          type="text"
                          className="bg-[#F1F1F8] rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium font-dmSans text-[#344054]">
                      Answer
                    </p>
                    <div className="w-full break-words whitespace-pre-wrap rounded-lg">
                      <Textarea
                        onChange={handleTextarea}
                        value={textAreaValue}
                        placeholder="Enter your description"
                        className="w-full bg-[#F1F1F8] max-h-[196px] rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm font-medium font-dmSans text-[#344054]">
                        Saved By
                      </p>
                      <div className="rounded-lg py-2.5 px-3.5 w-full border-[#d0d5dd] border flex gap-2 items-center">
                        <div className="flex justify-center items-center rounded-full">
                          <img
                            className="w-6 h-6 rounded-full"
                            src={
                              "https://api.trymarvin.com/" + userProfile.image
                            }
                          />
                        </div>
                        <span className="text-base font-medium font-[Raleway] text-[#667085] leading-4">
                          {`${userProfile.first_name} ${userProfile.last_name}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium font-dmSans text-[#344054]">
                        Contract Type
                      </p>
                      <div className="flex flex-cal gap-[8px] h-[45px] mt-[7px] rounded-lg w-full border-[#d0d5dd] border  items-center">
                        <Select
                          onSelectionChange={setContractType}
                          defaultSelectedKeys={["coaching"]}
                          selectedKeys={contractType}
                          classNames={{
                            listbox: "bg-[#FFF] border-[2px] p-0 rounded-lg",
                            selected: "bg-red-700",
                          }}
                          // defaultSelectedKeys={[Array.from(contractType)?.[0]]}
                          className="h-[48px] justify-center items-center bg-[#f1f1f8] rounded-lg "
                        >
                          {contract_typeData.map((item) => {
                            return (
                              <SelectItem
                                key={item?.label}
                                textValue={item?.label}
                                classNames={{
                                  base: "hover:bg-[#ced8eb] data-[selected=true]:bg-[#1d63e8] data-[selected=true]:text-white",
                                }}
                                className=" bg-white"
                              >
                                {item.label}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium font-dmSans text-[#344054]">
                      Tags
                    </p>
                    <div className="px-3.5 py-2.5 rounded-lg border-mischka border flex gap-2 items-center flex-wrap max-h-[87px] overflow-auto">
                      {questionData?.tags?.map((el) => (
                        <div className="flex gap-1 px-2 rounded-[20px] py-1 cursor-pointer bg-[#d799d4] items-center">
                          <span className="text-sm font-normal font-dmSans text-[#0d121c]">
                            {el}
                          </span>
                          <IoClose
                            onClick={() => removeTags(el)}
                            className="w-4 h-4 cursor-pointer text-[#4a4b4d]"
                          />
                        </div>
                      ))}

                      <div className="flex gap-1 h-[30px] font-dmSans text-sm text-[#0D121C] px-[6px] py-2 border-2 rounded-full cursor-pointer bg-[#DFA9DD] w-fit items-center">
                        {inputToggle ? (
                          <>
                            <input
                              type="text"
                              className="bg-[#DFA9DD] border-none outline-none w-13 h-3 text-[#0D121C]"
                              value={tagInputValue}
                              onChange={(e) => setTagInputValue(e.target.value)}
                            />
                            <IoMdCheckmark
                              className="cursor-pointer text-black"
                              onClick={() => {
                                setInputToggle(false);
                                if (tagInputValue.trim() !== "") {
                                  handleAddTag(tagInputValue);
                                  setInputValue("");
                                }
                              }}
                            />
                          </>
                        ) : (
                          <label
                            onClick={() => setInputToggle(true)}
                            className="flex items-center cursor-pointer gap-1"
                          >
                            <FaPlus className="h-2 w-2" />
                            Add tag
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-cal gap-2 transition-all duration-300">
                    <p className="text-sm font-medium font-dmSans text-[#344054]">
                      Last Synced
                    </p>
                    <p className="text-base leading-5 font-dmSans text-[#475467]">
                      {/* Sep 09,2024 */}
                      {formatDate(questionData?.update_date)}
                    </p>
                  </div>
                </div>
                {/* ))} */}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  className="border border-[#344054] rounded-lg text-[#344054]"
                  onPress={onClose}
                >
                  Cancle
                </Button>
                <Button
                  onPress={() => {
                    onClose();

                    if (shouldUpdateQuestn() && !shouldUpdateAnswer()) {
                      updateQuestion();
                    } else if (shouldUpdateAnswer() && !shouldUpdateQuestn()) {
                      updateQuestionAnswer();
                    } else {
                      updateQuestion();
                      updateQuestionAnswer();
                    }
                  }}
                  className="bg-[#232550] font-[Raleway] text-white rounded-lg"
                >
                  Save Question
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
