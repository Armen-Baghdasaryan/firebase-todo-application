import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
