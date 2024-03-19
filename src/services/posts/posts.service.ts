import { instance } from "../../api/api.interceptor"

export const PostService = {
  async getUserPosts(id: number) {
    const response = await instance({
      method: 'GET',
      url: `/workspace/${id}`,
    })

    return response
  }, 
}