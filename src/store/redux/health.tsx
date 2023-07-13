import { createSlice } from "@reduxjs/toolkit";

interface HealtyState {
  health: number;
}

const { reducer, actions } = createSlice({
  name: "health",
  initialState: {
    health: 500,
  } as HealtyState,
  reducers: {
    update: (
      state,
      action: {
        payload: {
          healCount: number;
        };
      }
    ) => {
      const { healCount } = action.payload;
      state.health = healCount;
    },
    increase: (
      state,
      action: {
        payload: {
          healCount: number;
        };
      }
    ) => {
      const { healCount } = action.payload;
      state.health += healCount;
    },
    decrease: (
      state,
      action: {
        payload: {
          healCount: number;
        };
      }
    ) => {
      const { healCount } = action.payload;
      state.health -= healCount;
    },
  },
});

export { actions as healthActions };
export { reducer as healthReducer };
