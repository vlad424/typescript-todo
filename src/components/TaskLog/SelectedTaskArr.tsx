import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import Task from "../generic/Task";

const SelectedTaskArr = () => {
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();
  const { putTask } = taskSlice.actions;

  const ID_TASK: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const selected_array = useAppSelector((state) =>
    state.taskReducer.tasks.find((el) => el._id === ID_TASK)
  );

  

  return (
    <section className="tasks-view">
      {selected_array?.todos.map((el) => {
        return (
          <Task {...el}/>
        );
      })}
      <div className="add-new-task">
        <button
          className="task-view-add"
          onClick={() => {
            name ? 
            dispatch(
              putTask({
                name: name,
                desc: "",
                date: new Date().toLocaleDateString().toString() + " " + new Date().toLocaleTimeString().toString(),
                _id: 2,
                text_color: "#000"
              })
            ) 
            :
            console.log("incorrect name")
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
