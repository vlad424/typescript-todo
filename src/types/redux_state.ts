import { EmptyStatement } from "typescript"

export interface ReduxState {
    tasks: Array<IArrayTasks> 

    selectedTaskArrayID: number
    selectedTaskID: number

    User: IUser | null,
    isLogined: boolean
    isLoading: boolean
}
export interface IArrayTasks {
    name: string,
    _id: number,
    todos: Array<ITask>
}
export interface ITask {
    name: string,
    desc: string,
    date: String,
    _id: number
    text_color: String;
}
export interface ITaskSaveAction {
    desc: string,
    _id: number
}
export interface IColorObjectAction {
    color: String,
    _id: number
}
export interface IUser {
    first_name: string
    last_name: string
    login: string
    email: string

    _data: Array<IArrayTasks> | null;
    id: number
}