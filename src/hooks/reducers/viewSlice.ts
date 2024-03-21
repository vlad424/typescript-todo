import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: 0,
  height: 0,
  wrap: "nowrap",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    changeHeight(state, action: PayloadAction<number>) {
			state.height = action.payload
      state.width = action.payload
		},
    changeViewBlock(state, action: PayloadAction<number>) {
			if(state.height > action.payload) {
        state.wrap = 'wrap'
      }
		},
  },
});

export default viewSlice.reducer