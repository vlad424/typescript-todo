import React, { useLayoutEffect, useState } from "react";

import "./ListPage.scss";
import { useAppSelector } from "../../hooks/redux";
import { useGetListsAndTasksQuery, usePutListOrCommentMutation } from "../../hooks/api-query/admin-api/admin-api";

const ListPage = () => {
  const [inputValue, setInputValue] = useState('')
  const userId: number = useAppSelector((state) => state.taskReducer.User!.id);

  const [createList] = usePutListOrCommentMutation()

  const response = useGetListsAndTasksQuery(userId);

  return (
    <>
      <aside className="left-menu">
        <header className="menu-header">
          <h2>Menu</h2>
        </header>
        <section className="menu-admin-lists">
          <p className="menu-surname">CREATE LIST</p>
          {response.currentData?.adminLists.map((list) => {
            return (
              <div className="list" key={`admin-list-${list.id}`}>
                {list.name}
              </div>
            );
          })}
          <div className="add-array">
            <button
              className="menu-task-add"
              onClick={() => {
                console.log('click')
                createList({
                  id: userId,
                  data: inputValue,
                  action: 'PUT LIST'
                })
              }}
            ></button>
            <input
              type="text"
              className="add-new-array"
              value={inputValue}
              onChange={(e) => {
                setInputValue((inputValue) => (inputValue = e.target.value));
              }}
              placeholder="add new array"
            />
          </div>
        </section>
        <section className="menu-admin-posts">
          <p className="menu-surname">COMMENT POST</p>
          {response.currentData?.users.map((user) => {
            return (
              <div className="user" key={`user-${user.id}`}>
                {user.email}
              </div>
            );
          })}
        </section>
      </aside>
    </>
  );
};

export default ListPage;
