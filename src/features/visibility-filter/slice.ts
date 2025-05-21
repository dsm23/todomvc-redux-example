import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const filters = {
  SHOW_ALL: "show_all",
  SHOW_COMPLETED: "show_completed",
  SHOW_ACTIVE: "show_active",
} as const;

export type VisibilityFilter = (typeof filters)[keyof typeof filters];

interface VisibilityFilterState {
  value: VisibilityFilter;
}

const initialState = {
  value: "show_all",
} satisfies VisibilityFilterState as VisibilityFilterState;

const visibilityFilterSlice = createSlice({
  name: "visibilityFilter",
  initialState,
  reducers: {
    setVisibilityFilter(state, action: PayloadAction<VisibilityFilter>) {
      state.value = action.payload;
    },
  },
  selectors: {
    getVisibilityFilter: (state) => state.value,
  },
});

export const { setVisibilityFilter } = visibilityFilterSlice.actions;
export const { getVisibilityFilter } = visibilityFilterSlice.selectors;

export default visibilityFilterSlice.reducer;
