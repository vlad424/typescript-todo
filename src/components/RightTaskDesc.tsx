import React from "react";
import HeaderMenu from "./MenuLog/HeaderMenu";
import { useAppSelector } from "../hooks/redux";

import "./RightTaskLog/RightTask.css"
import TaskInfo from "./RightTaskLog/TaskInfo";
import { IAdminList } from "../types/rtk.types";

const RightTaskDesc = () => {
  const ID_TASK: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskID
  );
  const ID_ARRAY: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const task_name = useAppSelector(
    (state) =>
      state.taskReducer.tasks
        .find((el) => el.id === ID_ARRAY)
        ?.todos.find((el) => el.id === ID_TASK)
  );
  const list = useAppSelector((state) => state.listReducer.currentElList);

  return (
    <aside className="right-side">
      <HeaderMenu name={task_name?.name ? task_name.name + ":" : (list as IAdminList).name} />
      <TaskInfo/>
    </aside>
  );
};

export default RightTaskDesc;
