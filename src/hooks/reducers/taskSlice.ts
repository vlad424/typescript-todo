import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IArrayTasks,
  IColorObjectAction,
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
        },
      ],
    },
  ],

  selectedTaskArrayID: 0,
  selectedTaskID: 1,

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
      const lastId = state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.at(-1)?.id;

      console.log(lastId)

      const ready_task: ITask = {
        name: action.payload.name, // name (user input)
        desc: action.payload.desc, // desc (user input)
        date: action.payload.date, // date of creation
        id: lastId ? lastId + 1 : 0, // dynamic id
        text_color: "#000",
      };

      state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.push(ready_task);
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
    moveTask(state, action: PayloadAction<String>) {
      const moved_task = state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)!
        .todos.find((el) => el.id === state.selectedTaskID);

      const lastId = state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.at(-1)?.id;

      state.tasks
        .find((el) => el.name === action.payload)!
        .todos.push(
          moved_task
            ? {
                name: moved_task.name,
                desc: moved_task.desc,
                date: moved_task.date,
                id: lastId ? lastId + 1 : 0,
                text_color: moved_task.text_color,
              }
            : { name: "", desc: "", date: "", id: 10000, text_color: "#000"}
        );
      const selected_arr: any = state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.findIndex((el) => el.id === moved_task!.id)
        ? state.tasks
            .find((el) => el.id === state.selectedTaskArrayID)
            ?.todos.findIndex((el) => el.id === moved_task!.id)
        : 0;
      state.tasks
        .find((el) => el.id === state.selectedTaskArrayID)
        ?.todos.splice(selected_arr, 1);

      state.selectedTaskID = -1;
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
