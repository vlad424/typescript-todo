import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { IArrayTasks } from "../../types/redux_state";
import { viewSlice } from "../../hooks/reducers/viewSlice";
import { useDeleteTodoMutation, useGetTodosQuery, usePutTodoMutation } from "../../hooks/api-query/todos.api";
import Loader from "../UI/loader/Loader";
import gsap, { TweenLite } from "gsap";

const TasksMenu = () => {
  const {
    putArrayTask,
    changeSelectedArray,
    swapAllTasks,
    changeSelectedTask,
    deleteArrayTasks
  } = taskSlice.actions;
  const { changeViewBlock } = viewSlice.actions;
  const tasks = useAppSelector((state) => state.taskReducer.tasks);
  const user = useAppSelector((state) => state.taskReducer.User);
  const {data, isLoading} = useGetTodosQuery(user!.id);

  const [lastArrayId, setLastArrayID] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const ID_ARRAY: number = useAppSelector(
    (state) => state.taskReducer.selectedTaskArrayID
  );
  const selected_array = useAppSelector((state) =>
    state.taskReducer.tasks.find((el) => el.id === ID_ARRAY)
  );

  const dispatch = useAppDispatch();
  const [putTodo] = usePutTodoMutation()
  const [deletePost] = useDeleteTodoMutation()

  const fetchData = async () => {
    let changedPosts: Array<IArrayTasks> | null = [];

    if (data) {
      for (let i = 0; i < data.length; i++) {
        setLastArrayID(lastArrayId => lastArrayId = data[i].id)
        changedPosts!.push({
          name: data[i].name,
          id: i,
          todos: data[i].todos,
        });
      }
      dispatch(swapAllTasks(changedPosts ? changedPosts : tasks));
      if(changedPosts.length !== 0)
      if (changedPosts[0].todos.length > 0) {
        dispatch(changeSelectedTask(changedPosts[0].todos[0].id));
      }
    }
  };
  const changeSelectedArrayFun = (id: number) => {
    dispatch(changeSelectedArray(id));

    if (selected_array!.todos.length < 7) {
      dispatch(changeViewBlock({ width: 1000, height: 1000 }));
    }
  };
  const createClickButton = () => {
    putTodo({
        post: {
          name: inputValue,
          id: lastArrayId,
          todos: []
        },
        id: user!.id,
        action: "PUT_ARRAY"
      }
    )

    dispatch(putArrayTask(inputValue))
  }
  const deleteTodoArray = (name: string, arrayId: number) => {
    dispatch(deleteArrayTasks(arrayId))
    deletePost({todoId: name, id: user!.id, action: "DELETE_ARRAY"})
  }

  useEffect(() => {
    fetchData();
    gsap.fromTo('.menu-wrapper', {opacity: 0, x: -10}, {opacity: 1, x: 0})
  }, [isLoading]);

  return (
    <section className="menu-tasks">
      <p className="menu-surname">TASKS</p>
      <div className="menu-current-tasks">
        {isLoading ? (
          <Loader/>
        ) : (
          tasks.map((el) => {
            return (
              <div className="menu-wrapper" key={`Task: ${el.id}`}>
                <div
                  className="menu-task"
                  onClick={() => changeSelectedArrayFun(el.id)}
                >
                  <p className="menu-name">{el.name}</p>
                </div>
                <button className="menu-value-tasks" onClick={() => deleteTodoArray(el.name, el.id)}>{el.todos.length}</button>
              </div>
            );
          })
        )}
        <div className="add-array">
          <button
            className="menu-task-add"
            onClick={() => {
              createClickButton();
            }}
          >
          </button>
          <input 
              type="text" 
              className="add-new-array"
              value={inputValue}
              onChange={(e) => {setInputValue(inputValue => inputValue = e.target.value)}}
              placeholder="add new array"  
            />
        </div>
      </div>
    </section>
  );
};

export default TasksMenu;
