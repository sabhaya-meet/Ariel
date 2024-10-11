import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import AddNewQuestion from "./AddNewQuestion";
import RfpsDetails from "./RfpsDetails";
import { Button } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateQuestionOrder } from "../../store/questionReducer";
import { AiQuestionUpdateApi } from "./Data";
import { useParams } from "react-router-dom";

const RfpSession = () => {
  const [isNewQuestion, setIsNewQuestion] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  let { id } = useParams();

  const isMobile = useMediaQuery({
    query: "(max-width: 992px)",
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state?.questions?.questionsList) || []; // Ensure data is an array

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source?.index) return;

    const reorderedList = Array.from(data);
    const [movedQuestion] = reorderedList.splice(source?.index, 1);
    reorderedList.splice(destination?.index, 0, movedQuestion);

    if (destination?.index > source?.index) {
      for (let i = source?.index; i <= destination?.index; i++) {
        const questionId = reorderedList[i]?.id;
        AiQuestionUpdateApi(id, questionId, { display_order: i });
      }
    }

    if (destination?.index < source?.index) {
      for (let i = destination?.index; i <= source?.index; i++) {
        const questionId = reorderedList[i]?.id;
        AiQuestionUpdateApi(id, questionId, { display_order: i });
      }
    }

    dispatch(updateQuestionOrder(reorderedList));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="questionsList">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <RfpsDetails />
            <div
              className={
                isMobile
                  ? "flex flex-col flex-wrap gap-6 m-5 rounded-2xl"
                  : "flex flex-col flex-wrap gap-6 w-[610px] m-6 ml-9 rounded-2xl"
              }
            >
              {data?.length > 0 ? (
                data.map((questionData, index) => (
                  <Draggable
                    key={questionData.id}
                    draggableId={String(questionData.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <AddNewQuestion
                          key={questionData.id}
                          questionData={questionData}
                          id={index}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>No questions available</p>
              )}
              {provided.placeholder}
            </div>

            {showQuestion && (
              <div
                className={
                  isMobile
                    ? "flex flex-col flex-wrap gap-6 m-5 rounded-2xl p-6 bg-white"
                    : "flex flex-col flex-wrap gap-6 w-[610px] m-6 ml-9 rounded-2xl bg-white p-6"
                }
              >
                <AddNewQuestion
                  setIsNewQuestion={setIsNewQuestion}
                  isNewQuestion={isNewQuestion}
                  setShowQuestion={setShowQuestion}
                />
              </div>
            )}

            <div className={isMobile ? "" : "ml-5"}>
              <Button
                onClick={() => {
                  setIsNewQuestion(true);
                  setShowQuestion(true);
                }}
                variant="bordered"
                startContent={<GoPlus className="h-5 w-5" />}
                className="bg-[#87297d] text-white rounded-lg ml-4"
              >
                Add New Question
              </Button>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RfpSession;

// import React, { useState } from "react";
// import { GoPlus } from "react-icons/go";
// import AddNewQuestion from "./AddNewQuestion";
// import RfpsDetails from "./RfpsDetails";
// import { Button, useDisclosure, useSelect } from "@nextui-org/react";
// import { useMediaQuery } from "react-responsive";
// import { Provider, useSelector } from "react-redux";
// import { DragDropContext } from "react-beautiful-dnd";
// import { Droppable } from "react-beautiful-dnd";

// const RfpSession = () => {
//   const [isNewQuestion, setIsNewQuestion] = useState(false);
//   const [showQuestion, setShowQuestion] = useState(false);
//   // const [questionsList, setQuestionsList] = useState([]);

//   const isMobile = useMediaQuery({
//     query: "(max-width: 992px)",
//   });

//   const data = useSelector((state) => state.questions.questionsList);

//   return (
//     <DragDropContext>
//       <Droppable droppableId="characters">
//         {(provided) => (
//           <div>
//             <RfpsDetails />
//             <div
//               className={
//                 isMobile
//                   ? "flex flex-col flex-wrap gap-6 m-5 rounded-2xl   "
//                   : "flex flex-col flex-wrap gap-6  w-[610px] m-6 ml-9 rounded-2xl  "
//               }
//             >
//               {data.map((questionData, id) => {
//                 return (
//                   <AddNewQuestion
//                     // setQuestionsList={setQuestionsList}
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                     key={id}
//                     questionData={questionData}
//                   />
//                 );
//               })}
//             </div>

//             {showQuestion && (
//               <div
//                 className={
//                   isMobile
//                     ? "flex flex-col flex-wrap gap-6 m-5 rounded-2xl p-6  bg-white"
//                     : "flex flex-col flex-wrap gap-6  w-[610px] m-6 ml-9 rounded-2xl bg-white p-6"
//                 }
//               >
//                 <AddNewQuestion
//                   setIsNewQuestion={setIsNewQuestion}
//                   isNewQuestion={isNewQuestion}
//                   // onOpen={onDeleteModalOpen}
//                   setShowQuestion={setShowQuestion}
//                 />
//               </div>
//             )}
//             <div className={isMobile ? "" : "ml-5"}>
//               <Button
//                 onClick={() => {
//                   setIsNewQuestion(true);
//                   setShowQuestion(true);
//                 }}
//                 variant="bordered"
//                 startContent={<GoPlus className="h-5 w-5" />}
//                 className="bg-[#87297d] text-white rounded-lg ml-4 "
//               >
//                 Add New Quesstion
//               </Button>
//             </div>
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default RfpSession;
