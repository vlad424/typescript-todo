import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ReduxState } from "../../types/redux_state";

const initialState: ReduxState = {
  tasks: [
    {
      name: "today",
      _id: 0,
      todos: [{ name: "make together", desc: "", date: new Date().toString(), _id: 0 }],
    },
    {
      name: "tommorow",
      _id: 1,
      todos: [{ name: "make another", desc: "", date: new Date().toString(), _id: 0 }],
    },
  ],
  
  selectedTaskArrayID: 0,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,  
  reducers: {
    putArrayTask(state, action : PayloadAction<string>) {
      const last_id = state.tasks.at(-1)?._id // last id in arrays

      if(last_id === undefined) {
        state.tasks.push(
          {
            name: action.payload,
            _id: 0,
            todos: []
          }
        )
      } // if array is null
      else {
        state.tasks.push(
          {
            name: action.payload,
            _id: last_id + 1,
            todos: []
          }
        )
      }
    }, // reducer, create a new array of task (state.tasks)
    putTask(state, action : PayloadAction<ITask>) {
      const last_id = state.tasks.find((el) => el._id === state.selectedTaskArrayID)?.todos.at(-1)?._id

      const ready_task : ITask = {
        name: action.payload.name,      // name (user input)
        desc: action.payload.desc,      // desc (user input)
        date: action.payload.date.toString(),      // date of creation
        _id: last_id ? last_id + 1 : 0, // dynamic id
      }

      state.tasks.find((el) => el._id === state.selectedTaskArrayID)?.todos.push(ready_task)
    }, // reducer, create a new task ( state.tasks[array_id].todos )
    changeSelectedArray(state, action : PayloadAction<number>) {
      state.selectedTaskArrayID = action.payload;
    }, // reducer, change selected array of task. 
  }
})

export default taskSlice.reducer;