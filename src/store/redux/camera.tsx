import { createSlice } from "@reduxjs/toolkit";

interface ICamera {
  selectedID: number | null;
  maxCamera: number;
  spectatorMode: boolean;
}
const { reducer, actions } = createSlice({
  name: "camera",
  initialState: {
    selectedID: 0,
    maxCamera: 0,
    spectatorMode: false,
  } as ICamera,
  reducers: {
    mutationCamera: (state, action: { payload: number }) => {
      state.maxCamera += action.payload;
    },
    update: (state, action: { payload: number | null }) => {
      if (!state.spectatorMode) {
        state.selectedID = 0;
        return;
      }
      if (state.selectedID === null) return;
      if (state.selectedID + 1 > state.maxCamera) {
        state.selectedID = 1;
      } else {
        state.selectedID += 1;
      }
    },
    updateSpectatorMode: (state, action) => {
      state.spectatorMode = action.payload;
    },
    updateMaxCamera: (state, action) => {
      state.maxCamera = action.payload;
    },
    deleteUser: state => {
      state.selectedID = null;
    },
  },
});

export { actions as cameraActions };
export { reducer as cameraReducer };
