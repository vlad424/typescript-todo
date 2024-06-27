import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import Task from "../generic/Task";
import { getUser } from "../../services/auth/auth.helper";
import { ITask } from "../../types/redux_state";
import { usePutTodoMutation } from "../../hooks/api-query/todos.api";
import { IAdminListArray } from "../../types/rtk.types";
import List from "../generic/List";

const SelectedTaskArr = () => {
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();
  const { putTask } = taskSlice.actions;

  const ID_TASK: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const NAME_ARRAY = useAppSelector(
    (state) => state.taskReducer.tasks.find((el) => el.id === ID_TASK)?.name
  );
  const selected_array = useAppSelector((state) =>
    state.taskReducer.tasks.find((el) => el.id === ID_TASK)
  );
  const lastId = useAppSelector(
    (state) =>
      state.taskReducer.tasks.find((el) => el.id === ID_TASK)?.todos.at(-1)?.id
  );

  const blockType = useAppSelector((state) => state.viewReducer.wrap);

  const [putTodo] = usePutTodoMutation();

  const createPost = async (data: string) => {
    const post: ITask = {
      name: data,
      desc: "desc",
      date:
        new Date().toLocaleDateString().toString() +
        " " +
        new Date().toLocaleTimeString().toString(),
      id: lastId === undefined ? 0 : lastId + 1,
      text_color: "#000",
      comment: {message: 'Нет комментария'}
    };

    const success_post: any = await putTodo({
      post: {
        post,
        arrayName: NAME_ARRAY!.toString(),
      },
      id: await getUser().then((res) => res.id),
      action: "PUT_TODO",
    });

    return success_post.data;
  };

  const hu = () => {
    if (blockType === "wrap") return "wrap";
    else if (blockType === "nowrap") return "nowrap";
  };
  const wc = () => {
    if (blockType === "wrap") return "25%";
    else if (blockType === "nowrap") return "95%";
  };

  const list = useAppSelector((state) => state.listReducer.currentList);

  return (
    <section className="tasks-view" style={{ flexWrap: hu() }}>
      {Object.keys(list).length === 0 ? (
        <>
          {selected_array?.todos.map((el) => {
            return <Task {...el} key={`MiddleTask: ${el.id}`} />;
          })}
          <div className="add-new-task" style={{ width: wc() }}>
            <button
              className="task-view-add"
              onClick={async () => {
                name
                  ? dispatch(putTask(await createPost(name)))
                  : console.log("incorrect name");
              }}
            >
              +
            </button>
            <input
              className="task-input"
              placeholder="add new task"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          {(list as IAdminListArray).lists.map((list) => {
            return <List {...list} key={`MiddleList: ${list.id}`} />;
          })}
        </>
      )}
    </section>
  );
};

export default SelectedTaskArr;
