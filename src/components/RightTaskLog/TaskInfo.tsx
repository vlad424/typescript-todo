import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { ITask } from "../../types/redux_state";

import DropDown from "../generic/DropDown";
import { CirclePicker } from "react-color";
import { viewSlice } from "../../hooks/reducers/viewSlice";
import { getUser } from "../../services/auth/auth.helper";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../../hooks/api-query/todos.api";

const TaskInfo: React.FC = () => {
  const ID_TASK: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskID
  );
  const ID_ARRAY: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const selected_array = useAppSelector((state) =>
    state.taskReducer.tasks.find((el) => el.id === ID_ARRAY)
  );
  const task = useAppSelector((state) =>
    state.taskReducer.tasks
      .find((el) => el.id === ID_ARRAY)
      ?.todos.find((el) => el.id === ID_TASK)
  ) as ITask;
  const dispatch = useAppDispatch();
  const [updatePost] = useUpdateTodoMutation()
  const [deletePost] = useDeleteTodoMutation()

  const dropdown_items = useAppSelector((state) => state.taskReducer.tasks);
  const { deleteTask, saveChangesTask, changeTextColor } = taskSlice.actions;
  const { changeViewBlock } = viewSlice.actions
  const [value_area, setValue_area] = useState(
    task?.desc ? task?.desc : "No description"
  );
  const [enable, setEnable] = useState(true);

  const checker = () => {
    if (ID_TASK === -1) setEnable(false);
    else setEnable(true);
  };

  const deleteTaskButton = async () => {
    if (selected_array!.todos.length <= 7) {
      dispatch(changeViewBlock({ width: 1000, height: 1000 }));
    }
    const type_task: ITask = task
      ? task
      : {
          name: "",
          desc: "",
          date: new Date().toLocaleDateString + new Date().toLocaleTimeString(),
          id: -1,
          text_color: "#000",
        };
    deletePost({todoId: type_task.id, id: await getUser().then(res => res.id)})
    dispatch(deleteTask(type_task.id));
  };

  const saveTask = async () => {
    updatePost({
      post: {desc: value_area, text_color: task.text_color, todoId: task.id},
      id: await getUser().then(res => res.id)
    })
  }


  const colors_picker = [
    "#000",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
  ];

  const colorHandler = (hex_color: any) => {
    dispatch(
      changeTextColor({
        color: hex_color.hex,
        id: task!.id,
      })
    );
  };
  useEffect(() => {
    setValue_area(task?.desc ? task?.desc : "No description");
    checker();
  }, [ID_TASK]);

  return (
    <>
      <div className="side-task-info">
        <div className="side-task-setting">
          <textarea
            className={enable ? "side-desc-task" : "side-desc-task disabled"}
            value={value_area}
            placeholder={value_area}
            onChange={(e) => setValue_area(e.target.value)}
          ></textarea>
          <ul className="side-task-date-menu">
            <li
              className={
                enable ? "side-task-menu-item" : "side-task-menu-item disabled"
              }
            >
              Date of creation:{" "}
            </li>
            <li className="side-task-menu-item">{task?.date}</li>
          </ul>

          <DropDown {...dropdown_items} />
          <CirclePicker
            width="auto"
            className={enable ? "circle-picker" : "disabled circle-picker"}
            colors={colors_picker}
            color={task?.text_color.toString()}
            onChange={(color) => colorHandler(color)}
          />
        </div>
      </div>
      <div className="side-task-commit-changes">
        <button
          className={
            enable ? "side-buttons side-delete-task" : "side-buttons disabled"
          }
          onClick={() => deleteTaskButton()}
        >
          delete task
        </button>
        <button
          className={
            enable ? "side-buttons side-save-task" : "side-buttons disabled"
          }
          onClick={async() =>
            await saveTask()
          }
        >
          save changes
        </button>
      </div>
    </>
  );
};

export default TaskInfo;
