export interface ReduxState {
    tasks: Array<IArrayTasks>

    selectedTaskArrayID: number
    selectedTaskID: number
}
export interface IArrayTasks {
    name: string,
    _id: number,
    todos: Array<ITask>
}
export interface ITask {
    name: string,
    desc: string,
    date: string,
    _id: number
}