import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { ITask } from "../../types/redux_state";

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
  const {deleteTask, saveChangesTask} = taskSlice.actions
  const [value_area, setValue_area] = useState(task?.desc ? task?.desc : "No description") 
  const [enable, setEnable] = useState(1)

  const checker = () => {
    if(ID_TASK === -1) setEnable(0)
    else               setEnable(1)
  }

  const deleteTaskButton = () => {
    const type_task : ITask = task ? task : {name: "", desc: "", date: "", _id: -1}

    dispatch(deleteTask(type_task._id))
  }
  const saveTaskButton = () => {

    dispatch(saveChangesTask(task ? {desc: value_area, _id: task._id} : {desc: "", _id: -1}))
  }

  useEffect(() => {
    setValue_area(task?.desc ? task?.desc : "No description")
    checker()

    console.log(enable)
  }, [ID_TASK])

  return (
    <>
      <div className="side-task-info">
        <div className="side-task-setting">
          <textarea className={enable ? "side-desc-task" : "side-desc-task disabled"}
            value={value_area}
            placeholder={value_area}
            onChange={(e) => setValue_area(e.target.value)}
          >
          </textarea>
        </div>
      </div>
      <div className="side-task-commit-changes">
        <button className={enable ? "side-buttons side-delete-task" : "side-buttons disabled"} onClick={() => deleteTaskButton()}>
          delete task
        </button>
        <button className={enable ? "side-buttons side-save-task" : "side-buttons disabled"} onClick={() => saveTaskButton()}>
          save changes
        </button>
      </div>
    </>
  );
};

export default TaskInfo;
