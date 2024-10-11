import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  profileImage: null,
};
const slice = createSlice({
  name: "userDetailSlice",
  initialState,
  reset: () => initialState,
  reducers: {
    setProfile(state, action) {
      state.user = action.payload;
    },
    setProfileImage(state, action) {
      state.profileImage = action.payload;
    },
  },
});
export const { reducer } = slice;
export const userActions = slice.actions;
export default slice;
