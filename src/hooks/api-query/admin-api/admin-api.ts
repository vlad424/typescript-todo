import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDeleteListOrComment, IGetListsAndTasks, IPatchList, IPutListOrComment } from "../../../types/rtk.types";

export const adminApi = createApi({
  reducerPath: 'admin-api',
  tagTypes: ['admin'],
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_baseURL}),
  endpoints: builder => ({
    GetListsAndTasks: builder.query<IGetListsAndTasks, number>({
      query: (id: number) => `/workspace/${id}/admin` ,
      providesTags: ['admin']
    }),
    PutListOrComment: builder.mutation<null, IPutListOrComment>({
      query: (req : IPutListOrComment) => ({
        method: "POST",
        url: `/workspace/${req.id}/admin`,
        body: {
          action: req.action,
          data: req.data
        }
      }),
      invalidatesTags: ['admin']
    }),
    DeleteListOrComment: builder.mutation<null, IDeleteListOrComment>({
      query: (req: IDeleteListOrComment) => ({
        method: 'DELETE',
        url: `/workspace/${req.id}/admin`,
        body: {
          action: req.action,
          data: req.data
        }
      }),
      invalidatesTags: ['admin']
    }),
    UpdateList: builder.mutation<null, IPatchList>({
      query: (req : IPatchList) => ({
        method: 'PATCH',
        url: `/workspace/${req.userId}/admin`,
        body: {
          listId: req.listId,
          data: req.data,
        }
      }),
      invalidatesTags: ['admin']
    })
  })
})

export const {
  useGetListsAndTasksQuery,
  usePutListOrCommentMutation,
  useDeleteListOrCommentMutation,
  useUpdateListMutation
} = adminApi