import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { ITask } from "../../types/redux_state";

const TaskInfo = () => {
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
  const deleteTaskButton = () => {
    const type_task : ITask = task ? task : {name: "", desc: "", date: "", _id: -1}

    console.log(task)

    dispatch(deleteTask(type_task._id))
  }

  useEffect(() => {
    console.log(value_area)
  }, [value_area])

  return (
    <>
      <div className="side-task-info">
        <div className="side-task-setting">
          <textarea className="side-desc-task"
            value={value_area}
            placeholder={value_area}
            onChange={(e) => setValue_area(e.target.value)}
          >
          </textarea>
        </div>
      </div>
      <div className="side-task-commit-changes">
        <button className="side-delete-task" onClick={() => deleteTaskButton()}>
          delete task
        </button>
        <button className="side-save-task" onClick={() => dispatch(saveChangesTask(task ? {desc: value_area, _id: task._id} : {desc: "", _id: 1000}))}>
          save changes
        </button>
      </div>
    </>
  );
};

export default TaskInfo;
