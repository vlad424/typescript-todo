import { IArrayTasks, ITask } from "../../types/redux_state";
import { IDeletePost, IPutPost, IUpdatePost } from "../../types/rtk.types";
import { api } from "./api";

export const todosApi = api.injectEndpoints({
  endpoints: builder => ({
    GetTodos: builder.query<Array<IArrayTasks>, number>({
      query: (id: number) => `/workspace/${id}`,
      providesTags: ['Todos'],
    }),
    pop: builder.query<null, IPutPost>({
      query: (data: IPutPost) => `/workspace/${data.id}`,
      providesTags: ['Todos']
    }),
    // PutTodo: builder.mutation<null, IPutPost>({
    //   query: (data: IPutPost) => ({
    //     method: 'POST',
    //     url: `/workspace/${data.id}`,
    //     body: data.post
    //   }),
    //   invalidatesTags: () => [{type: 'Todos'}]
    // }),
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
  useGetTodosQuery,
  usePopQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = todosApi