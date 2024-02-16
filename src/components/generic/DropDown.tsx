import React, { useEffect, useState } from "react";
import { IArrayTasks } from "../../types/redux_state";

const DropDown  = (dropdown_items : Array<IArrayTasks>) => {
  const [value, setValue] = useState<String>();
  const dropdown_items_res = Object.values(dropdown_items)

  const selectHandler = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value)

    // make reducer in redux for move task into another taskArray
  }

  return (
    <label className="change-array-task">
      Move into:
      <select className="dropdown-menu" onChange={selectHandler}>
      {dropdown_items_res.map((el) => {
        return (
          <option
            key={"dropdown-item-" + el._id}
            className="dropdown-menu-item"
            value={el.name}
          >{el.name}</option>
        );
      })}
    </select> 
    </label>
  );
};

export default DropDown;
