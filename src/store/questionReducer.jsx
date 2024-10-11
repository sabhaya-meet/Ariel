import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  questionsList: [],
};

const questionsSlice = createSlice({
  name: "questionList",
  initialState,
  reducers: {
    setQuestionList(state, action) {
      state.questionsList = action.payload;
    },
    updateQuestionOrder(state, action) {
      state.questionsList = action.payload;
    },
    likedAnswerUpdate(state, action) {
      state.questionsList = action.payload;
    },
  },
});

export const { reducer } = questionsSlice;
export const { setQuestionList, updateQuestionOrder, likedAnswerUpdate } =
  questionsSlice.actions;
export default questionsSlice;
