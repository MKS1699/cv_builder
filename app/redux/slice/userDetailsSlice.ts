import { UserSliceTypes } from "@/app/types/userDetailsSliceTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const EMPTYUSERSTATE: UserSliceTypes = {
  chosenTemplate: "",
  saveDataLoaded: false,
};

const initialState: UserSliceTypes = EMPTYUSERSTATE;

const userDetailsSlice = createSlice({
  name: "User Details",
  initialState,
  reducers: {
    resetState: (state) => {
      state.chosenTemplate = EMPTYUSERSTATE.chosenTemplate;
      state.saveDataLoaded = EMPTYUSERSTATE.saveDataLoaded;
    },
    setChosenTemplate: (
      state,
      action: PayloadAction<UserSliceTypes["chosenTemplate"]>
    ) => {
      state.chosenTemplate = action.payload;
    },
    setSaveDataLoaded: (state, action: PayloadAction<boolean>) => {
      state.saveDataLoaded = action.payload;
    },
  },
});

export const { resetState, setChosenTemplate, setSaveDataLoaded } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
