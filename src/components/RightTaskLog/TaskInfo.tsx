import React, { useEffect, useState } from "react";

import {CSSTransition} from 'react-transition-group'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { ITask } from "../../types/redux_state";

import DropDown from "../generic/DropDown";
import { CirclePicker } from "react-color";


const TaskInfo : React.FC = () => {
  const ID_TASK: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskID
  );
  const ID_ARRAY: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const task = useAppSelector((state) =>
    state.taskReducer.tasks
      .find((el) => el._id === ID_ARRAY)
      ?.todos.find((el) => el._id === ID_TASK)
  );
  const dispatch = useAppDispatch();

  const dropdown_items = useAppSelector((state) => state.taskReducer.tasks);
  const {deleteTask, saveChangesTask} = taskSlice.actions
  const [value_area, setValue_area] = useState(task?.desc ? task?.desc : "No description") 
  const [enable, setEnable] = useState(true)

  const checker = () => {
    if(ID_TASK === -1) setEnable(false)
    else               setEnable(true)
  }

  const deleteTaskButton = () => {
    const type_task : ITask = task ? 
      task : 
      {
        name: "", 
        desc: "", 
        date: new Date().toLocaleDateString + new Date().toLocaleTimeString(), 
        _id: -1,
        text_color: "#000"
      }
    dispatch(deleteTask(type_task._id))
  }

  const colors_picker = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4"]

  const colorHandler = () => {
    console.log(1)
  }

  useEffect(() => {
    setValue_area(task?.desc ? task?.desc : "No description")
    checker()
  }, [ID_TASK])

  return (
    <>
      <div className="side-task-info">
        <div className="side-task-setting">
          <CSSTransition in={enable} timeout={1200} classNames="my-node">
            <textarea className={enable ? "side-desc-task" : "side-desc-task disabled"}
              value={value_area}
              placeholder={value_area}
              onChange={(e) => setValue_area(e.target.value)}
            >
            </textarea>
          </CSSTransition>
          <ul className="side-task-date-menu">
            <li className="side-task-menu-item">Date of creation</li>
            <li className="side-task-menu-item">{task?.date}</li>
          </ul>
          <DropDown {...dropdown_items}/>
          <CirclePicker width="300px" colors={colors_picker} color={task!.text_color.toString()} onChangeComplete={() => colorHandler()}/>
        </div>
      </div>
      <div className="side-task-commit-changes">
        <button className={enable ? "side-buttons side-delete-task" : "side-buttons disabled"} onClick={() => deleteTaskButton()}>
          delete task
        </button>
        <button className={enable ? "side-buttons side-save-task" : "side-buttons disabled"} onClick={() => dispatch(saveChangesTask(task ? {desc: value_area, _id: task._id} : {desc: "", _id: -1}))}>
          save changes
        </button>
      </div>
    </>
  );
};

export default TaskInfo;
