import React from 'react';
import { taskSlice } from '../../hooks/reducers/taskSlice';
import { useAppDispatch } from '../../hooks/redux';

const Task = (task : any) => {
    const { changeSelectedArray} = taskSlice.actions;

    const dispatch = useAppDispatch()

    return (
        <div className="menu-task" key={`Task: ${task._id}`} onClick={() => dispatch(changeSelectedArray(task._id))}>
              <p className="menu-name">{task.name}</p>
              <p className="menu-value-tasks">{task.todos.length}</p>
        </div>
    );
};

export default Task;