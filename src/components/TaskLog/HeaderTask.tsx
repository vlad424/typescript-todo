import React from "react";
import { useAppSelector } from "../../hooks/redux";

const HeaderTask = () => {
  const selected_array = useAppSelector(state => state.taskReducer.selectedTaskArrayID)
  const header = useAppSelector(state => state.taskReducer.tasks[selected_array].name)

  return (
    <header className="tasks-header">
      <h1>{header ? header : "create a tasks array"}</h1>
    </header>
  );
};

export default HeaderTask;
