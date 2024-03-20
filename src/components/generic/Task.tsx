import React, { useEffect, useRef } from "react";
import { taskSlice } from "../../hooks/reducers/taskSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styled from "styled-components";
import { viewSlice } from "../../hooks/reducers/viewSlice";

const ColoredTask = styled.div<{ $text_color?: String }>`
  color: ${(props): any => props.$text_color};
`;


const Task = (el: any) => {
  const dispatch = useAppDispatch();
  const { changeViewBlock, changeHeight } = viewSlice.actions
  const { changeSelectedTask } = taskSlice.actions;
  const blockRef = useRef<HTMLInputElement>(null)
  const blockHeight = useAppSelector(state => state.viewReducer.height)

  const checker = () => {
    if(blockRef.current !== null) 
    if(blockHeight === 0) {
      blockRef.current ?  dispatch(changeHeight(blockRef.current.getBoundingClientRect().height)) : console.log()
    }
    else if(blockHeight > blockRef.current.getBoundingClientRect().height) {
      dispatch(changeViewBlock(blockRef.current.getBoundingClientRect().height))
    }
    else if(blockHeight <= blockRef.current.getBoundingClientRect().height) {
      dispatch(changeViewBlock(blockRef.current.getBoundingClientRect().height))
    }
  }

  useEffect(() => {
    checker()
  }, []) 

  return (
      <ColoredTask ref={blockRef}
        $text_color={el.text_color}
        className="task"
        onClick={() => dispatch(changeSelectedTask(el.id))}
      >
        {el.name}
      </ColoredTask>
  );
};

export default Task;
