import { Middleware } from "@reduxjs/toolkit";
import db from "../daxie/todo";
import { projectType } from "../types/todo";

const projectsMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action.type.startsWith("todo/")) {
    const previousState = store.getState().todo.projects;
    const result = next(action);
    const currentState = store.getState().todo.projects;

    currentState.forEach(async (project: projectType, index: number) => {
      if (JSON.stringify(project) !== JSON.stringify(previousState[index])) {
        try {
          await db.table("projects").put(project);
        } catch (error) {}
      }
    });

    return result;
  } else {
    return next(action);
  }
};

export default projectsMiddleware;
