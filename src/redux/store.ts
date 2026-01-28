import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slide/counterslice"; 

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  } // 👈 Add your reducers here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;