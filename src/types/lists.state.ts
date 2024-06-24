import { IAdminListArray } from "./rtk.types"

export interface IListsState {
  //lists: Array<IAdminList> | [],
  currentList: IAdminListArray | {}
}