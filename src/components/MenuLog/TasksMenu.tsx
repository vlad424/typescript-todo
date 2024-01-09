import React from "react";
import { ReduxState } from "../../types/redux_state";

const TasksMenu = () => {
  const state : ReduxState = {
    tasks: [
      { 
        name: "today",
        desc: "", 
        _id: 0, 
        todos: [
          {name: "make together", desc: "", date: "", _id: 0}
        ]
      },
      { 
        name: "tommorow",
        desc: "", 
        _id: 1, 
        todos: [
          {name: "make another", desc: "", date: "", _id: 1},
        ]
      },
    ]
  }
  return (
    <section className="menu-tasks">
      <p className="menu-surname">TASKS</p>
      <div className="menu-current-tasks">
        {state.tasks.map(el => {
          return(
            <div className="menu-task" key={`Task: ${el._id}`}>
              <p className="menu-name">{el.name}</p>
              <p className="menu-value-tasks">{el.todos.length}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TasksMenu;