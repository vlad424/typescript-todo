import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import Task from "../generic/Task";
import { PostService } from "../../services/posts/posts.service";
import { getUser } from "../../services/auth/auth.helper";
import { usePopQuery } from "../../hooks/api-query/todos.api";
import { ITask } from "../../types/redux_state";

const SelectedTaskArr = () => {
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();
  const { putTask } = taskSlice.actions;

  const user = useAppSelector((state) => state.taskReducer.User);
  const ID_TASK: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const NAME_ARRAY: string = useAppSelector(
    (state) => state.taskReducer.tasks.find((el) => el.id === ID_TASK)!.name
  );
  const selected_array = useAppSelector((state) =>
    state.taskReducer.tasks.find((el) => el.id === ID_TASK)
  );
  const lastId = useAppSelector(
    (state) =>
      state.taskReducer.tasks.find((el) => el.id === ID_TASK)?.todos.at(-1)?.id
  );
  const blockType = useAppSelector((state) => state.viewReducer.wrap);

  const createPost = async (data: string) => {
    const post: ITask = {
      name: data,
      desc: "desc",
      date:
        new Date().toLocaleDateString().toString() +
        " " +
        new Date().toLocaleTimeString().toString(),
      id: lastId ? lastId + 1 : 0,
      text_color: "#000",
    };

    // usePopQuery({
    //   post: {post: post, arrayName: NAME_ARRAY},
    //   id: user!.id
    // });

    await PostService.putPost(
      { post: post, arrayName: NAME_ARRAY },
      await getUser().then((res) => res.id)
    );

    return post;
  };

  const hu = () => {
    if (blockType === "wrap") return "wrap";
    else if (blockType === "nowrap") return "nowrap";
  };
  const wc = () => {
    if (blockType === "wrap") return "25%";
    else if (blockType === "nowrap") return "95%";
  };
  return (
    <section className="tasks-view" style={{ flexWrap: hu() }}>
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
    </section>
  );
};

export default SelectedTaskArr;
