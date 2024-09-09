import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import layoutReducer from "./layoutSlice";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: { layout: layoutReducer, theme: themeReducer, todo: todoReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// https://redux-toolkit.js.org/tutorials/quick-start
