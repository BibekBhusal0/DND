import { coors, layoutStateType, layoutType } from "../types/layout";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: layoutStateType = {
  grid: { x: 12, y: 8 },

  max_id: 1,
  layout: [
    { id: 0, position: { x: 1, y: 1, w: 5, h: 2 } },
    { id: 1, position: { x: 1, y: 4, w: 5, h: 2 } },
  ],
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    addWidget: (
      state: layoutStateType,
      action: PayloadAction<{ coors: coors }>
    ) => {
      state.max_id += 1;
      state.layout.push({
        id: state.max_id,
        position: action.payload.coors,
      });
    },

    removeWidget: (state: layoutStateType, action: PayloadAction<number>) => {
      state.layout = state.layout.filter(
        (widget) => widget.id !== action.payload
      );
    },
    setLayout: (state: layoutStateType, action: PayloadAction<layoutType>) => {
      state.layout = action.payload;
    },
  },
});

export const { addWidget, removeWidget, setLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
