import { ITask } from "./redux_state"
import { IAdminList, IAdminListArray } from "./rtk.types"

export interface IListsState {
  //lists: Array<IAdminList> | [],
  currentList: IAdminListArray | {},
  currentElList: IAdminList | {},
  userShare: Array<string>,
  selectedTasks: Array<ITask>
}