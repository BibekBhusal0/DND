import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changeProjectType, todoStateType } from "../types/todo";

const initialState: todoStateType = {
  max_id: 1,
  projects: [
    {
      sorted: false,
      filtered: false,
      id: 1,
      title: "All Tasks",
      tasks: [{ id: 1, task: "Task 1", checked: true }],
      max_id: 1,
    },
  ],
};

export const todoSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    addProject: (
      state: todoStateType,
      action: PayloadAction<{ title: string }>
    ) => {
      state.projects.push({
        filtered: false,
        sorted: false,
        id: state.max_id + 1,
        title: action.payload.title,
        tasks: [],
        max_id: 1,
      });
      state.max_id++;
    },
    addTodo: (
      state: todoStateType,
      action: PayloadAction<{ project_id: number; task: string }>
    ) => {
      const project = state.projects.find(
        (p) => p.id === action.payload.project_id
      );
      if (project) {
        project.tasks.push({
          id: project.max_id + 1,
          task: action.payload.task,
          checked: false,
        });
        project.max_id++;
      }
    },
    deleteProject: (state: todoStateType, action: PayloadAction<number>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    deleteTodo: (
      state: todoStateType,
      action: PayloadAction<{ project_id: number; todo_id: number }>
    ) => {
      const project = state.projects.find(
        (p) => p.id === action.payload.project_id
      );
      if (project) {
        project.tasks = project.tasks.filter(
          (t) => t.id !== action.payload.todo_id
        );
      }
    },
    changeProject(
      state: todoStateType,
      action: PayloadAction<changeProjectType>
    ) {
      const project = state.projects.find(
        (p) => p.id === action.payload.project_id
      );
      if (project) {
        if (action.payload.change_item === "todo") {
          if (project.filtered) {
            project.tasks = [
              ...action.payload.todo,
              ...project.tasks.filter((a) => a.checked),
            ];
          } else {
            project.tasks = action.payload.todo;
          }
          project.sorted = false;
        } else {
          project.title = action.payload.title;
        }
      }
    },
    changeTodo(
      state: todoStateType,
      action: PayloadAction<{
        project_id: number;
        todo_id: number;
        task: string;
      }>
    ) {
      const project = state.projects.find(
        (p) => p.id === action.payload.project_id
      );
      if (project) {
        const todo = project.tasks.find((t) => t.id === action.payload.todo_id);
        if (todo) {
          todo.task = action.payload.task;
        }
      }
    },
    toggleTodo(
      state: todoStateType,
      action: PayloadAction<{ project_id: number; todo_id: number }>
    ) {
      const project = state.projects.find(
        (p) => p.id === action.payload.project_id
      );
      if (project) {
        const todo = project.tasks.find((t) => t.id === action.payload.todo_id);
        if (todo) {
          todo.checked = !todo.checked;
        }
      }
    },

    toggleSortedFiltered: (
      state,
      action: PayloadAction<{ id: number; type: "sorted" | "filtered" }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.id);
      if (project) {
        project[action.payload.type] = !project[action.payload.type];
        if (action.payload.type === "sorted") project.filtered = false;
        if (action.payload.type === "filtered") project.sorted = false;
      }
    },
  },
});

export const {
  addProject,
  addTodo,
  deleteProject,
  deleteTodo,
  changeProject,
  changeTodo,
  toggleTodo,
  toggleSortedFiltered,
} = todoSlice.actions;
export default todoSlice.reducer;
