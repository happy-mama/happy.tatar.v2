import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const coinsSlice = createSlice({
  name: "coins",
  initialState: { value: 0 },
  reducers: {
    setCoins: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    addCoins: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export default coinsSlice;
export const { setCoins, addCoins } = coinsSlice.actions;
