import { IArrayTasks } from "../../types/redux_state";
import { IDeleteArrayPosts, IDeletePost, IPutArrayPosts, IPutPost, ITransportTodo, IUpdatePost } from "../../types/rtk.types";
import { api } from "./api";

export const todosApi = api.injectEndpoints({
  endpoints: builder => ({
    GetTodos: builder.query<Array<IArrayTasks>, number>({
      query: (id: number) => `/workspace/${id}`,
      providesTags: ['Todos'],
    }),
    PutTodo: builder.mutation<null, IPutPost | IPutArrayPosts>({
      query: (data: IPutPost | IPutArrayPosts) => ({
        method: 'POST',
        url: `/workspace/${data.id}`,
        body: data
      }),
      invalidatesTags: () => [{type: 'Todos'}]
    }),
    DeleteTodo: builder.mutation<null, IDeletePost>({
      query: (data: IDeletePost | IDeleteArrayPosts) => ({
        method: 'DELETE',
        url: `/workspace/${data.id}`,
        body: data
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
    }),
    TransportTodo: builder.mutation<null, ITransportTodo>({
      query: (data : ITransportTodo) => ({
        method: 'PATCH',
        url: `/workspace/${data.userId}`,
        body: data
      }),
      invalidatesTags: () => [{type: 'Todos'}]
    })
  })
})

export const { 
  useGetTodosQuery,
  usePutTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useTransportTodoMutation
} = todosApi