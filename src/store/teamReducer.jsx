import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  teamMember: [],
};

const teamMembersSlice = createSlice({
  name: "teamMember",
  initialState,
  reducers: {
    setTeamMemberList(state, action) {
      state.teamMember = action.payload;
    },
  },
});

export const { reducer } = teamMembersSlice;
export const teamMember = teamMembersSlice.actions;
export default teamMembersSlice;
