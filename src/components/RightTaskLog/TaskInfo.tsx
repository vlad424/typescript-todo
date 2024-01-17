import React from "react";
import { useAppSelector } from "../../hooks/redux";

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

  return (
    <>
      <div className="side-task-info">
        <div className="side-task-setting">
          <textarea className="side-desc-task"
            placeholder={task?.desc ? task?.desc : "No description"}
          >
          </textarea>
          
        </div>
      </div>
      <div className="side-task-commit-changes">
        <button className="side-delete-task">
          delete task
        </button>
        <button className="side-save-task">
          save changes
        </button>
      </div>
    </>
  );
};

export default TaskInfo;
