import { allThemesType, themeStateType, themeType } from "../types/theme";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const allThemes: allThemesType = {
  "purple light": {
    text: "#040316",
    background: "#fbfbfe",
    primary: "#2119c8",
    secondary: "#dddbff",
    accent: "#8b8abc",
  },
  "pink light": {
    text: "#2d081b",
    background: "#f9e2f6",
    primary: "#ce2727",
    secondary: "#ad1e9c",
    accent: "#ff3d84",
  },
  "pink dark": {
    text: "#f7d4e6",
    background: "#1e061a",
    primary: "#d83131",
    secondary: "#e052d0",
    accent: "#c20047",
  },
  "green dark": {
    text: "#a9eab4",
    background: "#021307",
    primary: "#45eb87",
    secondary: "#345446",
    accent: "#4fb174",
  },
};

const initialState: themeStateType = {
  current_theme: "green dark",
  all_themes: allThemes,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state: themeStateType, action: PayloadAction<string>) => {
      if (Object(state.all_themes).hasOwnProperty(action.payload)) {
        state.current_theme = action.payload;
      }
    },
    addTheme: (
      state: themeStateType,
      action: PayloadAction<{ name: string; theme: themeType }>
    ) => {
      if (!Object(state.all_themes).hasOwnProperty(action.payload.name)) {
        state.all_themes[action.payload.name] = action.payload.theme;
      }
    },
  },
});

export const { setTheme, addTheme } = themeSlice.actions;
export default themeSlice.reducer;
