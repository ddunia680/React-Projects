import React from "react";
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={classes.wrapper} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;