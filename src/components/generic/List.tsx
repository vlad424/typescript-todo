import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/redux';

const ColoredTask = styled.div<{ $text_color?: String }>`
  color: ${(props): any => props.$text_color};
`;

const List = (el: any) => {
  const blockRef = useRef<HTMLInputElement>(null)
  const blockType = useAppSelector(state => state.viewReducer.wrap)

  const hu = () => {
    if(blockType === 'wrap') return '25%' 
    else if(blockType === 'nowrap') return '95%'
  }

  return (
    <ColoredTask 
        style={{width: hu()}}
        ref={blockRef}
        $text_color={el.text_color}
        className="task"
      >
        {el.name}
      </ColoredTask>
  );
};

export default List;