import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_baseURL}),
  endpoints: () => ({
    
  }),
})