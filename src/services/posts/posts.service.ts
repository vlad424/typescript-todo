import { instance } from "../../api/api.interceptor"
import { ITask } from "../../types/redux_state"

interface POST_DTO {
  post: ITask,
  arrayName: string
}
interface UPDATE_DTO {
  desc: string,
  text_color: String,
  todoId: number
}

export const PostService = {
  async getUserPosts(id: number) {
    const response = await instance({
      method: 'GET',
      url: `/workspace/${id}`,
    })

    return response
  }, 
  async putPost(data: POST_DTO, userId: number) {
    const response = await instance({
      method: 'POST',
      url: `/workspace/${userId}`,
      data
    })
    return response
  },
  async deletePost(todoId: number, userId: number) {
    const response = await instance({
      method: "DELETE",
      url: `/workspace/${userId}`,
      data: {todoId}
    })

    return response 
  },
  async updatePost(dataToChange : UPDATE_DTO, userId: number) {
    const response = await instance({
      method: "PUT",
      url: `/workspace/${userId}`,
      data: dataToChange
    })
    
    return response 
  }
}