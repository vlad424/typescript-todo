import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "../hooks/reducers/taskSlice";
import viewReducer from "../hooks/reducers/viewSlice";
import { api } from "../hooks/api-query/api";
import listReducer  from "../hooks/reducers/listSlice";
import { adminApi } from "../hooks/api-query/admin-api/admin-api";

const rootReducer = combineReducers({
    taskReducer,
    viewReducer,
    listReducer,
    [api.reducerPath]: api.reducer,
    [adminApi.reducerPath]: adminApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                api.middleware,
                adminApi.middleware
            ),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']