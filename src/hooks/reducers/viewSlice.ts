import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { changeHeightPayload, initialStateView } from "../../types/viewSliceState";

const initialState : initialStateView = {
  width: 0,
  height: 0,
  wrap: "nowrap",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    changeHeight(state, action: PayloadAction<changeHeightPayload>) {
			state.height = action.payload.height
      state.width = action.payload.width
		},
    changeViewBlock(state, action: PayloadAction<changeHeightPayload>) {
			if(state.height > action.payload.height) {
        state.wrap = 'wrap'
      }
      if(state.height < action.payload.height && state.width < action.payload.width) {
        state.wrap = 'nowrap'
      }
		},
  },
});

export default viewSlice.reducer