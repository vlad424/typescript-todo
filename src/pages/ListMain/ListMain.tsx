import React, { useState } from "react";
import "./ListMain.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IAdminListArray } from "../../types/rtk.types";
import List from "../../components/generic/List";
import { usePutListOrCommentMutation } from "../../hooks/api-query/admin-api/admin-api";
import { listSlice } from "../../hooks/reducers/listSlice";
import { usePostCommentMutation } from "../../hooks/api-query/todos.api";

const ListMain = () => {
  const currentList: IAdminListArray | {} = useAppSelector(
    (state) => state.listReducer.currentList
  );
  const selectedTasks = useAppSelector(
    (state) => state.listReducer.selectedTasks
  );
  const userId = useAppSelector((state) => state.taskReducer.User!.id);
  const workerId = useAppSelector((state) => state.listReducer.currentWorker);

  const { pushElToList } = listSlice.actions;
  const dispatch = useAppDispatch();

  const [putList] = usePutListOrCommentMutation();
  const [sendComment] = usePostCommentMutation();

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
      <header className="lists-header">
        <h1>
          {JSON.stringify(currentList) !== "{}"
            ? `${(currentList as IAdminListArray).name}`
            : "Выберете список"}
        </h1>
      </header>
      <section className="list-view">
        {JSON.stringify(currentList) !== "{}" ? (
          (currentList as IAdminListArray).lists.map((list) => {
            return <List {...list} key={`MiddleList: ${list.id}`} />;
          })
        ) : (
          <></>
        )}
        {JSON.stringify(currentList) !== "{}" ? (
          <div className="add-new-task" style={{ width: wc() }}>
            <button
              className="task-view-add"
              onClick={async () => {
                if (name !== "") {
                  const res: any = await putList({
                    action: "PUT LIST EL",
                    data: {
                      name: name,
                      listId: (currentList as IAdminListArray).id,
                    },
                    id: 0,
                  });

                  dispatch(pushElToList(res.data.list));
                }
              }}
            >
              +
            </button>
            <input
              className="task-input"
              placeholder="add new list"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ) : (
          selectedTasks?.map((el) => {
            console.log(el)
            return (
              <div
                key={`idk now ${el.id}`}
                style={{
                  width: hu(),
                  color: el.text_color.toString(),
                  flexDirection: "column",
                }}
                className="task"
              >
                {el.name}
                <br />
                <button
                  style={{color: 'black'}}
                  onClick={() => {
                    sendComment({
                      message: "👍",
                      userId: userId,
                      address: workerId,
                    });
                  }}
                >
                  {'👍'}
                </button>
                <button
                  style={{color: 'black'}}
                  onClick={() => {
                    sendComment({
                      message: "👎",
                      userId: userId,
                      address: workerId,
                    });
                  }}
                >
                  {'👎'}
                </button>
              </div>
            );
          })
        )}
      </section>
    </section>
  );
};

export default ListMain;
