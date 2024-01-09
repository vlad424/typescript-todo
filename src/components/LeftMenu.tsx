import React from "react";

import HeaderMenu from "./MenuLog/HeaderMenu";
import TasksMenu from "./MenuLog/TasksMenu";
import ListMenu from "./MenuLog/ListMenu";

import './MenuLog/menu.css'

const LeftMenu = () => {
  return (
    <aside className="left-menu">
      <HeaderMenu name="Menu"/>
      <TasksMenu/>
      <ListMenu/>
    </aside>
  );
};

export default LeftMenu;
