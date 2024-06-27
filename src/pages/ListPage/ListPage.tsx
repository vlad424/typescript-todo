import React, { useState } from "react";

import "./ListPage.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  useDeleteListOrCommentMutation,
  useGetListsAndTasksQuery,
  usePutListOrCommentMutation,
} from "../../hooks/api-query/admin-api/admin-api";
import { listSlice } from "../../hooks/reducers/listSlice";

const ListPage = () => {
  const [inputValue, setInputValue] = useState("");
  const userId: number = useAppSelector((state) => state.taskReducer.User!.id);

  const [createList] = usePutListOrCommentMutation();
  const [deleteList] = useDeleteListOrCommentMutation();

  const response = useGetListsAndTasksQuery(userId);

  const { setList, setCurrentTasks } = listSlice.actions;
  const dispatch = useAppDispatch();

  const renderTasksUserById = (id: number) => {
    const posts : any = response.currentData?.users.find(x => x.id === id)
    let all_todos : any = [];

    for(let i = 0; i < posts?.posts.length; i++) {
      posts?.posts[i].todos.map((el: any) => all_todos.push(el))
    }

    
    return all_todos
  }

  return (
    <>
      <aside className="left-menu">
        <header className="menu-header">
          <h2>Admin Menu</h2>
        </header>
        <section className="menu-admin-lists">
          <p className="menu-surname">CREATE LIST</p>
          <div className="menu-current-lists">
            {response.currentData?.adminLists.map((list) => {
              return (
                <div className="list-wrapper" key={`admin-list-${list.id}`}>
                  <div
                    className="admin-list"
                    onClick={() => dispatch(setList(list))}
                  >
                    <p className="menu-name">{list.name}</p>
                  </div>
                  <button
                    className="menu-value-tasks"
                    onClick={() => {
                      dispatch(setList({}));
                      deleteList({
                        action: "DELETE LIST",
                        data: list.id,
                        id: userId,
                      });
                    }}
                  >
                    {list.lists.length}
                  </button>
                </div>
              );
            })}
            <div className="add-array">
              <button
                className="menu-task-add"
                onClick={() => {
                  createList({
                    id: userId,
                    data: inputValue,
                    action: "PUT LIST",
                  });
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
          </div>
        </section>
        <section className="menu-admin-posts">
          <p className="menu-surname">COMMENT POST</p>
          <div className="menu-current-posts">
            {response.currentData?.users.map((user) => {
              return (
                <div className="user" key={`user-${user.id}`} onClick={() => {
                  dispatch(setCurrentTasks(renderTasksUserById(user.id)))
                }}>
                  {user.email}
                </div>
              );
            })}
          </div>
        </section>
      </aside>
    </>
  );
};

export default ListPage;
