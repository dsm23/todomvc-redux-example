import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";

const filters = {
  SHOW_ALL: "show_all",
  SHOW_COMPLETED: "show_completed",
  SHOW_ACTIVE: "show_active",
} as const;

type VisibilityFilter = (typeof filters)[keyof typeof filters];

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
});

export const { setVisibilityFilter } = visibilityFilterSlice.actions;

export const getVisibilityFilter = (state: RootState) =>
  state.visibilityFilter.value;

export default visibilityFilterSlice.reducer;
