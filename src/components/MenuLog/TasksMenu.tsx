import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";

const TasksMenu = () => {
  const {putArrayTask} = taskSlice.actions;
  const tasks = useAppSelector(state => state.taskReducer.tasks)

  const dispatch = useAppDispatch()

  return (
    <section className="menu-tasks">
      <p className="menu-surname">TASKS</p>
      <div className="menu-current-tasks">
        {tasks.map(el => {
          return(
            <div className="menu-task" key={`Task: ${el._id}`}>
              <p className="menu-name">{el.name}</p>
              <p className="menu-value-tasks">{el.todos.length}</p>
            </div>
          );
        })}
        <button className="menu-task-add" onClick={() => {dispatch(putArrayTask("yesterday"))}}>Add New Array</button>
      </div>
    </section>
  );
};

export default TasksMenu;