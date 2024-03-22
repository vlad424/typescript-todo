import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import Task from "../generic/Task";
import { viewSlice } from "../../hooks/reducers/viewSlice";

const SelectedTaskArr = () => {
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();
  const { putTask } = taskSlice.actions;
  const { changeViewBlock } = viewSlice.actions

  const ID_TASK: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const selected_array = useAppSelector((state) =>
    state.taskReducer.tasks.find((el) => el.id === ID_TASK)
  );
  const blockType = useAppSelector(state => state.viewReducer.wrap)

  const hu = () => {
    if(blockType === 'wrap') return 'wrap'
    else if(blockType === 'nowrap') return 'nowrap'
  }
  const wc = () => {
    if(blockType === 'wrap') return '25%'
    else if(blockType === 'nowrap') return '95%'
  }
  return (
    <section className="tasks-view" style={{flexWrap: hu()}}>
      {selected_array?.todos.map((el) => {
        return (
            <Task {...el} key={`MiddleTask: ${el.id}`}/>
        );
      })}
      <div className="add-new-task" style={{width: wc()}}>
        <button
          className="task-view-add"
          onClick={() => {
            name ? 
            dispatch(
              putTask({
                name: name,
                desc: "",
                date: new Date().toLocaleDateString().toString() + " " + new Date().toLocaleTimeString().toString(),
                id: 2,
                text_color: "#000",
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
