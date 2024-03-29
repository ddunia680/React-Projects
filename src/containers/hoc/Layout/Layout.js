import React, { Component } from "react";
import Aux from "../Auxiliary";
import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../../components/Navigation/SideDrawer/SideDrawer";

import classes from './Layout.module.css';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }
    RemoveSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render() {
        return (
            <Aux>
                {this.state.showSideDrawer?
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    remove={this.RemoveSideDrawerHandler}/>: null}
                    
                <Toolbar SideShow={this.showSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}

export default Layout;