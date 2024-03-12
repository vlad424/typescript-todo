import { ITask } from "../../types/redux_state";

export const savePosts = (posts: Array<ITask>) => {
  localStorage.setItem('posts', JSON.stringify(posts))
}