import React from "react";
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.articleControl}>
            <label>{props.label}</label>
            <button 
                className={classes.remove} 
                onClick={props.removed} disabled={props.disabled}>Remove</button>

            <button 
                className={classes.add}
                onClick={props.added}>Add</button>
    </div>
);

export default buildControl;