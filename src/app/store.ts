import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
// import rootReducer from "~/reducers";
import todos from "~/features/todos/slice";
import visibilityFilter from "~/features/visibility-filter/slice";

export const store = configureStore({
  reducer: combineReducers({
    todos,
    visibilityFilter,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
