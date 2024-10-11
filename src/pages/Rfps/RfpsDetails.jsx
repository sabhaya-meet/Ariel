import React, { useEffect, useRef, useState } from "react";
import ShareLogo from "../../assets/RfpShereImageLogo.svg";
import {
  Button,
  // ButtonGroup,
  Input,
  Select,
  SelectItem,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";

import { useParams } from "react-router-dom";
import {
  getParticipants,
  getsessionById,
  sessionPDF,
  updateRfpDetails,
} from "./Data";
import UploadPDF from "../../common/UploadPDF";
import { toast } from "react-toastify";
import ShareSession from "./ShareSession";
import { useDispatch } from "react-redux";
import { setQuestionList } from "../../store/questionReducer";
// import { GoPlus } from "react-icons/go";
// import AddNewQuestion from "./AddNewQuestion";

const data = [
  { key: "coaching", label: "Coaching" },
  { key: "training", label: "Training" },
  { key: "coaching&training", label: "Coaching & Training" },
  { key: "securityQuestionnaire", label: "Security Questionnaire" },
];

function RfpsDetails({ setQuestionsList }) {
  const [rfpData, setRfpData] = useState([]);

  // const [isNewQuestion, setIsNewQuestion] = useState(false);
  const [clientName, setClientName] = useState();
  const [sessionLead, setSessionLead] = useState(rfpData.lead);
  const [contractType, setContractType] = useState(
    new Set([rfpData?.contract_type])
  );

  const [description, setDescription] = useState(rfpData.description);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  // const [showQuestion, setShowQuestion] = useState(false);
  const [participantMember, setParticipantMember] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  let { id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: "(max-width: 992px)",
  });

  useEffect(() => {
    getsessionById(id)?.then((res) => {
      dispatch(setQuestionList(res.data.questions));
      // setQuestionsList(res.data.questions);
      setRfpData(res.data);
      setContractType(new Set([res.data?.contract_type]));
      setClientName(res?.data?.client_name);
      setSessionLead(res?.data?.lead);
      setDescription(res?.data?.description);
      setFile(res?.data?.file);
    });
  }, [id]);

  useEffect(() => {
    updateRfpDetails(id, { contract_type: contractType?.currentKey });
  }, [contractType]);
  const updateData = {
    client_name: clientName,
    lead: sessionLead,

    description: description,
    file: file,
  };

  const clientNameUpdate = (event) => {
    setClientName(event.target.value);
  };

  const leadSession = (event) => {
    setSessionLead(event.target.value);
  };

  const sessionDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleGeneratePDF = async () => {
    if (!uploadedFile) {
      alert("Please upload a file before generating answers.");
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", uploadedFile);
      sessionPDF(id, formData)?.then((res) => {
        setFile(res?.file);
        setIsLoading(false);
        if (res?.file) {
          getsessionById(id);
          toast.success("file uploaded susccessfully");
        }
      });
    } catch (error) {
      console.error("Error generating answers for RFP:", error);
    } finally {
    }
  };

  const removeGeneratePDF = () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", null);
        sessionPDF(id)?.then((res) => getsessionById(id));
        toast.success("file delete susccessfully");
      }
    } catch (error) {
      console.error("Error generating answers for RFP:", error);
    }
  };

  const participantsTeamMember = (id) => {
    getParticipants(id)?.then((res) => {
      setParticipantMember(res?.data);
    });
  };
  return (
    <>
      <div
        className={
          isMobile ? "m-[16px] mt-[2px]  mr-5" : "mt-16 ml-[40px] mr-5"
        }
      >
        <h1 className="text-white text-3xl not-italic font-[Neutrafacetext-Normal] leading-none mb-6">
          {rfpData.title}
        </h1>

        <div
          className={
            isMobile
              ? "w-full flex flex-col flex-wrap gap-6  rounded-2xl p-6  bg-white"
              : "flex flex-col flex-wrap gap-6  w-[600px] rounded-2xl bg-white p-6"
          }
        >
          <div className="flex justify-between  ">
            <p className="text-[#232550] font-[Neutrafacetext-Normal] text-2xl font-semibold">
              RFP Details
            </p>

            <Tooltip
              content="Share Session"
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
              {/* onClick={onOpen} */}
              <div
                onClick={() => {
                  participantsTeamMember(id);
                  onOpen();
                }}
                className="flex gap-[5px] cursor-pointer "
              >
                <img src={ShareLogo} className="w-[16px] h-[16px] mt-[4px] " />
                <p className="text-[#232550] text-center font-[DM Sans] text-sm not-italic font-medium">
                  Share
                </p>
              </div>
            </Tooltip>
          </div>
          <div className="flex flex-col">
            <span className="text-[#232550] font-[Neutrafacetext-SemiBold] not-italic font-semibold text-lg">
              Client Name
            </span>
            <Input
              onBlur={() => updateRfpDetails(id, updateData)}
              onChange={clientNameUpdate}
              type="text"
              value={clientName}
              placeholder="Tesla Motor Company"
              className="rounded-lg h-[48px] bg-[#f1f1f8]"
              classNames={{
                inputWrapper: "h-full",
              }}
            />
          </div>
          <div className="flex flex-row justify-between w-full gap-5  ">
            <div className="w-1/2 rounded-lg">
              <span className="text-[#232550] font-[Neutrafacetext-SemiBold] not-italic font-semibold text-lg">
                Proposal Lead
              </span>
              <Input
                value={sessionLead}
                onChange={leadSession}
                onBlur={() => updateRfpDetails(id, updateData)}
                placeholder="Scott Simmons"
                className="h-[48px] bg-[#f1f1f8] rounded-lg"
                classNames={{
                  inputWrapper: "h-full",
                }}
              />
            </div>
            <div className="w-1/2">
              <span className="text-[#232550] font-[Neutrafacetext-SemiBold] not-italic font-semibold text-lg">
                Contract Type
              </span>
              <Select
                onSelectionChange={setContractType}
                selectedKeys={contractType}
                classNames={{
                  listbox: "bg-[#FFF] border-[2px] p-0 rounded-lg",
                  selected: "bg-red-700",
                }}
                // defaultSelectedKeys={[Array.from(contractType)?.[0]]}
                className="h-[48px] justify-center items-center bg-[#f1f1f8] rounded-lg "
              >
                {data.map((item) => {
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
          <div>
            <span className="text-[#232550] font-[Neutrafacetext-SemiBold] not-italic font-semibold text-lg">
              Description
            </span>
            <Textarea
              onBlur={() => updateRfpDetails(id, updateData)}
              onChange={sessionDescription}
              value={description}
              placeholder="Tesla’s factory has incredible demands on it to hit their targets. A result of this pressure is that their management team is becoming to feel burnt out. They need better tools to keep their teams accountable and happy."
              className="bg-[#f1f1f8] rounded-lg"
            />
          </div>
          <div className="col-span-12">
            <div className="col-span-12 flex flex-col gap-[8px]">
              <span className="text-[#232550] font-[Neutrafacetext-SemiBold] not-italic font-semibold text-lg">
                Upload RFP
              </span>
              <div className="w-full h-[128px] bg-[#F1F1F8] rounded-lg flex flex-col justify-center items-center p[1.5rem] gap-1 cursor-pointer relative">
                <UploadPDF
                  setFile={setFile}
                  file={file}
                  removeGeneratePDF={removeGeneratePDF}
                  uploadedFile={uploadedFile}
                  setUploadedFile={setUploadedFile}
                />

                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="spinner border-t-transparent border-solid border-2 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Button
              className="bg-[#5555a7] rounded-lg text-white"
              color="primary"
              onClick={handleGeneratePDF}
            >
              Generate Answers For RFP
            </Button>
          </div>
        </div>
        <ShareSession
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          id={id}
          participantMember={participantMember}
          setParticipantMember={setParticipantMember}
        />
      </div>
    </>
  );
}

export default RfpsDetails;
