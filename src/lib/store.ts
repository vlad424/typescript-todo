import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "../hooks/reducers/taskSlice";
import viewReducer from "../hooks/reducers/viewSlice";
import { api } from "../hooks/api-query/api";
import listReducer  from "../hooks/reducers/listSlice";

const rootReducer = combineReducers({
    taskReducer,
    viewReducer,
    listReducer,
    [api.reducerPath]: api.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']