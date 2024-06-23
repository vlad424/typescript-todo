import React, { useLayoutEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import gsap from 'gsap'

const ListMenu = () => {
  const lists = useAppSelector((state) => state.listReducer.lists);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useLayoutEffect(() => {
    gsap.fromTo('.menu-current-lists', {opacity: 0, x: -10}, {opacity: 1, x: 0})
  }, [])

  return (
    <section className="menu-lists">
      <p className="menu-surname">LISTS</p>
      {user.role === "admin" ? (
        <div className="menu-current-lists">
          <Link to={`admin`}>Сотрудникам</Link>
        </div>
      ) : (
        <div className="menu-current-lists">
          {lists?.map((el) => {
            return <div key={el.name + "_id"}>{el.name}</div>;
          })}
        </div>
      )}
    </section>
  );
};

export default ListMenu;
