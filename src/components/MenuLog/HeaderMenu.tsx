import React from 'react';
import { IHeaderProps } from '../../types/Header_props';

const HeaderMenu = (props : IHeaderProps) => {
    return (
        <header className='menu-header'>
            <h2>{props.name}</h2>
        </header>
    );
};

export default HeaderMenu;