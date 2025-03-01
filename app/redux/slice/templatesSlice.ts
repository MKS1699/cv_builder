import { TemplatesSliceTypes } from "@/app/types/templatesSliceTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const EMPTYTEMPLATESSLICETYPES: TemplatesSliceTypes = {
  templatesDivIds: [],
};

const initialState: TemplatesSliceTypes = EMPTYTEMPLATESSLICETYPES;

export const templatesSlice = createSlice({
  name: "Template Slice",
  initialState,
  reducers: {
    resetTemplateSliceState: (state) => {
      state.templatesDivIds = [];
    },
    addTemplateId: (state, action: PayloadAction<string>) => {
      state.templatesDivIds.push(action.payload);
    },
  },
});

export const { resetTemplateSliceState, addTemplateId } =
  templatesSlice.actions;
export default templatesSlice.reducer;
