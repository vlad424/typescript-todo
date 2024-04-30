import { createApi } from "@reduxjs/toolkit/query";
import { api } from "./api";
import { TokensResponse, userLoginDto } from "../../types/user.types";

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    Login: builder.mutation<TokensResponse, userLoginDto>({
      query: (data : userLoginDto) => ({
        method: 'POST',
        url: '/',
        body: data
      }),
    }) 
  })
})

export const {} = userApi