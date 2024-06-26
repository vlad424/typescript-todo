import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IListsState } from "../../types/lists.state";
import { IAdminList, IAdminListArray } from "../../types/rtk.types";

const initialState : IListsState = {
  currentList: {},
  currentElList: {},
  userShare: []
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
    },
    setElList(state, action: PayloadAction<IAdminList | {}>) {
      state.currentElList = action.payload
    },
    clearElList(state, action: PayloadAction<any>) {
      let list_index;
      const id = (state.currentElList as IAdminList).id 
      if(Object.keys(state.currentList).length !== 0) {
        list_index = (state.currentList as IAdminListArray).lists.findIndex(x => x.id === id)
      }
      if(list_index !== -1) {
        (state.currentList as IAdminListArray).lists.splice((list_index as number), 1)
      }
      state.currentElList = {}
    },
    changeElInList(state, action) {
      let list_index;
      if(Object.keys(state.currentList).length !== 0) {
        list_index = (state.currentList as IAdminListArray).lists.findIndex(x => x.id === action.payload.id)
      }
      if(list_index !== -1) {
        (state.currentList as IAdminListArray).lists.splice((list_index as number), 1)
      }
      (state.currentList as IAdminListArray).lists.push(action.payload)
    },
    setUserShare(state, action : PayloadAction<Array<string>>) {
      state.userShare = action.payload
    }
  }
})

export default listSlice.reducer