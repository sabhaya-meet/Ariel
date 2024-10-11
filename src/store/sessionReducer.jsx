import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionList: [],
};
const sliceSesstion = createSlice({
  name: "sesstionSlice",
  initialState,
  reset: () => initialState,
  reducers: {
    setSessionList(state, action) {
      state.sessionList = action.payload;
    },
  },
});
export const { reducer } = sliceSesstion;
export const userSession = sliceSesstion.actions;
export default sliceSesstion;
