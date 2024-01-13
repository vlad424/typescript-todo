import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";

const SelectedTaskArr = () => {
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
        return <div className="div" key={`MiddleTask: ${el._id}`} >{el.name}</div>;
      })}
      <button
        className="task-view-add"
        onClick={() => {
          dispatch(
            putTask({ name: "make another", desc: "", date: new Date().toString(), _id: 2 })
          );
        }}
      >
        Add New Task
      </button>
    </section>
  );
};

export default SelectedTaskArr;
