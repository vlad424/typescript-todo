import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ReduxState } from "../../types/redux_state";

const initialState: ReduxState = {
  tasks: [
    {
      name: "today",
      _id: 0,
      todos: [{ name: "make together", desc: "", date: "", _id: 1 }],
    },
    {
      name: "tommorow",
      _id: 1,
      todos: [{ name: "make another", desc: "", date: "", _id: 1 }],
    },
  ],
  
  selectedTaskArrayID: 0,
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
    },
    putTask(state, action : PayloadAction<ITask>) {
      const last_id = state.tasks.find((el) => el._id === state.selectedTaskArrayID)?.todos.at(-1)?._id

      const ready_task : ITask = {
        name: action.payload.name,
        desc: action.payload.desc,
        date: action.payload.date,
        _id: last_id ? last_id + 1 : 0,
      }

      state.tasks.find((el) => el._id === state.selectedTaskArrayID)?.todos.push(ready_task)
    }
  }
})

export default taskSlice.reducer;