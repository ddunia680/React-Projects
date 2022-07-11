import React from "react";
import classes from './NavigationItem.module.css';


const navigationItem = (props) => {
return (
    <li className={classes.NavigationItem}>
        <a className={props.definition? classes.active: null} href="/" >{props.name}</a>
    </li>
);
}

export default navigationItem;