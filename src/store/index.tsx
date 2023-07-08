import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { tanksPositionReducer as tanksPosition } from "./redux/tanksPosition";
import { cameraReducer as camera } from "./redux/camera";

export { tanksPositionActions } from "./redux/tanksPosition";
export { cameraActions } from "./redux/camera";

const reducer = combineReducers({
  tanksPosition,
  camera,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
