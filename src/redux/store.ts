import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import projectsMiddleware from "./middle";

export const store = configureStore({
  reducer: { todo: todoReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// https://redux-toolkit.js.org/tutorials/quick-start
