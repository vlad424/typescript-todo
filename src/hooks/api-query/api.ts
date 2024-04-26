import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IArrayTasks } from '../../types/redux_state'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_baseURL}),
  endpoints: (builder) => ({
    // GetTodos: builder.mutation<{data: Array<IArrayTasks>}, number>({
    //   query: (id : number) => ({
    //     method: 'GET',
    //     url: `/workspace/${id}`
    //   }),
    //   providesTags: ['Todos']
    // }),
    GetTodos: builder.query<Array<IArrayTasks>, number>({
      query: (id: number) => `/workspace/${id}`,
      providesTags: ['Todos'],
    }),
  }),
})