import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { tanksPositionReducer as tanksPosition } from "./redux/tanksPosition";
import { cameraReducer as camera } from "./redux/camera";
import { ammoReducer as ammo } from "./redux/ammo";
import { healthReducer as health } from "./redux/health";

export { ammoActions } from "./redux/ammo";
export { tanksPositionActions } from "./redux/tanksPosition";
export { cameraActions } from "./redux/camera";
export { healthActions } from "./redux/health";

const reducer = combineReducers({
  tanksPosition,
  camera,
  ammo,
  health,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
