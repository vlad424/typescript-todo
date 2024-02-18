import React from "react";
import { IArrayTasks } from "../../types/redux_state";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { useAppDispatch } from "../../hooks/redux";
import styled from "styled-components";

const DropDown = (dropdown_items: Array<IArrayTasks>) => {
  const dropdown_items_res = Object.values(dropdown_items);

  const { moveTask } = taskSlice.actions;

  const dispatch = useAppDispatch();

  const Label = styled.label`
  background-color: #F3F3F3;
  `

  return (
    <Label>
      Move into:
      <select
        className="dropdown-menu"
        onChange={(e) => dispatch(moveTask(e.target.value))}
      >
        {dropdown_items_res.map((el) => {
          return (
            <option
              key={"dropdown-item-" + el._id}
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
