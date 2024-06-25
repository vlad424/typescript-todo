import { IArrayTasks, ITask } from "./redux_state";

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

export interface IGetListsAndTasks {
  adminLists: Array<IAdminListArray>
  users: Array<{
    first_name: string
    last_name: string
    login: string
    email: string
    role: string
    posts: Array<IAdminListArray>
    id: number
  }>
}

export interface IAdminListArray {
  id: number,
  name: string,
  userId: number | null,
  addressee: Array<number> | Array<never>
  lists: Array<IAdminList>
}
export interface IAdminList {
  id: number,
  name: string,
  desc: string,
  dateCreate: string,
  dateAt: string,
  text_color: string
}
export interface IPutListOrComment {
  id: number,
  action: 'PUT LIST' | 'PUT COMMENT' | 'PUT LIST EL'
  data: string | {
    name: string,
    listId: number
  }
}
export interface IDeleteListOrComment {
  id: number,
  action: 'DELETE LIST' | 'DELETE COMMENT' | 'DELETE LIST EL' 
  data: number
}
export interface IPatchList {
  userId: number,
  listId: number,
  data: {
    desc: string,
    dateAt: string,
    text_color: string,
    userIdAddr: Array<string>
  }
}