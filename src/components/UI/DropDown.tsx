import React from "react";
import { IArrayTasks, ITask } from "../../types/redux_state";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styled from "styled-components";
import { useTransportTodoMutation } from "../../hooks/api-query/todos.api";

const Label = styled.label`
  background-color: #f3f3f3;
  margin-top: 5%;
`;
const DropDown = (dropdown_items: Array<IArrayTasks>) => {
  const dropdown_items_res = Object.values(dropdown_items);

  const selectedTaskId = useAppSelector(state => state.taskReducer.selectedTaskID)
  const seletedArrayId = useAppSelector(state => state.taskReducer.selectedTaskArrayID)
  const selectedTask = useAppSelector(state => state.taskReducer.tasks[seletedArrayId])

  const user = useAppSelector(state => state.taskReducer.User)

  const [transport] = useTransportTodoMutation()

  const moveTaskClick = async (arrayName : string) => {
    const task : any = await transport({
      userId: user!.id,
      todoId: selectedTaskId,
      nameArray: arrayName
    })
    console.log(selectedTask.todos.find(el => el.id === selectedTaskID))
    console.log(task.data)
    dispatch(moveTask({task, arrayName}))
  }

  const { moveTask } = taskSlice.actions;

  const selectedTaskID = useAppSelector(
    (state) => state.taskReducer.selectedTaskID
  );
  const dispatch = useAppDispatch();
  const styleOff = () => {
    if (selectedTaskID === -1) return false;
    else return true;
  };

  return (
    <Label className={styleOff() ? "" : "disabled"}>
      Move into: {' '}
      <select
        className={styleOff() ? "dropdown-menu" : "dropdown-menu disabled"}
        onChange={(e) => moveTaskClick(e.target.value)}
      >
        {dropdown_items_res.map((el) => {
          return (
            <option
              key={"dropdown-item-" + el.id}
              className="dropdown-menu-item"
              value={el.name}
            >
              {el.name}
            </option>
          );
        })}
      </select>
    </Label>
  );
};

export default DropDown;
