import React from "react";
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';


const navigationItem = (props) => {
return (
    <li className='NavigationItem'>
        <NavLink to={props.link} >
            {props.name}
        </NavLink>
    </li>
);
}

export default navigationItem;