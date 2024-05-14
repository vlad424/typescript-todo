export interface IListsState {
  lists?: Array<ILists>
}

export interface ILists {
  id: number
  name: string
  list?: Array<IList>
}
export interface IList {
  id: number
  name: string
  desc: string
  dateCreate: string
  dateAt: string
  text_color: string
}