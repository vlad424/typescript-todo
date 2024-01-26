import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskSaveAction, ReduxState } from "../../types/redux_state";

const initialState: ReduxState = {
  tasks: [
    {
      name: "today",
      _id: 0,
      todos: [
        {
          name: "make together",
          desc: "",
          date: new Date().toString(),
          _id: 1,
        },
      ],
    },
    {
      name: "tommorow",
      _id: 1,
      todos: [
        { name: "make another", desc: "", date: new Date().toString(), _id: 1 },
      ],
    },
  ],

  selectedTaskArrayID: 0,
  selectedTaskID: 1,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    putArrayTask(state, action: PayloadAction<string>) {
      const last_id = state.tasks.at(-1)?._id; // last id in arrays

      if (last_id === undefined) {
        state.tasks.push({
          name: action.payload,
          _id: 0,
          todos: [],
        });
      } // if array is null
      else {
        state.tasks.push({
          name: action.payload,
          _id: last_id + 1,
          todos: [],
        });
      }
    }, // reducer, create a new array of task (state.tasks)
    putTask(state, action: PayloadAction<ITask>) {
      const last_id = state.tasks
        .find((el) => el._id === state.selectedTaskArrayID)
        ?.todos.at(-1)?._id;

      const ready_task: ITask = {
        name: action.payload.name, // name (user input)
        desc: action.payload.desc, // desc (user input)
        date: action.payload.date.toString(), // date of creation
        _id: last_id ? last_id + 1 : 0, // dynamic id
      }; 

      state.tasks
        .find((el) => el._id === state.selectedTaskArrayID)
        ?.todos.push(ready_task);
    }, // reducer, create a new task ( state.tasks[array_id].todos )
    changeSelectedArray(state, action: PayloadAction<number>) {
      state.selectedTaskArrayID = action.payload;
    }, // reducer, change current selected array of task (id)
    changeSelectedTask(state, action: PayloadAction<number>) {
      state.selectedTaskID = action.payload;
    }, // reducer, change current selected task (id)
    deleteTask(state, action: PayloadAction<number>) {
      const selected_arr : any = 
      
      state.tasks.find((el) => el._id === state.selectedTaskArrayID)?.todos.findIndex((el) => el._id === action.payload) ?
      state.tasks.find((el) => el._id === state.selectedTaskArrayID)?.todos.findIndex((el) => el._id === action.payload) : 0
      
      state.tasks
         .find((el) => el._id === state.selectedTaskArrayID)
         ?.todos.splice(
           selected_arr,
           1
        );
    },
    saveChangesTask(state, action: PayloadAction<ITaskSaveAction>) {
      const change : number = state.tasks.find((el) => el._id === state.selectedTaskArrayID)!.todos.findIndex((el) => el._id === action.payload._id) ? 

      state.tasks.find((el) => el._id === state.selectedTaskArrayID)!.todos.findIndex((el) => el._id === action.payload._id) : 0

      state.tasks.find((el) => el._id === state.selectedTaskArrayID)!.todos[change].desc = action.payload.desc
    },
  },
});

export default taskSlice.reducer;
