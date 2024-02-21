import React from 'react';
import { taskSlice } from '../../hooks/reducers/taskSlice';
import { useAppDispatch } from '../../hooks/redux';
import styled from "styled-components";

const Task = (el : any) => {
    const { changeSelectedTask} = taskSlice.actions;

    const dispatch = useAppDispatch()

    const ColoredTask = styled.div<{$text_color?: String; }>`
    color: ${(props) : any => props.$text_color};
    `

    return (
        <ColoredTask 
            $text_color={el.text_color}
            className="task"
            key={`MiddleTask: ${el._id}`}
            onClick={() => dispatch(changeSelectedTask(el._id))}
          >
            {el.name}
          </ColoredTask>
    );
};

export default Task;