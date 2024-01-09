import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReduxState } from "../../types/redux_state";

const initialState: ReduxState = {
  tasks: [
    {
      name: "today",
      _id: 0,
      todos: [{ name: "make together", desc: "", date: "", _id: 0 }],
    },
    {
      name: "tommorow",
      _id: 1,
      todos: [{ name: "make another", desc: "", date: "", _id: 1 }],
    },
  ],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,  
  reducers: {
    putArrayTask(state, action : PayloadAction<string>) {
      const last_id = state.tasks.at(-1)?._id

      if(last_id === undefined) {
        state.tasks.push(
          {
            name: action.payload,
            _id: 0,
            todos: []
          }
        )
      }
      else {
        state.tasks.push(
          {
            name: action.payload,
            _id: last_id + 1,
            todos: []
          }
        )
      }
    }

    
  }
})

export default taskSlice.reducer;