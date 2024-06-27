import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IArrayTasks,
  IColorObjectAction,
  IMoveTask,
  ITask,
  ITaskSaveAction,
  IUser,
  ReduxState,
} from "../../types/redux_state";

const initialState: ReduxState = {
  tasks: [
    {
      name: "Today",
      id: 0,
      todos: [
        {
          name: "make together",
          desc: "",
          date:
            new Date().toLocaleDateString().toString() +
            " " +
            new Date().toLocaleTimeString().toString(),
          id: 1,
          text_color: "#000",
          comment: {message: ''}
        },
      ],
    },
    {
      name: "Tommorow",
      id: 1,
      todos: [
        {
          name: "make anoth1er",
          desc: "",
          date:
            new Date().toLocaleDateString().toString() +
            " " +
            new Date().toLocaleTimeString().toString(),
          id: 1,
          text_color: "#000",
          comment: {message: ''}
        },
      ],
    },
  ],

  selectedTaskArrayID: 0,
  selectedTaskID: 0,

  User: null,
  isLogined: false,
  isLoading: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    putArrayTask(state, action: PayloadAction<string>) {
      const lastId = state.tasks.at(-1)?.id; // last id in arrays
      if (lastId === undefined) {
        state.tasks.push({
          name: action.payload,
          id: 0,
          todos: [],
        });
      } // if array is null
      else {
        state.tasks.push({
          name: action.payload,
          id: lastId + 1,
          todos: [],
        });
      }
    }, // reducer, create a new array of task (state.tasks)
    putTask(state, action: PayloadAction<ITask>) {
      state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.push(action.payload);
    }, // reducer, create a new task ( state.tasks[arrayid].todos )
    changeSelectedArray(state, action: PayloadAction<number>) {
      state.selectedTaskArrayID = action.payload;

      state.selectedTaskID = -1;
    }, // reducer, change current selected array of task (id)
    changeSelectedTask(state, action: PayloadAction<number>) {
      state.selectedTaskID = action.payload;
    }, // reducer, change current selected task (id)
    deleteTask(state, action: PayloadAction<number>) {
      const selected_arr: any = state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.findIndex((el) => el.id === action.payload)
        ? state.tasks
            .find((el) => el.id === state.selectedTaskArrayID)
            ?.todos.findIndex((el) => el.id === action.payload)
        : 0;

      state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.splice(selected_arr, 1);
      state.selectedTaskID = -1;
    }, // reducer, delete current selected task in array of task
    deleteArrayTasks(state, action: PayloadAction<number>) {
      state.selectedTaskArrayID = 0

      state.tasks = state.tasks.filter(el => el.id !== action.payload)
    },
    swapAllTasks(state, action: PayloadAction<Array<IArrayTasks> >) {
      state.tasks = []

      for(let i = 0; i < action.payload.length; i++) {
        state.tasks.push(action.payload[i])
      }
    }, // reduce, swipe all tasks to task from db
    saveChangesTask(state, action: PayloadAction<ITaskSaveAction>) {
      const change: number = state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)!
        .todos.findIndex((el) => el.id === action.payload.id)
        ? state.tasks
            .find((el) => el.id === state.selectedTaskArrayID)!
            .todos.findIndex((el) => el.id === action.payload.id)
        : 0;

      state.tasks.find((el) => el.id === state.selectedTaskArrayID)!.todos[
        change
      ].desc = action.payload.desc;
    },
    moveTask(state, action: PayloadAction<IMoveTask>) {
      const array = state.tasks.find(el => el.name === action.payload.arrayName)
      const movedTask = action.payload.task.data

      state.tasks[array!.id].todos.push(
          movedTask
            ? {
                name: movedTask.name,
                desc: movedTask.desc,
                date: movedTask.date,
                id: +movedTask.id,
                text_color: movedTask.text_color,
                comment: movedTask.comment
              }
            : { name: "123", desc: "", date: "", id: 10000, text_color: "#000", comment: {message: 'Отсутсвует'}}
        );
      const selected_arr: any = state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.findIndex((el) => el.id === movedTask!.id)
        ? state.tasks
            .find((el) => el.id === state.selectedTaskArrayID)
            ?.todos.findIndex((el) => el.id === movedTask!.id)
        : 0;
      state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.splice(selected_arr, 1);

      state.selectedTaskID = -1;

      console.log(array)
    },
    changeTextColor(state, action: PayloadAction<IColorObjectAction>) {
      state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)!
        .todos.find((el) => el.id === state.selectedTaskID)!.text_color =
        action.payload.color;
    }, 
    pushCurrentUser(state, action: PayloadAction<IUser>) {
      state.User = action.payload
      state.isLogined = true
    }
  },
});

export default taskSlice.reducer;
