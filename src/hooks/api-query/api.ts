import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDeletePost, IPost, IPutPost } from '../../types/rtk_types'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_baseURL}),
  endpoints: (builder) => ({
    
  })
})