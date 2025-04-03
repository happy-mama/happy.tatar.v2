import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UpgradeNames = "mouse" | "rocket" | "worm" | "ptenec" | "windmill";

export type Upgrade = {
  name: UpgradeNames;
  cps: number;
  price: number;
  active: boolean;
  position: {
    x: number;
    y: number;
  };
  animationTime: number;
};

const initialState: {
  all: {
    [key in UpgradeNames]: Upgrade;
  };
  result: {
    cps: number;
  };
} = {
  all: {
    mouse: {
      name: "mouse",
      cps: 1,
      price: 15,
      active: false,
      position: { x: 45, y: 0 },
      animationTime: 5,
    },
    rocket: {
      name: "rocket",
      cps: 5,
      price: 54,
      active: false,
      position: { x: 163, y: 0 },
      animationTime: 15,
    },
    worm: {
      name: "worm",
      cps: 10,
      price: 80,
      active: false,
      position: { x: 250, y: 0 },
      animationTime: 30,
    },
    ptenec: {
      name: "ptenec",
      cps: 15,
      price: 144,
      active: false,
      position: { x: 300, y: 0 },
      animationTime: 10,
    },
    windmill: {
      name: "windmill",
      cps: 20,
      price: 200,
      active: false,
      position: { x: 400, y: 0 },
      animationTime: 4,
    },
  },
  result: {
    cps: 0,
  },
};

const upgradesSlice = createSlice({
  name: "upgrades",
  initialState,
  reducers: {
    activateUpgrade: (state, action: PayloadAction<UpgradeNames>) => {
      state.all[action.payload].active = true;
      state.result.cps += state.all[action.payload].cps;
    },
  },
});

export default upgradesSlice;
export const { activateUpgrade } = upgradesSlice.actions;
