import React from "react";
import classes from './SideDrawer.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../containers/hoc/Auxiliary";

const sideDrawer = (props) => {
    let attachedClasses = [classes.sideDrawer, classes.Close];
    // let openP = props.open;
    if(props.open) {
        attachedClasses = [classes.sideDrawer, classes.Open];
    }
    console.log(attachedClasses);
    return (
        <Aux>
            <Backdrop clicked={props.remove}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems clicked={props.remove}/>
            </nav>
            
        </div>
        </Aux>
    );
}

export default sideDrawer;