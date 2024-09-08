import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import layoutReducer from "./layoutSlice";

export const store = configureStore({
  reducer: { layout: layoutReducer, theme: themeReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// https://redux-toolkit.js.org/tutorials/quick-start
