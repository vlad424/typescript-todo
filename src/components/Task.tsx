import "./TaskLog/task.scss";
import HeaderTask from "./TaskLog/HeaderTask";
import SelectedTaskArr from "./TaskLog/SelectedTaskArr";

const Task = () => {
  return (
    <section className="middle-task-area">
      <HeaderTask />
      <SelectedTaskArr/>
    </section>
  );
};

export default Task;
