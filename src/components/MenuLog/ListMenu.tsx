import React from "react";
import { useAppSelector } from "../../hooks/redux";

const ListMenu = () => {
  const lists = useAppSelector(state => state.listReducer.lists)

  return (
    <section className="menu-lists">
      <p className="menu-surname">LISTS</p>
      <div className="menu-current-lists">
        {lists?.map(el => {
          return(
            <div>{el.name}</div>
          );
        })}
      </div>
    </section>
  );
};

export default ListMenu;
