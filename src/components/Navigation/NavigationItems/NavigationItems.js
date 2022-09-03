import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const navigationItems = () => {
return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' name={'Buffet Builder'}/>
            <NavigationItem link='/orders' name={'Orders'}/>
        </ul>
);
}

export default navigationItems;