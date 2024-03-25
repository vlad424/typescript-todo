import { instance } from "../../api/api.interceptor"
import { ITask } from "../../types/redux_state"

export const PostService = {
  async getUserPosts(id: number) {
    const response = await instance({
      method: 'GET',
      url: `/workspace/${id}`,
    })

    return response
  }, 
  async putPost(data: ITask, userId: number) {
    const response = await instance({
      method: 'PUT',
      url: `/workspace/${userId}`,
      data: {data, userId}
    })

    return response
  }
}