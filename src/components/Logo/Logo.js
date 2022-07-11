import React from "react";
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.main}>
        <div className={classes.wrapper}>
            <div className={classes.first}></div>
            <div className={classes.second}></div>
            <div className={classes.third}></div>
        </div>
        <div className={classes.underline}></div>
    </div>
);

export default logo;