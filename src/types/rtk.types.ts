import { ITask } from "./redux_state";

export interface IPost {
  post: ITask;
  arrayName: string;
}
export interface IUpdatePost {
  post: {
    desc: string;
    text_color: String;
    todoId: number;
  };
  id: number;
}
export interface IDeletePost {
  todoId: string;
  id: number;
  action: string
}

// multiquery types

export interface IPutArrayPosts {
  post: {
    name: string;
    id: number;
    todos: Array<ITask> | null
  }
  id: number
  action: string
}
export interface ITransportTodo {
  todoId: number,
  userId: number
  nameArray: string
}


export interface IDeleteArrayPosts {
  todoId: string;
  id: number
  action: string
}

export interface IPutPost {
  post: {
    post: ITask;
    arrayName: string;
  };
  id: number;
  action: string
}