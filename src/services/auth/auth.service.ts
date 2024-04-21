import Cookies from "js-cookie"
import { getContentType } from "../../api/api.helper"
import { saveToStorage } from "./auth.helper"
import { TokensResponse, userLoginDto, userRegisterDto } from "../../types/user.types"
import { instance } from "../../api/api.interceptor"

export const AuthService = {
  async login(data: userLoginDto) {
    const response = await instance<TokensResponse>({
      url: '/',
      method: 'POST',
      data 
    })
    
    if(response.data.accessToken) {
      saveToStorage(response.data)
    }

    return response.data
  },
  
  async register(data: userRegisterDto) {
    const response = await instance<TokensResponse>({
      url: '/register',
      method: 'POST',
      data
    })

    if(response.data.accessToken) {
      saveToStorage(response.data)
    }

    return(response.data)
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken')
    
    const response = await instance.post<string, {data: TokensResponse}>(
      process.env.SERVER_URL + '/login/access-token', 
      {refreshToken},
      {headers: getContentType()}
    )

    if(response.data.accessToken) {
      console.log(response.data.accessToken)
      
      saveToStorage(response.data)
    }

    return response
  }
}