import React from "react";

import HeaderMenu from "./MenuLog/HeaderMenu";
import TasksMenu from "./MenuLog/TasksMenu";
import ListMenu from "./MenuLog/ListMenu";

import './MenuLog/menu.scss'
import { Link } from "react-router-dom";

const LeftMenu = () => {
  return (
    <aside className="left-menu">
      <HeaderMenu name="Menu"/>
      <TasksMenu/>
      <ListMenu/>
      <Link 
        to={"/"}
        onClick={() => localStorage.removeItem('user')}  
      >Выйти из аккаунта</Link>
    </aside>
  );
};

export default LeftMenu;
