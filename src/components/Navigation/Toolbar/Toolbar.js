import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
    return (
        <header className={classes.headerC}>
            <div className={classes.containerToggle}>
                <DrawerToggle clicked={props.SideShow}/>
            </div>
            <div className={classes.menu}>MENU</div>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            
            <nav>
                <NavigationItems/>
            </nav>
        </header>
    );

}

export default toolbar;