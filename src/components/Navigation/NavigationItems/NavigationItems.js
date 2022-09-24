import React from "react";
import { useSelector } from "react-redux";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
    let token = useSelector(state => state.authenticate.token);
return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' name={'Buffet Builder'} clicked={props.clicked} />
            {token ? <NavigationItem link='/orders' name={'Orders'} clicked={props.clicked}/> : null}
            {!token ? 
                <NavigationItem 
                        link='/auth' 
                        name={'Authenticate'} 
                        clicked={props.clicked}/>
            : <NavigationItem 
                        link='/logout' 
                        name={'Logout'} 
                        clicked={props.clicked}/>
            }
        </ul>
);
}

export default NavigationItems;