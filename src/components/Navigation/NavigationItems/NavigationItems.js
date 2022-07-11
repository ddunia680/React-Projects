import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const navigationItems = () => {
return (
        <ul className={classes.NavigationItems}>
            <NavigationItem definition={'active'} name={'Buffet Builder'}/>
            <NavigationItem name={'Orders'}/>
        </ul>
);
}

export default navigationItems;