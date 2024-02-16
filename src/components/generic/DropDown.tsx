import React, { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { IArrayTasks, ITask } from "../../types/redux_state";

const DropDown  = (dropdown_items : Array<IArrayTasks>) => {
  const [value, setValue] = useState();

  console.log(dropdown_items)

  return (
    <select className="dropdown-menu">
      {dropdown_items[0].todos.map((el) => {
        return (
          <option
            key={"dropdown-item-" + el._id}
            className="dropdown-menu-item"
            value={el.name}
            onChange={() => console.log(value)}
          ></option>
        );
      })}
    </select>
  );
};

export default DropDown;
