import React, { useEffect, useState } from "react";
import HeaderTask from "../../components/TaskLog/HeaderTask";

import "./ListMain.scss";
import { useAppSelector } from "../../hooks/redux";
import { IAdminListArray } from "../../types/rtk.types";
import List from "../../components/generic/List";
import { useGetListsAndTasksQuery, usePutListOrCommentMutation } from "../../hooks/api-query/admin-api/admin-api";

const ListMain = () => {
  const currentList: IAdminListArray | {} = useAppSelector(
    (state) => state.listReducer.currentList
  );
  const userId = useAppSelector(state => state.taskReducer.User!.id)

  const response = useGetListsAndTasksQuery(userId)

  const [putList] = usePutListOrCommentMutation()

  const [name, setName] = useState<string>("");
  const blockType = useAppSelector((state) => state.viewReducer.wrap);
  const wc = () => {
    if (blockType === "wrap") return "25%";
    else if (blockType === "nowrap") return "95%";
  };
  const hu = () => {
    if (blockType === "wrap") return "wrap";
    else if (blockType === "nowrap") return "nowrap";
  };

  return (
    <section className="middle-list-area">
      <header className="lists-header">{JSON.stringify(currentList) !== "{}" ? `${(currentList as IAdminListArray).name}` :  'Выберете список'}</header>
      <section className="list-view">
        {JSON.stringify(currentList) !== "{}" ? (
          (currentList as IAdminListArray).lists.map((list) => {
            return <List {...list} key={`MiddleList: ${list.id}`} />;
          })
        ) : (
          <></>
        )}
        <div className="add-new-task" style={{ width: wc() }}>
          <button className="task-view-add"
            onClick={() => {
              if(name !== '') putList({action: 'PUT LIST EL', data: {name: name, listId: (currentList as IAdminListArray).id}, id: 0})
            }}
          >+</button>
          <input
            className="task-input"
            placeholder="add new list"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </section>
    </section>
  );
};

export default ListMain;
