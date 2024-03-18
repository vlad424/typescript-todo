import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { PostService } from "../../services/posts/posts.service";

const TasksMenu = () => {
  const {putArrayTask, changeSelectedArray, swapAllTasks} = taskSlice.actions;
  const tasks = useAppSelector(state => state.taskReducer.tasks)
  const user = useAppSelector(state => state.taskReducer.User)

  const dispatch = useAppDispatch()

  const fetchData = async () => {
    const posts = await PostService.getUserPosts(user!.id).catch(e => e)
    const changedPosts = {}

    dispatch(swapAllTasks(posts.data))

    console.log(posts.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className="menu-tasks">
      <p className="menu-surname">TASKS</p>
      <div className="menu-current-tasks">
        {tasks.map(el => {
          return(
            <div className="menu-task" key={`Task: ${el._id}`} onClick={() => dispatch(changeSelectedArray(el._id))}>
              <p className="menu-name">{el.name}</p>
              <p className="menu-value-tasks">{el.todos.length}</p>
            </div>
          );
        })}
        <button className="menu-task-add" onClick={() => {dispatch(putArrayTask("yesterday"))}}>Add New Array</button>
      </div>
    </section>
  );
};

export default TasksMenu;