import React, { useEffect } from "react";

import "./TaskLog/task.scss";
import HeaderTask from "./TaskLog/HeaderTask";
import SelectedTaskArr from "./TaskLog/SelectedTaskArr";
import { useGetTodosMutation } from "../hooks/api-query/todos.api";

const Task = () => {
  const [GetTodos, res] = useGetTodosMutation()

  useEffect(() => {

  })
  console.log(res)

  return (
    <section className="middle-task-area">
      <HeaderTask />
      <SelectedTaskArr/>
    </section>
  );
};

export default Task;
