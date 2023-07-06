import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";

import { tanksPositionReducer as tanksPosition } from "./redux/tanksPosition";

export { tanksPositionActions } from "./redux/tanksPosition";

const reducer = combineReducers({
  tanksPosition,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
