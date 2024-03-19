import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { PostService } from "../../services/posts/posts.service";
import { IArrayTasks } from "../../types/redux_state";

const TasksMenu = () => {
  const { putArrayTask, changeSelectedArray, swapAllTasks, changeSelectedTask } = taskSlice.actions;
  const tasks = useAppSelector((state) => state.taskReducer.tasks);
  const user = useAppSelector((state) => state.taskReducer.User);

  const dispatch = useAppDispatch();

  const fetchData = async () => {
    let changedPosts: Array<IArrayTasks> | null = [];
    const posts = await PostService.getUserPosts(user!.id).catch((e) => e);
    if (posts) {
      for (let i = 0; i < posts.data.length; i++) {
        changedPosts!.push({
          name: posts.data[i].name,
          id: i,
          todos: posts.data[i].todos,
        });
      }
      dispatch(swapAllTasks(changedPosts ? changedPosts : tasks));
      dispatch(changeSelectedTask(changedPosts[0].todos[0].id))
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="menu-tasks">
      <p className="menu-surname">TASKS</p>
      <div className="menu-current-tasks">
        {tasks.map((el) => {
          return (
            <div
              className="menu-task"
              key={`Task: ${el.id}`}
              onClick={() => dispatch(changeSelectedArray(el.id))}
            >
              <p className="menu-name">{el.name}</p>
              <p className="menu-value-tasks">{el.todos.length}</p>
            </div>
          );
        })}
        <button
          className="menu-task-add"
          onClick={() => {
            dispatch(putArrayTask("yesterday"));
          }}
        >
          Add New Array
        </button>
      </div>
    </section>
  );
};

export default TasksMenu;
