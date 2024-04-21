import { ITask } from "./redux_state";

export interface IPost {
  post: ITask,
  arrayName: string
}
export interface IUpdatePost {
  post: {
    desc: string,
    text_color: String,
    todoId: number
  },
  id: number
}
export interface IPutPost {
  post: {
    post: ITask,
    arrayName: string
  }, 
  id: number
}
export interface IDeletePost {
  todoId: number, 
  id: number
}