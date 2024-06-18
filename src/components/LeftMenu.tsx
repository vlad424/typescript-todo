import React from "react";

import HeaderMenu from "./MenuLog/HeaderMenu";
import TasksMenu from "./MenuLog/TasksMenu";
import ListMenu from "./MenuLog/ListMenu";

import './MenuLog/menu.scss'

const LeftMenu = () => {
  return (
    <aside className="left-menu">
      <HeaderMenu name="Menu"/>
      <TasksMenu/>
      <ListMenu/>
      {/* exit */}
    </aside>
  );
};

export default LeftMenu;
