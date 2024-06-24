import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IListsState } from "../../types/lists.state";
import { IAdminListArray } from "../../types/rtk.types";

const initialState : IListsState = {
  currentList: {}
}
export const listSlice = createSlice({
  name: 'slices',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<IAdminListArray | {}>) {
      state.currentList = action.payload
    },
    pushElToList(state, action: PayloadAction<any>) {
      (state.currentList as IAdminListArray).lists.push(action.payload)
    }
  }
})

export default listSlice.reducer