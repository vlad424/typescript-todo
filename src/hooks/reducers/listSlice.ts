import { createSlice } from "@reduxjs/toolkit";
import { IListsState } from "../../types/lists.state";

const initialState : IListsState = {
  lists: [
    {
      id: 0,
      name: "hello",
      list: []
    }
  ]
}
export const listSlice = createSlice({
  name: 'slices',
  initialState,
  reducers: {

  }
})

export default listSlice.reducer