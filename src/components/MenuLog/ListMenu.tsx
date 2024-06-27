import React, { useLayoutEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGetUserListsQuery } from "../../hooks/api-query/todos.api";
import { listSlice } from "../../hooks/reducers/listSlice";

const ListMenu = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useLayoutEffect(() => {
    gsap.fromTo(
      ".menu-current-lists",
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0 }
    );
  }, []);

  const { data, isLoading } = useGetUserListsQuery(user.id);

  const dispatch = useAppDispatch()
  const { setList } = listSlice.actions

  return (
    <section className="menu-lists">
      <p className="menu-surname">LISTS</p>
      {user.role === "admin" ? (
        <div className="menu-current-lists">
          <Link to={`admin`}>Сотрудникам</Link>
        </div>
      ) : (
        <div className="menu-current-lists">
          {isLoading ? (
            <>loading</>
          ) : (
            data!.map((el) => {
              return (
                <div className="menu-wrapper" key={`Task: ${el.id}`}>
                  <div
                    className="menu-task"
                    onClick={() => {
                      dispatch(setList(el))
                    }}
                  >
                    <p className="menu-name">{el.name}</p>
                  </div>
                  <button
                    className="menu-value-tasks"
                  >
                    {el.lists.length}
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
};

export default ListMenu;
