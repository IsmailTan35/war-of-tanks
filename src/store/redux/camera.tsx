import { createSlice } from "@reduxjs/toolkit";

interface ICamera {
  selectedID: number | null;
  isDead: boolean;
  maxCamera: number;
}
const { reducer, actions } = createSlice({
  name: "camera",
  initialState: {
    selectedID: 0,
    maxCamera: 0,
  } as ICamera,
  reducers: {
    update: (state, action: { payload: number | null }) => {
      if (state.selectedID === null) return;
      if (state.selectedID + 1 > state.maxCamera) {
        state.selectedID = 0;
      } else {
        state.selectedID += 1;
      }
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
