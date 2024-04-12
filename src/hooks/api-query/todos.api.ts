import { IDeletePost, IPutPost } from "../../types/rtk_types";
import { api } from "./api";

export const todosApi = api.injectEndpoints({
  endpoints: builder => ({
    GetTodos: builder.mutation({
      query: (id : number) => ({
        method: 'GET',
        url: `/workspace/${id}`
      })
    }),
    PutTodo: builder.mutation({
      query: (data: IPutPost) => ({
        method: 'POST',
        url: `/workspace/${data.id}`,
        body: data.post
      })
    }),
    DeleteTodo: builder.mutation({
      query: (data: IDeletePost) => ({
        method: 'DELETE',
        url: `/workspace/${data.id}`,
        body: data.todoId
      })
    })
  })
})

export const { useGetTodosMutation } = todosApi