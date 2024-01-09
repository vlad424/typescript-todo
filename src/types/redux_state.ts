export interface ReduxState {
    tasks: Array<ArrayTaskType>
}
export interface ArrayTaskType {
    name: string,
    desc: string,
    _id: number,
    todos: Array<TaskType>
}
export interface TaskType {
    name: string,
    desc: string,
    date: string,
    _id: number
}