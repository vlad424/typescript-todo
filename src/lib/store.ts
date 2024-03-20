import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "../hooks/reducers/taskSlice";
import viewReducer from "../hooks/reducers/viewSlice";

const rootReducer = combineReducers({
    taskReducer,
    viewReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']