import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "../slice/resumeSlice";
import templatesReducer from "../slice/templatesSlice";
import userReducer from "../slice/userDetailsSlice";
export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    templates: templatesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
