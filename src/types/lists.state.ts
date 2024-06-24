import { IAdminList, IAdminListArray } from "./rtk.types"

export interface IListsState {
  //lists: Array<IAdminList> | [],
  currentList: IAdminListArray | {},
  currentElList: IAdminList | {}
}