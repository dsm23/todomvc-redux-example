import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import rootReducer from "~/reducers";

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
