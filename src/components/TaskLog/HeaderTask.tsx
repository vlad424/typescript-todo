import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { IAdminListArray } from "../../types/rtk.types";

const HeaderTask = () => {
  const selected_array = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const header = useAppSelector(
    (state) => state.taskReducer.tasks[selected_array]?.name
  );
  const list = useAppSelector((state) => state.listReducer.currentList);

  return (
    <header className="tasks-header">
      <h1>
        {Object.keys(list).length === 0 ?
          header ? header : "create a tasks array"
          :
          (list as IAdminListArray).name
        }  
        
      </h1>
    </header>
  );
};

export default HeaderTask;
