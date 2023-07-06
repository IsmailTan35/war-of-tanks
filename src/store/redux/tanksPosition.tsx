import { createSlice } from "@reduxjs/toolkit";

interface TanksPositionState {
  player: [number, number, number] | null;
  remotePlayers: { id: string; position: [number, number, number] }[];
}
const { reducer, actions } = createSlice({
  name: "userActions",
  initialState: {
    player: null,
    remotePlayers: [],
  } as TanksPositionState,
  reducers: {
    updatePosition: (
      state,
      action: { payload: [number, number, number] | null; type: string }
    ) => {
      state.player = action.payload;
    },
    updateRemotePositions: (
      state,
      action: {
        payload: { id: string; position: [number, number, number] } | null;
        type: string;
      }
    ) => {
      const { payload } = action;
      const divide = 200;

      if (payload && payload.id && payload.position) {
        if (payload?.id && payload?.position) {
          const { id, position } = payload;
          const fixedPosition = [
            position[0] / divide,
            position[1] / divide,
            position[2] / divide,
          ];
          const updatedArray = state.remotePlayers.reduce(
            (acc: any, item: any) => {
              if (item.id === id) {
                return [...acc, { id, position: fixedPosition }];
              }
              return [...acc, item];
            },
            []
          );

          if (!updatedArray.some((item: any) => item.id === payload.id)) {
            updatedArray.push({
              id: payload.id,
              position: fixedPosition,
            });
          }
          state.remotePlayers = updatedArray;
        }
      }
    },
    deleteRemotePosition: (
      state,
      action: { payload: string; type: string }
    ) => {
      const { payload } = action;
      state.remotePlayers = state.remotePlayers.filter(
        item => item.id !== payload
      );
    },

    deleteToken: state => {
      state.player = null;
    },
    deleteUser: state => {
      state.player = null;
    },
  },
});

export { actions as tanksPositionActions };
export { reducer as tanksPositionReducer };
