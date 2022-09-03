import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' name={'Buffet Builder'} clicked={props.clicked} />
            <NavigationItem link='/orders' name={'Orders'} clicked={props.clicked}/>
        </ul>
);
}

export default navigationItems;