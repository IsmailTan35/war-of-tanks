import { createSlice } from "@reduxjs/toolkit";

interface AmmoState {
  cannonAmmo: number;
  machineGunAmmo: number;
}

const { reducer, actions } = createSlice({
  name: "ammo",
  initialState: {
    cannonAmmo: 16,
    machineGunAmmo: 50,
  } as AmmoState,
  reducers: {
    update: (
      state,
      action: {
        payload: {
          ammoType: "cannonAmmo" | "machineGunAmmo";
          ammoCount: number;
        };
      }
    ) => {
      const { ammoType, ammoCount } = action.payload;
      state[ammoType] = ammoCount;
    },
    increase: (
      state,
      action: {
        payload: {
          ammoType: "cannonAmmo" | "machineGunAmmo";
          ammoCount: number;
        };
      }
    ) => {
      const { ammoType, ammoCount = 0 } = action.payload;
      state[ammoType] += ammoCount;
    },
    decrease: (
      state,
      action: {
        payload: {
          ammoType: "cannonAmmo" | "machineGunAmmo";
          ammoCount: number;
        };
      }
    ) => {
      const { ammoType, ammoCount = 0 } = action.payload;
      state[ammoType] -= ammoCount;
    },
  },
});

export { actions as ammoActions };
export { reducer as ammoReducer };
