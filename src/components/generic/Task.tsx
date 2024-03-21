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
  const blockType = useAppSelector(state => state.viewReducer.wrap)

  const hu = () => {
    if(blockType === 'wrap') return '25%' 
    else if(blockType === 'nowrap') return '95%'
  }

  const checker = () => {
    if(blockRef.current !== null) 
    if(blockHeight === 0) {
      const payload = {
        width: blockRef.current.getBoundingClientRect().width,
        height: blockRef.current.getBoundingClientRect().height,
      }

      blockRef.current ? dispatch(changeHeight(payload)) : console.log()
    }
    else if(blockHeight > blockRef.current.getBoundingClientRect().height) {
      const payload = {
        width: blockRef.current.getBoundingClientRect().width,
        height: blockRef.current.getBoundingClientRect().height,
      }
      dispatch(changeViewBlock(payload))
    }
    else if(blockHeight < blockRef.current.getBoundingClientRect().height) {
      const payload = {
        width: blockRef.current.getBoundingClientRect().width,
        height: blockRef.current.getBoundingClientRect().height,
      }
      dispatch(changeViewBlock(payload))
    }
  }

  useEffect(() => {
    checker()
  }, []) 

  return (
      <ColoredTask 
        style={{width: hu()}}
        ref={blockRef}
        $text_color={el.text_color}
        className="task"
        onClick={() => dispatch(changeSelectedTask(el.id))}
      >
        {el.name}
      </ColoredTask>
  );
};

export default Task;
