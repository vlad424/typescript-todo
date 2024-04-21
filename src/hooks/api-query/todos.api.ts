import { IArrayTasks, ITask } from "../../types/redux_state";
import { IDeletePost, IPutPost, IUpdatePost } from "../../types/rtk.types";
import { api } from "./api";

export const todosApi = api.enhanceEndpoints({addTagTypes: ['Todos']}).injectEndpoints({
  endpoints: builder => ({
    GetTodos: builder.mutation<{data: Array<IArrayTasks>}, number>({
      query: (id : number) => ({
        method: 'GET',
        url: `/workspace/${id}`
      }),
      providesTags: undefined
    }),
    PutTodo: builder.mutation<null, IPutPost>({
      query: (data: IPutPost) => ({
        method: 'POST',
        url: `/workspace/${data.id}`,
        body: data.post
      }),
      invalidatesTags: () => [{type: 'Todos'}]
    }),
    DeleteTodo: builder.mutation<null, IDeletePost>({
      query: (data: IDeletePost) => ({
        method: 'DELETE',
        url: `/workspace/${data.id}`,
        body: data.todoId
      }),
      invalidatesTags: () => [{type: 'Todos'}]
    }),
    UpdateTodo: builder.mutation<null, IUpdatePost>({
      query: (data: IUpdatePost) => ({
        method: 'PUT',
        url: `/workspace/${data.id}`,
        body: data.post
      }),
      invalidatesTags: () => [{type: 'Todos'}]
    })
  })
})

export const { 
  useGetTodosMutation,
  usePutTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = todosApi